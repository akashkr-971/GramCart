'use client';

import Navbar from "../components/NavBar";
import { useState } from "react";

const SchemesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Application submitted successfully!");
    setShowForm(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="pt-28 pb-16 px-6 max-w-5xl mx-auto space-y-12">
        <h1 className="text-4xl font-extrabold text-green-800 mb-6">
          Empowering Rural Artisans & Entrepreneurs
        </h1>

        <p className="text-gray-700 text-lg max-w-3xl mx-auto">
          Our mission is to support rural artisans, creators, and entrepreneurs in reaching a wider audience and building sustainable businesses. Join us to leverage government schemes and resources tailored to rural growth.
        </p>

        <div className="bg-green-50 p-6 rounded-xl shadow-md mt-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Government & Private Schemes for Rural Entrepreneurs
          </h2>
          <p className="text-gray-700 mb-4">
            There are several schemes available to help rural artisans and entrepreneurs access funding, training, and resources. Below are a few schemes that can help you get started.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>PM Vishwakarma Yojana:</strong> Financial support for traditional artisans.</li>
            <li><strong>Startup India Scheme:</strong> Incubation, mentorship, and funding for entrepreneurs.</li>
            <li><strong>Khadi & Village Industries Programs:</strong> For boosting local production and skill-building.</li>
            <li><strong>MSME Credit Support:</strong> Access to low-interest loans and subsidies.</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-6 rounded-xl shadow-md mt-12">
          <h2 className="text-2xl font-semibold text-yellow-800 mb-4">
            What We Offer
          </h2>
          <p className="text-gray-700 mb-4">
            We provide a range of services to help you get started and grow your rural business. Take advantage of our support services designed specifically for artisans and entrepreneurs.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Financial Assistance:</strong> We guide you on accessing scheme-based funding and micro-financing to support your business.</li>
            <li><strong>Onboarding Help:</strong> Need help listing your products? We assist you step-by-step in uploading and managing your shop.</li>
            <li><strong>Training & Guidance:</strong> Learn how to market, price, and grow your rural business using modern tools and strategies.</li>
          </ul>
        </div>

        <div className="text-center mt-12">
          {!showForm && (
            <button
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              onClick={() => setShowForm(true)}
            >
              Request Assistance
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-4 relative">
            <h3 className="text-2xl font-bold text-center text-green-700">Assistance Application</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <textarea
                  name="message"
                  placeholder="Tell us how we can help you..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md h-28 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-red-600 hover:underline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchemesPage;
