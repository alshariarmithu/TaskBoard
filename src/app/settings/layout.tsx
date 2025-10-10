"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  KanbanSquare,
  Search,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Menu,
} from "lucide-react";
import { Sidebar } from "../../components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState("board");

  const userEmail = "user@example.com";
  const userName = "John Doe";
  const userAvatar = "";

  // Sidebar width constants
  const sidebarWidth = isCollapsed ? 80 : 256; // px (w-20, w-64)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    console.log("User logged out");
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <Sidebar
          onNavigate={setCurrentPage}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        <div
          className="flex flex-col flex-1 transition-all duration-300"
          style={{ marginLeft: `${sidebarWidth}px` }}
        >
          {/* Navbar */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>

                <KanbanSquare className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">TaskBoard</h1>
                  <p className="text-xs text-gray-500">
                    Lightweight task management
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="hidden md:flex relative max-w-md w-full mx-8">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
                  placeholder="Search tasks..."
                />
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="hidden sm:block text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {userName}
                      </p>
                      <p className="text-xs text-gray-500">{userEmail}</p>
                    </div>
                    {userAvatar ? (
                      <img
                        src={userAvatar}
                        alt={userName}
                        className="w-9 h-9 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center border-2 border-gray-200">
                        <span className="text-sm font-semibold text-white">
                          {getInitials(userName)}
                        </span>
                      </div>
                    )}
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User className="w-4 h-4 text-gray-500" />
                      Profile
                    </button>
                    <button
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Settings className="w-4 h-4 text-gray-500" />
                      Settings
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 transition-all duration-300 bg-gray-50">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
