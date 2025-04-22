'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const translations = {
  en: {
    logo: 'GramCart',
    cart: 'Cart',
    profile: 'Profile',
    logout: 'Logout',
    login: 'Login',
    signup: 'Sign Up',
  },
  hi: {
    logo: 'ग्रामकार्ट',
    cart: 'कार्ट',
    profile: 'प्रोफाइल',
    logout: 'लॉगआउट',
    login: 'लॉगिन',
    signup: 'साइन अप',
  },
  ml: {
    logo: 'ഗ്രാംകാർട്ട്',
    cart: 'കാർട്ട്',
    profile: 'പ്രൊഫൈൽ',
    logout: 'ലോഗ് ഔട്ട്',
    login: 'ലോഗിൻ',
    signup: 'സൈൻ അപ്പ്',
  },
  ta: {
    logo: 'கிராம்கார்ட்',
    cart: 'கார்ட்',
    profile: 'சுயவிவரம்',
    logout: 'போர்வை',
    login: 'உள்நுழைவு',
    signup: 'பதிவு',
  },
};

type Language = keyof typeof translations;

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    window.location.href = '/';
    console.log('Logged out successfully');
  };

  const setlanguage = (lang: Language) => {
    useEffect(() => {
      localStorage.setItem('lang', lang);
      window.location.reload();
    })
    setLanguage(lang);
  };

  return (
    <nav className="fixed bg-white/80 backdrop-blur-sm border-b border-green-100 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Side - Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-800">
              {translations[language].logo}
            </Link>
          </div>

          {/* Right Side - Auth & Language */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div>
              <select
                className="text-sm text-gray-500 hover:text-green-700 bg-transparent border-none focus:outline-none"
                defaultValue={language}
                onChange={(e) => setlanguage(e.target.value as Language)}
              >
                <option value="hi">हिन्दी</option>
                <option value="ml">മലയാളം</option>
                <option value="ta">தமிழ்</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/cart"
                  className="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {translations[language].cart}
                </Link>
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {translations[language].profile}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  {translations[language].logout}
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                >
                  {translations[language].login}
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  {translations[language].signup}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
