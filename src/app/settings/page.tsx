"use client";
import React, { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  Shield,
  Mail,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Check,
  ChevronRight,
  Upload,
  X,
  Save,
  Eye,
  EyeOff,
  Key,
  CreditCard,
  Download,
  Trash2,
  LogOut,
  AlertCircle,
  Settings as SettingsIcon,
} from "lucide-react";

interface NotificationSettings {
  email: boolean;
  push: boolean;
  taskUpdates: boolean;
  teamActivity: boolean;
  weeklyReport: boolean;
  mentions: boolean;
}

interface SecuritySettings {
  twoFactor: boolean;
  loginAlerts: boolean;
  sessionTimeout: string;
}

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "auto">("light");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("UTC-5 (EST)");

  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    taskUpdates: true,
    teamActivity: false,
    weeklyReport: true,
    mentions: true,
  });

  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactor: true,
    loginAlerts: true,
    sessionTimeout: "30",
  });

  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    phone: "+1 (555) 123-4567",
    role: "Product Designer",
    bio: "Passionate about creating intuitive user experiences",
    location: "San Francisco, CA",
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security & Privacy", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "preferences", label: "Preferences", icon: SettingsIcon },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSecurity = (key: keyof SecuritySettings) => {
    if (key === "sessionTimeout") return;
    setSecurity((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Settings</h1>
          <p className="text-sm text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-8">
              <div className="p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          activeTab === tab.id
                            ? "bg-blue-50 text-blue-700 shadow-sm"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="flex-1 text-left">{tab.label}</span>
                        {activeTab === tab.id && (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="px-4 py-4 bg-red-50 border-t border-red-100">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-700 hover:bg-red-100 transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              {/* Profile Settings */}
              {activeTab === "profile" && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Profile Information
                    </h2>
                    <p className="text-sm text-gray-600">
                      Update your personal information and profile picture
                    </p>
                  </div>

                  {/* Profile Picture */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Profile Picture
                    </label>
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        SJ
                      </div>
                      <div className="flex-1">
                        <div className="flex gap-3">
                          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                            <Upload className="w-4 h-4" />
                            Upload New
                          </button>
                          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                            Remove
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          JPG, PNG or GIF. Max size 2MB.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Role
                        </label>
                        <input
                          type="text"
                          value={profileData.role}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              role: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              phone: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            location: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            bio: e.target.value,
                          })
                        }
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Brief description for your profile.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                    <button className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                      Cancel
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeTab === "notifications" && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Notification Preferences
                    </h2>
                    <p className="text-sm text-gray-600">
                      Manage how you receive notifications
                    </p>
                  </div>

                  {/* Notification Channels */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Notification Channels
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Mail className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Email Notifications
                            </p>
                            <p className="text-sm text-gray-600">
                              Receive notifications via email
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleNotification("email")}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.email ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.email
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Smartphone className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Push Notifications
                            </p>
                            <p className="text-sm text-gray-600">
                              Receive push notifications on your device
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleNotification("push")}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.push ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.push
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Activity Notifications */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Activity Notifications
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div>
                          <p className="font-medium text-gray-900">
                            Task Updates
                          </p>
                          <p className="text-sm text-gray-600">
                            Get notified when tasks are updated
                          </p>
                        </div>
                        <button
                          onClick={() => toggleNotification("taskUpdates")}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.taskUpdates
                              ? "bg-blue-600"
                              : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.taskUpdates
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div>
                          <p className="font-medium text-gray-900">
                            Team Activity
                          </p>
                          <p className="text-sm text-gray-600">
                            Updates about your team members
                          </p>
                        </div>
                        <button
                          onClick={() => toggleNotification("teamActivity")}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.teamActivity
                              ? "bg-blue-600"
                              : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.teamActivity
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div>
                          <p className="font-medium text-gray-900">Mentions</p>
                          <p className="text-sm text-gray-600">
                            When someone mentions you
                          </p>
                        </div>
                        <button
                          onClick={() => toggleNotification("mentions")}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.mentions
                              ? "bg-blue-600"
                              : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.mentions
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div>
                          <p className="font-medium text-gray-900">
                            Weekly Report
                          </p>
                          <p className="text-sm text-gray-600">
                            Weekly summary of your activity
                          </p>
                        </div>
                        <button
                          onClick={() => toggleNotification("weeklyReport")}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.weeklyReport
                              ? "bg-blue-600"
                              : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.weeklyReport
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Security & Privacy
                    </h2>
                    <p className="text-sm text-gray-600">
                      Manage your account security settings
                    </p>
                  </div>

                  {/* Password Section */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Password
                    </h3>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Key className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Change Password
                          </p>
                          <p className="text-sm text-gray-600">
                            Last changed 3 months ago
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowPasswordModal(true)}
                        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  {/* Security Features */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Security Features
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Two-Factor Authentication
                            </p>
                            <p className="text-sm text-gray-600">
                              Add an extra layer of security
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSecurity("twoFactor")}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            security.twoFactor ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              security.twoFactor
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Login Alerts
                            </p>
                            <p className="text-sm text-gray-600">
                              Get notified of new login attempts
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSecurity("loginAlerts")}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            security.loginAlerts ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              security.loginAlerts
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Session Management */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Session Management
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Session Timeout
                        </label>
                        <select
                          value={security.sessionTimeout}
                          onChange={(e) =>
                            setSecurity({
                              ...security,
                              sessionTimeout: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                        >
                          <option value="15">15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="never">Never</option>
                        </select>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="flex gap-3">
                          <Monitor className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-900 text-sm mb-1">
                              Active Sessions
                            </p>
                            <p className="text-sm text-blue-700 mb-3">
                              You are currently signed in on 3 devices
                            </p>
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                              Manage Sessions →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Data & Privacy */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Data & Privacy
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors text-left">
                        <div className="flex items-center gap-3">
                          <Download className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">
                              Download Your Data
                            </p>
                            <p className="text-sm text-gray-600">
                              Get a copy of your information
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>

                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="w-full flex items-center justify-between p-4 hover:bg-red-50 rounded-lg transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <Trash2 className="w-5 h-5 text-red-600" />
                          <div>
                            <p className="font-medium text-red-600">
                              Delete Account
                            </p>
                            <p className="text-sm text-red-600/80">
                              Permanently delete your account
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === "appearance" && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Appearance
                    </h2>
                    <p className="text-sm text-gray-600">
                      Customize how the app looks on your device
                    </p>
                  </div>

                  {/* Theme Selection */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Theme
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => setTheme("light")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          theme === "light"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="w-full aspect-video bg-white rounded-lg mb-3 border border-gray-200 flex items-center justify-center">
                          <Sun className="w-8 h-8 text-yellow-500" />
                        </div>
                        <p className="font-medium text-gray-900 text-sm mb-1">
                          Light
                        </p>
                        <p className="text-xs text-gray-600">Default theme</p>
                        {theme === "light" && (
                          <div className="mt-2 flex items-center justify-center">
                            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        )}
                      </button>

                      <button
                        onClick={() => setTheme("dark")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          theme === "dark"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="w-full aspect-video bg-gray-900 rounded-lg mb-3 border border-gray-700 flex items-center justify-center">
                          <Moon className="w-8 h-8 text-blue-400" />
                        </div>
                        <p className="font-medium text-gray-900 text-sm mb-1">
                          Dark
                        </p>
                        <p className="text-xs text-gray-600">
                          Easy on the eyes
                        </p>
                        {theme === "dark" && (
                          <div className="mt-2 flex items-center justify-center">
                            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        )}
                      </button>

                      <button
                        onClick={() => setTheme("auto")}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          theme === "auto"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="w-full aspect-video bg-gradient-to-r from-white to-gray-900 rounded-lg mb-3 border border-gray-200 flex items-center justify-center">
                          <div className="flex items-center justify-center gap-1">
                            <Sun className="w-4 h-4 text-yellow-500" />
                            <Moon className="w-4 h-4 text-blue-400" />
                          </div>
                        </div>
                        <p className="font-medium text-gray-900 text-sm mb-1">
                          Auto
                        </p>
                        <p className="text-xs text-gray-600">Match system</p>
                        {theme === "auto" && (
                          <div className="mt-2 flex items-center justify-center">
                            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Accent Color
                    </h3>
                    <div className="flex gap-3">
                      {["blue", "purple", "green", "orange", "pink"].map(
                        (color) => (
                          <button
                            key={color}
                            className={`w-10 h-10 rounded-full border-2 transition-all ${
                              color === "blue"
                                ? "border-blue-500 bg-blue-500"
                                : color === "purple"
                                ? "border-gray-300 bg-purple-500 hover:border-purple-500"
                                : color === "green"
                                ? "border-gray-300 bg-green-500 hover:border-green-500"
                                : color === "orange"
                                ? "border-gray-300 bg-orange-500 hover:border-orange-500"
                                : "border-gray-300 bg-pink-500 hover:border-pink-500"
                            }`}
                          />
                        )
                      )}
                    </div>
                  </div>

                  {/* Font Size */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Font Size
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">Small</span>
                      <div className="flex-1">
                        <input
                          type="range"
                          min="12"
                          max="18"
                          defaultValue="14"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                      </div>
                      <span className="text-sm text-gray-600">Large</span>
                    </div>
                  </div>

                  {/* Compact Mode */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Compact Mode</p>
                      <p className="text-sm text-gray-600">
                        Reduce padding and spacing
                      </p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* Preferences Settings */}
              {activeTab === "preferences" && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Preferences
                    </h2>
                    <p className="text-sm text-gray-600">
                      Customize your application experience
                    </p>
                  </div>

                  {/* Language & Region */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Language & Region
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Language
                        </label>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                        >
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Chinese</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timezone
                        </label>
                        <select
                          value={timezone}
                          onChange={(e) => setTimezone(e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                        >
                          <option>UTC-5 (EST)</option>
                          <option>UTC-8 (PST)</option>
                          <option>UTC+0 (GMT)</option>
                          <option>UTC+1 (CET)</option>
                          <option>UTC+8 (CST)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Format */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Date & Time Format
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date Format
                        </label>
                        <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white">
                          <option>MM/DD/YYYY</option>
                          <option>DD/MM/YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Time Format
                        </label>
                        <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white">
                          <option>12-hour</option>
                          <option>24-hour</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Settings */}
              {activeTab === "billing" && (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Billing & Plans
                    </h2>
                    <p className="text-sm text-gray-600">
                      Manage your subscription and payment methods
                    </p>
                  </div>

                  {/* Current Plan */}
                  <div className="mb-6 p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Pro Plan</h3>
                        <p className="text-blue-100">$29/month per user</p>
                      </div>
                      <div className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                        Active
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                        Upgrade Plan
                      </button>
                      <button className="px-4 py-2 text-white border border-white/30 rounded-lg font-medium hover:bg-white/10 transition-colors">
                        Cancel Subscription
                      </button>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Payment Methods
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              Visa ending in 4242
                            </p>
                            <p className="text-sm text-gray-600">
                              Expires 12/2024
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-green-600 font-medium">
                            Default
                          </span>
                          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button className="w-full flex items-center gap-3 p-4 border border-gray-200 border-dashed rounded-xl text-gray-600 hover:text-gray-700 hover:border-gray-300 transition-colors">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <span className="font-medium">Add Payment Method</span>
                      </button>
                    </div>
                  </div>

                  {/* Billing History */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Billing History
                    </h3>
                    <div className="space-y-3">
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              Pro Plan - {item} month
                            </p>
                            <p className="text-sm text-gray-600">
                              December {2024 - item}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-medium text-gray-900">
                              $29.00
                            </span>
                            <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pr-10"
                  />
                  <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pr-10"
                  />
                  <EyeOff className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pr-10"
                  />
                  <EyeOff className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Account
                </h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type "DELETE" to confirm
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                  placeholder="DELETE"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
