'use client';

import React, { useMemo } from 'react';
import data from './data/data';
import { Gift, Plane, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Search from './ui/components/Search';
import { useSearchParams } from 'next/navigation';

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
    domestic_spends: string;
    international_spends: string;
  };
};

export default function Home() {
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
    return cardData.filter((card) =>
      card.welcome_benefits.some((benefit) =>
        benefit.toLowerCase().includes(query),
      ) ||
      card.features.some((feature) =>
        feature.toLowerCase().includes(query),
      ) ||
      Object.entries(card).some(([key, value]) => {
        const val =
          typeof value === 'string'
            ? value
            : typeof value === 'number'
            ? value.toString()
            : Array.isArray(value)
            ? value.join(', ')
            : typeof value === 'object' && value !== null
            ? Object.values(value).join(', ')
            : '';
        return val.toLowerCase().includes(query);
      })
    );
  }, [cardData, query]);

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-start bg-gradient-to-br from-black via-neutral-900 to-neutral-800 py-12 px-4">
      <Search placeholder="Search cards, benefits, features..." />
      {filteredCards.length > 0 && filteredCards.map((card) => (
        <Link href={`/card/${card.card_id}`} key={card.card_id}>
          <div className="flex flex-col md:flex-row items-stretch bg-gradient-to-br from-neutral-900 via-black to-neutral-800 border border-neutral-800 rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-neutral-950/80 group">
            <div className="flex flex-row md:flex-col items-center md:items-start gap-6 bg-neutral-900/80 p-8 md:w-72">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">{card.card_name}</h2>
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
                className="rounded-lg"
                priority
              />
            </div>
            <div className="flex-1 w-[45rem] grid grid-cols-2 gap-6 p-8 bg-gradient-to-br from-black via-neutral-900 to-neutral-800">
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
                    Domestic: <span className="text-neutral-100">{card.rewards.domestic_spends}</span>
                  </span>
                  <span className="text-neutral-400 text-xs">
                    International: <span className="text-neutral-100">{card.rewards.international_spends}</span>
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
              <div className="col-span-2 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Plane className="w-4 h-4 text-neutral-500" />
                  <span className="text-neutral-200 font-semibold text-sm">Features</span>
                </div>
                <ul className="flex flex-wrap gap-3">
                  {card.features.map((f, i) => (
                    <li key={i} className="bg-neutral-800/70 text-neutral-200 text-xs px-3 py-1 rounded-full border border-neutral-700">
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
  );
}
