import React, { useState, useEffect } from 'react';
import { UserCircleIcon, DocumentTextIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import { supabase } from '../utils/supabaseClient';
import toast from 'react-hot-toast';

const translations = {
  en: {
    sellerProfile: "Seller Profile",
    personalDetails: "Personal Details",
    businessInfo: "Business Information",
    financialInfo: "Financial Information",
    edit: "Edit",
    cancel: "Cancel",
    save: "Save",
    successMessage: "Profile updated successfully!",
    fields: {
      name: "Name",
      aadhaar: "Aadhaar",
      village: "Village",
      district: "District",
      state: "State",
      pinCode: "PIN Code",
      businessType: "Business Type",
      additionalDetails: "Additional Details",
      bankName: "Bank Name",
      accountNumber: "Account Number",
      ifsc: "IFSC Code",
      upi: "UPI ID"
    }
  },
  ml: {
    sellerProfile: "വിൽപ്പനക്കാരൻ പ്രൊഫൈൽ",
    personalDetails: "വ്യക്തിഗത വിവരങ്ങൾ",
    businessInfo: "വ്യാപാര വിവരങ്ങൾ",
    financialInfo: "ധനകാര്യ വിവരങ്ങൾ",
    edit: "എഡിറ്റ് ചെയ്യുക",
    cancel: "റദ്ദാക്കുക",
    save: "സംരക്ഷിക്കുക",
    successMessage: "പ്രൊഫൈൽ വിജയകരമായി അപ്ഡേറ്റ് ചെയ്തു!",
    fields: {
      name: "പേര്",
      aadhaar: "ആധാർ",
      village: "ഗ്രാമം",
      district: "ജില്ല",
      state: "സംസ്ഥാനം",
      pinCode: "പിൻ കോഡ്",
      businessType: "ബിസിനസ് തരം",
      additionalDetails: "അധിക വിവരങ്ങൾ",
      bankName: "ബാങ്ക് പേര്",
      accountNumber: "അക്കൗണ്ട് നമ്പർ",
      ifsc: "IFSC കോഡ്",
      upi: "UPI ഐഡി"
    }
  },
  hi: {
    sellerProfile: "विक्रेता प्रोफ़ाइल",
    personalDetails: "व्यक्तिगत विवरण",
    businessInfo: "व्यावसायिक जानकारी",
    financialInfo: "वित्तीय जानकारी",
    edit: "संपादन",
    cancel: "रद्द करें",
    save: "सहेजें",
    successMessage: "प्रोफ़ाइल सफलतापूर्वक अद्यतन!",
    fields: {
      name: "नाम",
      aadhaar: "आधार",
      village: "गाँव",
      district: "जिला",
      state: "राज्य",
      pinCode: "पिन कोड",
      businessType: "व्यवसाय प्रकार",
      additionalDetails: "अतिरिक्त विवरण",
      bankName: "बैंक का नाम",
      accountNumber: "खाता संख्या",
      ifsc: "आईएफएससी कोड",
      upi: "यूपीआई आईडी"
    }
  },
  ta: {
    sellerProfile: "விற்பனையாளர் சுயவிவரம்",
    personalDetails: "தனிப்பட்ட விவரங்கள்",
    businessInfo: "வணிக தகவல்",
    financialInfo: "நிதி தகவல்",
    edit: "திருத்து",
    cancel: "ரத்து செய்",
    save: "சேமி",
    successMessage: "சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!",
    fields: {
      name: "பெயர்",
      aadhaar: "ஆதார்",
      village: "கிராமம்",
      district: "மாவட்டம்",
      state: "மாநிலம்",
      pinCode: "அஞ்சல் குறியீடு",
      businessType: "வணிக வகை",
      additionalDetails: "கூடுதல் விவரங்கள்",
      bankName: "வங்கி பெயர்",
      accountNumber: "கணக்கு எண்",
      ifsc: "IFSC குறியீடு",
      upi: "UPI ஐடி"
    }
  }
};

const SellerProfile = () => {
  const userId = localStorage.getItem('userId');
  const [lang, setLang] = useState<'en' | 'ml' | 'hi' | 'ta'>('en');
  const [profileData, setProfileData] = useState({
    name: '',
    aadhaar: '',
    village: '',
    district: '',
    state: '',
    pinCode: '',
    businessType: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    upi: '',
    additionalDetails: '',
  });
  const [editMode, setEditMode] = useState({
    personal: false,
    business: false,
    financial: false,
  });

  useEffect(() => {
    const savedLang = (localStorage.getItem('lang') as 'en' | 'ml' | 'hi' | 'ta') || 'en';
    setLang(savedLang);
    
    if (userId) {
      const fetchProfileData = async () => {
        const { data, error } = await supabase.from('seller').select('*').eq('id', userId).single();
        if (data) {
          setProfileData(data);
          localStorage.setItem('sellername', data.name);
        } else {
          console.error('Error fetching profile data:', error);
        }
      };
      fetchProfileData();
    }
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSave = async (section: keyof typeof editMode): Promise<void> => {
    const { error } = await supabase.from('seller').update(profileData).eq('id', userId);
    if (error) {
      console.error('Error updating profile data:', error);
    } else {
      setEditMode({ ...editMode, [section]: false });
      toast.success(translations[lang].successMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <UserCircleIcon className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {translations[lang].sellerProfile}
          </h1>
        </div>

        <div className="space-y-8">
          {/* Personal Details Card */}
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <UserCircleIcon className="h-8 w-8 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  {translations[lang].personalDetails}
                </h2>
              </div>
              <button
                onClick={() => setEditMode({ ...editMode, personal: !editMode.personal })}
                className="text-green-600 hover:underline"
              >
                {editMode.personal ? translations[lang].cancel : translations[lang].edit}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(['name', 'aadhaar', 'village', 'district', 'state', 'pinCode'] as const).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {translations[lang].fields[field]}
                  </label>
                  {editMode.personal ? (
                    <input
                      type="text"
                      name={field}
                      value={profileData[field]}
                      onChange={handleInputChange}
                      className="text-gray-800 bg-gray-100 px-4 py-3 rounded-lg w-full"
                    />
                  ) : (
                    <p className="text-gray-800 bg-gray-100 px-4 py-3 rounded-lg">
                      {profileData[field]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {editMode.personal && (
              <button
                onClick={() => handleSave('personal')}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                {translations[lang].save}
              </button>
            )}
          </div>

          {/* Business Details Card */}
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <DocumentTextIcon className="h-8 w-8 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  {translations[lang].businessInfo}
                </h2>
              </div>
              <button
                onClick={() => setEditMode({ ...editMode, business: !editMode.business })}
                className="text-green-600 hover:underline"
              >
                {editMode.business ? translations[lang].cancel : translations[lang].edit}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translations[lang].fields.businessType}
                </label>
                {editMode.business ? (
                  <input
                    type="text"
                    name="businessType"
                    value={profileData.businessType}
                    onChange={handleInputChange}
                    className="text-gray-800 bg-gray-100 px-4 py-3 rounded-lg w-full"
                  />
                ) : (
                  <p className="text-gray-800 bg-gray-100 px-4 py-3 rounded-lg">
                    {profileData.businessType}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {translations[lang].fields.additionalDetails}
                </label>
                {editMode.business ? (
                  <textarea
                    name="additionalDetails"
                    value={profileData.additionalDetails}
                    onChange={handleInputChange}
                    className="text-gray-800 bg-gray-100 px-4 py-3 rounded-lg w-full"
                  />
                ) : (
                  <p className="text-gray-800 bg-gray-100 px-4 py-3 rounded-lg">
                    {profileData.additionalDetails}
                  </p>
                )}
              </div>
            </div>
            {editMode.business && (
              <button
                onClick={() => handleSave('business')}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                {translations[lang].save}
              </button>
            )}
          </div>

          {/* Financial Details Card */}
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <BanknotesIcon className="h-8 w-8 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  {translations[lang].financialInfo}
                </h2>
              </div>
              <button
                onClick={() => setEditMode({ ...editMode, financial: !editMode.financial })}
                className="text-green-600 hover:underline"
              >
                {editMode.financial ? translations[lang].cancel : translations[lang].edit}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(['bankName', 'accountNumber', 'ifsc', 'upi'] as const).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {translations[lang].fields[field]}
                  </label>
                  {editMode.financial ? (
                    <input
                      type="text"
                      name={field}
                      value={profileData[field]}
                      onChange={handleInputChange}
                      className="text-gray-800 bg-gray-100 px-4 py-3 rounded-lg w-full"
                    />
                  ) : (
                    <p className="text-gray-800 bg-gray-100 px-4 py-3 rounded-lg">
                      {profileData[field]}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {editMode.financial && (
              <button
                onClick={() => handleSave('financial')}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                {translations[lang].save}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;