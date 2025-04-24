"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../utils/supabaseClient";

export default function DeliveryOnboarding() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    license: "",
    locations: "",
    experience: "",
    language: "",
  });
  const [vehicleType, setVehicleType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);

    if (!form.name || !form.address || !form.phone || !form.locations || !vehicleType) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (vehicleType !== "cycle" && !form.license) {
      setError("License is required for motor vehicles.");
      setLoading(false);
      return;
    }

    let userId: string | null = null;
    useEffect(() => {
      userId = localStorage.getItem("userId");
    }, []);
    if (!userId) {
      setError("User ID not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const { error: supabaseError } = await supabase
        .from("delivery")
        .insert([
          {
            id:userId,
            name: form.name,
            address: form.address,
            phone: form.phone,
            license: vehicleType !== "cycle" ? form.license : null,
            preferred_locations: form.locations,
            vehicle_type: vehicleType,
            experience: form.experience,
            preferred_language: form.language,
          },
        ])
        .select();

      if (supabaseError) {
        setError("Failed to save data: " + supabaseError.message);
      } else {
        window.location.href = "/delivery";
      }
    } catch (err: any) {
      setError("Unexpected error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white max-w-md w-full p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-green-800 text-center">Delivery Partner Onboarding</h2>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            value={form.name}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:ring-green-500 focus:border-green-500"
          />
          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            value={form.address}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
          <input
            name="phone"
            placeholder="Phone Number"
            type="tel"
            onChange={handleChange}
            value={form.phone}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
          <select
            name="vehicleType"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          >
            <option value="">Select Vehicle Type</option>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
            <option value="cycle">Cycle</option>
          </select>

          {vehicleType !== "cycle" && (
            <input
              name="license"
              placeholder="License Number"
              onChange={handleChange}
              value={form.license}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
            />
          )}

          <input
            name="locations"
            placeholder="Preferred Delivery Locations (comma-separated)"
            onChange={handleChange}
            value={form.locations}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />

          <select
            name="experience"
            onChange={handleChange}
            value={form.experience}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          >
            <option value="">Delivery Experience</option>
            <option value="0-1">0–1 year</option>
            <option value="1-3">1–3 years</option>
            <option value="3+">3+ years</option>
          </select>

          <select
            name="language"
            onChange={handleChange}
            value={form.language}
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          >
            <option value="">Preferred Language</option>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ml">Malayalam</option>
            <option value="ta">Tamil</option>
          </select>
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
