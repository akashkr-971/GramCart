export default function Categories() {
  const categories = [
    { name: 'Clothing', image: 'category/clothing.jpeg', link: '/clothing' },
    { name: 'Farming', image: 'category/farmingtool.jpeg', link: '/farming' },
    { name: 'Vegetable', image: 'category/vegetable.jpeg', link: '/vegetable' },
    { name: 'Grains and Pulses', image: 'category/grains.jpeg', link: '/grainsandpulses' },
    { name: 'Seeds and sapling', image: 'category/seedsapling.png', link: '/seedandsapling' },
    { name: 'Diary Products', image: 'category/diary.jpeg', link: '/diaryproduct' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
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