// pages/dashboard/preferences.tsx
import { useState } from "react";
import { FiMapPin, FiClock, FiTrash2, FiTruck, FiBell, FiPlus } from "react-icons/fi";
import Payments from "./payment";

const Preferences = () => {
  const [preferredLocations, setPreferredLocations] = useState([
    "Downtown Area",
    "Uptown Commercial",
    "Suburban Zones",
  ]);
  const [newLocation, setNewLocation] = useState("");
  const [deliveryRadius, setDeliveryRadius] = useState(15);
  const [availability, setAvailability] = useState({
    start: "09:00",
    end: "18:00"
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLocation.trim() && !preferredLocations.includes(newLocation)) {
      setPreferredLocations([...preferredLocations, newLocation.trim()]);
      setNewLocation("");
    }
  };

  const removeLocation = (location: string) => {
    setPreferredLocations(preferredLocations.filter(l => l !== location));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-16">Delivery Preferences</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Delivery Locations */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <FiMapPin className="mr-2 text-green-600" /> Preferred Locations
            </h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {preferredLocations.length} areas
            </span>
          </div>

          <form onSubmit={handleAddLocation} className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <input
                id="newLocation"
                type="text"
                placeholder="Enter new location"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
              />
              <FiMapPin className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <FiPlus className="mr-2" /> Add
            </button>
          </form>

          <div className="space-y-3">
            {preferredLocations.map((location, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-medium">{location}</span>
                <button
                  onClick={() => removeLocation(location)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Radius */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <FiTruck className="mr-2 text-blue-600" /> Delivery Radius
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Maximum delivery distance:</span>
              <span className="font-semibold text-green-600">{deliveryRadius} km</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              value={deliveryRadius}
              onChange={(e) => setDeliveryRadius(Number(e.target.value))}
              className="w-full range-slider"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>5 km</span>
              <span>50 km</span>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <FiClock className="mr-2 text-yellow-600" /> Working Hours
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Start Time</label>
              <div className="relative">
                <input
                  type="time"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={availability.start}
                  onChange={(e) => setAvailability({ ...availability, start: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-600">End Time</label>
              <div className="relative">
                <input
                  type="time"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={availability.end}
                  onChange={(e) => setAvailability({ ...availability, end: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <FiBell className="mr-2 text-purple-600" /> Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Email Notifications</span>
              <button
                onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications.email ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">SMS Alerts</span>
              <button
                onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications.sms ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifications.sms ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Push Notifications</span>
              <button
                onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications.push ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifications.push ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-8">
        <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Save Preferences
        </button>
      </div>
      <Payments />
    </div>
  );
};

export default Preferences;