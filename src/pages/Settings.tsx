
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Trash2, Download, Eye, EyeOff } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    location: "",
    website: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    publicProfile: true,
    showActivity: true,
    theme: "dark",
    language: "en"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: boolean | string) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const handlePasswordChange = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    toast.success("Password updated successfully!");
    setFormData(prev => ({ 
      ...prev, 
      currentPassword: "", 
      newPassword: "", 
      confirmPassword: "" 
    }));
  };

  const handleDeleteAccount = () => {
    toast.error("Account deletion initiated. Please check your email for confirmation.");
  };

  const handleExportData = () => {
    toast.success("Data export initiated. You'll receive an email when ready.");
  };

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Profile Information</h3>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="name" className="text-white">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="bg-forest-light border-mint/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="bg-forest-light border-mint/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="bio" className="text-white">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className="bg-forest-light border-mint/20 text-white"
              placeholder="Tell us about yourself..."
            />
          </div>
          <div>
            <Label htmlFor="location" className="text-white">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="bg-forest-light border-mint/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="website" className="text-white">Website</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              className="bg-forest-light border-mint/20 text-white"
              placeholder="https://"
            />
          </div>
        </div>
      </div>

      <Separator className="bg-mint/10" />

      <div>
        <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
        <div className="grid gap-4 max-w-md">
          <div>
            <Label htmlFor="currentPassword" className="text-white">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                value={formData.currentPassword}
                onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                className="bg-forest-light border-mint/20 text-white pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 text-white/60 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor="newPassword" className="text-white">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              className="bg-forest-light border-mint/20 text-white"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-white">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className="bg-forest-light border-mint/20 text-white"
            />
          </div>
          <Button onClick={handlePasswordChange} className="bg-mint hover:bg-mint/90 text-forest w-fit">
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Privacy Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Public Profile</Label>
              <p className="text-sm text-white/60">Make your profile visible to other users</p>
            </div>
            <Switch
              checked={preferences.publicProfile}
              onCheckedChange={(checked) => handlePreferenceChange("publicProfile", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Show Activity</Label>
              <p className="text-sm text-white/60">Display your recent activity to others</p>
            </div>
            <Switch
              checked={preferences.showActivity}
              onCheckedChange={(checked) => handlePreferenceChange("showActivity", checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Theme & Appearance</h3>
        <div className="space-y-4">
          <div>
            <Label className="text-white">Theme</Label>
            <Select value={preferences.theme} onValueChange={(value) => handlePreferenceChange("theme", value)}>
              <SelectTrigger className="bg-forest-light border-mint/20 text-white w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccessibilitySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Language & Region</h3>
        <div className="space-y-4">
          <div>
            <Label className="text-white">Language</Label>
            <Select value={preferences.language} onValueChange={(value) => handlePreferenceChange("language", value)}>
              <SelectTrigger className="bg-forest-light border-mint/20 text-white w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Email Notifications</Label>
              <p className="text-sm text-white/60">Receive notifications via email</p>
            </div>
            <Switch
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) => handlePreferenceChange("emailNotifications", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Push Notifications</Label>
              <p className="text-sm text-white/60">Receive browser notifications</p>
            </div>
            <Switch
              checked={preferences.pushNotifications}
              onCheckedChange={(checked) => handlePreferenceChange("pushNotifications", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Marketing Emails</Label>
              <p className="text-sm text-white/60">Receive updates and promotional content</p>
            </div>
            <Switch
              checked={preferences.marketingEmails}
              onCheckedChange={(checked) => handlePreferenceChange("marketingEmails", checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Data Management</h3>
        <div className="space-y-4">
          <div className="p-4 border border-mint/20 rounded-lg">
            <h4 className="text-white font-medium mb-2">Export Your Data</h4>
            <p className="text-white/60 text-sm mb-3">Download a copy of your account data</p>
            <Button onClick={handleExportData} variant="outline" className="border-mint/20 text-mint hover:bg-mint/10">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
          <div className="p-4 border border-red-500/20 rounded-lg bg-red-500/5">
            <h4 className="text-white font-medium mb-2">Delete Account</h4>
            <p className="text-white/60 text-sm mb-3">Permanently delete your account and all data</p>
            <Button onClick={handleDeleteAccount} variant="destructive" className="bg-red-600 hover:bg-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return renderAccountSettings();
      case "privacy":
        return renderPrivacySettings();
      case "appearance":
        return renderAppearanceSettings();
      case "language":
        return renderAccessibilitySettings();
      case "notifications":
        return renderNotificationSettings();
      case "data":
        return renderDataSettings();
      default:
        return renderAccountSettings();
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            
            <div className="lg:col-span-3">
              <Card className="bg-forest-light border border-mint/10">
                <CardContent className="p-6">
                  {renderContent()}
                  
                  {activeTab !== "data" && (
                    <>
                      <Separator className="bg-mint/10 my-6" />
                      <div className="flex justify-end">
                        <Button onClick={handleSave} className="bg-mint hover:bg-mint/90 text-forest">
                          Save Changes
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
