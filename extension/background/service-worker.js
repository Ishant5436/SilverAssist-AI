/**
 * SilverAssist AI - Background Service Worker (Manifest V3)
 * Handles shortcut keys, installation defaults, and context messaging.
 */

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.storage.sync.set({
      seniorMode: false,
      highContrast: false,
      speechRate: 0.88,
      fontSize: 150,
      autoReadQuestions: true,
      jargonHelp: true
    });
    console.log('SilverAssist AI successfully installed with senior-friendly defaults.');
  }
});

// Handle global keyboard commands
chrome.commands.onCommand.addListener(async (command) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !tab.id) return;

  if (command === 'toggle-assistant') {
    chrome.tabs.sendMessage(tab.id, { action: 'toggle-assistant' });
  } else if (command === 'toggle-form-wizard') {
    chrome.tabs.sendMessage(tab.id, { action: 'toggle-form-wizard' });
  } else if (command === 'read-aloud') {
    chrome.tabs.sendMessage(tab.id, { action: 'read-aloud' });
  }
});
