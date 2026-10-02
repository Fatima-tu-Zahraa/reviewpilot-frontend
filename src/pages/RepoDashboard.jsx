import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Card ke preview ke liye markdown symbols hata deta hai
function toPreview(text) {
  return (text || '')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/^\s*[*-]\s+/gm, '• ')
    .trim();
}

function formatDate(date) {
  if (!date) return '';
  return new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}

function RepoDashboard() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' | 'falseAlarm'

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${API}/api/reviews`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch reviews:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        setLoading(false);
      });
  }, [navigate]);

  const falseAlarmCount = reviews.filter((r) => r.falseAlarm).length;
  const visibleReviews = filter === 'falseAlarm' ? reviews.filter((r) => r.falseAlarm) : reviews;
  const reviewLabel = reviews.length === 1 ? 'AI review' : 'AI reviews';

  const tabClass = (active) =>
    `text-sm px-3 py-1.5 rounded-lg transition ${
      active ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
    }`;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Link to="/" className="text-sm text-gray-400 hover:text-white transition">
          ← Back to repositories
        </Link>

        <div className="flex items-center justify-between mt-4 mb-1">
          <h1 className="text-2xl font-semibold tracking-tight">my-first-project</h1>
          <div className="flex items-center gap-4">
            {!loading && (
              <span className="text-sm text-gray-500">{reviews.length} {reviewLabel}</span>
            )}
            <Link
              to="/repo/my-first-project/settings"
              className="text-sm text-gray-400 hover:text-white transition border border-gray-700 hover:border-gray-600 rounded-lg px-3 py-1.5"
            >
              Settings
            </Link>
          </div>
        </div>
        <p className="text-gray-400 mb-6">Fatima-tu-Zahraa/my-first-project</p>

        {/* Filter tabs */}
        {!loading && reviews.length > 0 && (
          <div className="flex items-center gap-2 mb-5">
            <button onClick={() => setFilter('all')} className={tabClass(filter === 'all')}>
              All <span className="text-gray-500 ml-1">{reviews.length}</span>
            </button>
            <button onClick={() => setFilter('falseAlarm')} className={tabClass(filter === 'falseAlarm')}>
              False alarms <span className="text-gray-500 ml-1">{falseAlarmCount}</span>
            </button>
          </div>
        )}

        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-gray-800/40 rounded-xl p-5 border border-gray-800 animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-1/3 mb-3"></div>
                <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-gray-800/60 rounded-xl p-10 border border-gray-800 text-center text-gray-400">
            No reviews yet. Open a pull request to get your first AI review.
          </div>
        ) : visibleReviews.length === 0 ? (
          <div className="bg-gray-800/60 rounded-xl p-10 border border-gray-800 text-center text-gray-400">
            No reviews marked as false alarm.
          </div>
        ) : (
          <div className="space-y-3">
            {visibleReviews.map((review) => (
              <Link key={review._id} to={`/review/${review._id}`} className="group block">
                <div
                  className={`bg-gray-800/60 rounded-xl p-5 border border-gray-800 group-hover:border-blue-600/60 group-hover:bg-gray-800 transition cursor-pointer ${
                    review.falseAlarm ? 'opacity-70' : ''
                  }`}
                >
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div className="flex flex-wrap items-center gap-2 min-w-0">
                      <h2 className="font-medium">{review.prTitle}</h2>
                      {review.falseAlarm && (
                        <span className="inline-flex items-center gap-1.5 text-xs bg-amber-900/30 border border-amber-800/60 text-amber-400 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          False alarm
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 shrink-0">#{review.prNumber}</span>
                  </div>

                  <p
                    className="text-gray-400 whitespace-pre-line text-sm leading-relaxed"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {toPreview(review.reviewText)}
                  </p>

                  <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                    <span>{formatDate(review.createdAt)}</span>
                    <span className="text-blue-500 group-hover:translate-x-1 transition-transform">View full review →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RepoDashboard;