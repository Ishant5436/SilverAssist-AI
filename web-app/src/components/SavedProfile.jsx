import React, { useState, useEffect } from 'react';
import { Save, Check, ShieldCheck, Trash2 } from 'lucide-react';

export const STORAGE_KEY = 'silverassist_saved_profile';

export function getSavedProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export default function SavedProfile() {
  const [profile, setProfile] = useState({
    fullname: '',
    dob: '',
    phone: '',
    address: '',
    zip: '',
    medicare_id: '',
    emergency_contact: '',
    pharmacy: ''
  });
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    const existing = getSavedProfile();
    if (existing && Object.keys(existing).length > 0) {
      setProfile(prev => ({ ...prev, ...existing }));
    }
  }, []);

  const handleChange = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear your saved details from this device?")) {
      localStorage.removeItem(STORAGE_KEY);
      setProfile({
        fullname: '',
        dob: '',
        phone: '',
        address: '',
        zip: '',
        medicare_id: '',
        emergency_contact: '',
        pharmacy: ''
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          My Saved Details
        </h1>
        <p className="text-slate-600 text-base">
          Save your common details here once. When filling out forms, you can fill questions with a single tap instead of typing repeatedly.
        </p>
      </div>

      {/* Privacy Guarantee Box */}
      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-4 flex items-start gap-3">
        <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-emerald-950">
          <strong>100% Private & Stored Only on This Device:</strong>
          <p className="mt-0.5 text-emerald-900">
            Your details never leave your computer. Nothing is sent to any cloud server or third party.
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSave} className="bg-white border-2 border-slate-300 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
        
        <div className="space-y-1">
          <label className="block text-sm font-bold text-slate-800">
            Full Legal Name
          </label>
          <input
            type="text"
            value={profile.fullname}
            onChange={(e) => handleChange('fullname', e.target.value)}
            placeholder="e.g. Martha Eleanor Jenkins"
            className="w-full text-base p-3 border-2 border-slate-300 rounded-xl focus:border-blue-700 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-bold text-slate-800">
              Date of Birth
            </label>
            <input
              type="date"
              value={profile.dob}
              onChange={(e) => handleChange('dob', e.target.value)}
              className="w-full text-base p-3 border-2 border-slate-300 rounded-xl focus:border-blue-700 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-bold text-slate-800">
              Primary Phone Number
            </label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="(555) 000-0000"
              className="w-full text-base p-3 border-2 border-slate-300 rounded-xl focus:border-blue-700 outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-1">
            <label className="block text-sm font-bold text-slate-800">
              Home Street Address
            </label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="e.g. 742 Evergreen Terrace, Apt 3B"
              className="w-full text-base p-3 border-2 border-slate-300 rounded-xl focus:border-blue-700 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-bold text-slate-800">
              Postal / ZIP Code
            </label>
            <input
              type="text"
              value={profile.zip}
              onChange={(e) => handleChange('zip', e.target.value)}
              placeholder="90210"
              className="w-full text-base p-3 border-2 border-slate-300 rounded-xl focus:border-blue-700 outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-slate-800">
            Medicare / Insurance Member ID
          </label>
          <input
            type="text"
            value={profile.medicare_id}
            onChange={(e) => handleChange('medicare_id', e.target.value)}
            placeholder="1EG4-TE5-MK72"
            className="w-full text-base p-3 border-2 border-slate-300 rounded-xl focus:border-blue-700 outline-none font-mono"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-slate-800">
            Emergency Contact (Name & Phone)
          </label>
          <input
            type="text"
            value={profile.emergency_contact}
            onChange={(e) => handleChange('emergency_contact', e.target.value)}
            placeholder="e.g. Robert Jenkins (Son) - (555) 987-6543"
            className="w-full text-base p-3 border-2 border-slate-300 rounded-xl focus:border-blue-700 outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-bold text-slate-800">
            Preferred Local Pharmacy
          </label>
          <input
            type="text"
            value={profile.pharmacy}
            onChange={(e) => handleChange('pharmacy', e.target.value)}
            placeholder="e.g. Walgreens on Main Street"
            className="w-full text-base p-3 border-2 border-slate-300 rounded-xl focus:border-blue-700 outline-none"
          />
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl text-base"
            >
              <Save className="w-4 h-4" />
              <span>Save My Details</span>
            </button>

            {savedToast && (
              <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-300">
                <Check className="w-4 h-4" />
                <span>Saved successfully!</span>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 px-3 py-2 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear all</span>
          </button>
        </div>

      </form>

    </div>
  );
}
