import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [message, setMessage] = useState('Confirming payment, please wait...');
  const [error, setError] = useState('');

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const response = await fetch('/backend/payment/confirm', { // updated endpoint
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
        } else {
          setError(data.message || 'Payment confirmation failed.');
        }
      } catch (err) {
        setError('Server error during payment confirmation.');
      }
    };

    if (sessionId) {
      confirmPayment();
    } else {
      setError('Session ID missing in URL.');
    }
  }, [sessionId]);

  return (
    <div>
      <h2>Payment Success ya insen</h2>
      {error ? <p style={{ color: 'red' }}>{error}</p> : <p>{message}</p>}
    </div>
  );
};

export default PaymentSuccess;
