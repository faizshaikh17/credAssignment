'use client'
import React from 'react';
import data from './data/data';
import { Gift, Plane, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


export default function Home() {
  const cardData = data();
  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-neutral-800 py-12 px-4">
      {cardData.map((card) => (

        <div
          key={card.card_id}
          className="flex flex-col md:flex-row items-stretch bg-gradient-to-br from-neutral-900 via-black to-neutral-800 border border-neutral-800 rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-neutral-950/80 group"
        >
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
              src='/Axis-Atlas-1.png.webp'
              alt={card.card_name}
              width={500}
              height={300}
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
      ))}
    </div>
  );
}