
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
            src="/lovable-uploads/aaa9c8ad-47c0-4ec1-b299-8b47f30da290.png" 
            alt="SKILL NEXUS Logo" 
            className="h-10 w-auto animate-fade-in"
          />
          <span className="text-2xl font-bold text-white">SKILL NEXUS</span>
        </Link>
        
        <div className="hidden md:flex flex-col justify-center items-center relative transition-all duration-450 ease-in-out">
          <article className="border border-solid border-primary-purple/50 ease-in-out duration-500 rounded-2xl inline-block shadow-lg shadow-black/15 bg-dark-purple/80">
            <div className="flex">
              <Link to="/dashboard" onClick={() => setActiveTab('dashboard')}>
                <label className={`relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-primary-purple/10 flex flex-row gap-3 items-center justify-center rounded-xl ${activeTab === 'dashboard' ? 'shadow-lg border text-primary-purple' : 'text-white/80 hover:text-primary-purple'}`}>
                  <input className="hidden peer/expand" type="radio" name="path" id="dashboard" checked={activeTab === 'dashboard'} readOnly />
                  <LayoutDashboard className={`peer-hover/expand:scale-125 peer-hover/expand:text-primary-purple text-2xl ${activeTab === 'dashboard' ? 'text-primary-purple scale-125' : ''} ease-in-out duration-300`} />
                  <span className="hidden lg:inline">Dashboard</span>
                </label>
              </Link>

              <Link to="/profile" onClick={() => setActiveTab('profile')}>
                <label className={`relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-primary-purple/10 flex flex-row gap-3 items-center justify-center rounded-xl ${activeTab === 'profile' ? 'shadow-lg border text-primary-purple' : 'text-white/80 hover:text-primary-purple'}`}>
                  <input className="hidden peer/expand" type="radio" name="path" id="profile" checked={activeTab === 'profile'} readOnly />
                  <User className={`peer-hover/expand:scale-125 peer-hover/expand:text-primary-purple text-2xl ${activeTab === 'profile' ? 'text-primary-purple scale-125' : ''} ease-in-out duration-300`} />
                  <span className="hidden lg:inline">Profile</span>
                </label>
              </Link>

              <Link to="/messages" onClick={() => setActiveTab('messages')}>
                <label className={`relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-primary-purple/10 flex flex-row gap-3 items-center justify-center rounded-xl ${activeTab === 'messages' ? 'shadow-lg border text-primary-purple' : 'text-white/80 hover:text-primary-purple'}`}>
                  <input className="hidden peer/expand" type="radio" name="path" id="messages" checked={activeTab === 'messages'} readOnly />
                  <MessageSquare className={`peer-hover/expand:scale-125 peer-hover/expand:text-primary-purple text-2xl ${activeTab === 'messages' ? 'text-primary-purple scale-125' : ''} ease-in-out duration-300`} />
                  <span className="hidden lg:inline">Messages</span>
                </label>
              </Link>

              <Link to="/tutorials" onClick={() => setActiveTab('help')}>
                <label className={`relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-primary-purple/10 flex flex-row gap-3 items-center justify-center rounded-xl ${activeTab === 'help' ? 'shadow-lg border text-primary-purple' : 'text-white/80 hover:text-primary-purple'}`}>
                  <input className="hidden peer/expand" type="radio" name="path" id="help" checked={activeTab === 'help'} readOnly />
                  <HelpCircle className={`peer-hover/expand:scale-125 peer-hover/expand:text-primary-purple text-2xl ${activeTab === 'help' ? 'text-primary-purple scale-125' : ''} ease-in-out duration-300`} />
                  <span className="hidden lg:inline">Help</span>
                </label>
              </Link>

              <Link to="/settings" onClick={() => setActiveTab('settings')}>
                <label className={`relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-primary-purple/10 flex flex-row gap-3 items-center justify-center rounded-xl ${activeTab === 'settings' ? 'shadow-lg border text-primary-purple' : 'text-white/80 hover:text-primary-purple'}`}>
                  <input className="hidden peer/expand" type="radio" name="path" id="settings" checked={activeTab === 'settings'} readOnly />
                  <Settings className={`peer-hover/expand:scale-125 peer-hover/expand:text-primary-purple text-2xl ${activeTab === 'settings' ? 'text-primary-purple scale-125' : ''} ease-in-out duration-300`} />
                  <span className="hidden lg:inline">Settings</span>
                </label>
              </Link>
            </div>
          </article>
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
