'use client'

import { useState,useEffect } from "react";
export default function Categories() {

  const [lang, setLang] = useState<'en' | 'hi' | 'ta' | 'ml'>('en');
  
    useEffect(() => {
      const storedLang = localStorage.getItem('lang') as 'en' | 'hi' | null;
      if (storedLang) {
        setLang(storedLang);
      }
    }, []);
  const categories: { [key: string]: { name: string; image: string; link: string }[] } = {
    en: [
    { name: 'Clothing', image: 'category/clothing.jpeg', link: '/clothing' },
    { name: 'Farming', image: 'category/farmingtool.jpeg', link: '/farming' },
    { name: 'Vegetable', image: 'category/vegetable.jpeg', link: '/vegetable' },
    { name: 'Grains and Pulses', image: 'category/grains.jpeg', link: '/grainsandpulses' },
    { name: 'Seeds and sapling', image: 'category/seedsapling.png', link: '/seedandsapling' },
    { name: 'Diary Products', image: 'category/diary.jpeg', link: '/diaryproduct' },
    ],
    hi: [
    { name: 'कपड़े', image: 'category/clothing.jpeg', link: '/clothing' },
    { name: 'कृषि', image: 'category/farmingtool.jpeg', link: '/farming' },
    { name: 'सब्जियां', image: 'category/vegetable.jpeg', link: '/vegetable' },
    { name: 'अनाज और दालें', image: 'category/grains.jpeg', link: '/grainsandpulses' },
    { name: 'बीज और पौधे', image: 'category/seedsapling.png', link: '/seedandsapling' },
    { name: 'डेयरी उत्पाद', image: 'category/diary.jpeg', link: '/diaryproduct' },
    ],
    ta: [
    { name: 'உடை', image: 'category/clothing.jpeg', link: '/clothing' },
    { name: 'விவசாயம்', image: 'category/farmingtool.jpeg', link: '/farming' },
    { name: 'காய்கறி', image: 'category/vegetable.jpeg', link: '/vegetable' },
    { name: 'தானியங்கள் மற்றும் பருப்புகள்', image: 'category/grains.jpeg', link: '/grainsandpulses' },
    { name: 'விதை மற்றும் மரக்கன்று', image: 'category/seedsapling.png', link: '/seedandsapling' },
    { name: 'பால் பொருட்கள்', image: 'category/diary.jpeg', link: '/diaryproduct' },
    ],
    ml: [
    { name: 'വസ്ത്രങ്ങൾ', image: 'category/clothing.jpeg', link: '/clothing' },
    { name: 'കൃഷി', image: 'category/farmingtool.jpeg', link: '/farming' },
    { name: 'പച്ചക്കറികൾ', image: 'category/vegetable.jpeg', link: '/vegetable' },
    { name: 'ധാന്യങ്ങൾ и പയർ', image: 'category/grains.jpeg', link: '/grainsandpulses' },
    { name: 'വിത്തും തൈകൾ', image: 'category/seedsapling.png', link: '/seedandsapling' },
    { name: 'ഡയറി ഉൽപ്പന്നങ്ങൾ', image: 'category/diary.jpeg', link: '/diaryproduct' },
    ]
  }

 return (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {categories[lang].map((category) => (
      <a
      key={category.name}
      href={category.link}
      className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
      <img
      src={category.image}
      alt={category.name}
      className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-semibold text-center">{category.name}</h3>
      </a>
    ))}
  </div>
 );
}