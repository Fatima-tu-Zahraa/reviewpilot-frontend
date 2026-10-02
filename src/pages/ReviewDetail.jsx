import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// **bold** aur `code` ko asli formatting mein badalta hai
function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code key={i} className="bg-gray-900 border border-gray-700 text-blue-300 text-[0.85em] px-1.5 py-0.5 rounded">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

// AI ka text (bullets, bold, code) ko saaf tareeqe se dikhata hai
function ReviewText({ text }) {
  const lines = (text || '').split('\n');
  const blocks = [];
  let bullets = [];

  const flushBullets = () => {
    if (bullets.length) {
      blocks.push({ type: 'list', items: bullets });
      bullets = [];
    }
  };

  lines.forEach((raw) => {
    const line = raw.trim();
    if (!line) {
      flushBullets();
    } else if (/^[*-]\s+/.test(line)) {
      bullets.push(line.replace(/^[*-]\s+/, ''));
    } else {
      flushBullets();
      blocks.push({ type: 'p', text: line });
    }
  });
  flushBullets();

  return (
    <div className="space-y-3 text-gray-300 leading-relaxed">
      {blocks.map((b, i) =>
        b.type === 'list' ? (
          <ul key={i} className="space-y-2.5">
            {b.items.map((item, j) => (
              <li key={j} className="flex gap-3">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p key={i}>{renderInline(b.text)}</p>
        )
      )}
    </div>
  );
}

function ReviewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${API}/api/reviews/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setReview(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch review:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        setLoading(false);
      });
  }, [id, navigate]);

  const toggleFalseAlarm = async () => {
    setError('');
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch(
        `${API}/api/reviews/${id}/false-alarm`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReview(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      setError(err.response?.data?.error || 'Could not update review. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <p className="max-w-6xl mx-auto px-6 py-10 text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <p className="max-w-6xl mx-auto px-6 py-10 text-gray-400">Review not found.</p>
      </div>
    );
  }

  const githubUrl = 'https://github.com/' + review.repoName + '/pull/' + review.prNumber;
  const backLink = '/repo/' + review.repoName.split('/')[1];
  const isFalseAlarm = !!review.falseAlarm;
  const reviewedOn = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link to={backLink} className="text-sm text-gray-400 hover:text-white transition">← Back to dashboard</Link>

        <div className="flex justify-between items-start mt-4 mb-1">
          <h1 className="text-2xl font-semibold tracking-tight">{review.prTitle}</h1>
          <span className="text-sm text-gray-500 shrink-0 ml-4 mt-1">#{review.prNumber}</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-8">
          <p className="text-gray-400">{review.repoName}</p>
          {reviewedOn && <span className="text-xs text-gray-600">• Reviewed on {reviewedOn}</span>}
          {isFalseAlarm && (
            <span className="inline-flex items-center gap-1.5 text-xs bg-amber-900/30 border border-amber-800/60 text-amber-400 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Marked as false alarm
            </span>
          )}
        </div>

        <div className={`bg-gray-800/60 rounded-xl p-6 border border-gray-800 mb-5 transition ${isFalseAlarm ? 'opacity-60' : ''}`}>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-4">AI Review</h2>
          <ReviewText text={review.reviewText} />
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-400 text-sm rounded-lg px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded-lg text-sm font-medium"
          >
            View on GitHub
          </a>
          <button
            onClick={toggleFalseAlarm}
            disabled={saving}
            className={`border transition px-4 py-2 rounded-lg text-sm disabled:opacity-60 disabled:cursor-not-allowed ${
              isFalseAlarm
                ? 'bg-amber-900/20 border-amber-800/60 text-amber-400 hover:bg-amber-900/30'
                : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-red-500 hover:text-red-400'
            }`}
          >
            {saving ? 'Saving...' : isFalseAlarm ? 'Undo false alarm' : 'Mark as False Alarm'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewDetail;