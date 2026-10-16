import React, { useState } from 'react';
import { JARGON_ITEMS } from '../data/jargonDictionary';
import { Search, Volume2 } from 'lucide-react';

export default function JargonGlossary() {
  const [query, setQuery] = useState('');

  const filtered = JARGON_ITEMS.filter(item =>
    item.term.toLowerCase().includes(query.toLowerCase()) ||
    item.simple.toLowerCase().includes(query.toLowerCase())
  );

  const speak = (item) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const text = `${item.term}. What it means: ${item.simple}. Where to look: ${item.whereToFind}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Word Explainer
        </h1>
        <p className="text-slate-600 text-base">
          Websites use confusing words and abbreviations. Look up what they mean in plain, everyday language.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a word (e.g. CVV, routing number, CAPTCHA)..."
          className="w-full pl-12 pr-4 py-3.5 text-base border-2 border-slate-300 rounded-xl outline-none focus:border-blue-700 bg-white text-slate-900 font-medium"
        />
      </div>

      {/* List of Definitions */}
      <div className="space-y-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border-2 border-slate-200 rounded-xl p-5 space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{item.icon}</span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {item.term}
                </h2>
              </div>
              <button
                onClick={() => speak(item)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300"
              >
                <Volume2 className="w-4 h-4 text-blue-700" />
                <span>Listen</span>
              </button>
            </div>

            <div className="bg-slate-50 border-l-4 border-blue-600 p-3 rounded-r-lg space-y-1">
              <div className="text-xs font-bold text-slate-500 uppercase">What it means:</div>
              <p className="text-sm sm:text-base font-semibold text-slate-800">
                {item.simple}
              </p>
            </div>

            <div className="text-xs sm:text-sm text-slate-600">
              <strong className="text-slate-800">Where to find it: </strong>
              <span>{item.whereToFind}</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 text-sm">
            No terms found matching "{query}". Try searching for CVV, routing, or OTP.
          </div>
        )}
      </div>

    </div>
  );
}
