'use client';
export default function HeroBanner() {
  return (
    <div className="relative bg-green-800 text-white py-24 px-4 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/farmer.jpeg')" }}>
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"  // Add a rural market/farmland image
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up">
              Welcome to
              <span className="block text-green-300 mt-2">GramCart</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-green-100 font-medium max-w-2xl mx-auto lg:mx-0">
              Bridging Rural Farmers with Urban Markets - Direct, Fair & Sustainable
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-white text-green-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-100 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                onClick={() => window.scrollTo({ top: document.getElementById('recommended')?.offsetTop, behavior: 'smooth' })}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Shop Now
              </button>
              <button className="border-2 border-green-300 text-green-100 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-900/50 transition-all transform hover:scale-105">
                Sell Products
              </button>
            </div>
          </div>
        </div>
        {/* Stats Bar */}
        <div className="lg:mt-24 bg-white/10 backdrop-blur-sm p-6 rounded-2xl flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-300">5,000+</div>
            <div className="text-sm text-green-100">Farmers Connected</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-300">100%</div>
            <div className="text-sm text-green-100">Organic Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-300">48h</div>
            <div className="text-sm text-green-100">Delivery Promise</div>
          </div>
        </div>
      </div>

      {/* Add this to your globals.css for animations */}
      
    </div>
  );
}