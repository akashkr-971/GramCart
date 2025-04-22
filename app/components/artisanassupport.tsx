'use client';
import { useState } from 'react';
import { CurrencyRupeeIcon, BookOpenIcon, UserGroupIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface FormOverlayProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function SupportPage() {
  const [showFinancialForm, setShowFinancialForm] = useState(false);
  const [showTrainingForm, setShowTrainingForm] = useState(false);
  const [showMentorForm, setShowMentorForm] = useState(false);

  const FormOverlay = ({ children, onClose }: FormOverlayProps) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full relative animate-fade-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
        >
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>
        {children}
      </div>
    </div>
  );

  return (
    <div className="h-170 sm:h-auto">
      <div className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Financial Assistance */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-50">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-green-100 rounded-xl">
                <CurrencyRupeeIcon className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Financial Support</h2>
            </div>
            <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-6">
              <li>Emergency funds for artisans</li>
              <li>Zero-interest loans</li>
              <li>Government scheme assistance</li>
            </ul>
            <button 
              onClick={() => setShowFinancialForm(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              Apply Now
              <span className="text-xl">→</span>
            </button>
          </div>

          {/* Training Programs */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-50">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-green-100 rounded-xl">
                <BookOpenIcon className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Skill Development</h2>
            </div>
            <ul className="list-disc pl-6 space-y-3 text-gray-600 mb-6">
              <li>Free craft workshops</li>
              <li>Digital marketing training</li>
              <li>Product quality sessions</li>
            </ul>
            <button 
              onClick={() => setShowTrainingForm(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              View Schedule
              <span className="text-xl">→</span>
            </button>
          </div>

          {/* Mentorship */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-50 md:col-span-2 ">
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 bg-green-100 rounded-xl">
                <UserGroupIcon className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Mentorship Program</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-6 text-lg">
                  Connect with experienced mentors in your field
                </p>
                <button 
                  onClick={() => setShowMentorForm(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  Browse Mentors
                  <span className="text-xl">→</span>
                </button>
              </div>
              <div className="border-l pl-6 border-green-100">
                <p className="text-sm text-gray-500 mb-4 font-medium">Recent Mentors</p>
                <ul className="space-y-3">
                  <li className="text-sm p-3 hover:bg-green-50 rounded-lg cursor-pointer">Ramesh Patel (Pottery)</li>
                  <li className="text-sm p-3 hover:bg-green-50 rounded-lg cursor-pointer">Sunita Devi (Textiles)</li>
                  <li className="text-sm p-3 hover:bg-green-50 rounded-lg cursor-pointer">Anil Kumar (Woodwork)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Form Modal */}
      {showFinancialForm && (
        <FormOverlay onClose={() => setShowFinancialForm(false)}>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Financial Support Application</h3>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Application</label>
              <textarea rows={2} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors">
              Submit Application
            </button>
          </form>
        </FormOverlay>
      )}

      {/* Training Form Modal */}
      {showTrainingForm && (
        <FormOverlay onClose={() => setShowTrainingForm(false)}>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Workshop Registration</h3>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Workshop</label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option>Digital Marketing Basics</option>
                <option>Advanced Craft Techniques</option>
                <option>Product Quality Control</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
              <input type="date" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
              <textarea rows={2} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors">
              Register Now
            </button>
          </form>
        </FormOverlay>
      )}

      {/* Mentor Form Modal */}
      {showMentorForm && (
        <FormOverlay onClose={() => setShowMentorForm(false)}>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Mentor Request</h3>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Mentor</label>
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option>Ramesh Patel (Pottery)</option>
                <option>Sunita Devi (Textiles)</option>
                <option>Anil Kumar (Woodwork)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
              <textarea 
                rows={4}
                placeholder="Explain what kind of guidance you're looking for..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                  <span className="ml-2">Weekdays</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-green-600 focus:ring-green-500" />
                  <span className="ml-2">Weekends</span>
                </label>
              </div>
            </div>
            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors">
              Send Request
            </button>
          </form>
        </FormOverlay>
      )}
    </div>
  );
}