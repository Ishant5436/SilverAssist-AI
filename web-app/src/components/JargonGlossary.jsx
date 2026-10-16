import React, { useState } from 'react';
import { JARGON_ITEMS } from '../data/jargonDictionary';
import { Search, Volume2, ShieldCheck, HelpCircle, MapPin, Sparkles } from 'lucide-react';

export default function JargonGlossary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Banking & Payments', 'Healthcare', 'Security & Verification', 'Legal & Forms'];

  const filteredItems = JARGON_ITEMS.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.simple.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const speakDefinition = (item) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const text = `${item.term}. In plain English: ${item.simple}. Where to find it: ${item.whereToFind}.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 font-extrabold text-xs px-3 py-1 rounded-full border border-amber-300">
          <Sparkles className="w-3.5 h-3.5" />
          5th-Grade Plain English Explainer
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Web Term & Jargon Translator
        </h1>
        <p className="text-slate-600 text-base sm:text-lg">
          Websites throw around intimidating terms like "CVV", "Routing ABA", "OTP", and "Arbitration". Look up any term here to get an instant, plain-English explanation.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-6 h-6 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Type any confusing word (e.g., CVV, routing number, CAPTCHA, deductible)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-13 pr-4 py-4 text-base sm:text-lg font-semibold border-2 border-slate-300 focus:border-blue-600 rounded-2xl outline-none bg-slate-50 focus:bg-white transition"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border-2 border-slate-200 hover:border-blue-500 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              
              {/* Top Row: Icon + Title + Category */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl p-2 bg-slate-100 rounded-2xl">{item.icon}</span>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
                      {item.term}
                    </h3>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                      {item.category}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => speakDefinition(item)}
                  title="Hear pronunciation and definition"
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition"
                  aria-label={`Read ${item.term} aloud`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Plain English Meaning */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 space-y-1">
                <span className="text-xs font-extrabold text-blue-900 uppercase tracking-wider block">
                  In Plain English:
                </span>
                <p className="text-blue-950 font-bold text-base leading-relaxed">
                  {item.simple}
                </p>
              </div>

              {/* Where to find it */}
              <div className="flex items-start gap-3 text-sm text-slate-700">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">Where to look: </strong>
                  <span>{item.whereToFind}</span>
                </div>
              </div>

              {/* Safety Shield Tip */}
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Scam Protection Tip: </strong>
                  <span>{item.safeTip}</span>
                </div>
              </div>

            </div>

            {/* Quick Practice CTA */}
            <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400 font-medium">
              <span>Verified WCAG AAA Plain Language</span>
              <span className="text-blue-600 font-bold cursor-pointer hover:underline" onClick={() => speakDefinition(item)}>
                🔊 Listen
              </span>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-3">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No matching web terms found</h3>
            <p className="text-sm text-slate-500">Try searching for "CVV", "routing", "captcha", or "pension".</p>
          </div>
        )}
      </div>

    </div>
  );
}
