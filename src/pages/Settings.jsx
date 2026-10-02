import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Settings() {
  const { repoName } = useParams();
  const [rules, setRules] = useState([
    'Every API route must have error handling',
    'No console.log statements in production code',
  ]);
  const [newRule, setNewRule] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);

  const addRule = () => {
    if (newRule.trim() === '') return;
    setRules([...rules, newRule.trim()]);
    setNewRule('');
  };

  const removeRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link to={`/repo/${repoName}`} className="text-sm text-gray-400 hover:text-white transition">
          ← Back to dashboard
        </Link>

        <h1 className="text-2xl font-semibold mt-4 mb-1">Settings</h1>
        <p className="text-gray-400 mb-8">{repoName}</p>

        <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-800 mb-5">
          <h2 className="text-sm font-semibold text-gray-300 mb-1">Custom Review Rules</h2>
          <p className="text-xs text-gray-500 mb-4">The AI will check every pull request against these rules.</p>

          <div className="space-y-2 mb-4">
            {rules.map((rule, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-900/60 rounded-lg px-4 py-2.5">
                <span className="text-sm text-gray-200">{rule}</span>
                <button
                  onClick={() => removeRule(index)}
                  className="text-gray-500 hover:text-red-400 text-sm transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addRule()}
              placeholder="e.g. All functions must have comments"
              className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-600"
            />
            <button
              onClick={addRule}
              className="bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded-lg text-sm font-medium"
            >
              Add
            </button>
          </div>
        </div>

        <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-300">Email Notifications</h2>
            <p className="text-xs text-gray-500 mt-1">Get a summary email after every review.</p>
          </div>
          <button
            onClick={() => setEmailNotifications(!emailNotifications)}
            className={`w-11 h-6 rounded-full transition relative ${emailNotifications ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${emailNotifications ? 'left-5.5' : 'left-0.5'}`}
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;