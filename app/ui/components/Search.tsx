'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Search as Magnify } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import data from '@/app/data/data';

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    type Card = {
        card_id: string;
        card_name: string;
        issuer: string;
        category: string;
        image: string;
        joining_fee: number;
        annual_fee: number;
        welcome_benefits: string[];
        features: string[];
        rewards: {
            domestic_spends?: string;
            international_spends?: string;
        };
    };

    type Suggestion = {
        suggestion: string;
        description: string;
        url: string;
    };

    const [query, setQuery] = useState(searchParams.get('query') || '');

    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    const [toggle, setToggle] = useState(false);
    const cardData: Card[] = data();

    const getModel = () => {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) return null;
        const genAI = new GoogleGenerativeAI(apiKey);
        return genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
    };

    const optimizeQuery = useCallback(async (inputQuery: string) => {
        setToggle(true);
        const model = getModel();
        if (!model) return [inputQuery];

        function extractExactPhrases(data: Card[]) {
            const phraseSet = new Set();

            data.forEach(card => {
                (card.welcome_benefits || []).forEach(benefit => phraseSet.add(benefit));
                (card.features || []).forEach(feature => phraseSet.add(feature));
            });

            return Array.from(phraseSet);
        }

        try {
            const exactPhrases = extractExactPhrases(cardData);

            const prompt = `You are an assistant helping users explore a credit card comparison app.
User query: "${inputQuery}"
Based on this dataset: ${JSON.stringify(exactPhrases)}
Your task:
- Suggest up to 3 relevant keyword **phrases** that exist **exactly as-is** in the dataset.
- These phrases must be copied **verbatim from the dataset**, including spaces, punctuation, and casing — no changes allowed.
- Prioritize phrases that best match the user intent and are helpful for filtering or comparison (e.g., "priority pass membership", "fuel surcharge waiver", "international lounge visits/year").
- If the user query contains partial words (e.g., "priority"), expand it using actual phrases found in the dataset.
Return the result as a JSON array of strings.`;

            const result = await model.generateContent(prompt);
            const response = await result.response.text();
            return JSON.parse(response.replace(/```json\n?|\n```/g, '').toLowerCase());
        } catch (error) {
            console.error('Gemini API error:', error);
            return [inputQuery];
        }
    }, [cardData]);

    const fetchSuggestions = useCallback(async (input: string) => {
        const model = getModel();
        if (!input || !model) {
            setSuggestions([]);
            return;
        }

        try {
            const prompt = `Generate 4 autocomplete suggestions for the search query "${input}" in a credit card comparison app. Each suggestion should be an object with a "suggestion", "description", and "url". Output as a JSON array.`;
            const result = await model.generateContent(prompt);
            const response = await result.response.text();
            const parsed = JSON.parse(response.replace(/```json\n?|\n```/g, ''));
            setSuggestions(parsed);
        } catch (error) {
            console.error('Gemini suggestions error:', error);
            setSuggestions([]);
        }
    }, []);

    useEffect(() => {
        fetchSuggestions(query);
    }, [query, fetchSuggestions]);

    const handleSearch = async (term: string) => {
        setQuery(term);
        const params = new URLSearchParams(searchParams);
        if (term) {
            const optimizedTerms = await optimizeQuery(term);
            params.set('query', optimizedTerms.join(','));
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const handleSuggestionClick = (suggestionText: string) => {
        setQuery(suggestionText);
        const params = new URLSearchParams(searchParams);
        params.set('query', suggestionText);
        replace(`${pathname}?${params.toString()}`);
        setSuggestions([]);
        setToggle(false);
    };

    return (
        <div className="relative flex w-full max-w-[20rem] max-h-10 flex-1 shrink-0">
            <label htmlFor="search" className="sr-only">Search</label>
            <input
                id="search"
                className="peer block w-full rounded-md border border-neutral-800/50 py-[9px] pl-10 text-sm placeholder:text-neutral-400 bg-neutral-900 text-neutral-200 focus:outline-none"
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value.toLowerCase())}
                value={query}
                aria-autocomplete="list"
                aria-controls="suggestions"
            />
            <Magnify className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-600 peer-focus:text-neutral-400" />
            {toggle && (
                <ul
                    id="suggestions"
                    className="absolute z-10 w-full mt-10 bg-neutral-800 rounded-md shadow-lg max-h-40 overflow-y-auto border border-neutral-700"
                    role="listbox"
                >
                    {suggestions.map((s, i) => (
                        <li
                            key={i}
                            className="px-4 py-2 text-neutral-200 hover:bg-neutral-700 cursor-pointer text-sm"
                            onClick={() => handleSuggestionClick(s.suggestion)}
                            role="option"
                        >
                            <div className="font-medium">{s.suggestion}</div>
                            <div className="text-xs text-neutral-400">{s.description}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}