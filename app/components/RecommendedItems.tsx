export default function RecommendedItems() {
  return (
    <div id="recommended" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="bg-white p-4 rounded-lg shadow-md">
          <img
            src={'wheat.jpeg'}
            alt={`Item ${item}`}
            className="w-full h-40 object-cover rounded-md mb-2"
          />
          <h3 className="text-lg text-black font-semibold mb-2">Wheat</h3>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}