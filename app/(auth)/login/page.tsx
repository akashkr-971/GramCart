'use client';
import { supabase } from '../../utils/supabaseClient';

import { useState } from "react";

const translations: Record<'en' | 'hi' | 'ta' | 'ml', {
  title: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  signIn: string;
  newUser: string;
  createAccount: string;
  forgotPassword: string;
  passwordPlaceholder:string;
}> = {
  en: {
    title: "GramCart Login",
    emailLabel: "Email/Phone",
    emailPlaceholder: "Enter email or phone number",
    passwordLabel: "Password",
    signIn: "Sign In",
    newUser: "New user?",
    createAccount: "Create account",
    forgotPassword: "Forgot password?",
    passwordPlaceholder: "Enter password",
  },
  hi: {
    title: "ग्रामीणकार्ट लॉगिन",
    emailLabel: "ईमेल/फ़ोन",
    emailPlaceholder: "ईमेल या फ़ोन नंबर दर्ज करें",
    passwordLabel: "पासवर्ड",
    signIn: "लॉग इन करें",
    newUser: "नया उपयोगकर्ता?",
    createAccount: "खाता बनाएं",
    forgotPassword: "पासवर्ड भूल गए?",
    passwordPlaceholder: "पासवर्ड दर्ज करें",
  },
  ta: {
    title: "கிராமக்கார்ட் உள்நுழைவு",
    emailLabel: "மின்னஞ்சல்/தொலைபேசி",
    emailPlaceholder: "மின்னஞ்சல் அல்லது தொலைபேசி எண்ணை உள்ளிடவும்",
    passwordLabel: "கடவுச்சொல்",
    signIn: "உள்நுழைய",
    newUser: "புதிய பயனர்?",
    createAccount: "கணக்கை உருவாக்கு",
    forgotPassword: "கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
    passwordPlaceholder: "கடவுச்சொல்லை உள்ளிடவும்",
  },
  ml: {
    title: "ഗ്രാമകാര്‍ട്ട് ലോഗിൻ",
    emailLabel: "ഇമെയിൽ/ഫോൺ",
    emailPlaceholder: "ഇമെയിൽ അല്ലെങ്കിൽ ഫോൺ നമ്പർ നൽകുക",
    passwordLabel: "പാസ്വേഡ്",
    signIn: "ലോഗിൻ",
    newUser: "പുതിയ ഉപയോക്താവാണോ?",
    createAccount: "അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    forgotPassword: "പാസ്വേഡ് മറന്നോ?",
    passwordPlaceholder: "പാസ്വേഡ്ഡ് നൽകുക",
  }
};


export default function Login() {
  const [lang, setLang] = useState<"en" | "hi" | "ta" | "ml">("en");
  const [visible , setVisible] = useState(false);
  const t = translations[lang];

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = {
        email: (e.currentTarget[0] as HTMLInputElement).value,
        password: (e.currentTarget[1] as HTMLInputElement).value,
      };
      console.log("Form Data:", formData);
      const {data,error} = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });
      if (error) {
        setError(error.message);
        console.error("Login Error:", error.message);
      } else {
        console.log("Login Successful:", data);
        const userId = data.user?.id;
        console.log("User ID:", userId);
        if (userId) {
          localStorage.setItem("userId", userId);
        }
        window.location.href = "/";
      }
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/login.jpeg')] bg-cover bg-center">
      <div className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
          {t.title}
        </h1>

        <form className="space-y-6" onSubmit={handlesubmit}>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              {t.emailLabel}
            </label>
            <input
              type="text"
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder={t.emailPlaceholder}
            />
            </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              {t.passwordLabel}
            </label>
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                className="text-black w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={t.passwordPlaceholder}
              />
              <img
                src={visible ? "hide.png" : "show.png"}
                alt={visible ? "hide image" : "show image"}
                className="h-8 w-8 absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setVisible(!visible)}
              />
            </div>
          </div>

          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300">
            {t.signIn}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {t.newUser}{" "}
            <a href="/signup" className="text-green-600 hover:underline">
              {t.createAccount}
            </a>
          </p>
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-green-700 mt-2 block"
          >
            {t.forgotPassword}
          </a>
        </div>

        {/* Language Switcher */}
        <div className="mt-8 flex justify-center space-x-2">
          <button
            onClick={() => setLang("hi")}
            className="text-sm text-gray-500 hover:text-green-700"
          >
            हिन्दी
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setLang("en")}
            className="text-sm text-gray-500 hover:text-green-700"
          >
            English
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setLang("ta")}
            className="text-sm text-gray-500 hover:text-green-700"
          >
            Tamil
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setLang("ml")}
            className="text-sm text-gray-500 hover:text-green-700"
          >
            Malayalam
          </button>
        </div>
      </div>
    </div>
  );
}
function setError(message: string) {
  message = "";
  if(!message) {
    console.error("Login Error:", message);
  }
  throw new Error('Function not implemented.');
}

