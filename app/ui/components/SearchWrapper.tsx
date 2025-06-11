'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import data from '@/app/data/data';
import Image from 'next/image';
import Link from 'next/link';
import { Gift, Plane, TrendingUp, Sparkles } from 'lucide-react';
import Search from './Search';

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

export default function SearchWrapper() {
    const cardData: Card[] = data();
    const searchParams = useSearchParams();
    const query = (searchParams.get('query') || '').toLowerCase();

    const formatCurrency = (amount: number): string =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);

    const filteredCards = useMemo(() => {
        return cardData.filter(
            (card) =>
                card.welcome_benefits.some((benefit) => benefit.toLowerCase().includes(query)) ||
                card.features.some((feature) => feature.toLowerCase().includes(query)) ||
                Object.entries(card).some(([, value]) => {
                    let val: string = '';

                    if (typeof value === 'string') {
                        val = value;
                    } else if (typeof value === 'number') {
                        val = value.toString();
                    } else if (Array.isArray(value)) {
                        val = value.join(', ');
                    } else if (value && typeof value === 'object') {
                        val = Object.values(value)
                            .map((v) => (typeof v === 'string' || typeof v === 'number' ? v.toString() : ''))
                            .join(', ');
                    }

                    return val.toLowerCase().includes(query);
                })
        );
    }, [cardData, query]);

    return (
        <>
            <div className="sticky top-0 z-10 w-full max-w-[60rem] rounded-2xl backdrop-blur-md bg-black/20 border border-neutral-800/50">
                <div className="px-4 py-3">
                    <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center w-full">
                        <Link href={'/'}>
                            <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center border border-neutral-700">
                                    <Sparkles className="w-5 h-5 text-neutral-300" />
                                </div>
                                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white/90 to-neutral-600 bg-clip-text text-transparent">
                                    HiCred
                                </h1>
                            </div>
                        </Link>
                        <div className="w-full md:w-auto">
                            <Search placeholder="Search credit cards..." />
                        </div>
                    </div>
                </div>
            </div>

            {filteredCards.length > 0 &&
                filteredCards.map((card) => (
                    <Link href={`/card/${card.card_id}`} key={card.card_id}>
                        <div className="flex flex-col md:flex-row items-stretch bg-gradient-to-br from-neutral-900 via-black to-neutral-800 border border-neutral-700/60 rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-neutral-950/80 group mt-4">
                            <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-8 bg-neutral-900/80 p-4 md:p-8 md:w-72">
                                <div>
                                    <h2 className="text-lg md:text-xl font-bold text-white mb-1">{card.card_name}</h2>
                                    <div className="flex items-center gap-2">
                                        <span className="text-neutral-400 text-sm">{card.issuer}</span>
                                        <span className="px-2 py-0.5 bg-neutral-800 text-neutral-300 text-xs rounded-full uppercase border border-neutral-700">
                                            {card.category}
                                        </span>
                                    </div>
                                </div>
                                <Image
                                    src={card.image}
                                    alt={card.card_name}
                                    width={500}
                                    height={300}
                                    className="rounded-lg w-32 h-auto md:w-full"
                                    priority
                                />
                            </div>
                            <div className="flex-1 w-full md:w-[35rem] grid grid-cols-1 md:grid-cols-2 p-4 md:p-8 gap-4 bg-gradient-to-br from-black via-neutral-900 to-neutral-800">
                                <div>
                                    <div className="text-neutral-400 text-xs">Joining Fee</div>
                                    <div className="text-lg font-semibold text-white">{formatCurrency(card.joining_fee)}</div>
                                    <div className="text-neutral-400 text-xs mt-4">Annual Fee</div>
                                    <div className="text-lg font-semibold text-white">{formatCurrency(card.annual_fee)}</div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="w-4 h-4 text-neutral-500" />
                                        <span className="text-neutral-200 font-semibold text-sm">Rewards</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-neutral-400 text-xs">
                                            Domestic: <span className="text-neutral-100">{card.rewards.domestic_spends ?? 'N/A'}</span>
                                        </span>
                                        <span className="text-neutral-400 text-xs">
                                            International: <span className="text-neutral-100">{card.rewards.international_spends ?? 'N/A'}</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-4">
                                        <Gift className="w-4 h-4 text-neutral-500" />
                                        <span className="text-neutral-200 font-semibold text-sm">Welcome</span>
                                    </div>
                                    <ul className="list-disc list-inside text-neutral-300 text-xs pl-2">
                                        {card.welcome_benefits.map((b, i) => (
                                            <li key={i}>{b}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-span-1 md:col-span-2 mt-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Plane className="w-4 h-4 text-neutral-500" />
                                        <span className="text-neutral-200 font-semibold text-sm">Features</span>
                                    </div>
                                    <ul className="flex flex-wrap gap-3">
                                        {card.features.map((f, i) => (
                                            <li
                                                key={i}
                                                className="bg-neutral-800/70 text-neutral-200 text-xs px-3 py-1 rounded-full border border-neutral-700"
                                            >
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
        </>
    );
} 
