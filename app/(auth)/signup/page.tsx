'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useRouter } from 'next/navigation';

const translations = {
  en: {
    title: "Join GramCart",
    seller: "I'm a Seller",
    sellerDesc: "Farmer/Artisan",
    buyer: "I'm a Buyer",
    buyerDesc: "Individual/Business",
    phoneLabel: "Phone Number",
    phonePlaceholder: "Enter phone number",
    sendOTP: "Send OTP",
    otpLabel: "Enter OTP",
    createAccount: "Create Account",
    haveAccount: "Already have an account?",
    logIn: "Log in",
    nameLabel: "Name",
    addressLabel: "Address",
    passwordLabel: "Password",
    namePlaceholder: "Enter your name",
    addressPlaceholder: "Enter full address",
    passwordPlaceholder: "Create password",
    resendOTP: "Resend OTP",
    invalidPhone: "Invalid phone number",
    invalidEmail: "Invalid email address",
    weakPassword: "Password must be at least 6 characters",
    otpInvalid: "Please enter 6-digit OTP",
  },
  hi: {
    title: "ग्रामीणकार्ट से जुड़ें",
    seller: "मैं विक्रेता हूँ",
    sellerDesc: "किसान/कारीगर",
    buyer: "मैं खरीदार हूँ",
    buyerDesc: "व्यक्ति/व्यवसाय",
    phoneLabel: "फ़ोन नंबर",
    phonePlaceholder: "फ़ोन नंबर दर्ज करें",
    sendOTP: "ओटीपी भेजें",
    otpLabel: "ओटीपी दर्ज करें",
    createAccount: "खाता बनाएं",
    haveAccount: "पहले से खाता है?",
    logIn: "लॉग इन करें",
    nameLabel: "नाम",
    addressLabel: "पता",
    passwordLabel: "पासवर्ड",
    namePlaceholder: "अपना नाम दर्ज करें",
    addressPlaceholder: "पता दर्ज करें",
    passwordPlaceholder: "पासवर्ड बनाएं",
    resendOTP: "ओटीपी फिर से भेजें",
    invalidPhone: "अमान्य फ़ोन नंबर",
    invalidEmail: "अमान्य ईमेल पता",
    weakPassword: "पासवर्ड कम से कम 6 वर्णों का होना चाहिए",
    otpInvalid: "कृपया 6-अंक का ओटीपी दर्ज करें"
  },
  ta: {
    title: "கிராமக்கார்ட் சேரவும்",
    seller: "நான் விற்பனையாளர்",
    sellerDesc: "விவசாயி/கலைஞர்",
    buyer: "நான் வாங்குபவர்",
    buyerDesc: "தனிநபர்/வணிகம்",
    phoneLabel: "தொலைபேசி எண்",
    phonePlaceholder: "தொலைபேசி எண்ணை உள்ளிடவும்",
    sendOTP: "ஓடிபி அனுப்பவும்",
    otpLabel: "ஓடிபி உள்ளிடவும்",
    createAccount: "கணக்கை உருவாக்கவும்",
    haveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    logIn: "உள்நுழைக",
    nameLabel: "பெயர்",
    addressLabel: "முகவரி",
    passwordLabel: "கடவுச்சொல்",
    namePlaceholder: "உங்கள் பெயரை உள்ளிடவும்",
    addressPlaceholder: "முழு முகவரியை உள்ளிடவும்",
    passwordPlaceholder: "கடவுச்சொல்லை உருவாக்கவும்",
    resendOTP: "ஓடிபி மீண்டும் அனுப்பவும்",
    invalidPhone: "தவறான தொலைபேசி எண்",
    invalidEmail: "தவறான மின்னஞ்சல் முகவரி",
    weakPassword: "கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்",
    otpInvalid: "6-எண் ஓடிபியை உள்ளிடவும்"
  },
  ml: {
    title: "ഗ്രാമകാര്‍ട്ടില്‍ ചേരുക",
    seller: "ഞാന്‍ വില്‍പനക്കാരന്‍ ആണ്",
    sellerDesc: "കർഷകൻ/കലാകാരൻ",
    buyer: "ഞാന്‍ വാങ്ങുന്നവന്‍ ആണ്",
    buyerDesc: "വ്യക്തിഗതം/ബിസിനസ്സ്",
    phoneLabel: "ഫോൺ നമ്പർ",
    phonePlaceholder: "ഫോൺ നമ്പർ നൽകുക",
    sendOTP: "ഒടിപി അയയ്ക്കുക",
    otpLabel: "ഒടിപി നൽകുക",
    createAccount: "അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    haveAccount: "ഇതിനുമുമ്പ് അക്കൗണ്ട് ഉണ്ടോ?",
    logIn: "ലോഗിൻ ചെയ്യുക",
    nameLabel: "പേര്",
    addressLabel: "വിലാസം",
    passwordLabel: "പാസ്വേഡ്",
    namePlaceholder: "പേര് നൽകുക",
    addressPlaceholder: "മുഴുവൻ വിലാസം നൽകുക",
    passwordPlaceholder: "പാസ്വേഡ് സൃഷ്ടിക്കുക",
    resendOTP: "ഒടിപി വീണ്ടും അയയ്ക്കുക",
    invalidPhone: "തെറ്റായ ഫോൺ നമ്പർ",
    invalidEmail: "തെറ്റായ ഇമെയിൽ വിലാസം",
    weakPassword: "പാസ്വേഡ് കുറഞ്ഞത് 6 അക്ഷരങ്ങൾ ആയിരിക്കണം",
    otpInvalid: "6-അക്കം ഒടിപി നൽകുക"
  }
};

