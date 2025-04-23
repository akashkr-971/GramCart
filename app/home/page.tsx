'use client';

import { useState,useEffect } from 'react';

import HeroBanner from '../components/HeroBanner';
import React from 'react';
import SearchBar from '../components/search';
import RecommendedItems from '../components/RecommendedItems';
import Categories from '../components/Categories';
import Testimonials from '../components/Testimonials';
import AddTestimonial from '../components/addtestimonial';
import Govtscheme from '../components/govtscheme';
import RuralAssistFeatures from '../components/ruralassistfeature';
import ArtisansNearYou from '../components/artisansnearyou';
import SupportCard from '../components/artisanassupport';

export default function HomePage() {
  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'ml'>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as 'en' | 'hi' | null;
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);
  
const translations = {
  en: {
    readalert: "Click on the alert to read aloud",
    section1: "Support Artisans Near You",
    section2: "Recommended for You",
    section3: "Shop by Category",
    section5: "What Our Customers Say",
    section6: "Have Exciting reviews",
    section7:"Artisans Support Programs",
    section8: "Government Schemes",
  },
  hi: {
    readalert: "अलर्ट पर क्लिक करें और अलाउड में पढ़ें",
    section1: "आपके नाम से सहयोग करें",
    section2: "आपके लिए अनुशंसा",
    section3: "वर्ग में खरीदें",
    section5: "हमारे ग्राहकों के बारे में",
    section6: "आपके लिए अनुशंसा",
    section7:"आपके नाम से सहयोग करें",
    section8: "सरकारी स्कीम्स",
  },
  ml: {
    readalert: "പ്രത്യേക അറിയിപ്പ് വായിക്കാൻ ക്ലിക്ക് ചെയ്യുക",
    section1: "നിങ്ങളുടെ അടുത്തുള്ള ശില്പികളെ പിന്തുണയ്‌ക്കുക",
    section2: "നിങ്ങളുടെ വേണ്ടി ശുപാർശ ചെയ്യപ്പെട്ടത്",
    section3: "വ്യക്തിഗത വിഭാഗം ആയി ഷോപ്പ് ചെയ്യുക",
    section5: "ഞങ്ങളുടെ ഉപഭോക്താക്കൾ എന്ത് പറയുന്നു",
    section6: "ആകർഷകമായ അവലോകനങ്ങൾ ലഭിക്കുക",
    section7: "ശില്പി പിന്തുണ പ്രോഗ്രാമുകൾ",
    section8: "സർക്കാരി പദ്ധതികൾ"
}
,
  ta:{
    readalert: "அலர்ட் பர் க்லிக் செய்யவும் அலாஉட் மேல் படுத்தவும்",
    section1: "உங்கள் பெயரில் உங்களை உதவும்",
    section2: "உங்கள் பெயரில் உதவும்",
    section3: "வர்க்கு உருவாக்கும்",
    section5: "உங்கள் பெயரில் உதவும்",
    section6: "உங்கள் பெயரில் உதவும்",
    section7:"உங்கள் பெயரில் உதவும்",
    section8: "கடவுச்சொற்கள்",
  }
}
  return (
    <div className="bg-gray-100 min-h-screen">
      <HeroBanner />
      <p className='text-center text-lg font-bold text-green-800 mb-1'>
        {translations[lang].readalert}
      </p>
      <RuralAssistFeatures />
      <SearchBar/>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">{translations[lang].section1}</h2>
        <ArtisansNearYou />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">{translations[lang].section2}</h2>
        <RecommendedItems />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">{translations[lang].section3}</h2>
        <Categories />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">{translations[lang].section5}</h2>
        <Testimonials />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">{translations[lang].section6}</h2>
        <AddTestimonial />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">{translations[lang].section7}</h2>
        <SupportCard />
      </div>
      <div className="container mx-auto px-4 py-8 mt-110 sm:mt-0">
        <h2 className="text-2xl font-bold text-green-800 mb-4">{translations[lang].section8}</h2>
        <Govtscheme />
      </div>
    </div>
  );
}