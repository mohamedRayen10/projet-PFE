import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Det = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    paymentMethod: '',
  });
  const [paypalReady, setPaypalReady] = useState(false);

  useEffect(() => {
    // Load the PayPal script when PayPal is selected
    if (formData.paymentMethod === 'PayPal') {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&components=buttons';
      script.async = true;
      script.onload = () => setPaypalReady(true);
      document.body.appendChild(script);
    }
  }, [formData.paymentMethod]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.paymentMethod === 'PayPal' && paypalReady) {
      // Handle PayPal payment when PayPal is selected
      alert('Please complete your payment with PayPal.');
      return;
    }

    // Send the form data to the backend API for other payment methods
    try {
      const response = await fetch('/backend/payment/submit-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Payment details saved successfully!');
      } else {
        alert(data.error || 'An error occurred');
      }
    } catch (error) {
      alert('Error submitting the form: ' + error.message);
    }
  };

  const handlePayPalSuccess = async (details, data) => {
    // Send PayPal transaction details to the backend for saving
    const paymentData = {
      name: formData.name,
      email: formData.email,
      paymentMethod: 'PayPal',
      paymentDetails: details,
    };

    try {
      const response = await fetch('/backend/payment/submit-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Payment completed successfully!');
      } else {
        alert('Payment failed!');
      }
    } catch (error) {
      alert('Error processing PayPal payment: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-red-500 mb-8">Event Details</h2>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-red-500">Event {id} Description</h3>
        <p className="text-gray-700 mb-4">This is a detailed description of Event {id}. Here you can provide more information about what the event entails.</p>
        <p className="text-gray-600">Time: 10:00 AM, May 12, 2025</p>
        <p className="text-gray-600">Location: 123 Event St, City, Country</p>
        <p className="text-gray-600">Payment: Free</p>
      </div>

      <h3 className="text-xl font-semibold text-red-500 mb-4">Sign Up for Event {id}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-gray-700">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Crypto">Crypto</option>
          </select>
        </div>

        {/* PayPal Button */}
        {formData.paymentMethod === 'PayPal' && paypalReady && (
          <div id="paypal-button-container">
            <paypal.Buttons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: '10.00', // Adjust the amount dynamically based on your requirements
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  handlePayPalSuccess(details, data);
                });
              }}
              onError={(error) => {
                alert('An error occurred with PayPal payment: ' + error);
              }}
            />
          </div>
        )}

        {/* Submit for non-PayPal payments */}
        {formData.paymentMethod !== 'PayPal' && (
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
            Submit Payment
          </button>
        )}
      </form>
    </div>
  );
};

export default Det;
