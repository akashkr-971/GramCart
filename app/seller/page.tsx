'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import AddProduct from '../sellercomponents/addproduct';
import Dashboard from '../sellercomponents/dashboard'; 
import Profile from '../sellercomponents/sellerprofile';
import Footer from '../components/Footer';
import Askai from '../sellercomponents/askai';
import Bookings from '../sellercomponents/bookings';

const translations = {
  en: {
    dashboard: 'Dashboard',
    bookings: 'Bookings',
    addProduct: 'Add Product',
    profile: 'Profile',
    login: 'Login',
    logout: 'Logout',
    signup: 'Sign Up'
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    bookings: 'बुकिंग्स',
    addProduct: 'उत्पाद जोड़ें',
    profile: 'प्रोफ़ाइल',
    login: 'लॉग इन करें',
    logout: 'लॉग आउट',
    signup: 'साइन अप करें'
  },
  ta: {
    dashboard: 'டாஷ்போர்டு',
    bookings: 'முன்பதிவுகள்',
    addProduct: 'தயாரிப்பை சேர்',
    profile: 'சுயவிவரம்',
    login: 'உள்நுழைய',
    logout: 'வெளியேறு',
    signup: 'பதிவு செய்ய' 
  },
  ml: {
    dashboard: 'ഡാഷ്ബോർഡ്',
    bookings: 'ബുക്കിംഗുകൾ',
    addProduct: 'ഉൽപ്പന്നം ചേർക്കുക',
    profile: 'പ്രൊഫൈൽ',
    login: 'ലോഗിൻ',
    logout: 'ലോഗ്ഔട്ട്',
    signup: 'സൈൻ അപ്പ്'
  }
};

type Language = keyof typeof translations;

export default function Seller() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBar, setSelectedBar] = useState('Dashboard');
  const [language, setLanguage] = useState<'en' | 'hi' | 'ta' | 'ml'>('en');

  const t = translations[language];

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
      console.log("User ID from localStorage:", userId);
    }else{
      window.location.href = "/login";
    }
    const storedLang = localStorage.getItem('lang') as Language;
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  const handleLogout = async () => {
    console.log("Attempting logout...");
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Logout error:", error.message);
    } else {
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        console.log("Logged out successfully, redirecting...");
        window.location.href = "/";
    }
  };

  const setlanguage = (lang: Language) => {
    localStorage.setItem('lang', lang);
    setLanguage(lang);
    console.log('Language changed to', lang);
    window.location.reload();
  };


  return (
    <>
    <nav className="bg-white/80 backdrop-blur-sm border-b border-green-100 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4  lg:px-8">
        <div className="flex justify-between h-16 items-center ">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/seller" className="text-2xl font-bold text-green-800">
              Gram<span className="text-green-600">Cart</span>
            </Link>
          </div>

          {isLoggedIn && (
            <div className="flex items-center justify-center gap-2 flex-grow">
              <button className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${selectedBar === 'Dashboard' ? 'text-green-700 font-semibold bg-green-100' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'}`}
                onClick={() => setSelectedBar("Dashboard")}>
                {t.dashboard}</button>
              <button className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${selectedBar === 'Bookings' ? 'text-green-700 font-semibold bg-green-100' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'}`}
                onClick={() => setSelectedBar("Bookings")}>
                {t.bookings}</button>
              <button className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${selectedBar === 'Add Product' ? 'text-green-700 font-semibold bg-green-100' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'}`}
                onClick={() => setSelectedBar("Add Product")}>
                {t.addProduct}</button>
              <button className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${selectedBar === 'Profile' ? 'text-green-700 font-semibold bg-green-100' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'}`}
                onClick={() => setSelectedBar("Profile")}>
                {t.profile}</button>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-2">
              <select
                className="text-sm text-gray-500 hover:text-green-700 bg-transparent border-none focus:outline-none"
                defaultValue={language}
                onChange={(e) => { setlanguage(e.target.value as Language); }}
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
    <Askai role="Seller" />
    <div>
      {selectedBar === "Dashboard" && 
        <div>
            <Dashboard/>
        </div>}
      {selectedBar === "Bookings" && 
        <div>
            <Bookings/>  
        </div>}
      {selectedBar === "Add Product" && 
        <div>
            <AddProduct/>  
        </div>}
      {selectedBar === "Profile" && 
        <div>
            <Profile/>  
        </div>}
    </div>
    <div>
      <Footer/>
    </div>
    </>
  );
}
