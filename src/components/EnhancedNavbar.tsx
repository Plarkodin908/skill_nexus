
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, MessageSquare, HelpCircle, Settings } from 'lucide-react';

const EnhancedNavbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'dashboard';
    if (path.includes('profile')) return 'profile';
    if (path.includes('messages')) return 'messages';
    if (path.includes('tutorials')) return 'help';
    if (path.includes('settings')) return 'settings';
    return '';
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav bg-dark-purple/80 backdrop-blur-lg border-b border-primary-purple/30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img 
            src="/lovable-uploads/609db0c7-2e29-405b-ad44-bee4b401e14e.png" 
            alt="SKILL NEXUS Logo" 
            className="h-12 w-auto animate-fade-in"
          />
          <span className="text-2xl font-bold text-white">SKILL NEXUS</span>
        </Link>
        
        <div className="hidden lg:flex flex-row justify-center items-center space-x-2 transition-all duration-300">
          <Link 
            to="/dashboard" 
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-primary-purple text-white' : 'text-white/80 hover:bg-primary-purple/20'}`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/profile" 
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'profile' ? 'bg-primary-purple text-white' : 'text-white/80 hover:bg-primary-purple/20'}`}
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>
          
          <Link 
            to="/messages" 
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'messages' ? 'bg-primary-purple text-white' : 'text-white/80 hover:bg-primary-purple/20'}`}
          >
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
          </Link>
          
          <Link 
            to="/tutorials" 
            onClick={() => setActiveTab('help')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'help' ? 'bg-primary-purple text-white' : 'text-white/80 hover:bg-primary-purple/20'}`}
          >
            <HelpCircle className="h-5 w-5" />
            <span>Help</span>
          </Link>
          
          <Link 
            to="/settings" 
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${activeTab === 'settings' ? 'bg-primary-purple text-white' : 'text-white/80 hover:bg-primary-purple/20'}`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>

        <Link to="/marketplace">
          <button className="bg-primary-purple hover:bg-primary-purple/90 text-white font-medium hover-scale px-4 py-2 rounded-md transition-all duration-300 animate-breathe">
            Explore Courses
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default EnhancedNavbar;
