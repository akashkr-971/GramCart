'use client';
import { Dialog, DialogTrigger, DialogContent, DialogOverlay, DialogClose, DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import React, { useState } from 'react';

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

    // --- TODO: Replace this with your actual API call ---
    console.log('Submitting testimonial:', testimonial);
    // Example: await fetch('/api/testimonials', { method: 'POST', body: JSON.stringify(testimonial) });
    // ---

    alert('Thank you for sharing your story!'); // Simple user feedback

    // Reset form and close dialog
    setName('');
    setStory('');
    setIsOpen(false);
};

  return (
    <div>
      <section className="py-5 bg-white shadow-md rounded-lg"> {/* Added margin for spacing */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Added responsive padding */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4"> {/* Responsive layout */}
            <h2 className="text-3xl font-bold text-gray-900">User Stories</h2>

            {/* --- Dialog Component --- */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              {/* The button that opens the dialog */}
              <DialogTrigger asChild>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out">
                  Share Your Story
                </button>
              </DialogTrigger>

              {/* --- Modal Content --- */}
              {/* Use Portal to render modal outside the main DOM tree if needed, Radix handles this well by default */}
              <DialogOverlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
              <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 w-[90vw] max-w-md data-[state=open]:animate-contentShow focus:outline-none">
                <DialogTitle className="text-lg font-medium leading-6 text-gray-900">
                  Share Your GramCart Experience
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm text-gray-600">
                  Tell us how GramCart has made a difference for you.
                </DialogDescription>

                {/* --- Testimonial Form --- */}
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name (Farmer/Buyer)
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Alex Patel (Farmer)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Story
                    </label>
                    <textarea
                      id="story"
                      value={story}
                      onChange={(e) => setStory(e.target.value)}
                      placeholder="Share how GramCart helped you connect, sell, or buy..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      required
                    />
                  </div>

                  {/* --- Form Actions --- */}
                  <div className="mt-6 flex justify-end gap-3">
                    <DialogClose asChild>
                      <button
                        type="button" // Important: type="button" prevents form submission
                        className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                      >
                        Cancel
                      </button>
                    </DialogClose>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                    >
                      Submit Story
                    </button>
                  </div>
                </form>

                {/* --- Close Button (Top Right) --- */}
                <DialogClose asChild>
                  <button
                    className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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