export const PRACTICE_FORMS = [
  {
    id: "doctor-intake",
    title: "Senior Doctor Visit & Health Registration",
    category: "Healthcare",
    icon: "🩺",
    description: "Practice filling out clinic registration forms with Medicare, emergency contacts, and pharmacy information with zero stress.",
    fields: [
      {
        id: "fullname",
        label: "Your Full Legal Name",
        type: "text",
        placeholder: "e.g., Martha Eleanor Jenkins",
        simpleHint: "Enter your first and last name exactly as it appears on your photo ID.",
        jargonTip: "Healthcare providers verify this against your insurance card.",
        savedKey: "fullname"
      },
      {
        id: "dob",
        label: "Date of Birth",
        type: "date",
        placeholder: "MM/DD/YYYY",
        simpleHint: "Select the day, month, and year you were born.",
        jargonTip: "Doctors use this to verify your medical records and ensure accurate medication dosages.",
        savedKey: "dob"
      },
      {
        id: "phone",
        label: "Your Best Phone Number",
        type: "tel",
        placeholder: "(555) 234-5678",
        simpleHint: "The phone number where you prefer the nurse or clinic to call you with test results.",
        jargonTip: "They will call this number if your appointment time changes.",
        savedKey: "phone"
      },
      {
        id: "medicare_id",
        label: "Medicare / Insurance Member ID",
        type: "text",
        placeholder: "1EG4-TE5-MK72",
        simpleHint: "Look at your health card. It is the main number printed right beneath your name.",
        jargonTip: "This is NOT your Social Security Number — Medicare IDs contain a mix of numbers and letters.",
        visualType: "medicare",
        savedKey: "medicare_id"
      },
      {
        id: "emergency_contact",
        label: "Emergency Contact (Family or Friend)",
        type: "text",
        placeholder: "e.g. Robert Jenkins (Son) - (555) 987-6543",
        simpleHint: "The name and phone number of a trusted son, daughter, spouse, or neighbor who can help you in an emergency.",
        jargonTip: "The clinic only calls this person if you need urgent assistance.",
        savedKey: "emergency_contact"
      },
      {
        id: "pharmacy",
        label: "Preferred Local Pharmacy",
        type: "text",
        placeholder: "e.g., Walgreens on Main Street",
        simpleHint: "The pharmacy where you prefer to pick up your prescriptions or where they deliver to your home.",
        jargonTip: "Your doctor sends electronic prescriptions directly there so they are ready for you.",
        savedKey: "pharmacy"
      }
    ]
  },
  {
    id: "senior-energy-grant",
    title: "Government Senior Energy & Utility Grant",
    category: "Government Assistance",
    icon: "🏛️",
    description: "Learn how to fill out government assistance forms asking for routing numbers, income brackets, and household details.",
    fields: [
      {
        id: "applicant_name",
        label: "Primary Applicant Name",
        type: "text",
        placeholder: "e.g., Arthur David Pendelton",
        simpleHint: "Your legal name as recorded on Social Security documents.",
        jargonTip: "Keep it matching your official government documents.",
        savedKey: "fullname"
      },
      {
        id: "address",
        label: "Residential Street Address",
        type: "text",
        placeholder: "e.g. 742 Evergreen Terrace, Apt 3B",
        simpleHint: "The physical home or apartment where you live and receive electric/heating bills.",
        jargonTip: "Make sure to include apartment or unit numbers if applicable.",
        savedKey: "address"
      },
      {
        id: "utility_account",
        label: "Electric / Utility Account Number",
        type: "text",
        placeholder: "e.g., 0048-9128-44",
        simpleHint: "Look at the top-right corner of your paper electric or gas bill for your account number.",
        jargonTip: "This tells the grant program which company and account to send the credit payment to."
      },
      {
        id: "routing_number",
        label: "Bank 9-Digit Routing Number",
        type: "text",
        placeholder: "123456789",
        simpleHint: "The 9 digits at the very bottom left corner of your checking account paper check.",
        jargonTip: "This is a safe public identifier for your bank. It tells the government system which bank to send funds to.",
        visualType: "check-routing"
      },
      {
        id: "account_number",
        label: "Bank Checking Account Number",
        type: "text",
        placeholder: "9876543210",
        simpleHint: "Your checking account number located right next to the 9-digit routing number on your check.",
        jargonTip: "Double check this number carefully to ensure direct deposits arrive smoothly.",
        visualType: "check-account"
      }
    ]
  },
  {
    id: "grocery-delivery",
    title: "Home Prescription & Grocery Delivery Checkout",
    category: "Everyday Living",
    icon: "🛒",
    description: "Master delivery addresses, special doorstep instructions, and safe card payments without confusion.",
    fields: [
      {
        id: "delivery_name",
        label: "Recipient Name",
        type: "text",
        placeholder: "e.g., Clara Higgins",
        simpleHint: "The name of the person receiving the groceries or prescription at the door.",
        jargonTip: "Delivery drivers use this to verify they are at the right doorstep.",
        savedKey: "fullname"
      },
      {
        id: "delivery_notes",
        label: "Doorstep Instructions for Driver",
        type: "text",
        placeholder: "e.g., Please ring doorbell twice and leave on bench by front door",
        simpleHint: "Tell the driver how you want your items left (e.g. ring bell, don't leave in the rain).",
        jargonTip: "Saves you from having to rush to the door immediately."
      },
      {
        id: "card_zip",
        label: "Billing ZIP Code",
        type: "text",
        placeholder: "90210",
        simpleHint: "The 5-digit zip code where your bank sends your monthly mail statements.",
        jargonTip: "Prevents someone else from using your card numbers.",
        savedKey: "zip"
      },
      {
        id: "card_cvv",
        label: "Card Security Code (CVV)",
        type: "text",
        placeholder: "123",
        simpleHint: "The 3 digits on the back signature strip of your credit or debit card.",
        jargonTip: "Proves that you have the card in your hand.",
        visualType: "card-cvv"
      }
    ]
  }
];
