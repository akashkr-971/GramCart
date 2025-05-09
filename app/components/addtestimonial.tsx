'use client';
import { Dialog, DialogTrigger, DialogContent, DialogOverlay, DialogClose, DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import React, { useState,useEffect } from 'react';

// Optional: Define an icon component or import one (e.g., from lucide-react)
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const AddTestimonial = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [story, setStory] = useState('');

  interface Testimonial {
    name: string;
    story: string;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault(); // Prevent default form submission (page reload)

    const testimonial: Testimonial = { name, story };
    console.log('Submitting testimonial:', testimonial);

    alert('Thank you for sharing your story!'); // Simple user feedback
    setName('');
    setStory('');
    setIsOpen(false);
  };

  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'ml'>('en');
  
    useEffect(() => {
      const storedLang = localStorage.getItem('lang') as 'en' | 'hi' | null;
      if (storedLang) {
        setLang(storedLang);
      }
    }, []);

  const translations = {
    en: {
      txt : "Share Your User Story"
    },
    hi: {
      txt: "अपनी उपयोगकर्ता कहानी साझा करें"
    },
    ml: {
      txt: "നിങ്ങളുടെ ഉപയോക്തൃ കഥ പങ്കിടുക"
    },
    ta: {
      txt : "உங்கள் பயனர் கதையை பகிர்ந்து கொள்ளுங்கள்"
    }

  }

  return (
    <div>
      <section className="py-8 bg-gradient-to-r from-green-100 via-green-200 to-green-300 shadow-lg rounded-xl"> {/* Added gradient background and shadow */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-4xl font-bold text-gray-900">{translations[lang].txt}</h2> {/* Larger font for emphasis */}

            {/* --- Dialog Component --- */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              {/* The button that opens the dialog */}
              <DialogTrigger asChild>
                <button className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-200 ease-in-out">
                  Share Your Story
                </button>
              </DialogTrigger>

              {/* --- Modal Content --- */}
              <DialogOverlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
              <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-8 w-[90vw] max-w-lg data-[state=open]:animate-contentShow focus:outline-none">
                <DialogTitle className="text-xl font-semibold leading-6 text-gray-900">
                  Share Your GramCart Experience
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm text-gray-700">
                  Let us know how GramCart helped you! Your feedback helps others connect, buy, and sell better.
                </DialogDescription>

                {/* --- Testimonial Form --- */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name (Farmer/Buyer)
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Alex Patel (Farmer)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-lg"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Story
                    </label>
                    <textarea
                      id="story"
                      value={story}
                      onChange={(e) => setStory(e.target.value)}
                      placeholder="Share how GramCart helped you connect, sell, or buy..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-lg"
                      required
                    />
                  </div>

                  {/* --- Form Actions --- */}
                  <div className="mt-6 flex justify-end gap-4">
                    <DialogClose asChild>
                      <button
                        type="button"
                        className="px-6 py-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-xl shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                      >
                        Cancel
                      </button>
                    </DialogClose>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-green-600 text-white border border-transparent rounded-xl shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-150 ease-in-out"
                    >
                      Submit Story
                    </button>
                  </div>
                </form>

                {/* --- Close Button (Top Right) --- */}
                <DialogClose asChild>
                  <button
                    className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    aria-label="Close"
                  >
                    <CloseIcon />
                  </button>
                </DialogClose>
              </DialogContent>
            </Dialog>
            {/* --- End Dialog --- */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddTestimonial;
