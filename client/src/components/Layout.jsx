import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCompanies } from '../services/api';
import { Shield, LayoutDashboard, ClipboardList, FileText, FileCheck2, UserCheck, Download, LogOut, Building2, ChevronRight } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/intake', icon: ClipboardList, label: 'Intake Form' },
  { to: '/documents', icon: FileText, label: 'Documents' },
  { to: '/draft', icon: FileCheck2, label: 'Draft & Heatmap' },
  { to: '/reviewer', icon: UserCheck, label: 'Reviewer Workspace', reviewerOnly: true },
  { to: '/export', icon: Download, label: 'Export' },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const res = await getCompanies();
        const companies = res.data.companies || res.data;
        if (companies && companies.length > 0) {
          const comp = companies[0];
          setCompany(comp);
          const id = comp._id || comp.id;
          localStorage.setItem('ipo_company_id', id);
        }
      } catch (err) {
        console.error('Failed to load companies:', err);
      }
    };
    loadCompany();
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  const getInitials = (name) => {
    if (!name) return '??';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <aside className="w-72 bg-navy-900 flex flex-col h-full fixed left-0 top-0 z-30">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">IPO Draft Assist</h1>
              <span className="text-xs text-slate-500 font-mono">v1.0 — Demo</span>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3 px-3 py-2.5 bg-white/5 rounded-xl">
            <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate">{company?.legal_name || company?.name || 'Loading...'}</p>
              <p className="text-xs text-slate-500">Active Company</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.filter((item) => !item.reviewerOnly || user?.role === 'reviewer').map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive ? 'bg-indigo-600/20 text-white border-l-2 border-indigo-400 ml-0' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {getInitials(user?.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium truncate">{user?.name}</p>
              <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${user?.role === 'reviewer' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-indigo-900/40 text-indigo-400'}`}>
                {user?.role === 'reviewer' ? 'Reviewer' : 'Issuer'}
              </span>
            </div>
            <button onClick={handleLogout} className="p-2 text-slate-500 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
      <main className="ml-72 flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
