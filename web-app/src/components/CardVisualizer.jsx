import React from 'react';

export default function CardVisualizer({ type, onClose }) {
  if (!type) return null;

  return (
    <div className="bg-slate-100 border-2 border-slate-300 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-2">
          <span>🔍</span>
          <span>Where to look on your card or document:</span>
        </h4>
        {onClose && (
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2 py-1 bg-white border border-slate-300 rounded"
          >
            Hide guide
          </button>
        )}
      </div>

      {/* Credit Card Back (CVV) */}
      {type === 'card-cvv' && (
        <div className="space-y-3">
          <div className="max-w-sm mx-auto bg-slate-800 text-white rounded-xl p-4 shadow-md border-2 border-slate-900 space-y-3 font-mono">
            {/* Magnetic Stripe */}
            <div className="bg-black h-8 -mx-4"></div>
            
            {/* Signature Area & CVV */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex-1 bg-slate-200 text-slate-400 text-[10px] px-2 py-1.5 italic font-sans">
                Authorized Signature
              </div>
              <div className="bg-amber-300 text-slate-900 font-extrabold px-3 py-1 text-sm rounded border-2 border-amber-500 animate-pulse">
                123
              </div>
            </div>

            <div className="text-[11px] text-slate-300 font-sans text-center">
              Back of your Credit or Debit Card
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 text-center font-medium">
            👉 Turn your card to the back. Look for the <strong>3 numbers</strong> inside or beside the white signature strip.
          </p>
        </div>
      )}

      {/* Paper Check (Routing Number) */}
      {type === 'check-routing' && (
        <div className="space-y-3">
          <div className="max-w-md mx-auto bg-emerald-50 text-slate-900 rounded-xl p-4 shadow-md border-2 border-emerald-300 space-y-4 font-mono text-xs">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-slate-800">YOUR NAME</div>
                <div className="text-[10px] text-slate-500">123 Main Street</div>
              </div>
              <div className="text-slate-400 font-sans text-[11px]">CHECK # 1001</div>
            </div>

            <div className="border-b border-slate-300 pb-1 flex justify-between items-end font-sans">
              <span className="text-[10px] text-slate-400">PAY TO: _______________________</span>
              <span className="border border-slate-400 px-2 py-0.5">$ ______</span>
            </div>

            {/* Bottom MICR line */}
            <div className="flex items-center gap-2 pt-2 text-xs border-t border-emerald-200">
              <span className="bg-amber-300 text-amber-950 font-black px-2 py-1 rounded border-2 border-amber-500 animate-pulse">
                ⑆ 123456789 ⑆
              </span>
              <span className="text-slate-400">00987654321⑈</span>
              <span className="text-slate-400 ml-auto">1001</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 text-center font-medium">
            👉 Look at the <strong>very bottom-left corner</strong> of your paper check. The first set of <strong>9 digits</strong> between the special bracket symbols is your Routing Number.
          </p>
        </div>
      )}

      {/* Paper Check (Account Number) */}
      {type === 'check-account' && (
        <div className="space-y-3">
          <div className="max-w-md mx-auto bg-emerald-50 text-slate-900 rounded-xl p-4 shadow-md border-2 border-emerald-300 space-y-4 font-mono text-xs">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-slate-800">YOUR NAME</div>
                <div className="text-[10px] text-slate-500">123 Main Street</div>
              </div>
              <div className="text-slate-400 font-sans text-[11px]">CHECK # 1001</div>
            </div>

            <div className="border-b border-slate-300 pb-1 flex justify-between items-end font-sans">
              <span className="text-[10px] text-slate-400">PAY TO: _______________________</span>
              <span className="border border-slate-400 px-2 py-0.5">$ ______</span>
            </div>

            {/* Bottom MICR line */}
            <div className="flex items-center gap-2 pt-2 text-xs border-t border-emerald-200">
              <span className="text-slate-400">⑆ 123456789 ⑆</span>
              <span className="bg-amber-300 text-amber-950 font-black px-2 py-1 rounded border-2 border-amber-500 animate-pulse">
                00987654321⑈
              </span>
              <span className="text-slate-400 ml-auto">1001</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 text-center font-medium">
            👉 Look at the <strong>bottom of your check</strong>, right after the 9-digit routing number. That is your <strong>Bank Account Number</strong>.
          </p>
        </div>
      )}

      {/* Medicare / Health Insurance Card */}
      {type === 'medicare' && (
        <div className="space-y-3">
          <div className="max-w-sm mx-auto bg-white text-slate-900 rounded-xl p-4 shadow-md border-2 border-red-500 space-y-2">
            <div className="flex items-center justify-between border-b-2 border-red-500 pb-1">
              <div className="font-extrabold text-blue-900 text-xs">MEDICARE HEALTH INSURANCE</div>
              <div className="w-4 h-4 rounded-full bg-red-600"></div>
            </div>

            <div className="text-xs pt-1 space-y-1">
              <div className="text-[10px] text-slate-500 uppercase">Name:</div>
              <div className="font-bold text-slate-800">MARTHA E JENKINS</div>
            </div>

            <div className="pt-1 space-y-1">
              <div className="text-[10px] text-slate-500 uppercase">Medicare Number:</div>
              <div className="bg-amber-300 text-amber-950 font-black font-mono text-sm px-2.5 py-1 rounded border-2 border-amber-500 inline-block animate-pulse">
                1EG4-TE5-MK72
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 text-center font-medium">
            👉 Look on the front of your red, white, and blue Medicare card. Your <strong>Medicare Number</strong> is printed directly below your name.
          </p>
        </div>
      )}
    </div>
  );
}
