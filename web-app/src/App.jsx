import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PracticeArena from './components/PracticeArena';
import JargonGlossary from './components/JargonGlossary';
import CaregiverProfile from './components/CaregiverProfile';
import ExtensionGuide from './components/ExtensionGuide';
import { Heart, Sparkles, Shield, Accessibility } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('arena');
  const [theme, setTheme] = useState('normal'); // 'normal', 'high-contrast', 'sepia'
  const [fontSize, setFontSize] = useState('normal'); // 'normal', 'large', 'xlarge'

  // Sync body theme classes
  useEffect(() => {
    document.body.classList.remove('app-high-contrast', 'app-sepia');
    if (theme === 'high-contrast') {
      document.body.classList.add('app-high-contrast');
    } else if (theme === 'sepia') {
      document.body.classList.add('app-sepia');
    }
  }, [theme]);

  // Sync body font size
  useEffect(() => {
    document.body.classList.remove('app-font-large', 'app-font-xlarge');
    if (fontSize === 'large') {
      document.body.classList.add('app-font-large');
    } else if (fontSize === 'xlarge') {
      document.body.classList.add('app-font-xlarge');
    }
  }, [fontSize]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 transition-colors">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        setTheme={setTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

      {/* Main Content View */}
      <main className="flex-1 pb-16">
        {activeTab === 'arena' && <PracticeArena />}
        {activeTab === 'glossary' && <JargonGlossary />}
        {activeTab === 'caregiver' && <CaregiverProfile />}
        {activeTab === 'guide' && <ExtensionGuide />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black">
                SA
              </div>
              <div>
                <div className="font-extrabold text-slate-900 text-base">SilverAssist AI</div>
                <p className="text-xs text-slate-500 font-medium">
                  Bridging the digital divide for elderly users, low-vision individuals, and digital novices.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1.5">
                <Accessibility className="w-4 h-4 text-blue-600" />
                WCAG 2.2 AAA Mindful
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-600" />
                Dark Pattern & Scam Guard
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500" />
                Dignity-First Interaction
              </span>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
