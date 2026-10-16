/**
 * SilverAssist AI - Options & Caregiver Settings Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const speechRateInput = document.getElementById('speech-rate');
  const rateValue = document.getElementById('rate-value');
  const autoSpeakInput = document.getElementById('auto-speak');
  const audioChimesInput = document.getElementById('audio-chimes');
  const fontSizeInput = document.getElementById('font-size');
  const readingRulerInput = document.getElementById('show-reading-ruler');
  const scamShieldInput = document.getElementById('scam-shield');
  const btnSave = document.getElementById('btn-save');
  const saveToast = document.getElementById('save-status');

  const presetBoxes = document.querySelectorAll('.preset-box');

  // Load saved preferences
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.get({
      speechRate: 0.85,
      autoSpeak: true,
      audioChimes: true,
      fontSize: 150,
      showReadingRuler: false,
      scamShield: true,
      preset: 'senior'
    }, (data) => {
      speechRateInput.value = data.speechRate;
      updateRateLabel(data.speechRate);
      autoSpeakInput.checked = data.autoSpeak;
      audioChimesInput.checked = data.audioChimes;
      fontSizeInput.value = data.fontSize;
      readingRulerInput.checked = data.showReadingRuler;
      scamShieldInput.checked = data.scamShield;

      selectPreset(data.preset);
    });
  }

  // Preset Selection
  presetBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const preset = box.dataset.preset;
      selectPreset(preset);
      applyPresetValues(preset);
    });
  });

  function selectPreset(presetName) {
    presetBoxes.forEach(b => {
      b.classList.toggle('active', b.dataset.preset === presetName);
    });
  }

  function applyPresetValues(preset) {
    if (preset === 'senior') {
      fontSizeInput.value = '150';
      speechRateInput.value = '0.85';
      readingRulerInput.checked = false;
      scamShieldInput.checked = true;
    } else if (preset === 'low-vision') {
      fontSizeInput.value = '175';
      speechRateInput.value = '0.80';
      readingRulerInput.checked = true;
      scamShieldInput.checked = true;
    } else if (preset === 'dyslexia') {
      fontSizeInput.value = '130';
      speechRateInput.value = '0.90';
      readingRulerInput.checked = true;
    } else if (preset === 'novice') {
      fontSizeInput.value = '130';
      speechRateInput.value = '0.85';
      scamShieldInput.checked = true;
    }
    updateRateLabel(speechRateInput.value);
  }

  speechRateInput.addEventListener('input', (e) => {
    updateRateLabel(e.target.value);
  });

  function updateRateLabel(val) {
    let desc = 'Calm & Clear';
    if (val < 0.75) desc = 'Very Slow (Gentle)';
    else if (val > 1.0) desc = 'Fast';
    rateValue.innerText = `${val}x (${desc})`;
  }

  btnSave.addEventListener('click', () => {
    const activeBox = document.querySelector('.preset-box.active');
    const selectedPreset = activeBox ? activeBox.dataset.preset : 'senior';

    const settings = {
      speechRate: parseFloat(speechRateInput.value),
      autoSpeak: autoSpeakInput.checked,
      audioChimes: audioChimesInput.checked,
      fontSize: parseInt(fontSizeInput.value),
      showReadingRuler: readingRulerInput.checked,
      scamShield: scamShieldInput.checked,
      preset: selectedPreset
    };

    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.set(settings, () => {
        showSaved();
      });
    } else {
      showSaved();
    }
  });

  function showSaved() {
    saveToast.style.display = 'inline';
    setTimeout(() => {
      saveToast.style.display = 'none';
    }, 2500);
  }
});
