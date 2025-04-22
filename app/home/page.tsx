import HeroBanner from '../components/HeroBanner';
import React from 'react';
import SearchBar from '../components/search';
import RecommendedItems from '../components/RecommendedItems';
import Categories from '../components/Categories';
import Testimonials from '../components/Testimonials';
import AddTestimonial from '../components/addtestimonial';
import Govtscheme from '../components/govtscheme';
import RuralAssistFeatures from '../components/ruralassistfeature';
import ArtisansNearYou from '../components/artisansnearyou';
import SupportCard from '../components/artisanassupport';


export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <HeroBanner />
      <p className='text-center text-lg font-bold text-green-800 mb-1'>
        Click on the alert to read aloud
      </p>
      <RuralAssistFeatures />
      <SearchBar/>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Support Artisans Near You</h2>
        <ArtisansNearYou />
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
        <h2 className="text-2xl font-bold text-green-800 mb-4">Artisans Support Programs</h2>
        <SupportCard />
      </div>
      <div className="container mx-auto px-4 py-8 mt-110 sm:mt-0">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Government Schemes</h2>
        <Govtscheme />
      </div>
    </div>
  );
}