import React, { useState } from 'react';
import { Users, Sliders, Volume2, Download, Copy, Check, Shield, Sparkles, Heart } from 'lucide-react';

export default function CaregiverProfile() {
  const [profileName, setProfileName] = useState("Mom's Accessibility Profile");
  const [visionMode, setVisionMode] = useState("high-contrast"); // standard, large, high-contrast, sepia
  const [speechSpeed, setSpeechSpeed] = useState(0.85);
  const [autoNarrate, setAutoNarrate] = useState(true);
  const [readingRuler, setReadingRuler] = useState(false);
  const [scamFilter, setScamFilter] = useState(true);
  const [copied, setCopied] = useState(false);

  const getProfileJSON = () => {
    return JSON.stringify({
      profileName,
      visionMode,
      speechSpeed,
      autoNarrate,
      readingRuler,
      scamFilter,
      timestamp: new Date().toISOString()
    }, null, 2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getProfileJSON());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([getProfileJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `silverassist-profile-${profileName.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-8 rounded-3xl shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 bg-blue-500/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">
          <Heart className="w-3.5 h-3.5 text-rose-300" />
          Caregiver & Family Support Hub
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Personalized Senior Profile Builder
        </h1>
        <p className="text-blue-100 text-base sm:text-lg">
          Configure visual comfort, speech speed, and assistance settings for your elderly parents, grandparents, or clients. Export or sync this profile directly with the SilverAssist browser extension.
        </p>
      </div>

      {/* Main Settings Form */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        
        {/* Profile Name */}
        <div className="space-y-2">
          <label className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
            Profile Label / Loved One's Name:
          </label>
          <input
            type="text"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            className="w-full text-lg font-bold p-3.5 border-2 border-slate-300 rounded-xl focus:border-blue-600 outline-none bg-slate-50 focus:bg-white transition"
          />
        </div>

        {/* Vision & Condition Preset */}
        <div className="space-y-4">
          <label className="text-sm font-extrabold text-slate-800 uppercase tracking-wide block">
            Vision & Cognitive Profile:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => { setVisionMode('standard-large'); setReadingRuler(false); }}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition ${
                visionMode === 'standard-large' ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-2xl mb-2">👵</div>
              <h4 className="font-extrabold text-slate-900 text-base">Senior Mild Zoom (130%)</h4>
              <p className="text-xs text-slate-600 mt-1">Slightly larger fonts, friendly line-spacing, simplified menus.</p>
            </div>

            <div
              onClick={() => { setVisionMode('high-contrast'); setReadingRuler(true); }}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition ${
                visionMode === 'high-contrast' ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-2xl mb-2">🕶️</div>
              <h4 className="font-extrabold text-slate-900 text-base">Low Vision / Cataracts</h4>
              <p className="text-xs text-slate-600 mt-1">Yellow-on-black contrast, 175% text, glowing cursor guide.</p>
            </div>

            <div
              onClick={() => { setVisionMode('sepia'); setReadingRuler(false); }}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition ${
                visionMode === 'sepia' ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-2xl mb-2">☀️</div>
              <h4 className="font-extrabold text-slate-900 text-base">Glare-Free Sepia Tone</h4>
              <p className="text-xs text-slate-600 mt-1">Gentle paper-like background that prevents eye fatigue and migraines.</p>
            </div>

            <div
              onClick={() => { setVisionMode('dyslexia'); setReadingRuler(true); }}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition ${
                visionMode === 'dyslexia' ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="text-2xl mb-2">📖</div>
              <h4 className="font-extrabold text-slate-900 text-base">Dyslexia & Line-Tracking</h4>
              <p className="text-xs text-slate-600 mt-1">Includes active horizontal Reading Ruler that follows the cursor.</p>
            </div>
          </div>
        </div>

        {/* Speech & Cadence Slider */}
        <div className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <label className="text-sm font-extrabold text-slate-800 uppercase tracking-wide">
              Speech Reading Speed (Voice Cadence):
            </label>
            <span className="text-base font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
              {speechSpeed}x {speechSpeed <= 0.85 ? '(Senior Recommended)' : ''}
            </span>
          </div>
          <input
            type="range"
            min="0.6"
            max="1.2"
            step="0.05"
            value={speechSpeed}
            onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <p className="text-xs text-slate-500">
            A slower 0.8x-0.85x speed ensures seniors have ample time to process form instructions without panic.
          </p>
        </div>

        {/* Feature Checkboxes */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={autoNarrate}
              onChange={(e) => setAutoNarrate(e.target.checked)}
              className="w-5 h-5 rounded text-blue-600 accent-blue-600"
            />
            <span className="text-sm font-bold text-slate-800">
              Automatically speak questions out loud when entering a new form step
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={readingRuler}
              onChange={(e) => setReadingRuler(e.target.checked)}
              className="w-5 h-5 rounded text-blue-600 accent-blue-600"
            />
            <span className="text-sm font-bold text-slate-800">
              Show yellow Reading Ruler line guide on web pages
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={scamFilter}
              onChange={(e) => setScamFilter(e.target.checked)}
              className="w-5 h-5 rounded text-blue-600 accent-blue-600"
            />
            <span className="text-sm font-bold text-slate-800">
              Active Dark Pattern Shield (detects fake urgency timers & pre-checked subscriptions)
            </span>
          </label>
        </div>

        {/* Export / Sync Actions */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm transition shadow-md shadow-blue-500/20"
            >
              <Download className="w-4 h-4" />
              Download Profile JSON
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-sm border border-slate-300 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Sync Code'}</span>
            </button>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Profile updates apply instantly when imported into the extension.
          </span>
        </div>

      </div>

    </div>
  );
}
