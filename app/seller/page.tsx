'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import AddProduct from '../sellercomponents/addproduct';
import Dashboard from '../sellercomponents/dashboard'; 
import Profile from '../sellercomponents/sellerprofile';
import Footer from '../components/Footer';
import Askai from '../sellercomponents/askai';

export default function Seller() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBar, setSelectedBar] = useState("Dashboard");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
      console.log("User ID from localStorage:", userId);
    }

    console.log(selectedBar);

  }, []); // Empty dependency array ensures this runs only once on mount

  const handleLogout = async () => {
    console.log("Attempting logout...");
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error("Logout error:", error.message);
    } else {
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
        console.log("Logged out successfully, redirecting...");
        window.location.href = "/"; // Redirect to homepage after logout
    }
  }

  return (
    <>
    <nav className="bg-white/80 backdrop-blur-sm border-b border-green-100 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4  lg:px-8">
        <div className="flex justify-between h-16 items-center ">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-800">
              Gram<span className="text-green-600">Cart</span>
            </Link>
          </div>

          {/* Middle Section - Navigation Links (only when logged in) */}
          {isLoggedIn && (
            <div className="flex items-center justify-center gap-2 flex-grow">
              <button className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${selectedBar === 'Dashboard' ? 'text-green-700 font-semibold bg-green-100' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'}`}
                onClick={() => setSelectedBar("Dashboard")}>
                DashBoard</button>
              <button className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${selectedBar === 'Add Product' ? 'text-green-700 font-semibold bg-green-100' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'}`}
                onClick={() => setSelectedBar("Add Product")}>
                Add Product</button>
              <button className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${selectedBar === 'Profile' ? 'text-green-700 font-semibold bg-green-100' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'}`}
                onClick={() => setSelectedBar("Profile")}>
                Profile</button>
            </div>
          )}

          {/* Right Side - Language & Auth */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="hidden md:flex gap-2"> {/* Removed mr-4, gap-4 on parent handles spacing */}
              <select
                className="text-sm text-gray-500 hover:text-green-700 bg-transparent border-none focus:outline-none"
                defaultValue="en"
              >
                <option value="hi">हिन्दी</option>
                <option value="ml">മലയാളം</option>
                <option value="ta">தமிழ்</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout} // Corrected onClick handler
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
    <Askai/>
    <div>
      {selectedBar === "Dashboard" && 
        <div>
            <Dashboard/>
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