import React from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';

export default function ExtensionGuide() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Browser Extension Setup
        </h1>
        <p className="text-slate-600 text-base">
          Add SilverAssist to Google Chrome or Microsoft Edge so it can assist you on any everyday website you visit.
        </p>
      </div>

      {/* 3 Simple Steps */}
      <div className="bg-white border-2 border-slate-300 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-bold text-slate-900">
          How to add SilverAssist to your browser:
        </h2>

        <div className="space-y-5">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center shrink-0 text-sm">
              1
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Open the Extensions screen</h3>
              <p className="text-sm text-slate-600">
                In your Google Chrome or Edge web address bar, type:
              </p>
              <div className="bg-slate-100 px-3 py-1.5 rounded-lg font-mono text-xs font-bold text-slate-800 inline-block border border-slate-300">
                chrome://extensions
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center shrink-0 text-sm">
              2
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Turn on Developer Mode</h3>
              <p className="text-sm text-slate-600">
                In the top right corner of that screen, switch <strong>Developer mode</strong> to <strong>ON</strong>.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center shrink-0 text-sm">
              3
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">Click "Load Unpacked"</h3>
              <p className="text-sm text-slate-600">
                Click the <strong>Load unpacked</strong> button and select the <strong>extension</strong> folder from this project folder.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
          <p className="text-sm font-semibold text-emerald-950">
            A friendly blue "SilverAssist" button will now appear in the bottom-right corner of any form you visit!
          </p>
        </div>
      </div>

      {/* Test Page Launcher */}
      <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 space-y-3">
        <h3 className="font-bold text-slate-900 text-base">
          Test it on a sample portal
        </h3>
        <p className="text-sm text-slate-600">
          Try opening this sample hospital intake form to see the helper in action:
        </p>
        <button
          onClick={() => window.open('../demo-test-pages/medical_appointment.html', '_blank')}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm"
        >
          <span>Open Sample Clinic Form</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
