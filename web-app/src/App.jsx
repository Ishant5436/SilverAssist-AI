import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PracticeArena from './components/PracticeArena';
import JargonGlossary from './components/JargonGlossary';
import ExtensionGuide from './components/ExtensionGuide';

export default function App() {
  const [activeTab, setActiveTab] = useState('arena');
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState('normal'); // 'normal', 'large', 'xlarge'

  // Sync body contrast class
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('app-high-contrast');
    } else {
      document.body.classList.remove('app-high-contrast');
    }
  }, [highContrast]);

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
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Clean Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'arena' && <PracticeArena />}
        {activeTab === 'glossary' && <JargonGlossary />}
        {activeTab === 'guide' && <ExtensionGuide />}
      </main>

      {/* Simple, Human Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <div className="font-bold text-slate-800 text-sm">SilverAssist</div>
            <p className="text-xs text-slate-500">
              Making everyday digital forms simple and accessible for everyone.
            </p>
          </div>
          <div className="text-xs text-slate-400">
            Open Source • Free to Use
          </div>
        </div>
      </footer>
    </div>
  );
}
