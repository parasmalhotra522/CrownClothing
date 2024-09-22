import React, { useEffect, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'; // or use your routing library

const PaymentSuccess = () => {
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate(); // use your routing library's hook

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate('/'); // Redirect after countdown
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <AiOutlineCheckCircle style={styles.icon} />
        <h1 style={styles.message}>Payment Successful</h1>
        <p style={styles.countdown}>Redirecting in {countdown}...</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  innerContainer: {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  icon: {
    fontSize: '60px',
    color: 'green',
  },
  message: {
    margin: '20px 0',
  },
  countdown: {
    fontSize: '18px',
    color: '#555',
  },
};

export default PaymentSuccess;
