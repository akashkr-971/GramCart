'use client';

import { useState,useEffect } from 'react';

export default function Testimonials() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'ml'>('en');
  
    useEffect(() => {
      const storedLang = localStorage.getItem('lang') as 'en' | 'hi' | null;
      if (storedLang) {
        setLang(storedLang);
      }
    }, []);

  const translations: Record<'en' | 'hi' | 'ml' | 'ta', { name: string; feedback: string }[]> = {
    en: [
      {
        name: 'Ramesh',
        feedback: 'GramCart has made my life so much easier. I can now get all my farming tools delivered to my doorstep!',
      },
      {
        name: 'Sita',
        feedback: 'The quality of products is amazing, and the prices are very reasonable. Highly recommend GramCart!',
      },
      {
        name: 'Arjun',
        feedback: 'I love the variety of items available. It truly caters to the needs of rural areas.',
      },
    ],
    hi: [
      {
        name: 'रामेश',
        feedback: 'ग्रामकार्ट ने मेरी ज़िन्दगी को बहुत आसान बना दिया है। अब मैं अपने सभी कृषि उपकरण अपने घर तक मंगवा सकता हूँ!',
      },
      {
        name: 'सीता',
        feedback: 'उत्पादों की गुणवत्ता अद्भुत है, और कीमतें बहुत उचित हैं। मैं ग्रामकार्ट की सिफारिश करता हूँ!',
      },
      {
        name: 'अर्जुन',
        feedback: 'मुझे उपलब्ध वस्तुओं की विविधता बहुत पसंद है। यह वास्तव में ग्रामीण क्षेत्रों की जरूरतों को पूरा करता है।',
      },
    ],
    ml: [
      {
        name: 'രമേശ്',
        feedback: 'ഗ്രാംകാർട്ട് എന്റെ ജീവിതം എത്ര എളുപ്പമാക്കി. ഇപ്പോൾ ഞാന് എന്റെയെല്ലാം കാർഷിക ഉപകരണങ്ങൾ എന്റെ വീട്ടിലേക്ക് എത്തിച്ചേരാം!',
      },
      {
        name: 'സിത',
        feedback: 'ഉൽപ്പന്നങ്ങളുടെ ഗുണമേന്മ അദ്ഭുതമാണ്, വിലകൾ വളരെ യോജിക്കുന്നവയാണ്. ഗ്രാംകാർട്ടിനെ ഞാൻ ശുപാർശ ചെയ്യുന്നു!',
      },
      {
        name: 'അർജുൻ',
        feedback: 'ലഭ്യമായ വസ്തുക്കളുടെ വൈവിധ്യം എനിക്ക് ഇഷ്ടമാണ്. ഇത് ശരിക്കും ഗ്രാമീണ പ്രദേശങ്ങളുടെ ആവശ്യങ്ങളെ നിറവേറ്റുന്നു.',
      },
    ],
    ta: [
      {
        name: 'ரமேஷ்',
        feedback: 'கிராம்கார்ட் எனது வாழ்க்கையை மிகவும் எளிதாக்கியுள்ளது. இப்போது நான் என் அனைத்து விவசாய கருவிகளையும் எனது வீடிற்கு டெலிவரியாக பெற முடிகிறது!',
      },
      {
        name: 'சிதா',
        feedback: 'பொருட்களின் தரம் அதிசயமானது, மற்றும் விலைகள் மிகவும் பரிந்துரைக்கத்தக்கவை. கிராம்கார்ட்டை நான் பரிந்துரைக்கின்றேன்!',
      },
      {
        name: 'அர்ஜுன்',
        feedback: 'பொது கிடைக்கும் பொருட்களின் பல்வகைமையை நான் மிகவும் விரும்புகிறேன். இது உண்மையில் கிராமப்புறத்தின் தேவைகளை பூர்த்தி செய்கிறது.',
      },
    ],
  };

  return (
    <div>
      <div className="space-y-4">
        {translations[lang].map((testimonial, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-600"
          >
            <p className="text-gray-700 italic">&quot;{testimonial.feedback}&quot;</p>
            <h4 className="text-green-800 font-bold mt-2">- {testimonial.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}