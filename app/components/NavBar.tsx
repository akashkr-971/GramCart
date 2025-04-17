import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-green-100 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Side - Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-800">
              Rural<span className="text-green-600">Commerce</span>
            </Link>
          </div>

          {/* Center - Navigation Links (Desktop) */}
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/marketplace" 
              className="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Marketplace
            </Link>
            <Link 
              href="/farmers" 
              className="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Farmers
            </Link>
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              About
            </Link>
          </div>

          {/* Right Side - Auth & Language */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="hidden md:flex gap-2 mr-4">
              <button className="text-sm text-gray-500 hover:text-green-700">
                हिन्दी
              </button>
              <span className="text-gray-300">|</span>
              <button className="text-sm text-gray-500 hover:text-green-700">
                English
              </button>
            </div>

            {/* Auth Buttons */}
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
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            href="/marketplace" 
            className="text-gray-600 hover:text-green-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Marketplace
          </Link>
          <Link 
            href="/farmers" 
            className="text-gray-600 hover:text-green-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Farmers
          </Link>
          <Link 
            href="/about" 
            className="text-gray-600 hover:text-green-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}