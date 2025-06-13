
'use client';

import { useState, useRef, useCallback } from 'react';
import { Send } from 'lucide-react';
import { GoogleGenerativeAI, ChatSession } from '@google/generative-ai';
import data from '@/app/data/data';
import clsx from 'clsx';
interface Card {
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
}

interface AssistantProps {
    messages: Array<{ role: 'user' | 'ai'; content: string }>;
    setMessages: React.Dispatch<React.SetStateAction<Array<{ role: 'user' | 'ai'; content: string }>>>;
}

const cardData: Card[] = data();

const systemPrompt = `
You are a Credit Card Recommendation Assistant. Always respond in **valid JSON** format using **only the provided credit card dataset**. Use \\n to indicate line breaks within string fields. Based on the user query, choose one of the following response types:

1. **Recommendation** – Suggest cards based on user preferences:
{
  "type": "cards",
  "results": [/* array of matching card IDs */],
  "summary": "Brief explanation of why these cards were selected."
}

2. **Comparison** – Compare specific cards requested by the user:
{
  "type": "comparison",
  "results": [/* array of compared card IDs */],
  "summary": "High-level comparison summary.",
  "missing_cards": [/* card names mentioned by user but not found in dataset */]
}

3. **Explanation** – Answer general questions or clarifications:
{
  "type": "text",
  "content": "Plain-text explanation relevant to the user's query."
}

Do not invent cards or attributes. Always stick strictly to the dataset.
`;

export default function Assistant({ messages, setMessages }: AssistantProps) {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatRef = useRef<ChatSession | null>(null);

    const getChat = useCallback(async () => {
        if (chatRef.current) return chatRef.current;

        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) return null;

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const chat = await model.startChat({
            history: [],
            systemInstruction: { role: 'system', parts: [{ text: systemPrompt }] },
        });

        chatRef.current = chat;
        return chat;
    }, []);

    const sendMessage = useCallback(async () => {
        if (!input.trim() || loading) return;

        setMessages((prev) => [...prev, { role: 'user', content: input.trim() }]);
        setInput('');
        setLoading(true);

        const chat = await getChat();
        if (!chat) {
            setMessages((prev) => [...prev, { role: 'ai', content: 'Error: API key missing.' }]);
            setLoading(false);
            return;
        }

        try {
            const fullMessage = `
### User Query
"${input.trim()}"

### Credit Card Data
${JSON.stringify(
                cardData.filter(
                    (card) =>
                        card.card_name.toLowerCase().includes(input.toLowerCase()) ||
                        card.features.some((f) => f.toLowerCase().includes(input.toLowerCase()))
                ),
                null,
                2
            )}
      `;

            const result = await chat.sendMessage(fullMessage);

            const rawText = await result.response.text();
            const cleaned = rawText
                .replace(/```json\s*([\s\S]*?)\s*```/, '$1')
                .replace(/```[\s\S]*?```/, '$1')
                .trim();

            const reply = JSON.parse(cleaned);

            if (reply.type === 'cards' || reply.type === 'comparison') {
                const invalidCards = reply.results.filter(
                    (card: { card_id: string }) => !cardData.some((c) => c.card_id === card.card_id)
                );
                if (invalidCards.length > 0) throw new Error('Invalid cards in response');
            }

            setMessages((prev) => [...prev, { role: 'ai', content: JSON.stringify(reply) }]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: 'ai', content: `Error: ${err instanceof Error ? err.message : 'Unknown error'}` },
            ]);
        } finally {
            setLoading(false);
        }
    }, [input, loading, setMessages, getChat]);

    return (
        <div className="fixed bottom-5 z-50 w-full max-w-xl mx-auto px-4">
            {messages.length > 0 && <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto rounded-xl bg-black/80 backdrop-blur-sm p-4 border border-dashed border-neutral-700/60 shadow-2xl scroll-smooth scrollbar-hide transition-all duration-500 hover:shadow-neutral-950/90">
                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={clsx(
                            'px-4 py-2 rounded-lg text-sm max-w-[85%] whitespace-pre-wrap break-words relative group',
                            m.role === 'user'
                                ? 'bg-gradient-to-r from-blue-600/80 to-blue-700/90 text-white self-end border border-blue-500/50 shadow-blue-500/30 hover:shadow-blue-600/50'
                                : 'bg-gradient-to-r from-neutral-800/80 to-neutral-900/90 text-neutral-200 self-start border border-neutral-600/50 shadow-neutral-600/30 hover:shadow-neutral-700/50',
                            'transition-all duration-300 hover:scale-[1.02]'
                        )}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        {m.content}
                    </div>
                ))}

                {loading && (
                    <div className="text-sm text-neutral-400 italic self-start uppercase tracking-wider">
                        Thinking...
                    </div>
                )}
            </div>}

            <div className="flex items-center gap-2 border border-dashed border-neutral-700/60 bg-black/80 backdrop-blur-sm p-2 rounded-xl shadow-lg mt-3 transition-all duration-500 hover:border-neutral-600/70 hover:shadow-neutral-950/90">
                <input
                    type="text"
                    className="flex-1 bg-transparent outline-none text-white placeholder:text-neutral-500 px-3 py-2 text-sm font-medium"
                    placeholder="Ask about credit cards..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    disabled={loading}
                />
                <button
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                    className={clsx(
                        'p-2.5 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600/80 to-blue-700/90 hover:from-blue-500/80 hover:to-blue-600/90 disabled:opacity-50 disabled:cursor-not-allowed',
                        'transition-all duration-300 hover:scale-105 shadow-blue-500/40 hover:shadow-blue-600/60'
                    )}
                >
                    <Send size={16} className="text-white" />
                </button>
            </div>
        </div>
    );
}
