import HeroBanner from '../components/HeroBanner';
import React from 'react';
import SearchBar from '../components/search';
import RecommendedItems from '../components/RecommendedItems';
import Categories from '../components/Categories';
import Testimonials from '../components/Testimonials';
import AddTestimonial from '../components/addtestimonial';
import Govtscheme from '../components/govtscheme';
import RuralAssistFeatures from '../components/ruralassistfeature';
import ProductCard from '../components/productcard';


export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <HeroBanner />
      <SearchBar/>
    
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Rural Assistance Features</h2>
        <RuralAssistFeatures />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Recommended for You</h2>
        <RecommendedItems />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Shop by Category</h2>
        <Categories />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">What Our Customers Say</h2>
        <Testimonials />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Have Exciting reviews</h2>
        <AddTestimonial />
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Government Schemes</h2>
        <Govtscheme />
      </div>
    </div>
  );
}