export default function Signup() {
  const router = useRouter();
  const [lang, setLang] = useState<"en" | "hi" | "ta" | "ml">("en");
  const t = translations[lang];
  
  const [userType, setUserType] = useState<'seller' | 'buyer' | 'admin'>('buyer');
  const [usePhone, setUsePhone] = useState(true);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [visible , setVisible] = useState(false);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (otpSent && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [otpSent, countdown]);

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'phone':
        if (!/^\d{10}$/.test(value)) error = t.invalidPhone;
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = t.invalidEmail;
        break;
      case 'password':
        if (value.length < 6) error = t.weakPassword;
        break;
      case 'otp':
        if (value.length !== 6) error = t.otpInvalid;
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleSendOTP = async () => {
    setErrors({});
    const field = usePhone ? 'phone' : 'email';
    let value = usePhone ? phone : email;
    
    if (!validateField(field, value)) return;
    if (!validateField('password', password)) return;

    if (usePhone) {
      value = '+91' + phone;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        ...(usePhone ? { phone: value } : { email: email })
      });

      if (error) throw error;
      setOtpSent(true);
      setCountdown(30);
    } catch (error) {
      setErrors({ form: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    const otpCode = otp.join('');
    if (!validateField('otp', otpCode)) return;

    setLoading(true);
    try {
      const { data,error } = await supabase.auth.verifyOtp(
        usePhone
          ? { phone, token: otpCode, type: 'sms' }
          : { email, token: otpCode, type: 'email' }
      );
      
      if(data.user){
        console.log("User ID:", data.user.id);
        const {error: dberror} = await supabase.from('users').insert([
          { id: data.user.id,name: name, email: email, address: address, user_type: userType, phone_number:null}
        ]);
        if(dberror){
          console.error("Inserting user data Error:", dberror.message);
          setErrors({ form: dberror.message })
          return;
        }
        localStorage.setItem("userId", data.user.id);
        console.log("User signed up successfully:", data.user.id);
        if(userType === 'seller'){
          window.location.href = '/sellerdashboard';
        }else{
          window.location.href = '/';
        }
      }else{
        console.error("User sign up Error:", error?.message);
      }

      if (error) throw error;
      setVerified(true);
      if(verified){
        router.push('/dashboard');
      }
    } catch (error) {
      setErrors({ otp: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async () => {
    setErrors({});
    if (!validateField('email', email)) return;
    if (!validateField('password', password)) return;

    setLoading(true);
    try {
      const { data , error } = await supabase.auth.signUp({
        email,
        password
      });

      if(data.user){
        console.log("User ID:", data.user.id);
        const {error: dberror} = await supabase.from('users').insert([
          { id: data.user.id,name: name, email: email, address: address, user_type: userType, phone_number:null}
        ]);
        if(dberror){
          console.error("Inserting user data Error:", dberror.message);
          setErrors({ form: dberror.message })
          return;
        }
        localStorage.setItem("userId", data.user.id);
        console.log("User signed up successfully:", data.user.id);
        if(userType === 'seller'){
          window.location.href = '/newseller';
        }else{
          window.location.href = '/';
        }
      }else{
        console.error("User sign up Error:", error?.message);
      }
    }catch (error) {
      setErrors({ form: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/login.jpeg')] bg-cover bg-center">
      <div className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">{t.title}</h1>

        {/* User Type Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
        <button 
            type="button"
            onClick={() => setUserType('buyer')}
            className={`p-3 border-2 rounded-lg transition-colors ${
              userType === 'buyer' 
                ? 'border-green-600 bg-green-50'
                : 'border-green-200 hover:border-green-400'
            }`}
          >
            <span className="block text-sm font-medium text-black">{t.buyer}</span>
            <span className="block text-xs text-black">{t.buyerDesc}</span>
          </button>
          <button 
            type="button"
            onClick={() => setUserType('seller')}
            className={`p-3 border-2 rounded-lg transition-colors ${
              userType === 'seller' 
                ? 'border-green-600 bg-green-50'
                : 'border-green-200 hover:border-green-400'
            }`}
          >
            <span className="block text-sm font-medium text-black">{t.seller}</span>
            <span className="block text-xs text-black">{t.sellerDesc}</span>
          </button>
        </div>

        {/* Name & Address Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-black mb-2 font-medium">{t.nameLabel}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder={t.namePlaceholder}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-black mb-2 font-medium">{t.addressLabel}</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
              placeholder={t.addressPlaceholder}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
        </div>

        {/* Auth Method Toggle */}
        <div className="flex justify-center my-6">
          <button
            onClick={() => setUsePhone(true)}
            className={`px-4 py-2 rounded-l-lg ${
              usePhone 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            Phone
          </button>
          <button
            onClick={() => setUsePhone(false)}
            className={`px-4 py-2 rounded-r-lg ${
              !usePhone 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            Email
          </button>
        </div>

        {/* Dynamic Auth Fields */}
        <div className="space-y-4">
          {usePhone ? (
            <>
              <div>
                <label className="block text-black mb-2 font-medium">{t.phoneLabel}</label>
                <div className="flex gap-2">
                  <input
                    type="number"

                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder={t.phonePlaceholder}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-black mb-2 font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </>
          )}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              {t.passwordLabel}
            </label>
            <div className="relative">
                <input
              type={visible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black mb-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder={t.passwordPlaceholder}
            />
              <img
                src={visible ? "hide.png" : "show.png"}
                alt={visible ? "hide image" : "show image"}
                className="h-8 w-8 absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setVisible(!visible)}
                />
            </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {otpSent && usePhone && (
            <div>
              <label className="block text-black mb-2 font-medium">{t.otpLabel}</label>
              <div className="flex gap-2 text-black">
                {Array(6).fill('').map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={otp[i]}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[i] = e.target.value.replace(/\D/g, '');
                      setOtp(newOtp);
                      if (e.target.value && i < 5) {
                        document.getElementById(`otp-${i+1}`)?.focus();
                      }
                    }}
                    className="w-10 h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    id={`otp-${i}`}
                  />
                ))}
              </div>
              {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
              <div className="mt-2 text-sm">
                {countdown > 0 ? (
                  <span className="text-gray-600">Resend OTP in {countdown}s</span>
                ) : (
                  <button
                    onClick={handleSendOTP}
                    className="text-green-600 hover:underline"
                  >
                    {t.resendOTP}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={otpSent ? handleVerifyOTP : (usePhone ? handleSendOTP : handleEmailSignup)}
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg transition-colors ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {loading ? (
            <span className="animate-pulse">Processing...</span>
          ) : otpSent ? (
            t.createAccount
          ) : usePhone ? (
            t.sendOTP
          ) : (
            t.createAccount
          )}
        </button>

        {/* Existing User Link */}
        <p className="mt-6 text-center text-black">
          {t.haveAccount}{' '}
          <a href="/login" className="text-green-600 hover:underline">
            {t.logIn}
          </a>
        </p>

        {/* Error Messages */}
        {errors.form && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {errors.form}
          </div>
        )}

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