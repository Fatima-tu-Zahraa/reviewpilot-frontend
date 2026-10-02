import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post(`${API}/api/auth/forgot-password`, { email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-lg">🤖</div>
          <span className="text-xl font-semibold">ReviewPilot</span>
        </div>

        <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-800 shadow-xl shadow-black/20">
          {sent ? (
            <>
              <h1 className="text-lg font-semibold mb-1">Check your email</h1>
              <p className="text-sm text-gray-400">
                If an account exists for <span className="text-gray-200">{email}</span>, we've sent a
                password reset link. It expires in 1 hour.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-lg font-semibold mb-1">Forgot password?</h1>
              <p className="text-sm text-gray-400 mb-6">
                Enter your email and we'll send you a reset link.
              </p>

              {error && (
                <div className="bg-red-900/30 border border-red-800 text-red-400 text-sm rounded-lg px-3 py-2 mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="text-xs text-gray-400 mb-1 block">Email</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition py-2.5 rounded-lg text-sm font-medium"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          Remembered your password?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-400 transition">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;