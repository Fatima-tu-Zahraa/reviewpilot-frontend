import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function RepoList() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Your Repositories</h1>
            <p className="text-sm text-gray-400 mt-1">
              Repositories connected to ReviewPilot. Every new pull request gets an AI review.
            </p>
          </div>
          <Link
            to="/connect"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 transition text-sm font-medium px-4 py-2 rounded-lg shadow-lg shadow-blue-600/20 self-start sm:self-auto"
          >
            <span className="text-base leading-none">+</span>
            Connect repository
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Repo card */}
          <Link to="/repo/my-first-project" className="group">
            <div className="h-full bg-gray-800/60 rounded-xl p-5 border border-gray-800 group-hover:border-blue-600/60 group-hover:bg-gray-800 group-hover:-translate-y-0.5 group-hover:shadow-xl group-hover:shadow-black/20 transition-all duration-200">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-300">
                    {/* Repo icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-medium text-white truncate">my-first-project</h2>
                    <p className="text-xs text-gray-500 truncate">Fatima-tu-Zahraa/my-first-project</p>
                  </div>
                </div>

                <span className="shrink-0 inline-flex items-center gap-1.5 text-xs bg-green-900/40 border border-green-800/60 text-green-400 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Active
                </span>
              </div>

              <div className="pt-4 border-t border-gray-800 flex items-center justify-between text-sm">
                <span className="text-gray-400">View AI reviews</span>
                <span className="text-blue-500 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>

          {/* Connect card */}
          <Link to="/connect" className="group">
            <div className="h-full min-h-[150px] border-2 border-dashed border-gray-700 rounded-xl p-5 flex flex-col items-center justify-center text-center group-hover:border-blue-600/60 group-hover:bg-blue-600/5 transition-all duration-200">
              <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xl text-gray-400 group-hover:text-blue-500 group-hover:border-blue-600/60 mb-3 transition">
                +
              </div>
              <p className="text-sm font-medium text-gray-300">Connect a repository</p>
              <p className="text-xs text-gray-500 mt-1">Add another repo to get AI reviews</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RepoList;