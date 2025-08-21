import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [status, setStatus] = useState('idle');
  const [user, setUser] = useState(null);
  const [lastPayment, setLastPayment] = useState({ id: '', txid: '' });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Pi) {
      setStatus('Pi SDK ready (open in Pi Browser)');
    } else {
      setStatus('Open this page inside Pi Browser to use the Pi SDK');
    }
  }, []);

  async function handleLogin() {
    try {
      if (!window.Pi) return alert('Open in Pi Browser');
      // Request scopes; see SDK docs
      const scopes = ['username', 'payments'];
      const auth = await window.Pi.authenticate(scopes);
      const resp = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + '/api/pi/verify-login',
        { accessToken: auth.accessToken }
      );
      if (resp.data.ok) setUser(resp.data.user);
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  }

  async function startPayment() {
    try {
      if (!window.Pi) return alert('Open in Pi Browser');
      if (!user) return alert('Login first');

      const paymentData = {
        amount: 1,             // example amount
        memo: 'Test payment',  // shown to user
        metadata: { orderId: 'demo123' },
      };

      const paymentCallbacks = {
        // 1) SDK gives paymentId for server-side approval
        onReadyForServerApproval: async (paymentId) => {
          setLastPayment({ id: paymentId, txid: '' });

          // Optionally reserve order & record "CREATED"
          await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/pi/payments/create', {
            ...paymentData, userId: user.id, paymentId
          });

          // Server-side approval (POST /payments/:id/approve)
          await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/pi/payments/approve', {
            paymentId
          });
        },

        // 2) SDK returns txid after the user signs & submits the tx
        onReadyForServerCompletion: async (paymentId, txid) => {
          setLastPayment({ id: paymentId, txid });
          // Server-side completion (POST /payments/:id/complete { txid })
          await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/pi/payments/complete', {
            paymentId, txid
          });
          alert('Payment completed!');
        },

        // 3) Optional UX callbacks
        onCancel: (paymentId) => {
          console.warn('User canceled payment', paymentId);
        },
        onError: (error, paymentId) => {
          console.error('Payment error', error, paymentId);
          alert('Payment error: ' + (error?.message || 'Unknown error'));
        }
      };

      // Trigger the Pi Wallet modal for U2A (Pioneer→App) payment
      await window.Pi.createPayment(paymentData, paymentCallbacks);
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: '40px auto', fontFamily: 'system-ui' }}>
      <h1>Freelance Pi Hub — Pi SDK Starter</h1>
      <p>Status: {status}</p>

      {!user ? (
        <button onClick={handleLogin} style={{ padding: '10px 16px' }}>
          Login with Pi
        </button>
      ) : (
        <div>
          <p>Logged in as <b>{user.username}</b> (uid: {user.pi_uid})</p>
          <button onClick={startPayment} style={{ padding: '10px 16px' }}>
            Start Payment (U2A)
          </button>
          {lastPayment.id && (
            <p style={{ marginTop: 8 }}>
              paymentId: {lastPayment.id}{lastPayment.txid ? ` • txid: ${lastPayment.txid}` : ''}
            </p>
          )}
        </div>
      )}
    </main>
  );
}