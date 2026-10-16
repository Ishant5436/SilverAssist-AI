/**
 * SilverAssist AI - Popup Script
 * Coordinates between user settings in popup and the active web page
 */

document.addEventListener('DOMContentLoaded', async () => {
  const fieldsBadge = document.getElementById('fields-badge');
  const statusTitle = document.getElementById('form-status-title');
  const statusDesc = document.getElementById('form-status-desc');
  const btnWizard = document.getElementById('btn-start-wizard');
  const btnReadAloud = document.getElementById('btn-read-aloud');
  const btnPractice = document.getElementById('btn-open-training');

  const toggleZoom = document.getElementById('toggle-zoom');
  const toggleContrast = document.getElementById('toggle-contrast');
  const toggleRuler = document.getElementById('toggle-ruler');

  // Query active tab
  let activeTab = null;
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    activeTab = tabs[0];
  } catch (e) {
    console.error('Error fetching tab:', e);
  }

  if (!activeTab || !activeTab.id) {
    statusTitle.innerText = 'No active webpage';
    statusDesc.innerText = 'Open any website to use SilverAssist.';
    return;
  }

  // Get current status from content script
  try {
    chrome.tabs.sendMessage(activeTab.id, { action: 'get-status' }, (response) => {
      if (chrome.runtime.lastError || !response) {
        fieldsBadge.innerText = 'Ready';
        statusTitle.innerText = 'SilverAssist is Ready';
        statusDesc.innerText = 'Open or refresh your webpage to detect forms.';
        return;
      }

      const count = response.fieldsCount || 0;
      fieldsBadge.innerText = `${count} ${count === 1 ? 'Field' : 'Fields'}`;

      if (count > 0) {
        statusTitle.innerText = `Found ${count} Form Field${count === 1 ? '' : 's'}`;
        statusDesc.innerText = 'Click below to fill this form step-by-step with voice or text.';
      } else {
        statusTitle.innerText = 'No Form Fields Detected';
        statusDesc.innerText = 'You can still use Senior Reader and Voice Narration on this page.';
      }

      // Sync toggle buttons
      if (response.state) {
        setSwitch(toggleZoom, response.state.zoomLevel > 100);
        setSwitch(toggleContrast, response.state.highContrast);
        setSwitch(toggleRuler, response.state.readingRuler);
      }
    });
  } catch (e) {
    console.warn('Cannot communicate with active tab', e);
  }

  // Event handlers
  btnWizard.addEventListener('click', () => {
    if (activeTab) {
      chrome.tabs.sendMessage(activeTab.id, { action: 'toggle-form-wizard' });
      window.close();
    }
  });

  btnReadAloud.addEventListener('click', () => {
    if (activeTab) {
      chrome.tabs.sendMessage(activeTab.id, { action: 'read-aloud' });
      window.close();
    }
  });

  toggleZoom.addEventListener('click', () => {
    if (activeTab) {
      chrome.tabs.sendMessage(activeTab.id, { action: 'toggle-reader' }, (res) => {
        if (res) setSwitch(toggleZoom, res.zoomLevel > 100);
      });
    }
  });

  toggleContrast.addEventListener('click', () => {
    if (activeTab) {
      chrome.tabs.sendMessage(activeTab.id, { action: 'toggle-contrast' }, (res) => {
        if (res) setSwitch(toggleContrast, res.highContrast);
      });
    }
  });

  toggleRuler.addEventListener('click', () => {
    if (activeTab) {
      chrome.tabs.sendMessage(activeTab.id, { action: 'toggle-assistant' });
      window.close();
    }
  });

  btnPractice.addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:5173' });
  });

  function setSwitch(btn, isActive) {
    if (!btn) return;
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    btn.innerText = isActive ? 'ON' : 'OFF';
    btn.classList.toggle('active', !!isActive);
  }
});
