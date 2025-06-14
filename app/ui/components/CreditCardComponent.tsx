'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    Gift,
    Plane,
    Shield,
    TrendingUp,
    User,
    DollarSign,
    TableProperties,
} from 'lucide-react';
import data from '@/app/data/data';
import Image from 'next/image';

export default function CreditCardComponent() {
    const path = usePathname();
    const cardData = data();
    const card = cardData.find(c => c.card_id === path.split('/').pop());
    const [showComparison, setShowComparison] = useState(false);

    if (!card) return <div className="text-white text-center p-10">Card not found</div>;

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);

    const formatIncome = (amount: number) => `₹${(amount / 100000).toFixed(1)}L`;

    const getComparisonCards = () => {
        const sameCategory = cardData
            .filter(c => c.card_id !== card.card_id && c.category === card.category)
            .slice(0, 2);
        return [card, ...sameCategory];
    };

    const categoryStyles: Record<string, string> = {
        premium: 'from-yellow-400/70 to-yellow-500/80 border-yellow-400 shadow-yellow-400/40 hover:shadow-yellow-500/60',
        'super premium': 'from-purple-500/70 to-purple-600/80 border-purple-400 shadow-purple-400/40 hover:shadow-purple-500/60',
        'entry level': 'from-blue-400/70 to-blue-500/80 border-blue-400 shadow-blue-400/40 hover:shadow-blue-500/60',
        cashback: 'from-green-400/70 to-emerald-500/80 border-green-400 shadow-green-400/40 hover:shadow-green-500/60',
        rewards: 'from-orange-400/70 to-amber-500/80 border-orange-400 shadow-orange-400/40 hover:shadow-orange-500/60',
        'lifetime free': 'from-red-400/70 to-red-500/80 border-red-400 shadow-slate-400/40 hover:shadow-red-500/60',
        travel: 'from-teal-400/70 to-cyan-500/80 border-teal-400 shadow-teal-400/40 hover:shadow-teal-500/60',
        shopping: 'from-pink-400/70 to-rose-500/80 border-pink-400 shadow-pink-400/40 hover:shadow-pink-500/60',
    };

    return (
        <>

            <div className="min-h-screen relative flex flex-col items-center justify-center bg-black py-12 px-4">
                <div className='flex sticky py-2 top-0 z-10 bg-black w-full max-w-3xl justify-start'>
                    <Link href={'/'}>
                        <div className='text-3xl text-white'>←</div>
                    </Link>
                </div>
                <div className="w-full max-w-3xl shadow-2xl overflow-hidden border border-neutral-800 border-dashed bg-black/80 transition-all duration-500 hover:shadow-neutral-950/90 hover:shadow-2xl group backdrop-blur-sm hover:border-neutral-800/70">
                    <div className="absolute inset-0 bg-black/80 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="relative px-6 sm:px-8 py-7 bg-black/80 backdrop-blur-sm">
                        <div className="absolute inset-0 bg-black/80 pointer-events-none"></div>

                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-black/80 rounded-full blur-2xl opacity-40"></div>
                            <div className="absolute left-0 bottom-0 w-24 h-24 bg-black/80 rounded-full blur-2xl opacity-30"></div>
                        </div>

                        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
                            <div className="text-center sm:text-left">
                                <h1 className="text-2xl font-extrabold text-white tracking-wide group-hover:text-neutral-100 transition-colors duration-300">
                                    {card.card_name}
                                </h1>
                                <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                                    <span className="text-neutral-400 font-medium group-hover:text-neutral-300 transition-colors duration-300">{card.issuer}</span>
                                    <span className={`relative px-2 py-0.5 font-semibold text-xs rounded-full uppercase border transition-all duration-300 hover:scale-105 shadow-sm overflow-hidden group/tag text-white bg-gradient-to-r before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700 ${categoryStyles[card.category.toLowerCase()] || ''}`}>
                                        <span className="relative z-10">{card.category}</span>
                                    </span>
                                </div>
                            </div>

                            <Image
                                src={card.image}
                                alt={card.card_name}
                                width={500}
                                height={300}
                                className="relative rounded-xl w-full max-w-[16rem] object-contain shadow-lg transition-all duration-300"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                            <div className="bg-neutral-900/50 backdrop-blur-sm p-4 rounded-xl border border-neutral-900/50 hover:border-neutral-800/70 transition-all duration-300 group/fee">
                                <div className="text-neutral-400 text-xs font-medium uppercase tracking-wider">Joining Fee</div>
                                <div className="text-xl font-semibold text-white group-hover/fee:text-neutral-100 transition-colors duration-300">
                                    {formatCurrency(card.joining_fee)}
                                </div>
                            </div>
                            <div className="bg-neutral-900/50 backdrop-blur-sm p-4 rounded-xl border border-neutral-900/50 hover:border-neutral-800/70 transition-all duration-300 group/fee">
                                <div className="text-neutral-400 text-xs font-medium uppercase tracking-wider">Annual Fee</div>
                                <div className="text-xl font-semibold text-white group-hover/fee:text-neutral-100 transition-colors duration-300">
                                    {formatCurrency(card.annual_fee)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 sm:px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-black/80 backdrop-blur-sm">
                        <div className="space-y-7">
                            <div className="bg-neutral-900/50 border border-neutral-900/50 hover:border-neutral-800/70 transition-all duration-300 rounded-2xl p-5 backdrop-blur-sm shadow-inner">
                                <div className="flex items-center gap-3 mb-3">
                                    <Gift className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                                    <h3 className="text-lg font-semibold text-white">Welcome Benefits</h3>
                                </div>
                                <ul className="space-y-2">
                                    {card.welcome_benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-start gap-2 text-neutral-200">
                                            <span className="w-2 h-2 mt-2 bg-neutral-800 rounded-full flex-shrink-0"></span>
                                            <span className="text-sm">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-neutral-900/50 border border-neutral-900/50 hover:border-neutral-800/70 transition-all duration-300 rounded-2xl p-5 backdrop-blur-sm shadow-inner">
                                <div className="flex items-center gap-3 mb-3">
                                    <TrendingUp className="w-6 h-6 text-green-400" />
                                    <h3 className="text-lg font-semibold text-white">Reward Points</h3>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center bg-neutral-900/50 rounded-lg px-3 py-2 border border-neutral-900/50">
                                        <span className="text-neutral-400 text-sm">Domestic Spends</span>
                                        <span className="text-neutral-100 font-semibold">{card.rewards.domestic_spends}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-neutral-900/50 rounded-lg px-3 py-2 border border-neutral-900/50">
                                        <span className="text-neutral-400 text-sm">International Spends</span>
                                        <span className="text-neutral-100 font-semibold">{card.rewards.international_spends}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-7">
                            <div className="bg-neutral-900/50 border border-neutral-900/50 hover:border-neutral-800/70 transition-all duration-300 rounded-2xl p-5 backdrop-blur-sm shadow-inner">
                                <div className="flex items-center gap-3 mb-3">
                                    <Plane className="w-6 h-6 text-blue-400" />
                                    <h3 className="text-lg font-semibold text-white">Key Features</h3>
                                </div>
                                <ul className="flex flex-wrap gap-2">
                                    {card.features.map((feature, i) => (
                                        <li
                                            key={i}
                                            className="bg-neutral-900/50 text-neutral-200 text-xs px-3 py-1 rounded-full border border-neutral-900 hover:border-neutral-800 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                                        >
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-neutral-900/50 border border-neutral-900/50 hover:border-neutral-800/70 transition-all duration-300 rounded-2xl p-5 backdrop-blur-sm shadow-inner">
                                <div className="flex items-center gap-3 mb-3">
                                    <Shield className="w-6 h-6 text-neutral-500" />
                                    <h3 className="text-lg font-semibold text-white">Eligibility</h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2 bg-neutral-900/50 rounded-lg px-3 py-2 border border-neutral-900/50">
                                        <User className="w-4 h-4 text-neutral-500" />
                                        <div>
                                            <div className="text-xs text-neutral-400">Age</div>
                                            <div className="text-sm font-semibold text-neutral-100">
                                                {card.eligibility.min_age}-{card.eligibility.max_age} yrs
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 bg-neutral-900/50 rounded-lg px-3 py-2 border border-neutral-900/50">
                                        <TrendingUp className="w-4 h-4 text-neutral-500" />
                                        <div>
                                            <div className="text-xs text-neutral-400">Credit Score</div>
                                            <div className="text-sm font-semibold text-neutral-100">
                                                {card.eligibility.credit_score}+
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-1 sm:col-span-2 flex items-center gap-2 bg-neutral-900/50 rounded-lg px-3 py-2 border border-neutral-900/50">
                                        <DollarSign className="w-4 h-4 text-neutral-500" />
                                        <div>
                                            <div className="text-xs text-neutral-400">Min. Annual Income</div>
                                            <div className="text-sm font-semibold text-neutral-100">
                                                {formatIncome(card.eligibility.min_income)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 sm:px-8 py-7 bg-neutral-900/50 border-t border-neutral-900/60 backdrop-blur-sm">
                        <button
                            onClick={() => window.open(card.apply_url, '_blank')}
                            className="w-full bg-neutral-900/40 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 border border-neutral-900/60 hover:border-neutral-800/70 hover:bg-neutral-900/30 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm shadow-lg hover:shadow-xl"
                        >
                            Apply Now
                        </button>
                        <div className="mt-4">
                            <button
                                onClick={() => setShowComparison(!showComparison)}
                                className="w-full bg-neutral-900/40 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 border border-neutral-900/60 hover:border-neutral-800/70 hover:bg-neutral-900/30 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm shadow-lg hover:shadow-xl"
                            >
                                <TableProperties className="w-5 h-5" />
                                {showComparison ? 'Hide Comparison' : 'Compare with Similar Cards'}
                            </button>
                        </div>
                    </div>

                    {showComparison && (
                        <div className="mt-10 px-6 sm:px-8 pb-10 bg-neutral-900/50">
                            <h2 className="text-white text-xl font-bold mb-6">Comparison Table</h2>
                            <div className="overflow-x-auto rounded-xl border border-neutral-900/60 border-dashed backdrop-blur-sm">
                                <table className="min-w-[40rem] w-full text-sm text-white bg-neutral-900/50 rounded-xl backdrop-blur-sm">
                                    <thead className="bg-neutral-900/50 text-neutral-300 text-left border-b border-black/50">
                                        <tr>
                                            <th className="py-3 px-4 font-semibold">Feature</th>
                                            {getComparisonCards().map(c => (
                                                <th key={c.card_id} className="py-3 px-4 font-semibold">
                                                    {c.card_name}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-black/50">
                                        <tr className="hover:bg-neutral-900/30 transition-all duration-200">
                                            <td className="py-3 px-4 text-neutral-400 font-medium">Issuer</td>
                                            {getComparisonCards().map(c => (
                                                <td key={c.card_id} className="py-3 px-4 text-neutral-200">
                                                    {c.issuer}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="hover:bg-neutral-900/30 transition-all duration-200">
                                            <td className="py-3 px-4 text-neutral-400 font-medium">Category</td>
                                            {getComparisonCards().map(c => (
                                                <td key={c.card_id} className="py-3 px-4 text-neutral-200">
                                                    {c.category}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="hover:bg-neutral-900/30 transition-all duration-200">
                                            <td className="py-3 px-4 text-neutral-400 font-medium">Joining Fee</td>
                                            {getComparisonCards().map(c => (
                                                <td key={c.card_id} className="py-3 px-4 text-neutral-200 font-semibold">
                                                    {formatCurrency(c.joining_fee)}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="hover:bg-neutral-900/30 transition-all duration-200">
                                            <td className="py-3 px-4 text-neutral-400 font-medium">Annual Fee</td>
                                            {getComparisonCards().map(c => (
                                                <td key={c.card_id} className="py-3 px-4 text-neutral-200 font-semibold">
                                                    {formatCurrency(c.annual_fee)}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="hover:bg-neutral-900/30 transition-all duration-200">
                                            <td className="py-3 px-4 text-neutral-400 font-medium">Min Income</td>
                                            {getComparisonCards().map(c => (
                                                <td key={c.card_id} className="py-3 px-4 text-neutral-200">
                                                    {formatIncome(c.eligibility.min_income)}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="hover:bg-neutral-900/30 transition-all duration-200">
                                            <td className="py-3 px-4 text-neutral-400 font-medium">Credit Score</td>
                                            {getComparisonCards().map(c => (
                                                <td key={c.card_id} className="py-3 px-4 text-neutral-200">
                                                    {c.eligibility.credit_score}+
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="hover:bg-neutral-900/30 transition-all duration-200">
                                            <td className="py-3 px-4 text-neutral-400 font-medium">Rewards (Domestic)</td>
                                            {getComparisonCards().map(c => (
                                                <td key={c.card_id} className="py-3 px-4 text-neutral-200">
                                                    {c.rewards.domestic_spends}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr className="hover:bg-neutral-900/30 transition-all duration-200">
                                            <td className="py-3 px-4 text-neutral-400 font-medium">Rewards (International)</td>
                                            {getComparisonCards().map(c => (
                                                <td key={c.card_id} className="py-3 px-4 text-neutral-200">
                                                    {c.rewards.international_spends}
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>

    );
}