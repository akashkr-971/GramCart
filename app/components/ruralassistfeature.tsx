'use client';
import React, { useEffect, useState } from 'react';

type Language = 'en' | 'hi' | 'ml' | 'ta';

const translations = {
  en: [
    '🚨 Emergency Alert: Heavy rains predicted in Maharashtra – Harvest suggestions for farmers',
    '📈 Cotton prices expected to rise 15% next week',
    '🌱 High-yield seeds now in stock',
    '🧵 Handmade shawls available – support local artisans!',
    '🍅 Tomato prices set to spike – buy early!',
    '🥛 Fresh cow milk now delivered daily!',
  ],
  hi: [
    '🚨 आपातकालीन सूचना: महाराष्ट्र में भारी बारिश की संभावना – किसानों के लिए फसल सलाह',
    '📈 कपास की कीमतें अगले सप्ताह 15% बढ़ सकती हैं',
    '🌱 उच्च उपज वाले बीज अब स्टॉक में उपलब्ध हैं',
    '🧵 हस्तनिर्मित शॉल उपलब्ध – स्थानीय कारीगरों का समर्थन करें!',
    '🍅 टमाटर की कीमतें बढ़ने वाली हैं – पहले से खरीदें!',
    '🥛 ताजा गाय का दूध अब रोजाना घर पर!',
  ],
  ml: [
    '🚨 അടിയന്തര അലേര്‍ട്ട്: മഹാരാഷ്ട്രയില്‍ ശക്തമായ മഴയ്ക്ക് സാധ്യത – കർഷകർക്കുള്ള വിള നിർദേശങ്ങൾ',
    '📈 പഞ്ചസാരയുടെ വില അടുത്ത വാരത്തില്‍ 15% വരെ കൂടും',
    '🌱 ഉയർന്ന വിളവുള്ള വിത്തുകൾ സ്റ്റോക്കില്‍ ലഭ്യമാണ്',
    '🧵 ഹസ്തനിർമിത ഷാളുകൾ ലഭ്യമാണ് – പ്രാദേശിക കലയെ പിന്താങ്ങുക!',
    '🍅 തക്കാളി വില ഉയരാൻ പോകുന്നു – നേരത്തെ വാങ്ങൂ!',
    '🥛 പുതിയ പശുവിന്റെ പാല്‍ ഇപ്പോൾ ദിവസേന വിതരണം ചെയ്യുന്നു!',
  ],
  ta: [
    '🚨 அவசர எச்சரிக்கை: மகாராஷ்டிராவில் கனமழைக்கு வாய்ப்பு – விவசாயிகளுக்கான அறுவடை பரிந்துரைகள்',
    '📈 பருத்தி விலை அடுத்த வாரம் 15% உயர வாய்ப்பு',
    '🌱 அதிக விளைச்சல் தரும் விதைகள் இப்போது கிடைக்கின்றன',
    '🧵 கைதையல் பட்டுப்புடவைகள் – உள்ளூர் கலைஞர்களை ஆதரிக்கவும்!',
    '🍅 தக்காளி விலை உயரும் – விரைவில் வாங்கவும்!',
    '🥛 பசும்பால் இப்போது தினமும் வீடுகளுக்கு வழங்கப்படும்!',
  ],
};

// Regex to remove emojis (simple version)
const stripEmojis = (text: string) => text.replace(/[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}]/gu, '').trim();

export default function MarqueeAlert() {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as Language;
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);

  const speakAlert = async (message: string): Promise<void> => {
    const cleanedMessage = stripEmojis(message);

    if (lang === 'ml' || lang === 'ta') {
      // Call custom TTS API
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: cleanedMessage, lang }),
        });

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      } catch (err) {
        console.error('TTS API failed:', err);
      }
    } else {
      if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(cleanedMessage);
        window.speechSynthesis.speak(speech);
      }
    }
  };

  const alerts = translations[lang];

  return (
    <div className="w-full z-50 bg-red-100 border-b border-red-300 overflow-hidden whitespace-nowrap h-12">
      <div className="animate-marquee inline-block min-w-full text-3xl">
        {alerts.concat(alerts).map((msg, i) => (
          <span
            key={i}
            onClick={() => speakAlert(msg)}
            className="inline-block mx-8 text-xl mr-10 text-red-800 font-medium cursor-pointer"
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
