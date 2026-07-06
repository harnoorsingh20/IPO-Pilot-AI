import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Loader2, User, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (demoEmail, demoPass) => { setEmail(demoEmail); setPassword(demoPass); setError(''); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-indigo-950 to-navy-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl"></div>
      </div>
      <div className="relative w-full max-w-md animate-fade-in">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/25">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">IPO Draft Assist</h1>
            <p className="text-slate-400 text-sm">AI-Powered IPO Document Generation</p>
          </div>
          {error && (<div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm text-center">{error}</div>)}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 outline-none transition-all text-sm"
                  placeholder="Enter your email" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 outline-none transition-all text-sm"
                  placeholder="Enter your password" required />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {loading ? (<><Loader2 className="w-4 h-4 animate-spin" />Signing In...</>) : 'Sign In'}
            </button>
          </form>
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-xs text-slate-500 uppercase tracking-wider">Quick Demo Access</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => fillDemo('aarav@example.com', 'demo123')}
              className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/30 rounded-xl transition-all duration-200 text-left group">
              <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-2 group-hover:bg-indigo-600/30 transition-colors">
                <span className="text-indigo-400 font-bold text-sm">AM</span>
              </div>
              <p className="text-white text-sm font-medium">Aarav Mehta</p>
              <p className="text-slate-500 text-xs mt-0.5">Issuer / Promoter</p>
            </button>
            <button type="button" onClick={() => fillDemo('priya@example.com', 'demo123')}
              className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 rounded-xl transition-all duration-200 text-left group">
              <div className="w-8 h-8 bg-emerald-600/20 rounded-lg flex items-center justify-center mb-2 group-hover:bg-emerald-600/30 transition-colors">
                <span className="text-emerald-400 font-bold text-sm">PS</span>
              </div>
              <p className="text-white text-sm font-medium">Priya Sharma</p>
              <p className="text-slate-500 text-xs mt-0.5">Reviewer / Banker</p>
            </button>
          </div>
        </div>
        <p className="text-center text-slate-600 text-xs mt-6">This is a demo prototype. Not for regulatory filing.</p>
      </div>
    </div>
  );
}
