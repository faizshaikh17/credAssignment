'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-neutral-800 py-12 px-4">
      <div className="w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-neutral-800 bg-gradient-to-br from-neutral-900 via-black to-neutral-800 transition-all duration-300 hover:scale-[1.015] hover:shadow-black/70">
        <div className="relative px-6 sm:px-8 py-7 bg-gradient-to-br from-black via-neutral-900 to-neutral-800">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-full blur-2xl opacity-40"></div>
            <div className="absolute left-0 bottom-0 w-24 h-24 bg-gradient-to-tr from-white/10 via-transparent to-transparent rounded-full blur-2xl opacity-30"></div>
          </div>
          <div className="relative flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-extrabold text-white tracking-wide">
                {card.card_name}
              </h1>
              <div className="flex items-center justify-center sm:justify-start gap-3 mt-2">
                <span className="text-neutral-400 font-medium">{card.issuer}</span>
                <span className="px-3 py-1 bg-neutral-800 text-neutral-300 text-xs rounded-full uppercase tracking-wider border border-neutral-700/60">
                  {card.category}
                </span>
              </div>
            </div>
            <Image
              src={card.image}
              alt={card.card_name}
              width={500}
              height={300}
              className="rounded-lg w-full max-w-[16rem] aspect-video object-contain"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="bg-neutral-800/80 backdrop-blur-md p-4 rounded-xl border border-neutral-700">
              <div className="text-neutral-400 text-xs">Joining Fee</div>
              <div className="text-xl font-bold text-white">
                {formatCurrency(card.joining_fee)}
              </div>
            </div>
            <div className="bg-neutral-800/80 backdrop-blur-md p-4 rounded-xl border border-neutral-700">
              <div className="text-neutral-400 text-xs">Annual Fee</div>
              <div className="text-xl font-bold text-white">
                {formatCurrency(card.annual_fee)}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 sm:px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-br from-black via-neutral-900 to-neutral-800">
          <div className="space-y-7">
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-inner">
              <div className="flex items-center gap-3 mb-3">
                <Gift className="w-6 h-6 text-neutral-500" />
                <h3 className="text-lg font-semibold text-white">Welcome Benefits</h3>
              </div>
              <ul className="space-y-2">
                {card.welcome_benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-neutral-200">
                    <span className="w-2 h-2 mt-2 bg-neutral-700 rounded-full flex-shrink-0"></span>
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-inner">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-neutral-500" />
                <h3 className="text-lg font-semibold text-white">Reward Points</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-neutral-800/70 rounded-lg px-3 py-2">
                  <span className="text-neutral-400 text-sm">Domestic Spends</span>
                  <span className="text-neutral-100 font-semibold">
                    {card.rewards.domestic_spends}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-neutral-800/70 rounded-lg px-3 py-2">
                  <span className="text-neutral-400 text-sm">International Spends</span>
                  <span className="text-neutral-100 font-semibold">
                    {card.rewards.international_spends}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-7">
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-inner">
              <div className="flex items-center gap-3 mb-3">
                <Plane className="w-6 h-6 text-neutral-500" />
                <h3 className="text-lg font-semibold text-white">Key Features</h3>
              </div>
              <ul className="space-y-2">
                {card.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-neutral-200">
                    <span className="w-2 h-2 mt-2 bg-neutral-700 rounded-full flex-shrink-0"></span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-inner">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-neutral-500" />
                <h3 className="text-lg font-semibold text-white">Eligibility</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 bg-neutral-800/70 rounded-lg px-3 py-2">
                  <User className="w-4 h-4 text-neutral-500" />
                  <div>
                    <div className="text-xs text-neutral-400">Age</div>
                    <div className="text-sm font-semibold text-neutral-100">
                      {card.eligibility.min_age}-{card.eligibility.max_age} yrs
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-neutral-800/70 rounded-lg px-3 py-2">
                  <TrendingUp className="w-4 h-4 text-neutral-500" />
                  <div>
                    <div className="text-xs text-neutral-400">Credit Score</div>
                    <div className="text-sm font-semibold text-neutral-100">
                      {card.eligibility.credit_score}+
                    </div>
                  </div>
                </div>
                <div className="col-span-1 sm:col-span-2 flex items-center gap-2 bg-neutral-800/70 rounded-lg px-3 py-2">
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

        <div className="px-6 sm:px-8 py-7 bg-neutral-900 border-t border-neutral-800">
          <button
            onClick={() => window.open(card.apply_url, '_blank')}
            className="w-full bg-gradient-to-r from-black via-neutral-900 to-neutral-800 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 border border-neutral-800 hover:bg-white/90 cursor-pointer"
          >
            Apply Now
          </button>
          <div className="mt-4">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="w-full bg-gradient-to-r from-neutral-900 to-neutral-800 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 border cursor-pointer border-neutral-700/60 hover:bg-neutral-700 transition-all"
            >
              <TableProperties className="w-5 h-5" />
              {showComparison ? 'Hide Comparison' : 'Compare with Similar Cards'}
            </button>
          </div>
        </div>

        {showComparison && (
          <div className="mt-10 px-6 sm:px-8 pb-10">
            <h2 className="text-white text-xl font-bold mb-6">Comparison Table</h2>
            <div className="overflow-x-auto rounded-xl border border-neutral-800">
              <table className="min-w-[40rem] w-full text-sm text-white bg-neutral-900 rounded-xl">
                <thead className="bg-neutral-800 text-neutral-300 text-left">
                  <tr>
                    <th className="py-3 px-4">Feature</th>
                    {getComparisonCards().map(c => (
                      <th key={c.card_id} className="py-3 px-4">
                        {c.card_name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  <tr>
                    <td className="py-3 px-4 text-neutral-400">Issuer</td>
                    {getComparisonCards().map(c => (
                      <td key={c.card_id} className="py-3 px-4">
                        {c.issuer}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-neutral-400">Category</td>
                    {getComparisonCards().map(c => (
                      <td key={c.card_id} className="py-3 px-4">
                        {c.category}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-neutral-400">Joining Fee</td>
                    {getComparisonCards().map(c => (
                      <td key={c.card_id} className="py-3 px-4">
                        {formatCurrency(c.joining_fee)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-neutral-400">Annual Fee</td>
                    {getComparisonCards().map(c => (
                      <td key={c.card_id} className="py-3 px-4">
                        {formatCurrency(c.annual_fee)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-neutral-400">Min Income</td>
                    {getComparisonCards().map(c => (
                      <td key={c.card_id} className="py-3 px-4">
                        {formatIncome(c.eligibility.min_income)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-neutral-400">Credit Score</td>
                    {getComparisonCards().map(c => (
                      <td key={c.card_id} className="py-3 px-4">
                        {c.eligibility.credit_score}+
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-neutral-400">Rewards (Domestic)</td>
                    {getComparisonCards().map(c => (
                      <td key={c.card_id} className="py-3 px-4">
                        {c.rewards.domestic_spends}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-neutral-400">Rewards (International)</td>
                    {getComparisonCards().map(c => (
                      <td key={c.card_id} className="py-3 px-4">
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
  );
}
