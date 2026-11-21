import React, { useState, useEffect } from 'react';
import Head2 from '../components/Head2';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const Contactez = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 48.8566, lng: 2.3522 }); // Example: Paris

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div><Head2 />
    <div className="min-h-screen flex justify-center items-center">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Contactez-Nous</h2>
        
        {/* Form */}
        <form action="/submit" method="POST" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Votre nom"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Votre email"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Votre message"
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              Envoyer
            </button>
          </div>
        </form>

        {/* Map */}
        <div className="mt-10">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={{
                height: '400px',
                width: '100%',
              }}
              center={mapCenter}
              zoom={10}
            >
              <Marker position={mapCenter} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contactez;
