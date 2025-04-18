'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import { supabase } from '../utils/supabaseClient';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname(); // Get the current path

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
      console.log("User ID from localStorage:", userId);
    }
    // Add listener for auth state changes (optional but good practice)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          localStorage.setItem("userId", session.user.id);
          setIsLoggedIn(true);
        } else if (event === 'SIGNED_OUT') {
          localStorage.removeItem("userId");
          setIsLoggedIn(false);
          // No need to redirect here if handleLogout does it
        }
      }
    );

    // Cleanup listener on component unmount
    return () => {
      authListener?.subscription.unsubscribe();
    };

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


const getLinkClassName = (href: string): string => {
    return `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        pathname === href
            ? 'text-green-700 font-semibold bg-green-100' // Active style
            : 'text-gray-600 hover:text-green-700 hover:bg-green-50' // Default style
    }`;
};

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-green-100 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Side - Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-800">
              Gram<span className="text-green-600">Cart</span>
            </Link>
          </div>

          {/* Middle Section - Navigation Links (only when logged in) */}
          {isLoggedIn && (
            <div className="hidden md:flex items-center justify-center gap-2 flex-grow">
              <Link href="/cart" className={getLinkClassName('/cart')}>
                Dashboard
              </Link>
              {/* Assuming Add Product should go to a separate page */}
              <Link href="/add-product" className={getLinkClassName('/add-product')}>
                 Add Product
              </Link>
              <Link href="/profile" className={getLinkClassName('/profile')}>
                Profile
              </Link>
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

      {/* Explanation for content display */}
      {/* The detailed content for 'About', 'Dashboard', 'Add Product', or 'Profile'
          is not displayed *here* directly below the Navbar.
          Instead, when you click one of these links:
          1. Next.js uses its router (<Link> component).
          2. It navigates to the corresponding page (e.g., '/dashboard').
          3. The component defined for that page (e.g., app/dashboard/page.js)
             is rendered below this Navbar (assuming this Navbar is part of a shared layout).
          4. The active link styling (green background) shows which page you are currently viewing.
      */}
    </nav>
  );
}