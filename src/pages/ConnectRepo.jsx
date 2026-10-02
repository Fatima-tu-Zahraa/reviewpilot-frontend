import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function ConnectRepo() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-10">
        <Link to="/" className="text-sm text-gray-400 hover:text-white transition">← Back to repositories</Link>

        <h1 className="text-2xl font-semibold mt-4 mb-1">Connect a Repository</h1>
        <p className="text-gray-400 mb-8">Install ReviewPilot on a GitHub repository to start getting AI reviews.</p>

        <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-800">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-lg shrink-0">🔗</div>
            <div>
              <h2 className="font-medium mb-1">Install the GitHub App</h2>
              <p className="text-sm text-gray-400 mb-4">
                ReviewPilot connects to your repositories through a GitHub App.
                Choose which repos to give access to, and pull requests will start
                getting reviewed automatically.
              </p>
              <a href="https://github.com/settings/apps" target="_blank" rel="noreferrer" className="inline-block bg-blue-600 hover:bg-blue-500 transition px-4 py-2 rounded-lg text-sm font-medium">Go to GitHub App Settings</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectRepo;