# 🌟 SilverAssist AI — Web & Form Accessibility Navigator

> **Empowering elderly users, visually impaired individuals, and people with limited digital literacy to navigate everyday websites and digital forms with dignity, clarity, and zero anxiety.**

[![Manifest V3](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-blue.svg)](https://developer.chrome.com/docs/extensions/mv3/)
[![WCAG 2.2 AAA Mindful](https://img.shields.io/badge/Accessibility-WCAG%202.2%20AAA-brightgreen.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![React 19](https://img.shields.io/badge/Companion%20App-React%2019%20%2B%20Vite-61dafb.svg)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38bdf8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📌 The Real-World Problem

Everyday digital tasks — such as booking a doctor's appointment, claiming a government pension, paying an electric bill, or ordering groceries — have become digital minefields for seniors and people with low digital literacy:

- **Hostile Visual Design:** Tiny 10px-12px gray-on-white text, poor contrast, and sensory overload that overwhelm users suffering from cataracts, glaucoma, or macular degeneration.
- **Intimidating Acronyms & Jargon:** Forms constantly demand *"CVV / CVC"*, *"9-digit ABA Routing Number"*, *"Estimated Specialist Co-Pay"*, *"Billing ZIP"*, *"HIPAA Waiver"*, or *"CAPTCHA"* without explaining what they mean or where to find them.
- **High Anxiety & Fear of Mistakes:** Seniors often fear clicking the wrong button, causing accidental charges, or falling victim to online scams.
- **Deceptive Dark Patterns:** Pre-checked recurring subscription boxes and artificial countdown timers (*"Reservation expires in 5 minutes!"*) cause panic.

---

## 💡 The Solution: SilverAssist AI

**SilverAssist AI** provides a complete, dual-layer solution:

1. **A Manifest V3 Universal Browser Extension** that attaches to **any** everyday website, transforming confusing forms into an easy, voice-guided, step-by-step experience with high-contrast visual aids.
2. **An Interactive Web Companion & Form Training Arena** where seniors can safely practice real-world medical, banking, and utility forms in a zero-stress sandbox, while caregivers customize accessibility preferences for their loved ones.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SilverAssist Architecture                       │
├──────────────────────────────────┬─────────────────────────────────────┤
│  Browser Extension (Manifest V3) │  Web Companion & Training Arena     │
│  • Floating Accessibility Hub    │  • Interactive Practice Arena       │
│  • Step-by-Step Form Navigator   │  • Plain-English Jargon Translator  │
│  • Web Speech (TTS & STT Voice)  │  • Caregiver & Family Profile Hub   │
│  • High Contrast & Reading Ruler │  • Form Simulator & Audio Training  │
│  • Scam & Dark Pattern Shield    │  • One-Click JSON Settings Export   │
└──────────────────────────────────┴─────────────────────────────────────┘
```

---

## ✨ Key Features

### 1. 📝 Step-by-Step Form Navigator (One Question at a Time)
Instead of 25 cramped form fields on a busy page, SilverAssist opens a calm, large-print modal showing **one question at a time**:
- **Plain-English Explanations:** Explains what the field means in clear 5th-grade language (e.g. *"Look for the 3 numbers on the back of your card"*).
- **Bidirectional Live Synchronization:** As the user speaks or types in the wizard, SilverAssist automatically scrolls to the real field on the webpage, illuminates it with an amber/blue spotlight, and syncs the data directly into the DOM.
- **Positive Reinforcement:** Pleasant audio chimes and celebratory feedback ensure seniors feel confident and accomplished.

### 2. 🎙️ Voice-First Interaction (Speak or Listen)
- **Text-to-Speech (TTS):** Reads instructions and questions in a warm, gentle voice at a calibrated **0.85x cadence** designed for senior cognitive processing.
- **Voice Dictation (STT):** Elderly users with arthritis, tremors, or limited typing dexterity can click the *"Speak Answer"* button and dictate their response naturally.

### 3. 👓 Visual Comfort & Low-Vision Presets
- **High Contrast Yellow-on-Black:** Gold-standard color palette for cataracts and macular degeneration.
- **Glare-Free Sepia Mode:** Reduces blue light and eyestrain for prolonged reading.
- **Senior Large-Print View:** 150% font magnification and 1.8x line-height spacing.
- **Reading Ruler & High-Vis Pointer:** A horizontal reading bar tracks the cursor line-by-line so users never lose their place, accompanied by an enlarged golden pointer.

### 4. 🛡️ Scam & Dark Pattern Guardian
- Scans pages for **pre-checked subscription checkboxes** and warns the user.
- Alerts users to **fake urgency timers** (*"Only 2 items left! Hurry!"*).
- Flags **insecure HTTP connections** before sensitive banking or identity numbers are entered.

### 5. 📖 Plain-English Jargon Translator
- Instant glossary for technical terms (*Routing Number*, *CVV*, *CAPTCHA*, *Two-Factor OTP*, *Medicare Member ID*, *Deductible*).
- Includes clear instructions on physical checks and cards showing exactly where to find the requested numbers.

### 6. 👨‍👩‍👧 Caregiver & Family Profile Hub
- Family members can build a custom accessibility profile for their elderly parents.
- Export and import profiles as JSON or copy a 1-click sync code for instant configuration across devices.

---

## 🚀 Quickstart & Setup Guide

### Part 1: Installing the Browser Extension (Chrome, Edge, Brave)

1. Open your browser and navigate to the Extensions page:
   - Google Chrome: `chrome://extensions`
   - Microsoft Edge: `edge://extensions`
   - Brave: `brave://extensions`
2. In the top-right corner, toggle **Developer Mode** to **ON**.
3. Click the **Load unpacked** button in the top-left.
4. Select the `extension` directory inside this repository.
5. Visit any website (or test using the included demo pages) — the **SilverAssist 🦻** floating companion will appear in the bottom-right corner!

#### Keyboard Shortcuts:
| Shortcut | Action |
|---|---|
| `Alt + Shift + S` | Toggle SilverAssist Accessibility Hub |
| `Alt + Shift + F` | Launch Step-by-Step Form Navigator |
| `Alt + Shift + R` | Read Page / Element Out Loud |

---

### Part 2: Running the Web Companion & Training Arena

```bash
# Navigate to web-app directory
cd web-app

# Install dependencies (React 19, Lucide, Tailwind v4, Canvas-Confetti)
npm install

# Start local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### Part 3: Testing on Real-World Mock Portals

We have included realistic mock portals in `demo-test-pages/` specifically designed to test accessibility features:

- **Medical Clinic Intake Portal:** `demo-test-pages/medical_appointment.html` (includes Medicare IDs, co-pay fields, urgency timers).
- **State Pension & Energy Grant Application:** `demo-test-pages/government_pension.html` (includes 9-digit ABA routing numbers, statutory declarations).
- **Testbed Directory:** `demo-test-pages/index.html`

Simply double-click or open `demo-test-pages/index.html` in your browser with the extension installed to see SilverAssist in action!

---

## 📂 Repository Structure

```
SilverAssist/
├── extension/                     # Manifest V3 Chrome / Edge / Brave Extension
│   ├── manifest.json              # Extension manifest & permissions
│   ├── icons/                     # Generated crisp high-contrast icons (16, 32, 48, 128px)
│   ├── content/
│   │   ├── content.js             # Core DOM scanner, form wizard modal, audio synthesizer
│   │   ├── content.css            # WCAG AAA high contrast themes, spotlight pulse, reading ruler
│   │   └── plain-explainer.js     # Plain-English translation dictionary & dark pattern detector
│   ├── popup/
│   │   ├── popup.html             # Toolbar quick control center
│   │   ├── popup.css              # Accessible popup styling
│   │   └── popup.js               # Active tab communication & toggles
│   ├── background/
│   │   └── service-worker.js      # Background service worker & shortcut dispatcher
│   └── options/
│       ├── options.html           # Caregiver preferences & profile settings
│       ├── options.css
│       └── options.js
├── web-app/                       # Interactive Companion Web App & Training Sandbox
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Accessible navigation & instant contrast/font scalers
│   │   │   ├── PracticeArena.jsx  # Interactive Form Sandbox (Problem vs Solution comparison)
│   │   │   ├── JargonGlossary.jsx # Plain-English dictionary with voice pronunciation
│   │   │   ├── CaregiverProfile.jsx # Senior profile configurator & JSON export
│   │   │   └── ExtensionGuide.jsx # Visual 3-minute installation guide
│   │   ├── data/
│   │   │   ├── mockForms.js       # Realistic healthcare, government & delivery scenarios
│   │   │   └── jargonDictionary.js # Curated technical terms mapped to 5th-grade English
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css              # Tailwind CSS v4 + High Contrast / Sepia variables
│   ├── package.json
│   └── vite.config.js
├── demo-test-pages/               # Mock complex portals to test the extension
│   ├── index.html                 # Testbed launcher
│   ├── medical_appointment.html   # Cluttered medical registration form
│   └── government_pension.html    # Bureaucratic pension application form
├── generate_icons.py              # Pure Python gradient icon generator
├── .gitignore
└── README.md
```

---

## ♿ WCAG 2.2 AAA Accessibility Principles Followed

- **Perceivable:** Minimum 7:1 color contrast ratio in high-contrast mode; scalable typography up to 175%; dual visual and auditory channels for all prompts.
- **Operable:** 100% keyboard navigable (`Alt+Shift+S`, `Tab`, `Enter`); touch target sizes exceed 48×48px with generous spacing to accommodate hand tremors.
- **Understandable:** Cryptic technical jargon replaced with reassuring 5th-grade plain English; multi-step input breakdowns eliminate cognitive overload.
- **Robust:** Compatible across Chromium-based browsers (Chrome, Edge, Brave, Opera) using Manifest V3 standards.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Built with dedication to digital equity and accessibility.
