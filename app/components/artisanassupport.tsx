'use client';
import { useState } from 'react';
import { CurrencyRupeeIcon, BookOpenIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface FormOverlayProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function SupportPage() {
  const [showFinancialForm, setShowFinancialForm] = useState(false);
  const [showTrainingForm, setShowTrainingForm] = useState(false);
  const [showMentorForm, setShowMentorForm] = useState(false);
  const [lang] = useState<keyof typeof translations>(localStorage.getItem('lang') as keyof typeof translations || 'en');
  const translations = {
    en: {
      financialSupport: "Financial Support",
      skillDevelopment: "Skill Development",
      mentorshipProgram: "Mentorship Program",
      applyNow: "Apply Now",
      viewSchedule: "View Schedule",
      browseMentors: "Browse Mentors",
      financialSupportApplication: "Financial Support Application",
      fullName: "Full Name",
      email: "Email",
      reasonForApplication: "Reason for Application",
      submitApplication: "Submit Application",
      workshopRegistration: "Workshop Registration",
      selectWorkshop: "Select Workshop",
      preferredDate: "Preferred Date",
      specialRequirements: "Special Requirements",
      registerNow: "Register Now",
      mentorRequest: "Mentor Request",
      selectMentor: "Select Mentor",
      yourMessage: "Your Message",
      availability: "Availability",
      weekdays: "Weekdays",
      weekends: "Weekends",
      sendRequest: "Send Request",
      emergencyFunds: "Emergency funds for artisans",
      zeroInterestLoans: "Zero-interest loans",
      schemeAssistance: "Government scheme assistance",
      freeWorkshops: "Free craft workshops",
      digitalTraining: "Digital marketing training",
      qualitySessions: "Product quality sessions",
      recentMentors: "Recent Mentors",
      mentorList: [
        "Ramesh Patel (Pottery)",
        "Sunita Devi (Textiles)",
        "Anil Kumar (Woodwork)"
      ],
      workshopOptions: [
        "Digital Marketing Basics",
        "Advanced Craft Techniques",
        "Product Quality Control"
      ],
      mentorOptions: [
        "Ramesh Patel (Pottery)",
        "Sunita Devi (Textiles)",
        "Anil Kumar (Woodwork)"
      ],
      connectWithMentors: "Connect with experienced mentors in your field"
    },
    hi: {
      financialSupport: "वित्तीय सहायता",
      skillDevelopment: "कौशल विकास",
      mentorshipProgram: "मेंटरशिप कार्यक्रम",
      applyNow: "अब आवेदन करें",
      viewSchedule: "अनुसूची देखें",
      browseMentors: "मेंटर्स ब्राउज़ करें",
      financialSupportApplication: "वित्तीय सहायता आवेदन",
      fullName: "पूर्ण नाम",
      email: "ईमेल",
      reasonForApplication: "आवेदन का कारण",
      submitApplication: "आवेदन जमा करें",
      workshopRegistration: "कार्यशाला पंजीकरण",
      selectWorkshop: "कार्यशाला चुनें",
      preferredDate: "पसंदीदा तिथि",
      specialRequirements: "विशेष आवश्यकताएं",
      registerNow: "अब पंजीकरण करें",
      mentorRequest: "मेंटर अनुरोध",
      selectMentor: "मेंटर चुनें",
      yourMessage: "आपका संदेश",
      availability: "उपलब्धता",
      weekdays: "सप्ताह के दिन",
      weekends: "सप्ताहांत",
      sendRequest: "अनुरोध भेजें",
      emergencyFunds: "कलाकारों के लिए आपातकालीन निधि",
      zeroInterestLoans: "ब्याज मुक्त ऋण",
      schemeAssistance: "सरकारी योजना सहायता",
      freeWorkshops: "नि:शुल्क शिल्प कार्यशालाएं",
      digitalTraining: "डिजिटल मार्केटिंग प्रशिक्षण",
      qualitySessions: "उत्पाद गुणवत्ता सत्र",
      recentMentors: "हाल के मेंटर्स",
      connectWithMentors: "अपने क्षेत्र में अनुभवी मेंटर्स से जुड़ें",
      mentorList: [
        "रमेश पटेल (मिट्टी के बर्तन)",
        "सुनीता देवी (वस्त्र)",
        "अनिल कुमार (लकड़ी का काम)"
      ],
      workshopOptions: [
        "डिजिटल मार्केटिंग मूल बातें",
        "उन्नत शिल्प तकनीकें",
        "उत्पाद गुणवत्ता नियंत्रण"
      ],
      mentorOptions: [
        "रमेश पटेल (मिट्टी के बर्तन)",
        "सुनीता देवी (वस्त्र)",
        "अनिल कुमार (लकड़ी का काम)"
      ]
    },
    ml: {
      financialSupport: "സാമ്പത്തിക സഹായം",
      skillDevelopment: "നൈപുണ്യ വികസനം",
      mentorshipProgram: "മെന്റർഷിപ്പ് പ്രോഗ്രാം",
      applyNow: "ഇപ്പോൾ അപേക്ഷിക്കുക",
      viewSchedule: "ഷെഡ്യൂൾ കാണുക",
      browseMentors: "മെന്റർമാരെ ബ്രൌസ് ചെയ്യുക",
      financialSupportApplication: "സാമ്പത്തിക സഹായ അപേക്ഷ",
       connectWithMentors: "നിങ്ങളുടെ മേഖലയിലെ പരിചയസമ്പന്നരായ മെന്റർമാരുമായി ബന്ധപ്പെടുക",
      fullName: "പൂർണ്ണ നാമം",
      email: "ഇമെയിൽ",
      reasonForApplication: "അപേക്ഷയുടെ കാരണം",
      submitApplication: "അപേക്ഷ സമർപ്പിക്കുക",
      workshopRegistration: "വർക്ക്ഷോപ്പ് രജിസ്ട്രേഷൻ",
      selectWorkshop: "വർക്ക്ഷോപ്പ് തിരഞ്ഞെടുക്കുക",
      preferredDate: "മുൻഗണനാ തീയതി",
      specialRequirements: "പ്രത്യേക ആവശ്യങ്ങൾ",
      registerNow: "ഇപ്പോൾ രജിസ്ടർ ചെയ്യുക",
      mentorRequest: "മെന്റർ അഭ്യർത്ഥന",
      selectMentor: "മെന്റർ തിരഞ്ഞെടുക്കുക",
      yourMessage: "നിങ്ങളുടെ സന്ദേശം",
      availability: "ലഭ്യത",
      weekdays: "പ്രവൃത്തി ദിവസങ്ങൾ",
      weekends: "വാരാന്തങ്ങൾ",
      sendRequest: "അഭ്യർത്ഥന അയയ്ക്കുക",
      emergencyFunds: "കലാകാരൻമാർക്കുള്ള അടിയന്തര ധനസഹായം",
      zeroInterestLoans: "പലിശ ഇല്ലാത്ത വായ്പകൾ",
      schemeAssistance: "സർക്കാർ പദ്ധതികളുടെ സഹായം",
      freeWorkshops: "ഉപദേശക വർക്ക്ഷോപ്പുകൾ",
      digitalTraining: "ഡിജിറ്റൽ മാർക്കറ്റിംഗ് പരിശീലനം",
      qualitySessions: "ഉൽപ്പന്ന ഗുണനിലവാര ക്ലാസുകൾ",
      recentMentors: "സമീപകാല മെന്റർമാർ",
      mentorList: [
        "രമേഷ് പട്ടേല്‍ (മണ്ണ്)",
        "സുനിതാ ദേവി (വസ്ത്രം)",
        "അനില്‍ കുമാര്‍ (മരം)"
      ],
      workshopOptions: [
        "ഡിജിറ്റൽ മാർക്കറ്റിംഗ് അടിസ്ഥാനങ്ങൾ",
        "ഉന്നത ശില്‍പ സാങ്കേതികവിദ്യകള്‍",
        "ഉൽപ്പന്ന ഗുണനിലവാര നിയന്ത്രണം"
      ],
      mentorOptions: [
        "രമേഷ് പട്ടേല്‍ (മണ്ണ്)",
        "സുനിതാ ദേവി (വസ്ത്രം)",
        "അനില്‍ കുമാര്‍ (മരം)"
      ]
    },
    ta: {
      financialSupport: "நிதி உதவி",
      skillDevelopment: "திறன் மேம்பாடு",
      mentorshipProgram: "மென்டர்ஷிப் திட்டம்",
      applyNow: "இப்போது விண்ணப்பிக்கவும்",
      viewSchedule: "திட்ட அட்டவணை காண்க",
      browseMentors: "மென்டர்களை உலாவு",
      financialSupportApplication: "நிதி உதவி விண்ணப்பம்",
       connectWithMentors: "உங்கள் துறையில் அனுபவம் வாய்ந்த மென்டர்களை தொடர்புகொள்க",
      fullName: "முழு பெயர்",
      email: "மின்னஞ்சல்",
      reasonForApplication: "விண்ணப்பத்திற்கான காரணம்",
      submitApplication: "விண்ணப்பத்தை சமர்ப்பிக்கவும்",
      workshopRegistration: "பயிற்சி பதிவு",
      selectWorkshop: "பயிற்சியை தேர்ந்தெடுக்கவும்",
      preferredDate: "விருப்ப தேதி",
      specialRequirements: "சிறப்பு தேவைகள்",
      registerNow: "இப்போது பதிவு செய்யவும்",
      mentorRequest: "மென்டர் வேண்டுகோள்",
      selectMentor: "மென்டரை தேர்ந்தெடுக்கவும்",
      yourMessage: "உங்கள் செய்தி",
      availability: "கிடைப்பதன்மை",
      weekdays: "வாரத்தின் நாட்கள்",
      weekends: "வார இறுதி",
      sendRequest: "வேண்டுகோளை அனுப்பவும்",
      emergencyFunds: "கலைஞர்களுக்கான அவசர நிதி",
      zeroInterestLoans: "வட்டி இல்லா கடன்கள்",
      schemeAssistance: "அரசுத் திட்ட உதவி",
      freeWorkshops: "இலவச கைவினைப் பயிற்சிகள்",
      digitalTraining: "டிஜிட்டல் மார்க்கெட்டிங் பயிற்சி",
      qualitySessions: "தயாரிப்பு தர செயல்முறைகள்",
      recentMentors: "சமீபத்திய மென்டர்கள்",
      mentorList: [
        "ரமேஷ் பட்டேல் (மண் வேலை)",
        "சுனிதா தேவி (நூல்தறி)",
        "அனில் குமார் (மரம் வேலை)"
      ],
      workshopOptions: [
        "டிஜிட்டல் மார்க்கெட்டிங் அடிப்படை",
        "மேம்பட்ட கைவினை நுட்பங்கள்",
        "தயாரிப்பு தரக் கட்டுப்பாடு"
      ],
      mentorOptions: [
        "ரமேஷ் பட்டேல் (மண் வேலை)",
        "சுனிதா தேவி (நூல்தறி)",
        "அனில் குமார் (மரம் வேலை)"
      ]
    }
  };


  const FormOverlay = ({ children, onClose }: FormOverlayProps) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full relative animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
        >
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>
        {children}
      </div>
    </div>
  );

  return (
    <div className="h-170 sm:h-auto">
      <div className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Financial Assistance */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-50">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-green-100 rounded-xl">
                <CurrencyRupeeIcon className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{translations[lang].financialSupport}</h2>
            </div>
            <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-6">
              <li>{translations[lang].emergencyFunds}</li>
              <li>{translations[lang].zeroInterestLoans}</li>
              <li>{translations[lang].schemeAssistance}</li>
            </ul>
            <button 
              onClick={() => setShowFinancialForm(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {translations[lang].applyNow}
              <span className="text-xl">→</span>
            </button>
          </div>

          {/* Training Programs */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-50">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-green-100 rounded-xl">
                <BookOpenIcon className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{translations[lang].skillDevelopment}</h2>
            </div>
            <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-6">
              <li>{translations[lang].freeWorkshops}</li>
              <li>{translations[lang].digitalTraining}</li>
              <li>{translations[lang].qualitySessions}</li>
            </ul>
            <button 
              onClick={() => setShowTrainingForm(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {translations[lang].viewSchedule}
              <span className="text-xl">→</span>
            </button>
          </div>

          {/* Mentorship */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-50 md:col-span-2 ">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-green-100 rounded-xl">
                <UserGroupIcon className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{translations[lang].mentorshipProgram}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-6 text-lg">
                  {translations[lang].connectWithMentors}
                </p>
                <button 
                  onClick={() => setShowMentorForm(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  {translations[lang].browseMentors}
                  <span className="text-xl">→</span>
                </button>
              </div>
              <div className="border-l pl-6 border-green-100">
                <p className="text-sm text-gray-500 mb-4 font-medium">{translations[lang].recentMentors}</p>
                <ul className="space-y-3">
                  <li className="text-sm p-3 hover:bg-green-50 rounded-lg cursor-pointer">{translations[lang].mentorList[0]}</li>
                  <li className="text-sm p-3 hover:bg-green-50 rounded-lg cursor-pointer">{translations[lang].mentorList[1]}</li>
                  <li className="text-sm p-3 hover:bg-green-50 rounded-lg cursor-pointer">{translations[lang].mentorList[2]}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Form Modal */}
      {showFinancialForm && (
        <FormOverlay onClose={() => setShowFinancialForm(false)}>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{translations[lang].financialSupportApplication}</h3>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{translations[lang].fullName}</label>
              <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{translations[lang].email}</label>
              <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{translations[lang].reasonForApplication}</label>
              <textarea rows={2} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors">
              {translations[lang].submitApplication}
            </button>
          </form>
        </FormOverlay>
      )}

      {/* Training Form Modal */}
      {showTrainingForm && (
        <FormOverlay onClose={() => setShowTrainingForm(false)}>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{translations[lang].workshopRegistration}</h3>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{translations[lang].selectWorkshop}</label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option>{translations[lang].workshopOptions[0]}</option>
                <option>{translations[lang].workshopOptions[1]}</option>
                <option>{translations[lang].workshopOptions[2]}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{translations[lang].preferredDate}</label>
              <input type="date" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{translations[lang].specialRequirements}</label>
              <textarea rows={2} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors">
              {translations[lang].registerNow}
            </button>
          </form>
        </FormOverlay>
      )}

      {/* Mentor Form Modal */}
      {showMentorForm && (
        <FormOverlay onClose={() => setShowMentorForm(false)}>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{translations[lang].mentorRequest}</h3>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{translations[lang].selectMentor}</label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option>{translations[lang].mentorOptions[0]}</option>
                <option>{translations[lang].mentorOptions[1]}</option>
                <option>{translations[lang].mentorOptions[2]}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{translations[lang].yourMessage}</label>
              <textarea 
                rows={4}
                placeholder="Explain what kind of guidance you're looking for..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{translations[lang].availability}</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                  <span className="ml-2">{translations[lang].weekdays}</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                  <span className="ml-2">{translations[lang].weekends}</span>
                </label>
              </div>
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors">
              {translations[lang].sendRequest}
            </button>
          </form>
        </FormOverlay>
      )}
    </div>
  );
}