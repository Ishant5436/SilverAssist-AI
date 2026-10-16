import React, { useState, useEffect } from 'react';
import { PRACTICE_FORMS } from '../data/mockForms';
import CardVisualizer from './CardVisualizer';
import { getSavedProfile } from './SavedProfile';
import { Volume2, Mic, MicOff, ArrowRight, ArrowLeft, Check, RotateCcw, Printer, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PracticeArena() {
  const [selectedFormId, setSelectedFormId] = useState(PRACTICE_FORMS[0].id);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showVisualGuide, setShowVisualGuide] = useState(false);
  const [savedData, setSavedData] = useState({});

  const activeForm = PRACTICE_FORMS.find(f => f.id === selectedFormId) || PRACTICE_FORMS[0];
  const totalSteps = activeForm.fields.length;
  const currentField = activeForm.fields[currentStep];

  useEffect(() => {
    setSavedData(getSavedProfile());
  }, []);

  // Text-To-Speech helper
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
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
        speakText(`Got it: ${transcript}`);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleNext = () => {
    setShowVisualGuide(false);
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
    setShowVisualGuide(false);
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFormSelect = (id) => {
    setSelectedFormId(id);
    setCurrentStep(0);
    setIsCompleted(false);
    setShowVisualGuide(false);
    setAnswers({});
  };

  const handlePrint = () => {
    window.print();
  };

  // Check if we have a saved answer for this field
  const savedValueForField = currentField.savedKey ? savedData[currentField.savedKey] : null;

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
              onClick={() => { setCurrentStep(0); setIsCompleted(false); setAnswers({}); setShowVisualGuide(false); }}
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
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl space-y-2">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                What this means:
              </div>
              <p className="text-sm sm:text-base text-amber-950">
                {currentField.simpleHint}
              </p>
              {currentField.jargonTip && (
                <p className="text-xs text-amber-800 pt-0.5">
                  💡 {currentField.jargonTip}
                </p>
              )}

              {/* Visual Guide Toggle Button if applicable */}
              {currentField.visualType && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowVisualGuide(!showVisualGuide)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold text-xs rounded-lg transition"
                  >
                    <span>{showVisualGuide ? '✕ Hide card picture' : '🔍 Show me where this is on my card/check'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Visual Guide Display */}
            {showVisualGuide && currentField.visualType && (
              <CardVisualizer
                type={currentField.visualType}
                onClose={() => setShowVisualGuide(false)}
              />
            )}

            {/* 1-Click Saved Auto-fill Suggestion */}
            {savedValueForField && !answers[currentField.id] && (
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-center justify-between gap-3">
                <div className="text-xs sm:text-sm text-blue-900">
                  <span>Saved in your details: </span>
                  <strong className="font-bold">"{savedValueForField}"</strong>
                </div>
                <button
                  type="button"
                  onClick={() => setAnswers(prev => ({ ...prev, [currentField.id]: savedValueForField }))}
                  className="px-3 py-1.5 bg-blue-700 text-white font-bold text-xs rounded-lg hover:bg-blue-800 shrink-0"
                >
                  Use this answer
                </button>
              </div>
            )}

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
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900">
                All done! Great job!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                You safely completed each question. You can print a clean paper copy of your completed answers to take with you to the clinic or office.
              </p>
            </div>

            {/* Summary Record */}
            <div id="printable-record" className="bg-slate-50 border-2 border-slate-300 rounded-xl p-5 text-left max-w-lg mx-auto space-y-3">
              <div className="border-b pb-2 flex justify-between items-center">
                <span className="font-extrabold text-sm text-slate-800">{activeForm.title}</span>
                <span className="text-xs text-slate-500">Record</span>
              </div>
              {activeForm.fields.map(f => (
                <div key={f.id} className="flex justify-between text-xs sm:text-sm border-b border-slate-200 py-1.5">
                  <span className="font-semibold text-slate-600">{f.label}:</span>
                  <span className="font-bold text-slate-900">{answers[f.id] || '(none)'}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print or Save Paper Copy</span>
              </button>

              <button
                onClick={() => { setCurrentStep(0); setIsCompleted(false); setAnswers({}); setShowVisualGuide(false); }}
                className="px-5 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 text-sm"
              >
                Try Another Form
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
