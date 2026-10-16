import React, { useState } from 'react';
import { PRACTICE_FORMS } from '../data/mockForms';
import { 
  Volume2, 
  Mic, 
  MicOff, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle, 
  Sparkles,
  RefreshCw,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PracticeArena() {
  const [selectedFormId, setSelectedFormId] = useState(PRACTICE_FORMS[0].id);
  const [mode, setMode] = useState('silver'); // 'silver' (Guided) or 'frustrating' (Raw Website)
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const activeForm = PRACTICE_FORMS.find(f => f.id === selectedFormId) || PRACTICE_FORMS[0];
  const totalSteps = activeForm.fields.length;
  const currentField = activeForm.fields[currentStep];

  // Text-To-Speech
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Speech-To-Text Dictation
  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition isn't supported in this browser version. You can type your answer in the box.");
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
        handleInputChange(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch (e) {
      console.warn(e);
      setIsListening(false);
    }
  };

  const handleInputChange = (val) => {
    setAnswers(prev => ({
      ...prev,
      [currentField.id]: val
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      const nextField = activeForm.fields[nextStepIndex];
      speakText(`${nextField.label}. ${nextField.simpleHint}`);
    } else {
      // Completed!
      setIsCompleted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      speakText("Wonderful job! You have safely completed all questions in this form.");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsCompleted(false);
    setAnswers({});
  };

  const handleScenarioChange = (formId) => {
    setSelectedFormId(formId);
    setCurrentStep(0);
    setIsCompleted(false);
    setAnswers({});
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Hero Introduction */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-blue-500/30 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Interactive Training Sandbox
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Stress-Free Form Practice Arena
          </h1>
          <p className="text-slate-300 text-base sm:text-lg">
            Everyday websites make forms terrifying with tiny text and confusing bank jargon. Practice real doctor, pension, and delivery forms here with voice and plain-English guidance.
          </p>
        </div>
      </div>

      {/* Scenario Selector & Mode Toggle Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Scenario Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mr-1">Scenario:</span>
          {PRACTICE_FORMS.map(form => (
            <button
              key={form.id}
              onClick={() => handleScenarioChange(form.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                selectedFormId === form.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{form.icon}</span>
              <span>{form.title.split('&')[0]}</span>
            </button>
          ))}
        </div>

        {/* View Mode Switcher (Problem vs Solution) */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => setMode('frustrating')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              mode === 'frustrating'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Typical Confusing Form
          </button>
          <button
            onClick={() => setMode('silver')}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              mode === 'silver'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            SilverAssist AI Guided
          </button>
        </div>
      </div>

      {/* --- MODE 1: Typical Confusing Website View (Demonstrating the Pain Point) --- */}
      {mode === 'frustrating' && (
        <div className="bg-white border-2 border-slate-300 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-extrabold text-rose-900 text-sm">Why Everyday Websites Fail Seniors:</h3>
              <p className="text-xs text-rose-700 mt-1">
                Notice the tiny 11px gray fonts, cramped inputs, confusing acronyms (CVV, ABA, Co-pay), hidden subscription boxes, and stressful urgency timers. Switch back to <strong>SilverAssist AI Guided</strong> mode above to experience how we solve this!
              </p>
            </div>
          </div>

          <div className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-2">
            <Flame className="w-4 h-4" />
            Session expires in 04:32 min. Unsaved telemetry data will be lost.
          </div>

          <div className="space-y-4 max-w-xl opacity-90">
            <h2 className="text-base font-bold text-slate-800 border-b pb-2">{activeForm.title} - Standard Web View</h2>
            {activeForm.fields.map(field => (
              <div key={field.id} className="space-y-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                  {field.label} <span className="text-rose-500">*</span>
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  disabled
                  className="w-full text-xs p-2 border border-slate-300 rounded bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>
            ))}
            <div className="text-[11px] text-slate-400">
              By continuing you agree to section 48.b regarding automated subrogation and disclosure clauses.
            </div>
          </div>
        </div>
      )}

      {/* --- MODE 2: SilverAssist AI Guided Walkthrough (The Solution) --- */}
      {mode === 'silver' && (
        <div className="bg-white border-4 border-blue-600 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* Header & Step Tracker */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-900 font-extrabold text-sm sm:text-base px-4 py-1.5 rounded-full">
                <span>Field {currentStep + 1} of {totalSteps}</span>
              </div>
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-800 transition"
              >
                <RefreshCw className="w-4 h-4" />
                Start Over
              </button>
            </div>

            {/* Big Visual Progress Bar */}
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${Math.round(((currentStep + 1) / totalSteps) * 100)}%` }}
              />
            </div>
          </div>

          {!isCompleted ? (
            <div className="space-y-6">
              
              {/* Question Title in Extra Large Print */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  {currentField.label}
                </h2>
              </div>

              {/* Friendly Plain-English Guidance Card */}
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 flex items-start gap-4">
                <span className="text-3xl">💡</span>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-emerald-900 text-base sm:text-lg">Simple Explanation:</h4>
                  <p className="text-emerald-800 text-sm sm:text-base leading-relaxed">
                    {currentField.simpleHint}
                  </p>
                  {currentField.jargonTip && (
                    <p className="text-xs sm:text-sm text-emerald-700 font-medium pt-1">
                      ℹ️ {currentField.jargonTip}
                    </p>
                  )}
                </div>
              </div>

              {/* Extra-Large Friendly Input Field */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-600">
                  Type your answer below, or press the "Speak Answer" button:
                </label>
                <input
                  type={currentField.type}
                  value={answers[currentField.id] || ''}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentField.placeholder}
                  className="w-full p-4 sm:p-5 text-xl sm:text-2xl font-bold border-4 border-slate-300 focus:border-blue-600 rounded-2xl outline-none transition bg-slate-50 focus:bg-white text-slate-900 shadow-inner"
                  autoFocus
                />
              </div>

              {/* Audio Controls: Hear Question + Speak Answer */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => speakText(`${currentField.label}. ${currentField.simpleHint}`)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-sm sm:text-base border border-slate-300 transition"
                >
                  <Volume2 className="w-5 h-5 text-blue-600" />
                  <span>Hear Question Aloud</span>
                </button>

                <button
                  type="button"
                  onClick={toggleListening}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-sm sm:text-base transition border shadow-sm ${
                    isListening
                      ? 'bg-rose-100 text-rose-700 border-rose-400 animate-pulse'
                      : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
                  }`}
                >
                  {isListening ? <MicOff className="w-5 h-5 text-rose-600" /> : <Mic className="w-5 h-5 text-indigo-600" />}
                  <span>{isListening ? 'Listening... Speak Now' : 'Speak Answer with Voice'}</span>
                </button>
              </div>

              {/* Navigation Buttons (Back & Next Step) */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-extrabold text-base transition ${
                    currentStep === 0
                      ? 'opacity-0 pointer-events-none'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl font-extrabold text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 transition transform hover:-translate-y-0.5"
                >
                  <span>{currentStep === totalSteps - 1 ? 'Finish & Check Form' : 'Next Question'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

            </div>
          ) : (
            /* Celebration Screen */
            <div className="text-center py-10 space-y-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-extrabold text-slate-900">
                  🎉 Fantastic Job! Form Complete!
                </h3>
                <p className="text-slate-600 max-w-md mx-auto text-base">
                  You successfully navigated each question with zero stress. In a real website, SilverAssist transfers these answers directly into the website's form for you!
                </p>
              </div>

              {/* Summary of entered answers */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-lg mx-auto text-left space-y-3">
                <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">Your Completed Summary:</h4>
                {activeForm.fields.map(f => (
                  <div key={f.id} className="flex justify-between border-b border-slate-200/60 pb-2 text-sm">
                    <span className="font-bold text-slate-600">{f.label}:</span>
                    <span className="text-slate-900 font-semibold">{answers[f.id] || '(Left blank)'}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-extrabold hover:bg-blue-700 transition"
                >
                  Practice Another Form
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
