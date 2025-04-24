'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import DeliveryProfile from '../deliverycomponent/profile';
import Footer from '../components/Footer';
import Askai from '../sellercomponents/askai';
import Deliveries from '../deliverycomponent/delivery';
import Preferences from '../deliverycomponent/preferences';
import Dashboard from '../deliverycomponent/dashboard';
import DeliveryOnboarding from '../deliverycomponent/deliveryonboard';

const translations = {
  en: {
    dashboard: 'Dashboard',
    profile: 'Profile',
    login: 'Login',
    logout: 'Logout',
    signup: 'Sign Up',
    delivery: 'Delivery',
    preference: 'Preference and payment details',
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    profile: 'प्रोफ़ाइल',
    login: 'लॉग इन करें',
    logout: 'लॉग आउट',
    signup: 'साइन अप करें',
    delivery: 'डिलिवरी',
    preference: 'प्रेफरेंस और भुगतान विवरण',
  },
  ta: {
    dashboard: 'டாஷ்போர்டு',
    profile: 'சுயவிவரம்',
    login: 'உள்நுழைய',
    logout: 'வெளியேறு',
    signup: 'பதிவு செய்ய',
    delivery: 'விணக்கம்',
    preference: 'பிரெஃரென்ஸ் மற்றும் செலவேறு விவரங்கள்',
  },
  ml: {
    dashboard: 'ഡാഷ്ബോർഡ്',
    bookings: 'ബുക്കിംഗുകൾ',
    addProduct: 'ഉൽപ്പന്നം ചേർക്കുക',
    profile: 'പ്രൊഫൈൽ',
    login: 'ലോഗിൻ',
    logout: 'ലോഗ്‌ഔട്ട്',
    signup: 'സൈൻ അപ്പ്',
    delivery: 'ഡിലിവറി',
    preference: 'പ്രെഫറെന്സ് മറ്റുള്ള ചെലവേറുകൾ',
  },
};

type Language = keyof typeof translations;

export default function Delivery() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBar, setSelectedBar] = useState('Dashboard');
  const [language, setLanguage] = useState<Language>('en');
  const [isDataFilled, setIsDataFilled] = useState(false);

  const t = translations[language];

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }

      const { data } = await supabase.from('delivery').select('id').eq('id', userId).single();
      setIsDataFilled(!!data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as Language;
    if (storedLang && storedLang !== language) {
      setLanguage(storedLang);
    }
  }, []); 

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      localStorage.removeItem("userId");
      setIsLoggedIn(false);
    }
  };

  const setlanguage = (lang: Language) => {
    if (lang !== language) {
      localStorage.setItem('lang', lang);
      setLanguage(lang);
    }
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-sm border-b border-green-100 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/delivery" className="text-2xl font-bold text-green-800">
                Gram<span className="text-green-600">Cart</span>
              </Link>
            </div>

            {isLoggedIn && isDataFilled ? (
              <div className="flex items-center justify-center gap-2 flex-grow">
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedBar === 'Dashboard' ? 'text-green-700 font-semibold bg-green-100' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                  }`}
                  onClick={() => setSelectedBar('Dashboard')}
                >
                  {t.dashboard}
                </button>

                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedBar === 'Delivery' ? 'text-green-700 font-semibold bg-green-100' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                  }`}
                  onClick={() => setSelectedBar('Delivery')}
                >
                  {t.delivery}
                </button>

                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedBar === 'preferenceandpayment' ? 'text-green-700 font-semibold bg-green-100' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                  }`}
                  onClick={() => setSelectedBar('preferenceandpayment')}
                >
                  {t.preference}
                </button>

                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedBar === 'Profile' ? 'text-green-700 font-semibold bg-green-100' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                  }`}
                  onClick={() => setSelectedBar('Profile')}
                >
                  {t.profile}
                </button>
              </div>
            ) : (
              <div className="text-red-600 text-sm font-medium">
                Please complete your data entry to access the dashboard.
              </div>
            )}

            <div className="flex items-center gap-4">
              <div className="hidden md:flex gap-2">
                <select
                  className="text-sm text-gray-500 hover:text-green-700 bg-transparent border-none focus:outline-none"
                  value={language}
                  onChange={(e) => setlanguage(e.target.value as Language)}
                >
                  <option value="hi">हिन्दी</option>
                  <option value="ml">മലയാളം</option>
                  <option value="ta">தமிழ்</option>
                  <option value="en">English</option>
                </select>
              </div>

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  {t.logout}
                </button>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    {t.login}
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  >
                    {t.signup}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Askai role="delivery" />

      {isDataFilled ? (
        <div className="bg-white">
          <div>
            {selectedBar === 'Dashboard' && <Dashboard />}
            {selectedBar === 'Delivery' && <Deliveries />}
            {selectedBar === 'preferenceandpayment' && <Preferences />}
            {selectedBar === 'Profile' && <DeliveryProfile />}
          </div>
        </div>
      ) : (
        <DeliveryOnboarding />
      )}

      <Footer />
    </>
  );
}
