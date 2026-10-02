import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RepoList from './pages/RepoList';
import RepoDashboard from './pages/RepoDashboard';
import ReviewDetail from './pages/ReviewDetail';
import Settings from './pages/Settings';
import ConnectRepo from './pages/ConnectRepo';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={
          <ProtectedRoute><RepoList /></ProtectedRoute>
        } />
        <Route path="/repo/:repoName" element={
          <ProtectedRoute><RepoDashboard /></ProtectedRoute>
        } />
        <Route path="/review/:id" element={
          <ProtectedRoute><ReviewDetail /></ProtectedRoute>
        } />
        <Route path="/repo/:repoName/settings" element={
          <ProtectedRoute><Settings /></ProtectedRoute>
        } />
        <Route path="/connect" element={
          <ProtectedRoute><ConnectRepo /></ProtectedRoute>
        } />
        <Route path="/forgot-password" element={<ForgotPassword />
        } />
        <Route path="/reset-password/:token" element={<ResetPassword />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;