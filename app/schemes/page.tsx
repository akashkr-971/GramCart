'use client';

import Navbar from "../components/NavBar";
import { useState, useEffect } from "react";

const translations = {
  en: {
    heading: "Empowering Rural Artisans & Entrepreneurs",
    missionStatement: "Our mission is to support rural artisans, creators, and entrepreneurs in reaching a wider audience and building sustainable businesses. Join us to leverage government schemes and resources tailored to rural growth.",
    schemesHeading: "Government & Private Schemes for Rural Entrepreneurs",
    schemesDescription: "There are several schemes available to help rural artisans and entrepreneurs access funding, training, and resources. Below are a few schemes that can help you get started.",
    schemesList: [
      { title: "PM Vishwakarma Yojana", description: "Financial support for traditional artisans" },
      { title: "Startup India Scheme", description: "Incubation, mentorship, and funding for entrepreneurs" },
      { title: "Khadi & Village Industries Programs", description: "For boosting local production and skill-building" },
      { title: "MSME Credit Support", description: "Access to low-interest loans and subsidies" }
    ],
    offerHeading: "What We Offer",
    offerDescription: "We provide a range of services to help you get started and grow your rural business. Take advantage of our support services designed specifically for artisans and entrepreneurs.",
    offerList: [
      { title: "Financial Assistance", description: "We guide you on accessing scheme-based funding and micro-financing to support your business" },
      { title: "Onboarding Help", description: "Need help listing your products? We assist you step-by-step in uploading and managing your shop" },
      { title: "Training & Guidance", description: "Learn how to market, price, and grow your rural business using modern tools and strategies" }
    ],
    assistanceButton: "Request Assistance",
    formTitle: "Assistance Application",
    formNamePlaceholder: "Your Name",
    formEmailPlaceholder: "Your Email",
    formMessagePlaceholder: "Tell us how we can help you...",
    cancelButton: "Cancel",
    submitButton: "Submit Application",
    successMessage: "Application submitted successfully!"
  },
  ml: {
    heading: "ഗ്രാമീണ കരകൗശലവിദഗ്ദ്ധർക്കും സംരംഭകർക്കും ശക്തിപ്പെടുത്തൽ",
    missionStatement: "വിപുലമായ പ്രേക്ഷകരെയെത്തിക്കാനും സുസ്ഥിരമായ ബിസിനസുകൾ നിർമ്മിക്കാനും ഗ്രാമീണ കരകൗശലവിദഗ്ദ്ധർക്കും സംരംഭകർക്കും ഞങ്ങൾ സഹായിക്കുന്നു. ഗ്രാമീണ വളർച്ചയ്ക്ക് അനുയോജ്യമായ സർക്കാർ പദ്ധതികളും വിഭവങ്ങളും ഉപയോഗിക്കാൻ ഞങ്ങളോടൊപ്പം ചേരുക.",
    schemesHeading: "ഗ്രാമീണ സംരംഭകർക്കുള്ള സർക്കാർ/പ്രൈവേറ്റ് പദ്ധതികൾ",
    schemesDescription: "ഫണ്ടിംഗ്, പരിശീലനം, വിഭവങ്ങൾ എന്നിവ ലഭ്യമാക്കാൻ നിരവധി പദ്ധതികൾ ലഭ്യമാണ്. താഴെ ആരംഭിക്കാൻ സഹായിക്കുന്ന ചില പദ്ധതികൾ കാണാം.",
    schemesList: [
      { title: "PM വിശ്വകർമ യോജന", description: "പരമ്പരാഗത കരകൗശലവിദഗ്ദ്ധർക്ക് സാമ്പത്തിക സഹായം" },
      { title: "സ്റ്റാർട്ടപ്പ് ഇന്ത്യ പദ്ധതി", description: "ഇൻക്യൂബേഷൻ, മെന്റർഷിപ്പ്, ഫണ്ടിംഗ്" },
      { title: "ഖാദി & ഗ്രാമോദ്യോഗ പ്രോഗ്രാമുകൾ", description: "പ്രാദേശിക ഉൽപാദനം, കഴിവുവികസനം" },
      { title: "എംഎസ്എംഇ ക്രെഡിറ്റ് സപ്പോർട്ട്", description: "കുറഞ്ഞ പലിശ വായ്പകൾ, സബ്സിഡികൾ" }
    ],
    offerHeading: "ഞങ്ങൾ നൽകുന്നവ",
    offerDescription: "നിങ്ങളുടെ ഗ്രാമീണ ബിസിനസ്സ് ആരംഭിക്കാനും വളർത്താനും ഞങ്ങൾ സേവനങ്ങൾ നൽകുന്നു. കരകൗശലവിദഗ്ദ്ധർക്കും സംരംഭകർക്കും വേണ്ടി രൂപകൽപ്പന ചെയ്ത സപ്പോർട്ട് സേവനങ്ങൾ പ്രയോജനപ്പെടുത്തുക.",
    offerList: [
      { title: "സാമ്പത്തിക സഹായം", description: "പദ്ധതി-അടിസ്ഥാനത്തിലുള്ള ഫണ്ടിംഗ് ലഭ്യമാക്കാൻ സഹായിക്കുന്നു" },
      { title: "ഓൺബോർഡിംഗ് സഹായം", description: "ഉൽപ്പന്നങ്ങൾ ലിസ്റ്റ് ചെയ്യാൻ സഹായിക്കുന്നു" },
      { title: "പരിശീലനം & മാർഗ്ഗനിർദ്ദേശം", description: "ആധുനിക ഉപകരണങ്ങൾ ഉപയോഗിച്ച് ബിസിനസ്സ് വളർത്തൽ" }
    ],
    assistanceButton: "സഹായം അഭ്യർത്ഥിക്കുക",
    formTitle: "സഹായ അപേക്ഷ",
    formNamePlaceholder: "നിങ്ങളുടെ പേര്",
    formEmailPlaceholder: "ഇമെയിൽ വിലാസം",
    formMessagePlaceholder: "എങ്ങനെ സഹായിക്കാനാകുമെന്ന് പറയുക...",
    cancelButton: "റദ്ദാക്കുക",
    submitButton: "അപേക്ഷ സമർപ്പിക്കുക",
    successMessage: "അപേക്ഷ വിജയകരമായി സമർപ്പിച്ചു!"
  },
  hi: {
    heading: "ग्रामीण कारीगरों और उद्यमियों को सशक्त बनाना",
    missionStatement: "हमारा मिशन ग्रामीण कारीगरों, रचनाकारों और उद्यमियों को व्यापक दर्शकों तक पहुंचने और स्थायी व्यवसाय बनाने में सहायता करना है। ग्रामीण विकास के लिए तैयार सरकारी योजनाओं और संसाधनों का लाभ उठाने के लिए हमसे जुड़ें।",
    schemesHeading: "ग्रामीण उद्यमियों के लिए सरकारी/निजी योजनाएं",
    schemesDescription: "ग्रामीण कारीगरों और उद्यमियों को फंडिंग, प्रशिक्षण और संसाधनों तक पहुंचने में मदद के लिए कई योजनाएं उपलब्ध हैं। नीचे कुछ योजनाएं दी गई हैं जो आपको शुरुआत करने में मदद कर सकती हैं।",
    schemesList: [
      { title: "PM विश्वकर्मा योजना", description: "पारंपरिक कारीगरों के लिए वित्तीय सहायता" },
      { title: "स्टार्टअप इंडिया योजना", description: "उद्यमियों के लिए इन्क्यूबेशन, मेंटरशिप और फंडिंग" },
      { title: "खादी और ग्रामोद्योग कार्यक्रम", description: "स्थानीय उत्पादन और कौशल विकास को बढ़ावा" },
      { title: "एमएसएमई क्रेडिट सपोर्ट", description: "कम ब्याज ऋण और सब्सिडी तक पहुंच" }
    ],
    offerHeading: "हम क्या प्रदान करते हैं",
    offerDescription: "हम आपके ग्रामीण व्यवसाय को शुरू करने और बढ़ाने में मदद के लिए विभिन्न सेवाएं प्रदान करते हैं। कारीगरों और उद्यमियों के लिए विशेष रूप से डिज़ाइन की गई हमारी सहायता सेवाओं का लाभ उठाएं।",
    offerList: [
      { title: "वित्तीय सहायता", description: "योजना-आधारित फंडिंग और माइक्रो-फाइनेंसिंग तक पहुंचने में मार्गदर्शन" },
      { title: "ऑनबोर्डिंग सहायता", description: "उत्पादों को सूचीबद्ध करने में चरण-दर-चरण सहायता" },
      { title: "प्रशिक्षण और मार्गदर्शन", description: "आधुनिक उपकरणों का उपयोग करके व्यवसाय बढ़ाना सीखें" }
    ],
    assistanceButton: "सहायता अनुरोध करें",
    formTitle: "सहायता आवेदन",
    formNamePlaceholder: "आपका नाम",
    formEmailPlaceholder: "ईमेल पता",
    formMessagePlaceholder: "हमें बताएं कि हम कैसे मदद कर सकते हैं...",
    cancelButton: "रद्द करें",
    submitButton: "आवेदन जमा करें",
    successMessage: "आवेदन सफलतापूर्वक जमा हो गया!"
  },
  ta: {
    heading: "கிராமப்புற கைவினைஞர்கள் மற்றும் தொழிலதிபர்களை மேம்படுத்துதல்",
    missionStatement: "கிராமப்புற கைவினைஞர்கள், தயாரிப்பாளர்கள் மற்றும் தொழிலதிபர்கள் பரவலான பார்வையாளர்களை அடையவும், நிலையான வணிகங்களை உருவாக்கவும் நாங்கள் உதவுகிறோம். கிராமப்புற வளர்ச்சிக்கான அரசு திட்டங்கள் மற்றும் வளங்களைப் பயன்படுத்த எங்களுடன் இணைக.",
    schemesHeading: "கிராமப்புற தொழிலதிபர்களுக்கான அரசு/தனியார் திட்டங்கள்",
    schemesDescription: "நிதி, பயிற்சி மற்றும் வளங்களை அணுக கிராமப்புற கைவினைஞர்கள் மற்றும் தொழிலதிபர்களுக்கு பல திட்டங்கள் உள்ளன. தொடங்க உதவும் சில திட்டங்கள் கீழே உள்ளன.",
    schemesList: [
      { title: "பிஎம் விஸ்வகர்மா திட்டம்", description: "பாரம்பரிய கைவினைஞர்களுக்கு நிதி உதவி" },
      { title: "ஸ்டார்ட்அப் இந்தியா திட்டம்", description: "இன்குபேஷன், மென்டர்ஷிப் மற்றும் நிதி" },
      { title: "காதி & கிராம தொழில் திட்டங்கள்", description: "உள்நாட்டு உற்பத்தி மற்றும் திறன் வளர்ச்சி" },
      { title: "எம்எஸ்எம்இ கிரெடிட் ஆதரவு", description: "குறைந்த வட்டி கடன்கள் மற்றும் நிதியுதவி" }
    ],
    offerHeading: "நாங்கள் வழங்கும் சேவைகள்",
    offerDescription: "உங்கள் கிராமப்புற வணிகத்தை தொடங்கவும் வளர்க்கவும் பல்வேறு சேவைகளை நாங்கள் வழங்குகிறோம். கைவினைஞர்கள் மற்றும் தொழிலதிபர்களுக்காக வடிவமைக்கப்பட்ட எங்கள் ஆதரவு சேவைகளைப் பயன்படுத்தவும்.",
    offerList: [
      { title: "நிதி உதவி", description: "திட்ட-அடிப்படையிலான நிதி மற்றும் மைக்ரோ-நிதி அணுக உதவி" },
      { title: "ஆன் போர்டிங் உதவி", description: "தயாரிப்புகளை பட்டியலிட உதவி" },
      { title: "பயிற்சி மற்றும் வழிகாட்டுதல்", description: "நவீன கருவிகளைப் பயன்படுத்தி வணிகத்தை வளர்த்துக் கொள்ளுங்கள்" }
    ],
    assistanceButton: "உதவி கோருக",
    formTitle: "உதவி விண்ணப்பம்",
    formNamePlaceholder: "உங்கள் பெயர்",
    formEmailPlaceholder: "மின்னஞ்சல் முகவரி",
    formMessagePlaceholder: "எங்களால் எப்படி உதவ முடியும் என்று சொல்லுங்கள்...",
    cancelButton: "ரத்து செய்",
    submitButton: "விண்ணப்பத்தை சமர்ப்பிக்கவும்",
    successMessage: "விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!"
  }
};

const SchemesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [lang, setLang] = useState<keyof typeof translations>('en');

  useEffect(() => {
    const savedLang = (localStorage.getItem('lang') as keyof typeof translations) || 'en';
    setLang(savedLang);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(translations[lang].successMessage);
    setShowForm(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="pt-28 pb-16 px-6 max-w-5xl mx-auto space-y-12">
        <h1 className="text-4xl font-extrabold text-green-800 mb-6">
          {translations[lang].heading}
        </h1>

        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
          {translations[lang].missionStatement}
        </p>

        <div className="bg-green-50 p-6 rounded-xl shadow-md mt-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            {translations[lang].schemesHeading}
          </h2>
          <p className="text-gray-700 mb-4">
            {translations[lang].schemesDescription}
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {translations[lang].schemesList.map((item, index) => (
              <li key={index}><strong>{item.title}:</strong> {item.description}</li>
            ))}
          </ul>
        </div>

        <div className="bg-yellow-50 p-6 rounded-xl shadow-md mt-12">
          <h2 className="text-2xl font-semibold text-yellow-800 mb-4">
            {translations[lang].offerHeading}
          </h2>
          <p className="text-gray-700 mb-4">
            {translations[lang].offerDescription}
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {translations[lang].offerList.map((item, index) => (
              <li key={index}><strong>{item.title}:</strong> {item.description}</li>
            ))}
          </ul>
        </div>

        <div className="text-center mt-12">
          {!showForm && (
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              onClick={() => setShowForm(true)}
            >
              {translations[lang].assistanceButton}
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-4 relative">
            <h3 className="text-2xl font-bold text-center text-green-700">
              {translations[lang].formTitle}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  placeholder={translations[lang].formNamePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder={translations[lang].formEmailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <textarea
                  name="message"
                  placeholder={translations[lang].formMessagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md h-28 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-red-600 hover:underline"
                >
                  {translations[lang].cancelButton}
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none"
                >
                  {translations[lang].submitButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchemesPage;