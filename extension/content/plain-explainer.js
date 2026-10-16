/**
 * SilverAssist AI - Plain English Explainer Dictionary & Form Intelligence
 * Translates confusing technical, banking, medical, and administrative terms
 * into clear, reassuring 5th-grade plain English explanations for elderly & low-literacy users.
 */

window.SilverExplainer = (function () {
  const dictionary = [
    {
      keywords: ['cvv', 'cvc', 'security code', 'cid', 'card verification'],
      title: 'Card Security Code (CVV)',
      explanation: 'Turn your card over. Look for the 3 small digits on the signature strip (or 4 digits on the front for Amex). This proves you hold the card in your hand.',
      tip: 'Never share this code over the phone or email.',
      icon: '💳',
      visualHint: 'card-cvv'
    },
    {
      keywords: ['routing number', 'aba', 'transit number', 'sort code'],
      title: 'Bank Routing Number',
      explanation: 'A 9-digit number identifying your bank. Look at the very bottom-left of one of your paper checks. It is the first set of 9 numbers.',
      tip: 'It is always exactly 9 digits long.',
      icon: '🏦',
      visualHint: 'check-routing'
    },
    {
      keywords: ['account number', 'checking account', 'savings account'],
      title: 'Your Bank Account Number',
      explanation: 'The number for your personal checking or savings account. On your paper check, it sits directly to the right of the 9-digit routing number.',
      tip: 'Usually 8 to 12 digits long.',
      icon: '📄',
      visualHint: 'check-account'
    },
    {
      keywords: ['billing zip', 'postal code', 'zip code', 'pincode', 'pin code'],
      title: 'Postal / ZIP Code',
      explanation: 'The 5 or 6 digit number where your mail and monthly bank statements are delivered.',
      tip: 'Make sure it matches the address your bank has on file.',
      icon: '📬'
    },
    {
      keywords: ['ssn', 'social security', 'aadhaar', 'national id', 'tax id', 'sin'],
      title: 'Government Identity Number',
      explanation: 'Your official personal ID number issued by the government. Keep this confidential and only enter it on verified official portals.',
      tip: 'Legitimate stores and social media never ask for this number.',
      icon: '🔒'
    },
    {
      keywords: ['expiration', 'exp date', 'expiry', 'valid thru', 'mm/yy'],
      title: 'Card Expiration Date',
      explanation: 'The month and year printed on your card when it needs replacement. Format MM/YY means two digits for the month and two for the year (e.g., 08/28 means August 2028).',
      tip: 'Do not worry about the exact day; it expires on the last day of that month.',
      icon: '📅'
    },
    {
      keywords: ['otp', 'one time password', 'verification code', '2fa', 'two-factor'],
      title: 'One-Time Security Code (OTP)',
      explanation: 'A temporary 6-digit code sent right now to your mobile phone via SMS or to your email. It confirms you are the one signing in.',
      tip: 'No bank representative will ever ask you to read this code out loud to them.',
      icon: '📱'
    },
    {
      keywords: ['captcha', 'recaptcha', 'robot', 'hcaptcha'],
      title: 'Human Check (CAPTCHA)',
      explanation: 'A simple test to make sure you are a real person and not an automated scam robot.',
      tip: 'If an audio button (speaker icon) is available, you can click it to hear numbers spoken out loud!',
      icon: '🤖'
    },
    {
      keywords: ['beneficiary', 'nominee', 'heir'],
      title: 'Beneficiary / Nominee',
      explanation: 'The trusted loved one or family member you select to receive benefits, savings, or insurance payouts.',
      tip: 'You will usually need their full legal name and date of birth.',
      icon: '👨‍👩‍👧'
    },
    {
      keywords: ['co-pay', 'copay', 'deductible', 'coinsurance'],
      title: 'Medical Co-Pay / Deductible',
      explanation: 'The fixed share of money you pay for your doctor visit or prescription, while your insurance pays the rest.',
      tip: 'Check your health card to see your specific specialist or general visit co-pay amount.',
      icon: '🩺'
    },
    {
      keywords: ['policy number', 'member id', 'group number', 'rx bin'],
      title: 'Insurance Member ID',
      explanation: 'The identification number printed clearly on the front of your health insurance or Medicare card.',
      tip: 'Do not confuse this with the Group Number, which identifies your overall employer or plan.',
      icon: '🪪',
      visualHint: 'medicare'
    },
    {
      keywords: ['terms and conditions', 'privacy policy', 'disclaimer', 'consent'],
      title: 'Terms & Conditions Agreement',
      explanation: 'The legal rules for using the service. We scan this to verify there are no hidden recurring charges or tricky clauses.',
      tip: 'SilverAssist checks for hidden recurring charges before you check this box.',
      icon: '📜'
    },
    {
      keywords: ['billing address', 'residential address', 'street address'],
      title: 'Physical / Mailing Address',
      explanation: 'Where you reside. Billing address must match where your credit card or bank statements arrive.',
      tip: 'Line 1 is your house number and street name. Line 2 is for apartment or suite number if applicable.',
      icon: '🏠'
    },
    {
      keywords: ['dob', 'date of birth', 'birth date'],
      title: 'Date of Birth',
      explanation: 'The day, month, and year you were born.',
      tip: 'Check if the format asks for Month first (MM/DD/YYYY) or Day first (DD/MM/YYYY).',
      icon: '🎂'
    },
    {
      keywords: ['password', 'passcode'],
      title: 'Secret Password',
      explanation: 'A secret phrase to lock your account so only you can enter.',
      tip: 'Use a passphrase made of 3 memorable words with a number and symbol (e.g., BlueMorningSun!24).',
      icon: '🔑'
    }
  ];

  /**
   * Scans a form field and returns a plain-English explanation object
   */
  function explainField(element) {
    if (!element) return null;

    // Gather text clues from label, placeholder, name, id, aria-label
    const clues = [];
    if (element.id) {
      clues.push(element.id.toLowerCase());
      const label = document.querySelector(`label[for="${element.id}"]`);
      if (label) clues.push(label.innerText.toLowerCase());
    }
    const parentLabel = element.closest('label');
    if (parentLabel) clues.push(parentLabel.innerText.toLowerCase());

    if (element.name) clues.push(element.name.toLowerCase());
    if (element.placeholder) clues.push(element.placeholder.toLowerCase());
    if (element.getAttribute('aria-label')) clues.push(element.getAttribute('aria-label').toLowerCase());
    if (element.getAttribute('title')) clues.push(element.getAttribute('title').toLowerCase());
    if (element.type) clues.push(element.type.toLowerCase());

    const fullClueText = clues.join(' ');

    for (const item of dictionary) {
      for (const kw of item.keywords) {
        if (fullClueText.includes(kw)) {
          return {
            title: item.title,
            explanation: item.explanation,
            tip: item.tip,
            icon: item.icon,
            matchedKeyword: kw,
            visualHint: item.visualHint || null
          };
        }
      }
    }

    // Generic fallback based on input type
    const type = element.type || 'text';
    if (type === 'email') {
      return {
        title: 'Email Address',
        explanation: 'Your electronic mail address, such as yourname@gmail.com. Websites use this to send you receipts and confirmation notes.',
        tip: 'Don’t forget the @ symbol and the .com at the end.',
        icon: '✉️'
      };
    }
    if (type === 'tel') {
      return {
        title: 'Telephone Number',
        explanation: 'Your phone number where you can receive calls or text messages.',
        tip: 'Include your 3-digit area code.',
        icon: '📞'
      };
    }
    if (type === 'date') {
      return {
        title: 'Date Selection',
        explanation: 'Select the month, day, and year using the calendar or number keys.',
        tip: 'You can type the numbers or click the small calendar icon.',
        icon: '📅'
      };
    }
    if (type === 'checkbox') {
      return {
        title: 'Choice Box',
        explanation: 'Click or tap once to turn this on (a checkmark will appear), or click again to turn it off.',
        tip: 'Check only items you explicitly want.',
        icon: '☑️'
      };
    }

    return {
      title: element.placeholder || element.name || 'Form Question',
      explanation: 'Please provide the requested information for this question.',
      tip: 'Take your time. There is no rush.',
      icon: '📝'
    };
  }

  /**
   * Dark Pattern & Safety Auditor
   * Detects countdown timers, pre-checked marketing boxes, and unencrypted pages
   */
  function inspectPageSafety() {
    const warnings = [];

    // 1. Insecure connection
    if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost') {
      warnings.push({
        level: 'danger',
        title: 'Insecure Website Warning',
        message: 'This webpage does not use encryption (no padlock icon). Do NOT enter bank cards, passwords, or personal identity details here.'
      });
    }

    // 2. Pre-checked checkboxes (often sneak in marketing or recurring subscriptions)
    const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkedBoxes.forEach((cb) => {
      const label = cb.closest('label') || document.querySelector(`label[for="${cb.id}"]`);
      const text = label ? label.innerText.toLowerCase() : '';
      if (text.includes('subscribe') || text.includes('newsletter') || text.includes('offers') || text.includes('recurring') || text.includes('partner')) {
        warnings.push({
          level: 'warning',
          title: 'Sneaky Pre-Checked Box Found',
          message: `The website pre-checked: "${label ? label.innerText.slice(0, 70) : 'Opt-in box'}...". You can uncheck it if you do not want emails or charges.`
        });
      }
    });

    // 3. Urgent / Panic countdown timers
    const pageText = document.body ? document.body.innerText.toLowerCase() : '';
    if (pageText.includes('expires in') || pageText.includes('limited time remaining') || pageText.includes('only 1 left in stock') || pageText.includes('deal ends in')) {
      warnings.push({
        level: 'caution',
        title: 'Artificial Urgency Detected',
        message: 'This page appears to use a countdown timer or pressure language. Take a deep breath — do not feel pressured to rush.'
      });
    }

    return warnings;
  }

  return {
    explainField,
    inspectPageSafety,
    dictionary
  };
})();
