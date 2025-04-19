// Add these imports at the top
import React, { useState } from 'react';
import { CheckCircleIcon, DocumentTextIcon, BanknotesIcon, UserCircleIcon, GlobeAltIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { supabase } from '../utils/supabaseClient';

type Language = 'english' | 'hindi' | 'malayalam' | 'tamil';

type BusinessTypes = {
  clothing: string;
  handmade: string;
  seedsandsapling: string;
  dairyproducts: string;
  farmingtools: string;
};

type DeliveryOptions = {
  partner: string;
  packaging: string;
  pickup: string;
};

type Translation = {
  title: string;
  name: string;
  aadhaar: string;
  village: string;
  district: string;
  state: string;
  pinCode: string;
  businessType: string;
  businessTypes: BusinessTypes;
  businessProof: string;
  deliveryMethod: string;
  deliveryOptions: DeliveryOptions;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  upi: string;
  additionalDetails: string;
  submit: string;
  hint:string;
};

const translations: Record<Language, Translation> = {
  english: {
    title: 'Seller Onboarding',
    name: 'Name',
    aadhaar: 'Aadhaar Number',
    village: 'Village',
    district: 'District',
    state: 'State',
    pinCode: 'Pin Code',
    businessType: 'Business Type',
    businessTypes: {
      clothing: 'Clothing',
      handmade: 'Handmade',
      seedsandsapling: 'Seeds and Sapling',
      dairyproducts: 'Dairy Products',
      farmingtools: 'Farming Tools',
    },
    businessProof: 'Business Proof or shop image',
    deliveryMethod: 'Delivery Method',
    deliveryOptions: {
      partner: 'Partner Delivery',
      packaging: 'Packaging Service',
      pickup: 'Pickup Options',
    },
    bankName: 'Bank Name',
    accountNumber: 'Account Number',
    ifsc: 'IFSC Code',
    upi: 'UPI ID (optional)',
    additionalDetails: 'Additional Details',
    submit: 'Submit',
    hint:'Click or hover over an input to read aloud',
  },
  hindi: {
    title: 'विक्रेता पंजीकरण',
    name: 'नाम',
    aadhaar: 'आधार नंबर',
    village: 'गांव',
    district: 'जिला',
    state: 'राज्य',
    pinCode: 'पिन कोड',
    businessType: 'व्यवसाय प्रकार',
    businessTypes: {
      clothing: 'कपड़े',
      handmade: 'हस्तनिर्मित',
      seedsandsapling: 'बीज और पौधे',
      dairyproducts: 'डेयरी उत्पाद',
      farmingtools: 'कृषि उपकरण',
    },
    businessProof: 'व्यापार प्रमाण या दुकान की छवि',
    deliveryMethod: 'डिलीवरी विधि',
    deliveryOptions: {
      partner: 'साझेदार डिलीवरी',
      packaging: 'पैकेजिंग सेवा',
      pickup: 'पिकअप विकल्प',
    },
    bankName: 'बैंक का नाम',
    accountNumber: 'खाता संख्या',
    ifsc: 'आईएफएससी कोड',
    upi: 'UPI आईडी (वैकल्पिक)',
    additionalDetails: 'अतिरिक्त विवरण',
    submit: 'जमा करें',
    hint:'एक इनपुट पर क्लिक करें या होवर करें पढ़ने के लिए',
  },
  malayalam: {
    title: 'വ്യാപാരി ഓൺബോർഡിംഗ്',
    name: 'പേര്',
    aadhaar: 'ആധാർ നമ്പർ',
    village: 'ഗ്രാമം',
    district: 'ജില്ല',
    state: 'സംസ്ഥാനം',
    pinCode: 'പിൻ കോഡ്',
    businessType: 'ബിസിനസ് തരം',
    businessTypes: {
      clothing: 'വസ്ത്രങ്ങൾ',
      handmade: 'ഹാൻഡ്മെയ്ഡ്',
      seedsandsapling: 'വിത്തുകളും തൈകളും',
      dairyproducts: 'പാൽ ഉൽപ്പന്നങ്ങൾ',
      farmingtools: 'കൃഷി ഉപകരണങ്ങൾ',
    },
    businessProof: 'വ്യാപാര തെളിവ് അല്ലെങ്കിൽ കടയുടെ ചിത്രം',
    deliveryMethod: 'ഡെലിവറി മാർഗം',
    deliveryOptions: {
      partner: 'പാർട്ണർ ഡെലിവറി',
      packaging: 'പാക്കേജിംഗ് സേവനം',
      pickup: 'പിക്കപ്പ് ഓപ്ഷനുകൾ',
    },
    bankName: 'ബാങ്കിന്റെ പേര്',
    accountNumber: 'അക്കൗണ്ട് നമ്പർ',
    ifsc: 'IFSC കോഡ്',
    upi: 'UPI ഐഡി (ഐച്ഛികം)',
    additionalDetails: 'കൂടുതൽ വിവരങ്ങൾ',
    submit: 'സമർപ്പിക്കുക',
    hint:'ഒരു ഇൻപുട്ടിൽ ക്ലിക്ക് ചെയ്യുക അല്ലെങ്കിൽ ഹോവർ ചെയ്യുക വായിക്കാൻ',
  },
  tamil: {
    title: 'விற்பனையாளர் பதிவு',
    name: 'பெயர்',
    aadhaar: 'ஆதார் எண்',
    village: 'கிராமம்',
    district: 'மாவட்டம்',
    state: 'மாநிலம்',
    pinCode: 'பின் குறியீடு',
    businessType: 'வணிக வகை',
    businessTypes: {
      clothing: 'ஆடை',
      handmade: 'கைத்தொழில்',
      seedsandsapling: 'விதைகள் மற்றும் தளிர்கள்',
      dairyproducts: 'பால் பொருட்கள்',
      farmingtools: 'விவசாய கருவிகள்',
    },
    businessProof: 'வணிக ஆதாரம் அல்லது கடையின் படம்',
    deliveryMethod: 'டெலிவரி முறை',
    deliveryOptions: {
      partner: 'பங்குதாரர் டெலிவரி',
      packaging: 'பேக்கேஜிங் சேவை',
      pickup: 'பிக்கப் விருப்பங்கள்',
    },
    bankName: 'வங்கி பெயர்',
    accountNumber: 'கணக்கு எண்',
    ifsc: 'IFSC குறியீடு',
    upi: 'UPI ஐடி (விருப்பம்)',
    additionalDetails: 'கூடுதல் விவரங்கள்',
    submit: 'சமர்ப்பிக்கவும்',
    hint:'ஒரு உள்ளீட்டில் கிளிக் செய்யவும் அல்லது ஒலிக்க மிதிக்கவும்',
  },
};

type FormData = {
  name: string;
  aadhaar: string;
  village: string;
  district: string;
  state: string;
  pinCode: string;
  businessType: string;
  businessProof: File | null;
  deliveryMethod: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  upi: string;
  additionalDetails: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

export default function OnboardingForm() {
  const [language, setLanguage] = useState<Language>('english');
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    aadhaar: '',
    village: '',
    district: '',
    state: '',
    pinCode: '',
    businessType: '',
    businessProof: null,
    deliveryMethod: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    upi: '',
    additionalDetails: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.aadhaar || formData.aadhaar.length !== 12) newErrors.aadhaar = 'Enter 12 digit Aadhaar number';
    if (!formData.village) newErrors.village = 'Village is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pinCode) newErrors.pinCode = 'Pin code is required';
    if (!formData.businessType) newErrors.businessType = 'Business type is required';
    if (!formData.businessProof) newErrors.businessProof = 'Business proof or shop image is required';
    if (!formData.deliveryMethod) newErrors.deliveryMethod = 'Delivery method is required';
    if (!formData.bankName) newErrors.bankName = 'Bank name is required';
    if (!formData.accountNumber) newErrors.accountNumber = 'Account number is required';
    if (!formData.ifsc) newErrors.ifsc = 'IFSC is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    const userid = localStorage.getItem('userId');
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setStatusMessage('Form submitted successfully!');

        const {data, error} = await supabase.storage.from('businessproof').upload(`${userid}`, formData.businessProof as Blob, {
            cacheControl: '3600',
            upsert: true,
        });

        if (error) {
            setStatusMessage('Error uploading business proof: ' + error.message);
            return;
        }
        console.log('File uploaded successfully:', data);
        const path = data.fullPath;

      const {error: dberror} = await supabase.from('seller').insert([
                { 
                    id: userid, 
                    name: formData.name, 
                    aadhaar: formData.aadhaar, 
                    village: formData.village, 
                    district: formData.district, 
                    state: formData.state, 
                    pinCode: formData.pinCode,
                    businessType: formData.businessType, 
                    businessProof: path, 
                    deliveryMethod: formData.deliveryMethod, 
                    bankName: formData.bankName, 
                    accountNumber: formData.accountNumber, 
                    ifsc: formData.ifsc, 
                    upi: formData.upi,  
                    additionalDetails: formData.additionalDetails 
                }
              ]);

      if (dberror) {
        setStatusMessage('Error submitting form: ' + dberror.message);
      } else {
        setStatusMessage('Form submitted successfully!');
        window.location.href = '/seller';
      }
    } else {
      setStatusMessage('Validation errors occurred. Please check the form.');
    }
  };

  async function helperfunction(input: string) {
    const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.log('SpeechRecognition not supported in this browser.');
      return;
    }
    if(language === 'english' || language === 'hindi'){
      if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(input);
        if(language === 'english'){
          utter.lang = 'en-GB'; 
          window.speechSynthesis.speak(utter);
        } else {
          utter.lang = 'hi-IN';
          window.speechSynthesis.speak(utter);
        }    
      } else {
        console.log('SpeechSynthesis not supported in this browser.');
      }    
    } else {
        console.log("TTS CALLED");
        const res = await fetch('/api/tts', {
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input, language }),
      });
      if(!res){
        console.log('TTS Failed')
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <GlobeAltIcon className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{translations[language].title}</h1>

          <div className="relative w-48 mx-auto">
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as Language)}
              className="block w-full pl-3 pr-10 py-2 text-base border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-md bg-green-50 text-green-700"
            >
              {(['english', 'hindi', 'malayalam', 'tamil'] as const).map((lang) => (
                <option key={lang} value={lang} className="bg-white">
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"></div>
          </div>
        </div>

        <div
        className="text-center mb-6 text-gray-600 w-1/2 mx-auto" 
        onMouseOver={() => helperfunction(translations[language].hint)}>
          {translations[language].hint}
        </div>

        <div className="space-y-8">
          {/* Personal Details Card */}
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <UserCircleIcon className="h-8 w-8 text-green-600" />
              <h2 className="text-2xl font-semibold text-gray-800">{translations[language].businessType === 'agriculture' ? 'Farmer Details' : 'Personal Details'}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" id="nameLabel">
                  {translations[language].name}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? 'border-red-500' : 'border-green-200'
                    } focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                    value={formData.name}
                    onClick={() => {
                      const text = (document.querySelector('#nameLabel') as HTMLLabelElement)?.innerText || '';if (text) {
                        helperfunction(text);
                        }
                    }
                    }
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ramesh Kumar"
                  />
                  {errors.name && (
                    <span className="absolute right-3 top-3 text-red-500">✗</span>
                  )}
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Aadhaar Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" id='aadharlabel'>
                  {translations[language].aadhaar}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.aadhaar ? 'border-red-500' : 'border-green-200'
                    } focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                    value={formData.aadhaar}
                    onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                    placeholder="1234 5678 9012"
                    onClick={() => {
                      const text = (document.getElementById('aadharlabel') as HTMLLabelElement)?.innerText || '';
                      if (text) helperfunction(text);
                      }
                    }
                  />
                  {errors.aadhaar && (
                    <span className="absolute right-3 top-3 text-red-500">✗</span>
                  )}
                </div>
                {errors.aadhaar && (
                  <p className="text-red-500 text-sm mt-1">{errors.aadhaar}</p>
                )}
              </div>

              {/* Location Grid */}
              <div className="sm:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {/* Village Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" id='villagelabel'>
                      {translations[language].village}
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.village ? 'border-red-500' : 'border-green-200'
                      } focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      onClick={() => {
                      const text = (document.getElementById('villagelabel') as HTMLLabelElement)?.innerText || '';
                      if (text) helperfunction(text);
                      }
                    }
                    />
                    {errors.village && (
                    <p className="text-red-500 text-sm mt-1">{errors.village}</p>
                    )}
                  </div>

                  {/* District Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" id='district'>
                      {translations[language].district}
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.district ? 'border-red-500' : 'border-green-200'
                      } focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      onClick={() => {
                      const text = (document.getElementById('district') as HTMLLabelElement)?.innerText || '';
                      if (text) helperfunction(text);
                      }
                    }
                    />
                    {errors.district && (
                  <p className="text-red-500 text-sm mt-1">{errors.district}</p>
                )}
                  </div>

                  {/* State Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" id="state">
                      {translations[language].state}
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.state ? 'border-red-500' : 'border-green-200'
                      } focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      onClick={() => {
                      const text = (document.getElementById('state') as HTMLLabelElement)?.innerText || '';
                      if (text) helperfunction(text);
                      }
                    }
                    />
                    {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
                  </div>

                  {/* Pin Code Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" id="pincodelabel">
                      {translations[language].pinCode}
                    </label>
                    <input
                      type="text"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.pinCode ? 'border-red-500' : 'border-green-200'
                      } focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                      value={formData.pinCode}
                      onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                      placeholder="6 digits"
                      onClick={() => {
                      const text = (document.getElementById('pincodelabel') as HTMLLabelElement)?.innerText || '';
                      if (text) helperfunction(text);
                      }
                    }
                    />
                    {errors.pinCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.pinCode}</p>
                )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Details Card */}
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <DocumentTextIcon className="h-8 w-8 text-green-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Business Information</h2>
            </div>

            {/* Business Type Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" id="bussinesstype">
                    {translations[language].businessType}
                  </label>
                  <select
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.businessType ? 'border-red-500' : 'border-green-200'
                    } focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white`}
                    value={formData.businessType}
                    onChange={(e) => {
                      setFormData({ ...formData, businessType: e.target.value })
                      const selectedText = e.target.options[e.target.selectedIndex].text;
                      helperfunction(selectedText);
                      setDropdownOpened(true);
                    }}
                    onBlur={() => setDropdownOpened(false)}
                    onClick={() => {
                      if (!dropdownOpened) {
                        const text = (document.getElementById('bussinesstype') as HTMLLabelElement)?.innerText || '';
                        if (text) helperfunction(text);
                      }
                      }
                    }
                  >
                    <option value="">{translations[language].businessType}</option>
                    {Object.entries(translations[language].businessTypes).map(([key, value]) => (
                      <option key={key} value={key} className="text-gray-700">
                        {value as string}
                      </option>
                    ))}
                  </select>
                  {errors.businessType && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>
                  )}
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" id='proof'
                  
                  >
                    {translations[language].businessProof}
                  </label>
                  <div className={`border-2 border-dashed ${
                    errors.businessProof ? 'border-red-500' : 'border-green-300'
                  } rounded-lg p-6 text-center hover:border-green-500 transition-colors`} onMouseEnter={ () =>{
                        const text = (document.getElementById('proof') as HTMLLabelElement)?.innerText || '';
                        if (text) helperfunction(text);
                      }
                      }>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                      id="businessProof"
                      onChange={(e) => setFormData({ ...formData, businessProof: e.target.files?.[0] || null })}
                    />
                    <label htmlFor="businessProof" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <CloudArrowUpIcon className="h-12 w-12 text-green-500 mb-2" />
                        <p className="text-sm text-gray-600">
                          {formData.businessProof 
                            ? formData.businessProof.name 
                            : translations[language].businessProof}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          (PDF, JPG, PNG up to 5MB)
                        </p>
                      </div>
                    </label>
                    {errors.businessProof && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessProof}</p>
                  )}
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div onMouseEnter={ () =>{
                        const text = (document.getElementById('method') as HTMLLabelElement)?.innerText || '';
                        if (text) helperfunction(text);
              }}>
                <label className="block text-sm font-medium text-gray-700 mb-2" id='method'>
                  {translations[language].deliveryMethod}
                </label>
                <div className="space-y-4">
                  {Object.entries(translations[language].deliveryOptions).map(([key, value]) => (
                    <label 
                      key={key} 
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer ${
                        formData.deliveryMethod === key 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliveryMethod"
                        id='methodselect'
                        value={key}
                        checked={formData.deliveryMethod === key}
                        onChange={(e) => 
                          {setFormData({ ...formData, deliveryMethod: e.target.value })
                          helperfunction(e.target.value)

                        }}
                        className="h-5 w-5 text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-3 text-gray-700">{value as string}</span>
                    </label>
                  ))}
                </div>
                {errors.deliveryMethod && (
                    <p className="text-red-500 text-sm mt-1">{errors.deliveryMethod}</p>
                )}
              </div>
            </div>
          </div>

          {/* Financial Details Card */}
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <BanknotesIcon className="h-8 w-8 text-green-600" />
              <h2 className="text-2xl font-semibold text-gray-800">Financial Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Bank Details */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" id='bankname'>
                    {translations[language].bankName}
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.bankName ? 'border-red-500' : 'border-green-200'
                    } focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    onClick={()=>{
                      const text = (document.getElementById('bankname') as HTMLLabelElement)?.innerText || '';
                        if (text) helperfunction(text);
                    }}
                    placeholder="State Bank of India"
                  />
                    {errors.bankName && (
                        <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" id="accountno">
                    {translations[language].accountNumber}
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.accountNumber ? 'border-red-500' : 'border-green-200'
                    } focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    placeholder="1234567890"
                    onClick={()=>{
                      const text = (document.getElementById('accountno') as HTMLLabelElement)?.innerText || '';
                        if (text) helperfunction(text);
                    }}
                  />
                    {errors.accountNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>
                    )}
                </div>
              </div>

              {/* IFSC & UPI */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" id='ifsc'>
                    {translations[language].ifsc}
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.ifsc ? 'border-red-500' : 'border-green-200'
                    } focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                    value={formData.ifsc}
                    onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
                    placeholder="SBIN0000123"
                    onClick={()=>{
                      const text = (document.getElementById('ifsc') as HTMLLabelElement)?.innerText || '';
                        if (text) helperfunction(text);
                    }}
                  />
                    {errors.ifsc && (
                        <p className="text-red-500 text-sm mt-1">{errors.ifsc}</p>
                    )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" id="upi">
                    {translations[language].upi}
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.upi ? 'border-red-500' : 'border-green-200'
                    } focus:ring-2 focus:ring-green-500 focus:border-green-500`}
                    value={formData.upi}
                    onChange={(e) => setFormData({ ...formData, upi: e.target.value })}
                    placeholder="username@bank"
                    onClick={()=>{
                      const text = (document.getElementById('upi') as HTMLLabelElement)?.innerText || '';
                        if (text) helperfunction(text);
                    }}
                  />
                  
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6" id='addinfo'>
              {translations[language].additionalDetails}
            </h2>
            <textarea
              className="w-full px-4 py-3 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows={4}
              value={formData.additionalDetails}
              onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
              placeholder={translations[language].additionalDetails + "..."}
              onClick={()=>{
                const text = (document.getElementById('addinfo') as HTMLLabelElement)?.innerText || '';
                  if (text) helperfunction(text);
              }}
            />
          </div>

          {/* Submit Section */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              id='subbtn'
              onMouseOver={()=>{
                const text = (document.getElementById('subbtn') as HTMLLabelElement)?.innerText || '';
                  if (text) helperfunction(text);
              }}
              className="w-full sm:w-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105"
            >
              {translations[language].submit}
            </button>

            {statusMessage && (
              <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-center justify-center gap-2">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
                {statusMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}