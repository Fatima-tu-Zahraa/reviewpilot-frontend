import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PasswordInput from '../components/PasswordInput';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API}/api/auth/reset-password`, { token, password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
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
          {success ? (
            <>
              <h1 className="text-lg font-semibold mb-1">Password reset!</h1>
              <p className="text-sm text-gray-400">Redirecting you to log in...</p>
            </>
          ) : (
            <>
              <h1 className="text-lg font-semibold mb-1">Set a new password</h1>
              <p className="text-sm text-gray-400 mb-6">Choose a new password for your account.</p>

              {error && (
                <div className="bg-red-900/30 border border-red-800 text-red-400 text-sm rounded-lg px-3 py-2 mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="password" className="text-xs text-gray-400 mb-1 block">New Password</label>
                  <PasswordInput
                    id="password"
                    autoComplete="new-password"
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="text-xs text-gray-400 mb-1 block">Confirm Password</label>
                  <PasswordInput
                    id="confirmPassword"
                    autoComplete="new-password"
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition py-2.5 rounded-lg text-sm font-medium"
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-5">
          <Link to="/login" className="text-blue-500 hover:text-blue-400 transition">Back to log in</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;