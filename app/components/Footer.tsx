'use client';
export default function Footer() {
  return (
    <footer className="bg-green-900 text-white border-t border-green-700">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-green-300 mb-4">GramCart</h3>
            <p className="text-sm text-green-100">
              Empowering rural India through direct commerce. Bridging farmers with 
              urban markets since 2025.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-green-100 hover:text-green-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-green-100 hover:text-green-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" className="text-green-100 hover:text-green-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-green-300 font-semibold mb-3">Quick Links</h4>
            <nav className="space-y-2">
              <a href="#" className="text-green-100 hover:text-green-300 block text-sm">Marketplace</a>
              <a href="#" className="text-green-100 hover:text-green-300 block text-sm">Farmers Directory</a>
              <a href="#" className="text-green-100 hover:text-green-300 block text-sm">How It Works</a>
              <a href="#" className="text-green-100 hover:text-green-300 block text-sm">Blog</a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <h4 className="text-green-300 font-semibold mb-3">Contact Us</h4>
            <div className="text-green-100 text-sm space-y-2">
              <p>GramCart Headquarters</p>
              <p>123 Rural Plaza</p>
              <p>Kerala, India 682507</p>
              <p>Phone: +91 98765 43210</p>
              <p>Email: support@gramcart.in</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-green-300 font-semibold mb-3">Stay Updated</h4>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-green-800 border border-green-700 text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button 
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright & Bottom Bar */}
        <div className="border-t border-green-800 mt-12 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-green-400">
              © 2025 GramCart. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-green-400 hover:text-green-300 text-sm">Privacy Policy</a>
              <a href="#" className="text-green-400 hover:text-green-300 text-sm">Terms of Service</a>
              <a href="#" className="text-green-400 hover:text-green-300 text-sm">FAQ</a>
            </div>
          </div>
          
          {/* Back to Top Button */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-6 bg-green-800 hover:bg-green-700 text-white p-2 rounded-full transition-all animate-bounce"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}