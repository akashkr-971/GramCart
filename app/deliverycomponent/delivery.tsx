'use client';

import { useState, useMemo } from "react";
import { FiPackage, FiCheckCircle, FiClock, FiMapPin, FiSearch, FiAlertTriangle, FiActivity } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const Deliveries = () => {
  const [pendingDeliveries, setPendingDeliveries] = useState([
    { 
      id: 1, 
      customer: "John Doe", 
      address: "123 Elm St, Downtown", 
      status: "pending",
      orderId: "#ORD-1234",
      estimatedTime: "30-45 mins",
      items: 3
    },
    { 
      id: 2, 
      customer: "Jane Smith", 
      address: "456 Oak St, Business District", 
      status: "pending",
      orderId: "#ORD-1235",
      estimatedTime: "15-30 mins",
      items: 2
    },
  ]);

  const [completedDeliveries, setCompletedDeliveries] = useState([
    { 
      id: 3, 
      customer: "Mike Lee", 
      address: "789 Pine St, Residential Area", 
      status: "completed",
      orderId: "#ORD-1233",
      completedDate: "2025-04-22 14:30",
      items: 5
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  
  // Filtering deliveries based on search query
  const filteredPendingDeliveries = useMemo(() => 
    pendingDeliveries.filter(delivery => 
      delivery.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.orderId.toLowerCase().includes(searchQuery.toLowerCase())
    ), [pendingDeliveries, searchQuery]);

  const filteredCompletedDeliveries = useMemo(() => 
    completedDeliveries.filter(delivery => 
      delivery.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.orderId.toLowerCase().includes(searchQuery.toLowerCase())
    ), [completedDeliveries, searchQuery]);

  const markAsCompleted = (id: number) => {
    const delivery = pendingDeliveries.find(d => d.id === id);
    if (delivery) {
      setPendingDeliveries(pendingDeliveries.filter(d => d.id !== id));
      setCompletedDeliveries([
        ...completedDeliveries,
        { 
          ...delivery, 
          status: "completed",
          completedDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss') // Consistent date format
        }
      ]);
    }
  };

  const deliveryData = [
    { day: "Mon", pending: 5, completed: 8 },
    { day: "Tue", pending: 3, completed: 10 },
    { day: "Wed", pending: 7, completed: 12 },
    { day: "Thu", pending: 4, completed: 9 },
    { day: "Fri", pending: 6, completed: 14 },
    { day: "Sat", pending: 9, completed: 18 },
    { day: "Sun", pending: 4, completed: 15 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0 mt-16">Delivery Management</h1>
        <div className="relative w-full mt-16 md:w-64">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search deliveries..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Stats and Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 mb-2 flex items-center">
                <FiClock className="mr-2 text-yellow-600" /> Pending Deliveries Today
              </p>
              <p className="text-3xl font-bold text-gray-800">{filteredPendingDeliveries.length}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-full">
              <FiClock className="text-2xl text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 mb-2 flex items-center">
                <FiCheckCircle className="mr-2 text-green-600" /> Completed Today
              </p>
              <p className="text-3xl font-bold text-gray-800">{filteredCompletedDeliveries.length}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-full">
              <FiCheckCircle className="text-2xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 mb-2 flex items-center">
            <FiActivity className="mr-2 text-blue-600" /> Weekly Progress
          </h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Deliveries Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Deliveries */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <FiAlertTriangle className="mr-2 text-yellow-600" /> Pending Deliveries
            </h2>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              {filteredPendingDeliveries.length} Active
            </span>
          </div>

          <div className="space-y-4">
            {filteredPendingDeliveries.map((delivery) => (
              <div key={delivery.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-yellow-100 p-2 rounded-full">
                        <FiPackage className="text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-semibold">{delivery.customer}</p>
                        <p className="text-sm text-gray-500">{delivery.orderId}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FiMapPin className="mr-1" />
                        <span>{delivery.address}</span>
                      </div>
                      <span>•</span>
                      <span>{delivery.items} items</span>
                    </div>
                  </div>
                  <button
                    onClick={() => markAsCompleted(delivery.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <FiCheckCircle className="mr-2" /> Complete
                  </button>
                </div>
                <div className="mt-3 flex items-center text-sm text-yellow-600">
                  <FiClock className="mr-2" />
                  Estimated delivery time: {delivery.estimatedTime}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Deliveries */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center">
              <FiCheckCircle className="mr-2 text-green-600" /> Completed Deliveries
            </h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {filteredCompletedDeliveries.length} Total
            </span>
          </div>

          <div className="space-y-4">
            {filteredCompletedDeliveries.map((delivery) => (
              <div key={delivery.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <FiCheckCircle className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{delivery.customer}</p>
                    <p className="text-sm text-gray-500">{delivery.orderId}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FiMapPin className="mr-1" />
                    <span>{delivery.address}</span>
                  </div>
                  <span>•</span>
                  <span>{delivery.items} items</span>
                </div>
                <div className="mt-3 flex items-center text-sm text-green-600">
                  <FiClock className="mr-2" />
                  Delivered on: {delivery.completedDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deliveries;
