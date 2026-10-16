import React from 'react';
import { Sparkles, Eye, Volume2, Type, Sun, Moon, Shield } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  theme,
  setTheme,
  fontSize,
  setFontSize
}) {
  const toggleTheme = () => {
    if (theme === 'normal') setTheme('high-contrast');
    else if (theme === 'high-contrast') setTheme('sepia');
    else setTheme('normal');
  };

  const cycleFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
    else setFontSize('normal');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setActiveTab('arena')}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Sparkles className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">SilverAssist</span>
                <span className="bg-amber-100 text-amber-900 font-bold text-xs px-2 py-0.5 rounded-full border border-amber-300">AI Accessibility</span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Easy Web Navigation & Form Companion</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab('arena')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'arena'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              🎓 Practice Arena
            </button>
            <button
              onClick={() => setActiveTab('glossary')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'glossary'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              📖 Plain English Translator
            </button>
            <button
              onClick={() => setActiveTab('caregiver')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'caregiver'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              👨‍👩‍👧 Caregiver Settings
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'guide'
                  ? 'bg-white text-blue-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              🧩 Extension Guide
            </button>
          </nav>

          {/* Accessibility Quick Tools */}
          <div className="flex items-center gap-2">
            {/* Font Size Toggle */}
            <button
              onClick={cycleFontSize}
              title="Change Text Size"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm border border-slate-200 transition"
              aria-label="Toggle Font Size"
            >
              <Type className="w-4 h-4 text-blue-600" />
              <span>
                {fontSize === 'normal' ? 'Size: 100%' : fontSize === 'large' ? 'Size: 125%' : 'Size: 150%'}
              </span>
            </button>

            {/* High Contrast / Theme Toggle */}
            <button
              onClick={toggleTheme}
              title="Toggle Contrast Mode (Normal / High-Contrast Yellow-Black / Sepia)"
              className={`p-2.5 rounded-xl font-bold transition border ${
                theme === 'high-contrast'
                  ? 'bg-black text-yellow-300 border-yellow-300 shadow-md'
                  : theme === 'sepia'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
              aria-label="Toggle Color Theme"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
