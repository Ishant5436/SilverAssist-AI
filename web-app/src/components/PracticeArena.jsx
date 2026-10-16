import React, { useState } from 'react';
import { PRACTICE_FORMS } from '../data/mockForms';
import { Volume2, Mic, MicOff, ArrowRight, ArrowLeft, Check, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PracticeArena() {
  const [selectedFormId, setSelectedFormId] = useState(PRACTICE_FORMS[0].id);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const activeForm = PRACTICE_FORMS.find(f => f.id === selectedFormId) || PRACTICE_FORMS[0];
  const totalSteps = activeForm.fields.length;
  const currentField = activeForm.fields[currentStep];

  // Text-To-Speech helper
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // Slower, clear pace for elderly users
    window.speechSynthesis.speak(utterance);
  };

  // Voice dictation
  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Microphone dictation is not available in this browser. You can type in the box below.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setAnswers(prev => ({ ...prev, [currentField.id]: transcript }));
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      const nextIndex = currentStep + 1;
      setCurrentStep(nextIndex);
      const nextField = activeForm.fields[nextIndex];
      speakText(`${nextField.label}. ${nextField.simpleHint}`);
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      speakText("All done! You have completed all questions.");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFormSelect = (id) => {
    setSelectedFormId(id);
    setCurrentStep(0);
    setIsCompleted(false);
    setAnswers({});
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      
      {/* Friendly Introduction */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Easy Form Helper
        </h1>
        <p className="text-slate-600 text-base">
          Filling out online forms can be stressful. We break them down into <strong>one simple question at a time</strong>, with plain language and voice help.
        </p>
      </div>

      {/* Clean Form Selection Tabs */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
          Choose a form to practice:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PRACTICE_FORMS.map(form => (
            <button
              key={form.id}
              onClick={() => handleFormSelect(form.id)}
              className={`p-3.5 rounded-xl border-2 text-left font-bold text-sm transition-colors ${
                selectedFormId === form.id
                  ? 'border-blue-700 bg-blue-50 text-blue-900'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="text-xl mb-1">{form.icon}</div>
              <div>{form.title.split('&')[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Step-by-Step Card */}
      <div className="bg-white border-2 border-slate-300 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        
        {/* Progress Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm font-bold text-slate-600">
            <span>Question {currentStep + 1} of {totalSteps}</span>
            <button
              onClick={() => { setCurrentStep(0); setIsCompleted(false); setAnswers({}); }}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start over</span>
            </button>
          </div>

          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-700 h-full rounded-full transition-all duration-200"
              style={{ width: `${Math.round(((currentStep + 1) / totalSteps) * 100)}%` }}
            />
          </div>
        </div>

        {!isCompleted ? (
          <div className="space-y-6">
            
            {/* The Question */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {currentField.label}
              </h2>
            </div>

            {/* Simple Tip Box */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl space-y-1">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                What this means:
              </div>
              <p className="text-sm sm:text-base text-amber-950">
                {currentField.simpleHint}
              </p>
              {currentField.jargonTip && (
                <p className="text-xs text-amber-800 pt-1">
                  💡 {currentField.jargonTip}
                </p>
              )}
            </div>

            {/* Big, Clean Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500">
                Type your answer below:
              </label>
              <input
                type={currentField.type}
                value={answers[currentField.id] || ''}
                onChange={(e) => setAnswers(prev => ({ ...prev, [currentField.id]: e.target.value }))}
                placeholder={currentField.placeholder}
                className="w-full text-xl sm:text-2xl p-4 border-2 border-slate-400 focus:border-blue-700 rounded-xl outline-none bg-white text-slate-900 font-semibold"
                autoFocus
              />
            </div>

            {/* Audio Helpers */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => speakText(`${currentField.label}. ${currentField.simpleHint}`)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-300"
              >
                <Volume2 className="w-5 h-5 text-blue-700" />
                <span>Read to me</span>
              </button>

              <button
                type="button"
                onClick={toggleListening}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm border transition-colors ${
                  isListening
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5 text-rose-600" /> : <Mic className="w-5 h-5 text-blue-700" />}
                <span>{isListening ? 'Listening...' : 'Speak answer'}</span>
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-base border-2 ${
                  currentStep === 0
                    ? 'opacity-0 pointer-events-none'
                    : 'bg-white border-slate-300 text-slate-700 hover:border-slate-400'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base bg-blue-700 hover:bg-blue-800 text-white"
              >
                <span>{currentStep === totalSteps - 1 ? 'Finish' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
              All done! Great job!
            </h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              You safely completed each question. With the SilverAssist browser extension, this same friendly helper will pop up right on real government and medical websites.
            </p>

            {/* Summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-md mx-auto space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase">Your answers:</div>
              {activeForm.fields.map(f => (
                <div key={f.id} className="flex justify-between text-xs sm:text-sm border-b border-slate-200 py-1">
                  <span className="font-semibold text-slate-600">{f.label}:</span>
                  <span className="font-bold text-slate-900">{answers[f.id] || '(none)'}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setCurrentStep(0); setIsCompleted(false); setAnswers({}); }}
              className="px-6 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 text-sm"
            >
              Try Another Form
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
