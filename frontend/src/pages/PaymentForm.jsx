import React, { useState } from 'react';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the amount is a valid number (in cents) and a userId is provided
    const numericAmount = parseInt(amount);
    if (isNaN(numericAmount) || numericAmount <= 0 || !userId) {
      setError('Please enter a valid user ID and an amount greater than zero.');
      return;
    }

    try {
      // Call the backend to create a Stripe Checkout Session
      const response = await fetch('/backend/payment/submit-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, amount: numericAmount }),
      });
      const data = await response.json();

      if (response.ok && data.url) {
        // Redirect the user to the Stripe Checkout session page
        window.location.href = data.url;
      } else {
        setError(data.message || 'Error processing payment.');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div>
      <h2>Make a Payment</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount (in cents):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentForm;
