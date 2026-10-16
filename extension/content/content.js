/**
 * SilverAssist AI - Content Script
 * Injected on web pages to provide high-accessibility overlays,
 * step-by-step form walkthroughs, voice input/output, and readability enhancements.
 */

(function () {
  // Prevent duplicate injection
  if (window.__SILVER_ASSIST_LOADED__) return;
  window.__SILVER_ASSIST_LOADED__ = true;

  // State management
  const state = {
    highContrast: false,
    sepia: false,
    dyslexicFont: false,
    zoomLevel: 100, // 100, 130, 150, 175
    readingRuler: false,
    bigCursor: false,
    ttsEnabled: false,
    formElements: [],
    currentFormStep: 0,
    isWizardOpen: false,
    speechRecognition: null,
    isListening: false
  };

  // Web Audio Chimes for Friendly Feedback
  const AudioChimes = {
    ctx: null,
    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
    },
    playTone(frequency, type, duration, delay = 0) {
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime + delay;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(frequency, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.15, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + duration + 0.05);
      } catch (e) {
        // Audio policy or unsupported
      }
    },
    step() {
      this.playTone(523.25, 'sine', 0.12, 0); // C5
      this.playTone(659.25, 'sine', 0.15, 0.08); // E5
    },
    success() {
      this.playTone(523.25, 'triangle', 0.1, 0);
      this.playTone(659.25, 'triangle', 0.1, 0.08);
      this.playTone(783.99, 'triangle', 0.25, 0.16); // G5
    },
    alert() {
      this.playTone(392.0, 'sawtooth', 0.18, 0);
      this.playTone(329.63, 'sawtooth', 0.22, 0.15);
    }
  };

  // Text-To-Speech Narrator
  function speakText(text, onEnd) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88; // Slower, clearer cadence for seniors
    utterance.pitch = 1.0;

    // Pick best English voice if available
    const voices = window.speechSynthesis.getVoices();
    const friendlyVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (friendlyVoice) utterance.voice = friendlyVoice;

    if (onEnd) utterance.onend = onEnd;
    window.speechSynthesis.speak(utterance);
  }

  // --- UI Creation ---

  function createLauncher() {
    const launcher = document.createElement('div');
    launcher.id = 'silver-assist-launcher';
    launcher.setAttribute('role', 'button');
    launcher.setAttribute('aria-label', 'Open SilverAssist Accessibility Companion');
    launcher.tabIndex = 0;

    launcher.innerHTML = `
      <span style="font-size: 24px;">🦻</span>
      <span>SilverAssist</span>
      <span class="silver-badge" id="silver-form-badge">0 Fields</span>
    `;

    launcher.addEventListener('click', toggleHub);
    launcher.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleHub();
      }
    });

    document.body.appendChild(launcher);
    updateFormBadge();
  }

  function createReadingRuler() {
    const ruler = document.createElement('div');
    ruler.id = 'silver-reading-ruler';
    document.body.appendChild(ruler);

    document.addEventListener('mousemove', (e) => {
      if (state.readingRuler) {
        ruler.style.top = `${e.clientY - 24}px`;
      }
    });
  }

  function createHubModal() {
    const overlay = document.createElement('div');
    overlay.id = 'silver-assist-hub-overlay';

    overlay.innerHTML = `
      <div id="silver-assist-hub-modal" role="dialog" aria-modal="true" aria-labelledby="silver-hub-heading">
        <div class="silver-hub-header">
          <div class="silver-hub-title" id="silver-hub-heading">
            <span style="font-size: 32px;">🌟</span>
            <span>SilverAssist Accessibility Hub</span>
          </div>
          <button class="silver-close-btn" id="silver-hub-close" title="Close" aria-label="Close Assistant">✕</button>
        </div>

        <div id="silver-safety-container"></div>

        <div class="silver-action-grid">
          <!-- Form Wizard Step-by-Step -->
          <div class="silver-card-btn" id="silver-card-wizard" role="button" tabindex="0">
            <div class="silver-card-icon">📝</div>
            <div>
              <div class="silver-card-title">Step-by-Step Form Helper</div>
              <div class="silver-card-desc">Converts messy forms on this page into one simple, large-print question at a time.</div>
            </div>
          </div>

          <!-- Senior Reading View -->
          <div class="silver-card-btn" id="silver-card-reader" role="button" tabindex="0">
            <div class="silver-card-icon">👓</div>
            <div>
              <div class="silver-card-title">Senior Large-Print View</div>
              <div class="silver-card-desc">Enlarges fonts to 150%, expands line spacing, and removes visual strain.</div>
            </div>
          </div>

          <!-- High Contrast Mode -->
          <div class="silver-card-btn" id="silver-card-contrast" role="button" tabindex="0">
            <div class="silver-card-icon">🎨</div>
            <div>
              <div class="silver-card-title">High Contrast (Yellow / Black)</div>
              <div class="silver-card-desc">Maximum legibility mode for cataracts, low vision, and macular clarity.</div>
            </div>
          </div>

          <!-- Reading Guide & Big Cursor -->
          <div class="silver-card-btn" id="silver-card-ruler" role="button" tabindex="0">
            <div class="silver-card-icon">📏</div>
            <div>
              <div class="silver-card-title">Reading Ruler & Big Pointer</div>
              <div class="silver-card-desc">Follows your eyes line-by-line so you never lose your place while reading.</div>
            </div>
          </div>

          <!-- Voice Reading (TTS) -->
          <div class="silver-card-btn" id="silver-card-speak" role="button" tabindex="0">
            <div class="silver-card-icon">🔊</div>
            <div>
              <div class="silver-card-title">Read Webpage Aloud</div>
              <div class="silver-card-desc">Reads main articles, notices, or instructions in a calm, clear voice.</div>
            </div>
          </div>

          <!-- Open Companion Training App -->
          <div class="silver-card-btn" id="silver-card-practice" role="button" tabindex="0">
            <div class="silver-card-icon">🎓</div>
            <div>
              <div class="silver-card-title">Practice Arena & Training</div>
              <div class="silver-card-desc">Practice medical, banking, and government forms safely with zero stress.</div>
            </div>
          </div>
        </div>

        <div style="font-size: 15px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 12px;">
          Tip: You can press <strong>Alt + Shift + S</strong> anytime to open this helper.
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Event listeners
    document.getElementById('silver-hub-close').addEventListener('click', toggleHub);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) toggleHub();
    });

    document.getElementById('silver-card-wizard').addEventListener('click', () => {
      toggleHub();
      startFormWizard();
    });

    document.getElementById('silver-card-reader').addEventListener('click', () => {
      toggleZoom();
      updateHubStateVisuals();
    });

    document.getElementById('silver-card-contrast').addEventListener('click', () => {
      toggleContrast();
      updateHubStateVisuals();
    });

    document.getElementById('silver-card-ruler').addEventListener('click', () => {
      toggleRuler();
      updateHubStateVisuals();
    });

    document.getElementById('silver-card-speak').addEventListener('click', () => {
      readPageContent();
      toggleHub();
    });

    document.getElementById('silver-card-practice').addEventListener('click', () => {
      // Directs to companion web app
      window.open('http://localhost:5173', '_blank');
    });
  }

  function createWizardModal() {
    const overlay = document.createElement('div');
    overlay.id = 'silver-wizard-overlay';

    overlay.innerHTML = `
      <div id="silver-wizard-modal" role="dialog" aria-modal="true" aria-labelledby="silver-step-title">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div class="silver-wizard-step-badge" id="silver-step-counter">
            <span>Step 1 of 1</span>
          </div>
          <button class="silver-close-btn" id="silver-wizard-close" title="Exit Form Helper" aria-label="Exit Form Helper">✕</button>
        </div>

        <div class="silver-wizard-progress-bar">
          <div class="silver-wizard-progress-fill" id="silver-progress-bar"></div>
        </div>

        <div id="silver-step-title" class="silver-wizard-field-title">Question Title</div>

        <!-- Plain English Guidance Box -->
        <div class="silver-wizard-explainer-box" id="silver-explainer-box">
          <div id="silver-explainer-icon" style="font-size: 32px;">💡</div>
          <div class="silver-wizard-explainer-text" id="silver-explainer-text">
            <strong>Simple Explanation:</strong>
            <span>Instructions will appear here.</span>
          </div>
        </div>

        <!-- Big Input Container -->
        <div class="silver-wizard-input-container" id="silver-input-container">
          <!-- Dynamically populated -->
        </div>

        <!-- Controls: Voice Dictation + TTS Audio + Navigation -->
        <div class="silver-wizard-actions">
          <div style="display: flex; gap: 8px;">
            <button class="silver-btn-voice" id="silver-btn-listen" title="Click to speak your answer with your voice">
              <span>🎙️</span>
              <span id="silver-voice-label">Speak Answer</span>
            </button>
            <button class="silver-btn-voice" id="silver-btn-hear" title="Listen to question instructions">
              <span>🔊</span>
              <span>Hear Question</span>
            </button>
          </div>

          <div class="silver-nav-buttons">
            <button class="silver-btn-nav silver-btn-prev" id="silver-wizard-prev">← Back</button>
            <button class="silver-btn-nav silver-btn-next" id="silver-wizard-next">Next Step →</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('silver-wizard-close').addEventListener('click', closeWizard);
    document.getElementById('silver-wizard-prev').addEventListener('click', prevStep);
    document.getElementById('silver-wizard-next').addEventListener('click', nextStep);

    document.getElementById('silver-btn-hear').addEventListener('click', () => {
      const title = document.getElementById('silver-step-title').innerText;
      const explainer = document.getElementById('silver-explainer-text').innerText;
      speakText(`${title}. ${explainer}`);
    });

    document.getElementById('silver-btn-listen').addEventListener('click', toggleVoiceDictation);
  }

  // --- Hub & Accessibility Toggles ---

  function toggleHub() {
    const overlay = document.getElementById('silver-assist-hub-overlay');
    const isShowing = overlay.style.display === 'flex';
    if (isShowing) {
      overlay.style.display = 'none';
    } else {
      overlay.style.display = 'flex';
      checkSafetyWarnings();
      updateHubStateVisuals();
    }
  }

  function updateHubStateVisuals() {
    const contrastCard = document.getElementById('silver-card-contrast');
    const readerCard = document.getElementById('silver-card-reader');
    const rulerCard = document.getElementById('silver-card-ruler');

    if (contrastCard) contrastCard.classList.toggle('active', state.highContrast);
    if (readerCard) readerCard.classList.toggle('active', state.zoomLevel > 100);
    if (rulerCard) rulerCard.classList.toggle('active', state.readingRuler);
  }

  function checkSafetyWarnings() {
    const container = document.getElementById('silver-safety-container');
    if (!container || !window.SilverExplainer) return;

    const warnings = window.SilverExplainer.inspectPageSafety();
    if (warnings.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = warnings.map(w => `
      <div class="silver-safety-banner">
        <span style="font-size: 26px;">⚠️</span>
        <div>
          <strong>${w.title}</strong>
          <div>${w.message}</div>
        </div>
      </div>
    `).join('');
  }

  function toggleContrast() {
    state.highContrast = !state.highContrast;
    document.body.classList.toggle('silver-theme-high-contrast', state.highContrast);
    AudioChimes.step();
  }

  function toggleZoom() {
    if (state.zoomLevel === 100) {
      state.zoomLevel = 150;
      document.body.classList.add('silver-zoom-150');
    } else {
      state.zoomLevel = 100;
      document.body.classList.remove('silver-zoom-130', 'silver-zoom-150', 'silver-zoom-175');
    }
    AudioChimes.step();
  }

  function toggleRuler() {
    state.readingRuler = !state.readingRuler;
    state.bigCursor = state.readingRuler;
    const ruler = document.getElementById('silver-reading-ruler');
    if (ruler) ruler.style.display = state.readingRuler ? 'block' : 'none';
    document.body.classList.toggle('silver-big-cursor', state.bigCursor);
    AudioChimes.step();
  }

  function readPageContent() {
    // Collect text from headings, paragraphs, and articles
    const mainContent = document.querySelector('main, article, [role="main"]') || document.body;
    const textPieces = [];
    const elements = mainContent.querySelectorAll('h1, h2, h3, p, li');

    elements.forEach(el => {
      const str = el.innerText.trim();
      if (str.length > 10 && str.length < 500 && !el.closest('#silver-assist-hub-overlay, #silver-wizard-overlay')) {
        textPieces.push(str);
      }
    });

    const fullNarration = textPieces.slice(0, 15).join('. ');
    if (fullNarration) {
      speakText(`Reading page content: ${fullNarration}`);
    } else {
      speakText('No readable article text found on this page.');
    }
  }

  // --- Step-by-Step Form Navigator ---

  function scanForms() {
    const rawElements = Array.from(document.querySelectorAll('input:not([type="hidden"]), select, textarea'));
    // Filter out invisible, disabled, or extension's own elements
    state.formElements = rawElements.filter(el => {
      if (el.closest('#silver-assist-hub-overlay, #silver-wizard-overlay, #silver-assist-launcher')) return false;
      if (el.disabled || el.type === 'submit' || el.type === 'button' || el.type === 'reset') return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).display !== 'none';
    });
    return state.formElements;
  }

  function updateFormBadge() {
    const elements = scanForms();
    const badge = document.getElementById('silver-form-badge');
    if (badge) {
      badge.innerText = `${elements.length} ${elements.length === 1 ? 'Field' : 'Fields'}`;
    }
  }

  function startFormWizard() {
    const elements = scanForms();
    if (elements.length === 0) {
      alert('SilverAssist scanned this page and found no interactive form fields to fill!');
      speakText('No form fields were found on this page.');
      return;
    }

    state.currentFormStep = 0;
    state.isWizardOpen = true;
    document.getElementById('silver-wizard-overlay').style.display = 'flex';
    renderWizardStep();
    AudioChimes.step();
  }

  function closeWizard() {
    state.isWizardOpen = false;
    document.getElementById('silver-wizard-overlay').style.display = 'none';
    // Remove highlight on active page element
    document.querySelectorAll('.silver-field-highlight').forEach(el => el.classList.remove('silver-field-highlight'));
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  function renderWizardStep() {
    const elements = state.formElements;
    const index = state.currentFormStep;
    const targetEl = elements[index];
    if (!targetEl) return;

    // Highlight and scroll to the real element on the website
    document.querySelectorAll('.silver-field-highlight').forEach(el => el.classList.remove('silver-field-highlight'));
    targetEl.classList.add('silver-field-highlight');
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Progress updates
    const total = elements.length;
    const pct = Math.round(((index + 1) / total) * 100);
    document.getElementById('silver-step-counter').innerText = `Field ${index + 1} of ${total}`;
    document.getElementById('silver-progress-bar').style.width = `${pct}%`;

    // Button states
    const prevBtn = document.getElementById('silver-wizard-prev');
    const nextBtn = document.getElementById('silver-wizard-next');
    prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';

    if (index === total - 1) {
      nextBtn.innerText = '✓ Finish Form';
      nextBtn.className = 'silver-btn-nav silver-btn-finish';
    } else {
      nextBtn.innerText = 'Next Step →';
      nextBtn.className = 'silver-btn-nav silver-btn-next';
    }

    // Explanations & Labels
    const explanation = window.SilverExplainer ? window.SilverExplainer.explainField(targetEl) : null;
    const labelText = getFieldLabel(targetEl);

    document.getElementById('silver-step-title').innerText = labelText || (explanation ? explanation.title : `Question ${index + 1}`);

    const explainerIcon = document.getElementById('silver-explainer-icon');
    const explainerText = document.getElementById('silver-explainer-text');

    if (explanation) {
      let visualHtml = '';
      if (explanation.visualHint === 'card-cvv') {
        visualHtml = `<div style="background: #1e293b; color: #fff; padding: 10px 14px; border-radius: 10px; font-size: 13px; margin-top: 8px; font-family: sans-serif; display: flex; align-items: center; gap: 8px;">
          <span>💳 Back of Card:</span>
          <span style="background: #e2e8f0; color: #64748b; padding: 3px 8px; border-radius: 4px; font-size: 11px;">Signature Strip</span>
          <span style="background: #facc15; color: #000; padding: 3px 8px; font-weight: 800; border-radius: 4px; font-family: monospace;">123 (CVV)</span>
        </div>`;
      } else if (explanation.visualHint === 'check-routing') {
        visualHtml = `<div style="background: #ecfdf5; border: 2px solid #059669; color: #064e3b; padding: 10px 14px; border-radius: 10px; font-size: 13px; margin-top: 8px; font-family: monospace;">
          📄 Bottom-left of check: ⑆ <span style="background: #facc15; color: #000; padding: 2px 6px; font-weight: 800; border-radius: 4px;">123456789 (9-digit Routing)</span> ⑆
        </div>`;
      } else if (explanation.visualHint === 'check-account') {
        visualHtml = `<div style="background: #ecfdf5; border: 2px solid #059669; color: #064e3b; padding: 10px 14px; border-radius: 10px; font-size: 13px; margin-top: 8px; font-family: monospace;">
          📄 Bottom of check: ⑆ 123456789 ⑆ <span style="background: #facc15; color: #000; padding: 2px 6px; font-weight: 800; border-radius: 4px;">9876543210 (Account Number)</span>
        </div>`;
      } else if (explanation.visualHint === 'medicare') {
        visualHtml = `<div style="background: #eff6ff; border: 2px solid #2563eb; color: #1e3a8a; padding: 10px 14px; border-radius: 10px; font-size: 13px; margin-top: 8px; font-family: monospace;">
          🪪 Medicare Card: Look under name -> <span style="background: #facc15; color: #000; padding: 2px 6px; font-weight: 800; border-radius: 4px;">1EG4-TE5-MK72 (ID)</span>
        </div>`;
      }

      explainerIcon.innerText = explanation.icon || '💡';
      explainerText.innerHTML = `
        <strong>${explanation.title}</strong>
        <div>${explanation.explanation}</div>
        ${explanation.tip ? `<div style="margin-top: 6px; font-weight: 600; color: #b45309;">💡 Helpful tip: ${explanation.tip}</div>` : ''}
        ${visualHtml}
      `;
    } else {
      explainerIcon.innerText = '📝';
      explainerText.innerHTML = `<strong>Please answer:</strong> <div>Type your answer in the box below.</div>`;
    }

    // Render Input representation
    const inputContainer = document.getElementById('silver-input-container');
    inputContainer.innerHTML = '';

    if (targetEl.tagName.toLowerCase() === 'select') {
      const select = document.createElement('select');
      select.className = 'silver-wizard-input';
      Array.from(targetEl.options).forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.text = opt.text;
        option.selected = opt.selected;
        select.appendChild(option);
      });
      select.addEventListener('change', (e) => {
        targetEl.value = e.target.value;
        targetEl.dispatchEvent(new Event('input', { bubbles: true }));
        targetEl.dispatchEvent(new Event('change', { bubbles: true }));
      });
      inputContainer.appendChild(select);
      select.focus();
    } else if (targetEl.type === 'checkbox') {
      const wrapper = document.createElement('label');
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.gap = '14px';
      wrapper.style.fontSize = '22px';
      wrapper.style.fontWeight = '700';
      wrapper.style.cursor = 'pointer';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.style.width = '32px';
      checkbox.style.height = '32px';
      checkbox.checked = targetEl.checked;
      checkbox.addEventListener('change', (e) => {
        targetEl.checked = e.target.checked;
        targetEl.dispatchEvent(new Event('change', { bubbles: true }));
      });

      wrapper.appendChild(checkbox);
      wrapper.appendChild(document.createTextNode('Check this box to confirm'));
      inputContainer.appendChild(wrapper);
    } else if (targetEl.tagName.toLowerCase() === 'textarea') {
      const textarea = document.createElement('textarea');
      textarea.className = 'silver-wizard-input';
      textarea.rows = 3;
      textarea.value = targetEl.value;
      textarea.placeholder = targetEl.placeholder || 'Type your message or notes here...';
      textarea.addEventListener('input', (e) => {
        targetEl.value = e.target.value;
        targetEl.dispatchEvent(new Event('input', { bubbles: true }));
      });
      inputContainer.appendChild(textarea);
      textarea.focus();
    } else {
      const input = document.createElement('input');
      input.className = 'silver-wizard-input';
      input.type = targetEl.type || 'text';
      input.value = targetEl.value;
      input.placeholder = targetEl.placeholder || 'Type your answer here...';
      input.addEventListener('input', (e) => {
        targetEl.value = e.target.value;
        targetEl.dispatchEvent(new Event('input', { bubbles: true }));
      });
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          nextStep();
        }
      });
      inputContainer.appendChild(input);
      input.focus();
    }

    // Read question automatically on step change if TTS is preferred
    const speakPrompt = `${labelText || 'Next field'}. ${explanation ? explanation.explanation : ''}`;
    speakText(speakPrompt);
  }

  function getFieldLabel(el) {
    if (el.id) {
      const label = document.querySelector(`label[for="${el.id}"]`);
      if (label && label.innerText.trim()) return label.innerText.trim();
    }
    const parentLabel = el.closest('label');
    if (parentLabel && parentLabel.innerText.trim()) return parentLabel.innerText.trim();
    if (el.getAttribute('aria-label')) return el.getAttribute('aria-label');
    if (el.placeholder) return el.placeholder;
    if (el.name) return el.name.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return null;
  }

  function nextStep() {
    if (state.currentFormStep < state.formElements.length - 1) {
      state.currentFormStep++;
      AudioChimes.step();
      renderWizardStep();
    } else {
      // Completed all steps!
      AudioChimes.success();
      speakText('Wonderful job! All form questions are filled in.');
      closeWizard();
      alert('🎉 Fantastic! All fields have been safely populated. You can now review and submit your form whenever you are ready.');
    }
  }

  function prevStep() {
    if (state.currentFormStep > 0) {
      state.currentFormStep--;
      AudioChimes.step();
      renderWizardStep();
    }
  }

  // --- Speech Recognition (Voice Dictation) ---

  function toggleVoiceDictation() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser version. Please type in the box.');
      return;
    }

    const btn = document.getElementById('silver-btn-listen');
    const label = document.getElementById('silver-voice-label');

    if (state.isListening && state.speechRecognition) {
      state.speechRecognition.stop();
      state.isListening = false;
      btn.classList.remove('recording');
      label.innerText = 'Speak Answer';
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      state.speechRecognition = recognition;
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        state.isListening = true;
        btn.classList.add('recording');
        label.innerText = 'Listening... Speak now';
        AudioChimes.playTone(660, 'sine', 0.1);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = document.querySelector('.silver-wizard-input');
        if (input) {
          input.value = transcript;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
        speakText(`Got it: ${transcript}`);
      };

      recognition.onerror = () => {
        state.isListening = false;
        btn.classList.remove('recording');
        label.innerText = 'Speak Answer';
      };

      recognition.onend = () => {
        state.isListening = false;
        btn.classList.remove('recording');
        label.innerText = 'Speak Answer';
      };

      recognition.start();
    } catch (e) {
      console.warn('Speech recognition error:', e);
    }
  }

  // Listen for messages from popup or background shortcuts
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'toggle-assistant') {
        toggleHub();
        sendResponse({ success: true });
      } else if (request.action === 'toggle-form-wizard') {
        startFormWizard();
        sendResponse({ success: true });
      } else if (request.action === 'read-aloud') {
        readPageContent();
        sendResponse({ success: true });
      } else if (request.action === 'toggle-contrast') {
        toggleContrast();
        sendResponse({ highContrast: state.highContrast });
      } else if (request.action === 'toggle-reader') {
        toggleZoom();
        sendResponse({ zoomLevel: state.zoomLevel });
      } else if (request.action === 'get-status') {
        const elements = scanForms();
        sendResponse({
          fieldsCount: elements.length,
          state: state
        });
      }
    });
  }

  // Initialize once DOM is ready
  function init() {
    createLauncher();
    createReadingRuler();
    createHubModal();
    createWizardModal();

    // Re-check forms on dynamic changes (e.g. single page applications)
    const observer = new MutationObserver(() => {
      updateFormBadge();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
