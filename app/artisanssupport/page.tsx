// app/support/page.js
import { CurrencyRupeeIcon, BookOpenIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Programs</h1>
          <p className="text-gray-600">Explore available assistance options</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Financial Assistance */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <CurrencyRupeeIcon className="h-8 w-8 text-green-600" />
              <h2 className="text-xl font-semibold">Financial Support</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Emergency funds for artisans</li>
              <li>Zero-interest loans</li>
              <li>Government scheme assistance</li>
            </ul>
            <button className="mt-4 text-green-600 hover:underline">
              Apply Now →
            </button>
          </div>

          {/* Training Programs */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <BookOpenIcon className="h-8 w-8 text-green-600" />
              <h2 className="text-xl font-semibold">Skill Development</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Free craft workshops</li>
              <li>Digital marketing training</li>
              <li>Product quality sessions</li>
            </ul>
            <button className="mt-4 text-green-600 hover:underline">
              View Schedule →
            </button>
          </div>

          {/* Mentorship */}
          <div className="bg-white rounded-xl p-6 shadow-sm md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <UserGroupIcon className="h-8 w-8 text-green-600" />
              <h2 className="text-xl font-semibold">Mentorship Program</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 mb-3">
                  Connect with experienced mentors in your field
                </p>
                <button className="text-green-600 hover:underline">
                  Browse Mentors →
                </button>
              </div>
              <div className="border-l pl-4">
                <p className="text-sm text-gray-500 mb-2">Recent Mentors</p>
                <ul className="space-y-2">
                  <li className="text-sm">Ramesh Patel (Pottery)</li>
                  <li className="text-sm">Sunita Devi (Textiles)</li>
                  <li className="text-sm">Anil Kumar (Woodwork)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}