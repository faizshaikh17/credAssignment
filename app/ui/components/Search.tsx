'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Search as Magnify } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import data from '@/app/data/data';

type Suggestion = {
    suggestion: string;
    description: string;
    url: string;
};

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [query, setQuery] = useState(searchParams.get('query') || '');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [toggle, setToggle] = useState<boolean>(false);
    const cardData = data();

    const getModel = () => {
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) return null;
        const genAI = new GoogleGenerativeAI(apiKey);
        return genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
    };

    const optimizeQuery = useCallback(async (inputQuery: string): Promise<string[]> => {
        setToggle(true)
        const model = getModel();
        if (!model) return [inputQuery];

        try {
            const prompt = `Refine this search query for a credit card comparison app: "${inputQuery}". Suggest up to 3 relevant keywords based on this data and make sure you suggest lines or words which are included in this dataset only "${cardData}" (e.g., rewards, cashback, lounge). Output as a JSON array.`;
            const result = await model.generateContent(prompt);
            const response = await result.response.text();
            return JSON.parse(response.replace(/```json\n?|\n```/g, ''));
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
            const parsed = JSON.parse(response.replace(/```json\n?|\n```/g, '')) as Suggestion[];
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
        setToggle(false)
    };

    return (
        <div className="relative flex w-[45rem] max-h-10 flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">Search</label>
            <input
                id="search"
                className="peer block w-full rounded-md border border-neutral-800 py-[9px] pl-10 text-sm placeholder:text-neutral-400 bg-neutral-900 text-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-700 focus:border-neutral-200"
                placeholder={placeholder}
                onChange={(e) => handleSearch(e.target.value)}
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
