import { useMemo } from "react";
import Link from "next/link";
import { FiPackage, FiCheckCircle, FiDollarSign, FiMapPin, FiClock, FiActivity } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Static data can be directly assigned
  const pendingDeliveries = 5;
  const completedDeliveries = 10;
  const earnings = 250;

  const activities = useMemo(() => [
    { id: 1, time: "10:30 AM", status: "Picked Up", location: "Connaught Place", orderId: "#ORD1234" },
    { id: 2, time: "9:15 AM", status: "In Transit", location: "Cyber Hub", orderId: "#ORD1233" },
    { id: 3, time: "8:00 AM", status: "Delivered", location: "Saket", orderId: "#ORD1232" },
  ], []);  // Memoizing activities if it's coming from dynamic sources later

  const chartData = [
    { day: "Mon", earnings: 45 },
    { day: "Tue", earnings: 80 },
    { day: "Wed", earnings: 65 },
    { day: "Thu", earnings: 120 },
    { day: "Fri", earnings: 95 },
    { day: "Sat", earnings: 150 },
    { day: "Sun", earnings: 200 },
  ];

  return (
    <div className="container mx-auto bg-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mt-20">Delivery Dashboard</h1>
        <div className="flex items-center space-x-2 text-gray-600">
          <FiMapPin className="text-green-600" />
          <span>New Delhi, India</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 mb-2 flex items-center">
                <FiPackage className="mr-2 text-green-600" /> Pending Deliveries
              </p>
              <p className="text-3xl font-bold text-gray-800">{pendingDeliveries}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-full">
              <FiPackage className="text-2xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 mb-2 flex items-center">
                <FiCheckCircle className="mr-2 text-blue-600" /> Completed Deliveries
              </p>
              <p className="text-3xl font-bold text-gray-800">{completedDeliveries}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <FiCheckCircle className="text-2xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 mb-2 flex items-center">
                <FiDollarSign className="mr-2 text-yellow-600" /> Total Earnings
              </p>
              <p className="text-3xl font-bold text-gray-800">₹ {earnings}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-full">
              <FiDollarSign className="text-2xl text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <FiActivity className="mr-2 text-green-600" /> Earnings Overview
          </h2>
          <div className="text-gray-500 text-sm">Last 7 Days</div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <FiClock className="mr-2 text-blue-600" /> Recent Activities
          </h2>
          <Link href="/delivery" className="text-green-600 hover:text-green-700 text-sm">
            View All →</Link>
        </div>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${activity.status === 'Delivered' ? 'bg-green-100' : activity.status === 'In Transit' ? 'bg-blue-100' : 'bg-yellow-100'}`}>
                  {activity.status === 'Delivered' ? (
                    <FiCheckCircle className="text-green-600" />
                  ) : activity.status === 'In Transit' ? (
                    <FiPackage className="text-blue-600" />
                  ) : (
                    <FiClock className="text-yellow-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{activity.status}</p>
                  <p className="text-sm text-gray-500">{activity.orderId}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{activity.time}</p>
                <p className="text-sm text-gray-400">{activity.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
