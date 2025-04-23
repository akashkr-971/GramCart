'use client';

import { useState, useEffect } from "react";
export default function HeroBanner() {

  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'ml'>('en');
  
    useEffect(() => {
      const storedLang = localStorage.getItem('lang') as 'en' | 'hi' | null;
      if (storedLang) {
        setLang(storedLang);
      }
    }, []);

  const translations = {
    en: {
      title: "Welcome to",
      app_name:"GramCart",
      subtitle: "Bridging Rural Farmers with Urban Markets - Direct, Fair & Sustainable",
      shopNow: "Shop Now",
      sellProducts: "Sell Products",
      farmersConnected: "Farmers Connected",
      organicProducts: "Organic Products",
      deliveryPromise: "Delivery Promise",
      farmersCount: "5,000+",
      organicCount: "100%",
      deliveryTime: "48h",
    },
    hi: {
      app_name:"ग्रेमकार्ट",
      title: "में आपका स्वागत है",
      subtitle: "ग्रामीण किसानों को शहरी बाजारों से जोड़ना - प्रत्यक्ष, निष्पक्ष और सतत",
      shopNow: "अब खरीदें",
      sellProducts: "उत्पाद बेचें",
      farmersConnected: "किसान जुड़े हुए हैं",
      organicProducts: "जैविक उत्पाद",
      deliveryPromise: "डिलीवरी का वादा",
      farmersCount: "5,000+",
      organicCount: "100%",
      deliveryTime: "48h",
    },
    ml: {
      title: "ഗ്രാംകാർട്ട്-ലേക്ക്",
      app_name:"സ്വാഗതം",
      subtitle: "ഗ്രാമീണ കൃഷിവാരികൾ ഉഭയ നഗര മാർക്കറ്റുകൾക്കൊപ്പം - നേരിട്ടും, നീതിനടപടിയും, സ്ഥിരതയും",
      shopNow: "ഇപ്പോൾ ഷോപ്പ് ചെയ്യൂ",
      sellProducts: "ഉല്പന്നങ്ങൾ വിറ്റഴിയ്ക്കുക",
      farmersConnected: "കൃഷിവാരികൾ ബന്ധപ്പെട്ടു",
      organicProducts: "ജൈവ ഉൽപ്പന്നങ്ങൾ",
      deliveryPromise: "ഡെലിവറി വാഗ്ദാനം",
      farmersCount: "5,000+",
      organicCount: "100%",
      deliveryTime: "48 മണിക്കൂർ",
    },
    ta: {
      app_name:'கிராம்கார்ட்',
      title: "-க்கு வரவேற்கின்றேன்",
      subtitle: "கிராம விவசாயிகளை நகர மார்க்கெட்டுடன் இணைத்தல் - நேரடியாக, நியாயமான மற்றும் நிலையானது",
      shopNow: "இப்போது வாங்கவும்",
      sellProducts: "உற்பத்திகளை விற்கவும்",
      farmersConnected: "விவசாயிகள் இணைக்கப்பட்டுள்ளார்கள்",
      organicProducts: "கரிய உற்பத்திகள்",
      deliveryPromise: "டெலிவரி வாக்குறுதி",
      farmersCount: "5,000+",
      organicCount: "100%",
      deliveryTime: "48 மணிநேரம்",
    },
  };

  return (
    <div className="relative bg-green-800 text-white py-24 px-4 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/farmer.jpeg')" }}>
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg" 
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up">
              {translations[lang].title}
              <span className="block text-green-300 mt-2">{translations[lang].app_name}</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-green-100 font-medium max-w-2xl mx-auto lg:mx-0">
              {translations[lang].subtitle}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-white text-green-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-100 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                onClick={() => window.scrollTo({ top: document.getElementById('recommended')?.offsetTop, behavior: 'smooth' })}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {translations[lang].shopNow}
              </button>
              <button className="border-2 border-green-300 text-green-100 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-900/50 transition-all transform hover:scale-105">
                {translations[lang].sellProducts}
              </button>
            </div>
          </div>
        </div>
        {/* Stats Bar */}
        <div className="lg:mt-24 bg-white/10 backdrop-blur-sm p-6 rounded-2xl flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-300">5,000+</div>
            <div className="text-sm text-green-100">{translations[lang].farmersConnected}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-300">100%</div>
            <div className="text-sm text-green-100">{translations[lang].organicProducts}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-300">48h</div>
            <div className="text-sm text-green-100">{translations[lang].deliveryPromise}</div>
          </div>
        </div>
      </div>

      {/* Add this to your globals.css for animations */}
      
    </div>
  );
}