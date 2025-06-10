'use client'
import React, { useState } from 'react';
import { CreditCard, Gift, Plane, Shield, TrendingUp, User, DollarSign, ExternalLink } from 'lucide-react';

const CreditCardComponent = () => {
    const [isHovered, setIsHovered] = useState(false);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatIncome = (amount) => {
        return `₹${(amount / 100000).toFixed(1)}L`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-neutral-800 py-12 px-4">
            <div
                className={`w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-neutral-800 bg-gradient-to-br from-neutral-900 via-black to-neutral-800 transition-all duration-300 ${isHovered ? 'scale-[1.025] shadow-black/70' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative px-8 py-7 bg-gradient-to-br from-black via-neutral-900 to-neutral-800">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-full blur-2xl opacity-40"></div>
                        <div className="absolute left-0 bottom-0 w-24 h-24 bg-gradient-to-tr from-white/10 via-transparent to-transparent rounded-full blur-2xl opacity-30"></div>
                    </div>
                    <div className="relative flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-extrabold text-white tracking-wide">{cardData.card_name}</h1>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="text-neutral-400 font-medium">{cardData.issuer}</span>
                                <span className="px-3 py-1 bg-neutral-800 text-neutral-300 text-xs rounded-full uppercase tracking-wider border border-neutral-700">{cardData.category}</span>
                            </div>
                        </div>
                        <CreditCard className="w-12 h-12 text-neutral-700" />
                    </div>
                    <div className="grid grid-cols-2 gap-6 mt-8">
                        <div className="bg-neutral-800/80 backdrop-blur-md p-4 rounded-xl border border-neutral-700">
                            <div className="text-neutral-400 text-xs">Joining Fee</div>
                            <div className="text-xl font-bold text-white">{formatCurrency(cardData.joining_fee)}</div>
                        </div>
                        <div className="bg-neutral-800/80 backdrop-blur-md p-4 rounded-xl border border-neutral-700">
                            <div className="text-neutral-400 text-xs">Annual Fee</div>
                            <div className="text-xl font-bold text-white">{formatCurrency(cardData.annual_fee)}</div>
                        </div>
                    </div>
                </div>

                <div className="px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gradient-to-br from-black via-neutral-900 to-neutral-800">
                    {/* Left Column */}
                    <div className="space-y-7">
                        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-inner">
                            <div className="flex items-center gap-3 mb-3">
                                <Gift className="w-6 h-6 text-neutral-500" />
                                <h3 className="text-lg font-semibold text-white">Welcome Benefits</h3>
                            </div>
                            <ul className="space-y-2">
                                {cardData.welcome_benefits.map((benefit, i) => (
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
                                    <span className="text-neutral-100 font-semibold">{cardData.rewards.domestic_spends}</span>
                                </div>
                                <div className="flex justify-between items-center bg-neutral-800/70 rounded-lg px-3 py-2">
                                    <span className="text-neutral-400 text-sm">International Spends</span>
                                    <span className="text-neutral-100 font-semibold">{cardData.rewards.international_spends}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-7">
                        {/* Features */}
                        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-inner">
                            <div className="flex items-center gap-3 mb-3">
                                <Plane className="w-6 h-6 text-neutral-500" />
                                <h3 className="text-lg font-semibold text-white">Key Features</h3>
                            </div>
                            <ul className="space-y-2">
                                {cardData.features.map((feature, i) => (
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
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 bg-neutral-800/70 rounded-lg px-3 py-2">
                                    <User className="w-4 h-4 text-neutral-500" />
                                    <div>
                                        <div className="text-xs text-neutral-400">Age</div>
                                        <div className="text-sm font-semibold text-neutral-100">{cardData.eligibility.min_age}-{cardData.eligibility.max_age} yrs</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-neutral-800/70 rounded-lg px-3 py-2">
                                    <TrendingUp className="w-4 h-4 text-neutral-500" />
                                    <div>
                                        <div className="text-xs text-neutral-400">Credit Score</div>
                                        <div className="text-sm font-semibold text-neutral-100">{cardData.eligibility.credit_score}+</div>
                                    </div>
                                </div>
                                <div className="col-span-2 flex items-center gap-2 bg-neutral-800/70 rounded-lg px-3 py-2">
                                    <DollarSign className="w-4 h-4 text-neutral-500" />
                                    <div>
                                        <div className="text-xs text-neutral-400">Min. Annual Income</div>
                                        <div className="text-sm font-semibold text-neutral-100">{formatIncome(cardData.eligibility.min_income)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Apply Button */}
                <div className="px-8 py-7 bg-neutral-900 border-t border-neutral-800">
                    <button
                        onClick={() => window.open(cardData.apply_url, '_blank')}
                        className="w-full bg-gradient-to-r from-black via-neutral-900 to-neutral-800 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-all hover:from-neutral-800 hover:to-black  hover:bg-white/90 border border-neutral-800 hover:border-neutral-600"
                    >
                        Apply Now
                        <ExternalLink className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreditCardComponent;
