'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import data from '@/app/data/data';
import Image from 'next/image';
import Link from 'next/link';
import { Gift, Plane, TrendingUp, Sparkles } from 'lucide-react';
import Search from './Search';
import clsx from 'clsx';

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
            <div className="border-b sticky top-0 z-10 flex justify-center border-t w-full bg-gradient-to-br from-neutral-900 via-black to-neutral-900 border-neutral-700/60 border-dashed">
                <div className="w-full max-w-full ">
                    <div className="flex px-10 py-3 flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <Link href="/">
                            <div className="flex items-center gap-2.5 min-w-[14rem] justify-center md:justify-start">
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center border border-neutral-700">
                                    <Sparkles className="w-5 h-5 text-neutral-300" />
                                </div>
                                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white/90 to-neutral-600 bg-clip-text text-transparent">
                                    HiCred
                                </h1>
                            </div>
                        </Link>

                        <Search placeholder="Search credit cards..." />

                    </div>
                </div>
            </div>



            <div className='border-l border-r border-neutral-700/60 border-dashed'>
    {filteredCards.length > 0 &&
        filteredCards.map((card) => (
            <Link href={`/card/${card.card_id}`} key={card.card_id}>
                <div className="relative flex flex-col md:flex-row items-stretch bg-gradient-to-br from-neutral-900/95 via-black/90 to-neutral-800/95 border-b border-t border-dashed border-neutral-700/60 shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-neutral-950/90 hover:shadow-2xl group mt-6 backdrop-blur-sm hover:border-neutral-600/70">
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    <div className="relative flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-6 bg-gradient-to-br from-black/90 via-neutral-900/85 to-neutral-800/75 p-4 md:p-6 md:w-72 backdrop-blur-sm border-r border-neutral-700/40">
                        
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-neutral-100 transition-colors duration-300">
                                {card.card_name}
                            </h2>
                            
                            <div className="flex items-center gap-2">
                                <span className="text-neutral-400 text-sm font-medium group-hover:text-neutral-300 transition-colors duration-300">
                                    {card.issuer}
                                </span>
                                
                                <span className={clsx(
                                    'relative px-2 py-0.5 font-semibold text-xs rounded-full uppercase border transition-all duration-300 hover:scale-105 shadow-sm overflow-hidden group/tag',
                                    
                                    'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700',
                                    
                                    card.category.toLowerCase() === 'premium' && 'bg-gradient-to-r from-yellow-400/70 to-yellow-500/80 border-yellow-400 text-yellow-950 shadow-yellow-400/40 hover:shadow-yellow-500/60 hover:shadow-xl',
                                    card.category.toLowerCase() === 'super premium' && 'bg-gradient-to-r from-purple-500/70 to-indigo-600/80 border-purple-400 text-white shadow-purple-400/40 hover:shadow-purple-500/60 hover:shadow-xl',
                                    card.category.toLowerCase() === 'entry level' && 'bg-gradient-to-r from-blue-400/70 to-blue-500/80 border-blue-400 text-blue-950 shadow-blue-400/40 hover:shadow-blue-500/60 hover:shadow-xl',
                                    card.category.toLowerCase() === 'cashback' && 'bg-gradient-to-r from-green-400/70 to-emerald-500/80 border-green-400 text-green-950 shadow-green-400/40 hover:shadow-green-500/60 hover:shadow-xl',
                                    card.category.toLowerCase() === 'rewards' && 'bg-gradient-to-r from-orange-400/70 to-amber-500/80 border-orange-400 text-orange-950 shadow-orange-400/40 hover:shadow-orange-500/60 hover:shadow-xl',
                                    card.category.toLowerCase() === 'lifetime free' && 'bg-gradient-to-r from-slate-400/70 to-gray-500/80 border-slate-400 text-slate-950 shadow-slate-400/40 hover:shadow-slate-500/60 hover:shadow-xl',
                                    card.category.toLowerCase() === 'travel' && 'bg-gradient-to-r from-teal-400/70 to-cyan-500/80 border-teal-400 text-teal-950 shadow-teal-400/40 hover:shadow-teal-500/60 hover:shadow-xl',
                                    card.category.toLowerCase() === 'shopping' && 'bg-gradient-to-r from-pink-400/70 to-rose-500/80 border-pink-400 text-pink-950 shadow-pink-400/40 hover:shadow-pink-500/60 hover:shadow-xl'
                                )}>
                                    <span className="relative z-10">{card.category}</span>
                                </span>
                            </div>
                        </div>
                        
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            <Image
                                src={card.image}
                                alt={card.card_name}
                                width={500}
                                height={300}
                                className="relative rounded-lg w-32 h-auto md:w-full shadow-lg group-hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-neutral-700/50"
                                priority
                            />
                    </div>
                    
                    <div className="relative flex-1 w-full md:w-[40rem] grid grid-cols-1 md:grid-cols-2 p-4 md:p-6 gap-4 bg-gradient-to-br from-black/80 via-neutral-900/75 to-neutral-800/70 backdrop-blur-sm">
                        
                        <div className="space-y-3">
                            <div className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/30 p-3 rounded-lg border border-neutral-700/40 hover:border-neutral-600/60 transition-all duration-300 group/fee backdrop-blur-sm">
                                <div className="text-neutral-400 text-xs font-medium uppercase tracking-wider">Joining Fee</div>
                                <div className="text-lg font-semibold text-white mt-1 group-hover/fee:text-neutral-100 transition-colors duration-300">
                                    {formatCurrency(card.joining_fee)}
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/30 p-3 rounded-lg border border-neutral-700/40 hover:border-neutral-600/60 transition-all duration-300 group/fee backdrop-blur-sm">
                                <div className="text-neutral-400 text-xs font-medium uppercase tracking-wider">Annual Fee</div>
                                <div className="text-lg font-semibold text-white mt-1 group-hover/fee:text-neutral-100 transition-colors duration-300">
                                    {formatCurrency(card.annual_fee)}
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/30 p-3 rounded-lg border border-neutral-700/40 hover:border-neutral-600/60 transition-all duration-300 backdrop-blur-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="w-4 h-4 text-green-400" />
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
                                <div className="flex items-center gap-2 mt-3">
                                    <Gift className="w-4 h-4 text-purple-400" />
                                    <span className="text-neutral-200 font-semibold text-sm">Welcome</span>
                                </div>
                                <ul className="list-disc list-inside text-neutral-300 text-xs pl-2 mt-1">
                                    {card.welcome_benefits.map((b, i) => (
                                        <li key={i}>{b}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        
                        <div className="col-span-1 md:col-span-2 mt-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Plane className="w-4 h-4 text-blue-400" />
                                <span className="text-neutral-200 font-semibold text-sm">Features</span>
                            </div>
                            <ul className="flex flex-wrap gap-2">
                                {card.features.map((f, i) => (
                                    <li
                                        key={i}
                                        className="bg-gradient-to-r from-neutral-800/60 to-neutral-800/40 text-neutral-200 text-xs px-3 py-1 rounded-full border border-neutral-700 hover:border-neutral-600 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
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
</div>

        </>
    );
} 
