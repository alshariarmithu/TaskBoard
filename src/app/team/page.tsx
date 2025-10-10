"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Mail,
  Phone,
  MapPin,
  MoreVertical,
  X,
  Users,
  TrendingUp,
  Grid,
  List,
  MessageSquare,
  Video,
  Download,
  UserPlus,
  Check,
  Loader2,
  ChevronDown,
  Calendar,
  Briefcase,
  Target,
} from "lucide-react";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  status: "active" | "away" | "offline";
  tasksCompleted: number;
  tasksInProgress: number;
  performance: number;
  joinDate: string;
  skills: string[];
  bio?: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  department?: string;
  phone?: string;
  location?: string;
}

const DEPARTMENTS = [
  "All Departments",
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Product",
  "HR",
];

const STATUS_COLORS = {
  active: "bg-emerald-500",
  away: "bg-amber-500",
  offline: "bg-slate-400",
};

const STATUS_BG = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  away: "bg-amber-50 text-amber-700 border-amber-200",
  offline: "bg-slate-50 text-slate-700 border-slate-200",
};

function TeamPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  // Add member modal states
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [memberForm, setMemberForm] = useState({
    role: "",
    department: "Engineering",
    phone: "",
    location: "",
    bio: "",
    skills: "",
  });

  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const res = await fetch(`${API_URL}/auth/search?q=${query}`);
    const users = await res.json();
    setSearchResults(users);
    setIsSearching(false);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchUsers(userSearchQuery);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [userSearchQuery]);

  // Fetch team members
  useEffect(() => {
    fetch(`${API_URL}/team`)
      .then((res) => res.json())
      .then(setTeamMembers)
      .catch(console.error);
  }, []);

  // Add member
  const handleAddMember = async () => {
    if (!selectedUser) return;

    const newMember = {
      name: selectedUser.name,
      email: selectedUser.email,
      role: memberForm.role || selectedUser.role || "Team Member",
      department: memberForm.department,
      phone: memberForm.phone || selectedUser.phone || "",
      location: memberForm.location || selectedUser.location || "",
      avatar:
        selectedUser.avatar ||
        selectedUser.name
          .split(" ")
          .map((n) => n[0])
          .join(""),
      status: "active",
      tasksCompleted: 0,
      tasksInProgress: 0,
      performance: 0,
      joinDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      skills: memberForm.skills.split(",").map((s) => s.trim()),
      bio: memberForm.bio,
    };

    const res = await fetch(`${API_URL}/team`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMember),
    });

    const data = await res.json();
    setTeamMembers((prev) => [...prev, data]);
    setShowAddModal(false);
  };

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "All Departments" ||
      member.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const stats = {
    total: teamMembers.length,
    active: teamMembers.filter((m) => m.status === "active").length,
    departments: new Set(teamMembers.map((m) => m.department)).size,
    avgPerformance:
      teamMembers.length > 0
        ? Math.round(
            teamMembers.reduce((sum, m) => sum + m.performance, 0) /
              teamMembers.length
          )
        : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Team Members
                  </h1>
                  <p className="text-sm text-slate-600 mt-0.5">
                    Manage and collaborate with your team
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-all duration-200 shadow-sm border border-slate-200 hover:border-slate-300">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
              >
                <UserPlus className="w-4 h-4" />
                Add Member
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">
                    Total Members
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {stats.total}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    +12% from last month
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">
                    Active Now
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    {stats.active}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Online members</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">
                    Departments
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {stats.departments}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Active departments
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">
                    Avg Performance
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    {stats.avgPerformance}%
                  </p>
                  <p className="text-xs text-slate-500 mt-1">+5% improvement</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/60 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search by name, role, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white/50 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div className="flex gap-3">
                <div className="relative">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white/50 text-sm font-medium text-slate-700 cursor-pointer hover:bg-white"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>

                <div className="flex bg-slate-100 rounded-xl p-1.5 shadow-inner">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2.5 rounded-lg transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2.5 rounded-lg transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm p-16">
            <div className="flex flex-col items-center justify-center">
              <div className="w-24 h-24 mb-6 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Users className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No team members found
              </h3>
              <p className="text-sm text-slate-600 text-center mb-8 max-w-md">
                {searchQuery || selectedDepartment !== "All Departments"
                  ? "Try adjusting your search or filters to find what you're looking for"
                  : "Get started by adding your first team member"}
              </p>
              {searchQuery || selectedDepartment !== "All Departments" ? (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedDepartment("All Departments");
                  }}
                  className="px-6 py-3 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                >
                  Clear filters
                </button>
              ) : (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl transition-all shadow-lg shadow-blue-500/30"
                >
                  Add Your First Member
                </button>
              )}
            </div>
          </div>
        )}

        {/* Team Members Grid/List */}
        {filteredMembers.length > 0 &&
          (viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map((member) => (
                <div
                  key={member._id}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1"
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="p-6">
                    {/* Avatar and Status */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/30">
                          {member.avatar}
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-5 h-5 ${
                            STATUS_COLORS[member.status]
                          } rounded-full border-3 border-white shadow-sm`}
                        />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-all p-2 hover:bg-slate-100 rounded-lg"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Member Info */}
                    <div className="mb-5">
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-slate-600 mb-3">
                        {member.role}
                      </p>
                      <span className="inline-block px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg border border-blue-100">
                        {member.department}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-5 pb-5 border-b border-slate-100">
                      <div className="text-center p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
                        <p className="text-xs text-slate-600 mb-1 font-medium">
                          Completed
                        </p>
                        <p className="text-xl font-bold text-slate-900">
                          {member.tasksCompleted}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
                        <p className="text-xs text-slate-600 mb-1 font-medium">
                          In Progress
                        </p>
                        <p className="text-xl font-bold text-slate-900">
                          {member.tasksInProgress}
                        </p>
                      </div>
                    </div>

                    {/* Performance */}
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-600">
                          Performance
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          {member.performance}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500 shadow-sm"
                          style={{ width: `${member.performance}%` }}
                        />
                      </div>
                    </div>

                    {/* Contact Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-slate-200"
                      >
                        <Mail className="w-4 h-4" />
                        Email
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl transition-all shadow-md shadow-blue-500/30"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Chat
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/80 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Member
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Tasks
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Performance
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredMembers.map((member) => (
                      <tr
                        key={member._id}
                        className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedMember(member)}
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md shadow-blue-500/30">
                                {member.avatar}
                              </div>
                              <div
                                className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 ${
                                  STATUS_COLORS[member.status]
                                } rounded-full border-2 border-white`}
                              />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">
                                {member.name}
                              </p>
                              <p className="text-sm text-slate-600">
                                {member.role}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-block px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg border border-blue-100">
                            {member.department}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-sm">
                            <p className="text-slate-900 font-medium">
                              {member.email}
                            </p>
                            <p className="text-slate-600">{member.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-sm">
                            <p className="text-slate-900 font-semibold">
                              {member.tasksCompleted} completed
                            </p>
                            <p className="text-slate-600">
                              {member.tasksInProgress} in progress
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-28 bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-2 rounded-full"
                                style={{ width: `${member.performance}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold text-slate-900 min-w-[3rem]">
                              {member.performance}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border ${
                              STATUS_BG[member.status]
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 ${
                                STATUS_COLORS[member.status]
                              } rounded-full`}
                            />
                            {member.status.charAt(0).toUpperCase() +
                              member.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 flex items-center justify-between z-10 rounded-t-3xl">
              <h3 className="text-xl font-bold text-white">Member Profile</h3>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Profile Section */}
              <div className="flex items-start gap-6 mb-8 pb-8 border-b border-slate-200">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-blue-500/40">
                    {selectedMember.avatar}
                  </div>
                  <div
                    className={`absolute -bottom-2 -right-2 w-7 h-7 ${
                      STATUS_COLORS[selectedMember.status]
                    } rounded-full border-4 border-white shadow-lg`}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">
                    {selectedMember.name}
                  </h2>
                  <p className="text-lg text-slate-600 mb-4">
                    {selectedMember.role}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-xl border border-blue-100">
                      <Briefcase className="w-4 h-4" />
                      {selectedMember.department}
                    </span>
                    <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-xl">
                      <Calendar className="w-4 h-4" />
                      Joined {selectedMember.joinDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              {selectedMember.bio && (
                <div className="mb-8 p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl">
                  <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">
                    About
                  </h4>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedMember.bio}
                  </p>
                </div>
              )}

              {/* Contact Information */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
                  Contact Information
                </h4>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-600 mb-0.5">
                        Email
                      </p>
                      <p className="text-slate-900 font-medium">
                        {selectedMember.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-600 mb-0.5">
                        Phone
                      </p>
                      <p className="text-slate-900 font-medium">
                        {selectedMember.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-600 mb-0.5">
                        Location
                      </p>
                      <p className="text-slate-900 font-medium">
                        {selectedMember.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
                  Performance Metrics
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 shadow-lg shadow-blue-500/30">
                    <p className="text-xs font-medium text-blue-100 mb-2">
                      Tasks Completed
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {selectedMember.tasksCompleted}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 shadow-lg shadow-orange-500/30">
                    <p className="text-xs font-medium text-orange-100 mb-2">
                      In Progress
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {selectedMember.tasksInProgress}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 shadow-lg shadow-emerald-500/30">
                    <p className="text-xs font-medium text-emerald-100 mb-2">
                      Success Rate
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {selectedMember.performance}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              {selectedMember.skills.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wide">
                    Skills & Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 bg-slate-50 px-8 py-5 border-t border-slate-200 flex gap-3 rounded-b-3xl">
              <button className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                <Mail className="w-4 h-4" />
                Send Email
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30">
                <MessageSquare className="w-4 h-4" />
                Start Chat
              </button>
              <button className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl hover:from-emerald-700 hover:to-green-700 transition-all shadow-lg shadow-emerald-500/30">
                <Video className="w-4 h-4" />
                Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 flex items-center justify-between z-10 rounded-t-3xl">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Add New Team Member
                </h3>
                <p className="text-sm text-blue-100 mt-1">
                  Search and add members from your organization
                </p>
              </div>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedUser(null);
                  setUserSearchQuery("");
                  setSearchResults([]);
                }}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8">
              {/* User Search */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">
                  Search User
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                    placeholder="Search by name or email..."
                  />
                  {isSearching && (
                    <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-600 animate-spin" />
                  )}
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && !selectedUser && (
                  <div className="mt-4 max-h-64 overflow-y-auto border-2 border-slate-200 rounded-xl">
                    {searchResults.map((user) => (
                      <div
                        key={user._id}
                        onClick={() => {
                          setSelectedUser(user);
                          setMemberForm({
                            ...memberForm,
                            role: user.role || "",
                            department: user.department || "Engineering",
                            phone: user.phone || "",
                            location: user.location || "",
                          });
                        }}
                        className="flex items-center gap-4 p-4 hover:bg-blue-50 cursor-pointer transition-colors border-b border-slate-100 last:border-0"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/30">
                          {user.avatar ||
                            user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">
                            {user.name}
                          </p>
                          <p className="text-sm text-slate-600">{user.email}</p>
                        </div>
                        <Check className="w-5 h-5 text-blue-600" />
                      </div>
                    ))}
                  </div>
                )}

                {userSearchQuery &&
                  !isSearching &&
                  searchResults.length === 0 && (
                    <div className="mt-4 p-6 bg-slate-50 rounded-xl text-center">
                      <p className="text-sm text-slate-600">No users found</p>
                    </div>
                  )}
              </div>

              {/* Selected User */}
              {selectedUser && (
                <div className="mb-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                        {selectedUser.avatar ||
                          selectedUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">
                          {selectedUser.name}
                        </p>
                        <p className="text-sm text-slate-600">
                          {selectedUser.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedUser(null);
                        setUserSearchQuery("");
                      }}
                      className="text-slate-400 hover:text-slate-600 p-2 hover:bg-white/50 rounded-lg transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Member Details Form */}
              {selectedUser && (
                <form className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                        Role
                      </label>
                      <input
                        type="text"
                        value={memberForm.role}
                        onChange={(e) =>
                          setMemberForm({ ...memberForm, role: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        placeholder="e.g. Senior Designer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                        Department
                      </label>
                      <select
                        value={memberForm.department}
                        onChange={(e) =>
                          setMemberForm({
                            ...memberForm,
                            department: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all bg-white appearance-none"
                      >
                        {DEPARTMENTS.filter((d) => d !== "All Departments").map(
                          (dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={memberForm.phone}
                        onChange={(e) =>
                          setMemberForm({
                            ...memberForm,
                            phone: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                        Location
                      </label>
                      <input
                        type="text"
                        value={memberForm.location}
                        onChange={(e) =>
                          setMemberForm({
                            ...memberForm,
                            location: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        placeholder="City, State"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                      Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      value={memberForm.skills}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, skills: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                      placeholder="React, TypeScript, Node.js"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">
                      Bio (Optional)
                    </label>
                    <textarea
                      value={memberForm.bio}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, bio: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                      placeholder="Tell us about this team member..."
                    />
                  </div>
                </form>
              )}
            </div>

            <div className="sticky bottom-0 bg-slate-50 px-8 py-5 border-t border-slate-200 flex gap-3 rounded-b-3xl">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedUser(null);
                  setUserSearchQuery("");
                  setSearchResults([]);
                }}
                className="flex-1 px-5 py-3 text-sm font-semibold text-slate-700 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                disabled={!selectedUser}
                className="flex-1 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                Add to Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamPage;
