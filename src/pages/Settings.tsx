import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const location = useLocation();
  
  useEffect(() => {
    // Set active tab based on URL path
    if (location.pathname.includes('appearance')) {
      setActiveTab('appearance');
    } else if (location.pathname.includes('accessibility')) {
      setActiveTab('language');
    } else {
      setActiveTab('account');
    }
  }, [location.pathname]);

  return (
    <div className="bg-dark-purple min-h-screen">
      <Navbar />
      <div className="container mx-auto py-20 px-4 pb-20 md:pb-4">
        <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          
          <div className="w-full md:w-2/3 lg:w-3/4 bg-forest-light p-6 rounded-lg border border-mint/20">
            {activeTab === 'account' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Account Settings</h2>
                <p className="text-white/70 mb-6">
                  Manage your account settings and preferences.
                </p>
                {/* Account settings content here */}
              </div>
            )}
            
            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>
                <p className="text-white/70 mb-6">
                  Control your privacy settings and what information is visible to others.
                </p>
                {/* Privacy settings content here */}
              </div>
            )}
            
            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Appearance</h2>
                <p className="text-white/70 mb-6">
                  Customize the look and feel of your Skill Nexus experience.
                </p>
                {/* Appearance settings content here */}
              </div>
            )}
            
            {activeTab === 'language' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Accessibility</h2>
                <p className="text-white/70 mb-6">
                  Configure accessibility options to make Skill Nexus work better for you.
                </p>
                {/* Language settings content here */}
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Notification Settings</h2>
                <p className="text-white/70 mb-6">
                  Manage how and when you receive notifications.
                </p>
                {/* Notification settings content here */}
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Security Settings</h2>
                <p className="text-white/70 mb-6">
                  Manage your security preferences, password and authentication options.
                </p>
                {/* Security settings content here */}
              </div>
            )}

            {activeTab === 'skills' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Skills Management</h2>
                <p className="text-white/70 mb-6">
                  Manage your skills, expertise areas and learning preferences.
                </p>
                {/* Skills settings content here */}
              </div>
            )}

            {activeTab === 'data' && (
              <div>
                <h2 className="text-xl font-bold mb-4">Data & Privacy</h2>
                <p className="text-white/70 mb-6">
                  Control your data, download your information, or delete your account.
                </p>
                {/* Data settings content here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
