import React from 'react';
import { Globe, Download, ExternalLink, Keyboard, Sparkles, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

export default function ExtensionGuide() {
  const extensionPath = "C:\\Users\\panch\\OneDrive\\Desktop\\CSI HACK\\extension";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Hero */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-8 rounded-3xl shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 bg-blue-500/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">
          <Globe className="w-3.5 h-3.5 text-blue-300" />
          Manifest V3 Browser Extension
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Install SilverAssist on Your Browser
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          Add the SilverAssist companion directly into Google Chrome, Microsoft Edge, or Brave. It automatically activates on any website you visit!
        </p>
      </div>

      {/* Quick Setup Instructions (3 Simple Steps) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900">
          3-Minute Setup Guide (Chrome & Edge)
        </h2>

        <div className="space-y-6">
          
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center shrink-0 text-lg">
              1
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-slate-900 text-base">Open Browser Extension Manager</h3>
              <p className="text-sm text-slate-600">
                In your Google Chrome or Microsoft Edge address bar, type:
              </p>
              <div className="bg-slate-100 p-2.5 rounded-xl font-mono text-sm font-bold text-slate-800 inline-block border border-slate-200">
                chrome://extensions &nbsp; <span className="text-slate-400">or</span> &nbsp; edge://extensions
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center shrink-0 text-lg">
              2
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-slate-900 text-base">Turn on "Developer Mode"</h3>
              <p className="text-sm text-slate-600">
                Look at the top-right corner of the Extensions page and toggle the <strong>Developer mode</strong> switch to <strong>ON</strong>.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center shrink-0 text-lg">
              3
            </div>
            <div className="space-y-2">
              <h3 className="font-extrabold text-slate-900 text-base">Click "Load Unpacked" and Select Folder</h3>
              <p className="text-sm text-slate-600">
                Click the <strong>Load unpacked</strong> button in the top-left, and select the <code className="bg-slate-100 px-2 py-0.5 rounded font-mono text-xs font-bold text-blue-700">extension</code> folder from this project:
              </p>
              <div className="bg-slate-900 text-emerald-400 p-3 rounded-xl font-mono text-xs break-all border border-slate-800">
                {extensionPath}
              </div>
            </div>
          </div>

        </div>

        {/* Success confirmation */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <span className="text-sm font-bold text-emerald-900">
            That's it! The SilverAssist bubble will now appear at the bottom-right of every webpage you visit.
          </span>
        </div>
      </div>

      {/* Live Test Playground */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-xl font-extrabold text-slate-900">
          🧪 Test It Out Right Now
        </h3>
        <p className="text-sm text-slate-600">
          We prepared a realistic sample clinic intake portal filled with messy inputs and confusing terms so you can experience how SilverAssist steps in to help.
        </p>

        <div className="pt-2">
          <button
            onClick={() => window.open('../demo-test-pages/medical_appointment.html', '_blank')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base transition shadow-md shadow-blue-500/20"
          >
            <span>Launch Mock Patient Clinic Portal</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-lg">
          <Keyboard className="w-5 h-5 text-blue-600" />
          <span>Helpful Keyboard Shortcuts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center space-y-1">
            <kbd className="bg-white border border-slate-300 shadow-sm px-2.5 py-1 rounded-lg font-mono font-extrabold text-sm text-slate-800">
              Alt + Shift + S
            </kbd>
            <div className="text-xs font-bold text-slate-600 mt-2">Open Assistant Hub</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center space-y-1">
            <kbd className="bg-white border border-slate-300 shadow-sm px-2.5 py-1 rounded-lg font-mono font-extrabold text-sm text-slate-800">
              Alt + Shift + F
            </kbd>
            <div className="text-xs font-bold text-slate-600 mt-2">Start Form Wizard</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center space-y-1">
            <kbd className="bg-white border border-slate-300 shadow-sm px-2.5 py-1 rounded-lg font-mono font-extrabold text-sm text-slate-800">
              Alt + Shift + R
            </kbd>
            <div className="text-xs font-bold text-slate-600 mt-2">Read Page Aloud</div>
          </div>
        </div>
      </div>

    </div>
  );
}
