import React from 'react'
import Link from 'next/link'

const Govtscheme = () => {
  return (
    <div>
        <section className="bg-gradient-to-r from-yellow-100 to-yellow-50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl p-8 shadow-lg border border-yellow-200">
            {/* Left Content */}
            <div className="md:w-2/3 mb-6 md:mb-0">
                <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 9l10 7 10-7-10-7zm0 16.23l-7.18-4.9L4 15.64 12 21l8-5.36-1.82-2.47L12 18.23z"/>
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Government Schemes & Support</h2>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                    </svg>
                    <span className="text-sm">PM Fasal Bima Yojana</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                    </svg>
                    <span className="text-sm">Kisan Credit Card</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                    </svg>
                    <span className="text-sm">Soil Health Cards</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
                    </svg>
                    <span className="text-sm">Organic Farming Aid</span>
                </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                Over 2.3 lakh farmers benefited through our platform last year
                </p>
            </div>

             <Link 
                href="/schemes"
                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
                <span>Explore All Schemes</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg>
            </Link>

            </div>

            {/* Floating Elements */}
            <div className="hidden md:block relative">
            <div className="absolute -top-8 right-20 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm shadow-md">
                New: Solar Pump Subsidy!
            </div>
            <div className="absolute -bottom-6 left-20 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm shadow-md">
                50% Subsidy on Seeds
            </div>
            </div>
        </div>
        </section>
    </div>
  )
}

export default Govtscheme