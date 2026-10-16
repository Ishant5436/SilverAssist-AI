import React from 'react';
import { Type, Eye } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  highContrast,
  setHighContrast,
  fontSize,
  setFontSize
}) {
  const toggleFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
    else setFontSize('normal');
  };

  return (
    <header className="bg-white border-b-2 border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
          
          {/* Logo & Simple Title */}
          <button 
            onClick={() => setActiveTab('arena')}
            className="flex items-center gap-3 text-left focus:outline-none"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-700 flex items-center justify-center text-white font-bold text-2xl">
              S
            </div>
            <div>
              <div className="font-extrabold text-2xl text-slate-900 tracking-tight">
                SilverAssist
              </div>
              <p className="text-xs text-slate-500 font-semibold">
                Simple assistance for everyday online forms
              </p>
            </div>
          </button>

          {/* Clean Navigation Links */}
          <nav className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('arena')}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold border-2 transition-colors ${
                activeTab === 'arena'
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
              }`}
            >
              📝 Form Helper
            </button>

            <button
              onClick={() => setActiveTab('glossary')}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold border-2 transition-colors ${
                activeTab === 'glossary'
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
              }`}
            >
              📖 Word Explainer
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold border-2 transition-colors ${
                activeTab === 'profile'
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
              }`}
            >
              👤 My Saved Details
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3.5 py-2 rounded-lg text-sm font-bold border-2 transition-colors ${
                activeTab === 'guide'
                  ? 'bg-blue-700 text-white border-blue-700'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
              }`}
            >
              🧩 Extension Setup
            </button>
          </nav>

          {/* Quick Accessibility Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleFontSize}
              title="Click to make text bigger"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border-2 border-slate-200"
            >
              <Type className="w-4 h-4 text-blue-700" />
              <span>{fontSize === 'normal' ? 'Text: 100%' : fontSize === 'large' ? 'Text: 125%' : 'Text: 150%'}</span>
            </button>

            <button
              onClick={() => setHighContrast(!highContrast)}
              title="Toggle High Contrast for low vision"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold text-xs border-2 transition-colors ${
                highContrast
                  ? 'bg-black text-yellow-300 border-yellow-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>{highContrast ? 'Contrast: ON' : 'Contrast'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
