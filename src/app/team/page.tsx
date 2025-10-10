"use client";
import React, { useState } from "react";
import {
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  MoreVertical,
  X,
  Users,
  Award,
  Clock,
  TrendingUp,
  Filter,
  Grid,
  List,
  Edit2,
  Trash2,
  Star,
  MessageSquare,
  Video,
} from "lucide-react";

interface TeamMember {
  id: string;
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
  active: "bg-green-500",
  away: "bg-yellow-500",
  offline: "bg-gray-400",
};

function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [teamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Senior Product Designer",
      department: "Design",
      email: "sarah.j@company.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      avatar: "SJ",
      status: "active",
      tasksCompleted: 47,
      tasksInProgress: 5,
      performance: 95,
      joinDate: "Jan 2023",
      skills: ["UI/UX", "Figma", "Prototyping"],
      bio: "Passionate about creating intuitive user experiences",
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Lead Software Engineer",
      department: "Engineering",
      email: "michael.c@company.com",
      phone: "+1 (555) 234-5678",
      location: "New York, NY",
      avatar: "MC",
      status: "active",
      tasksCompleted: 62,
      tasksInProgress: 8,
      performance: 98,
      joinDate: "Mar 2022",
      skills: ["React", "Node.js", "TypeScript"],
      bio: "Full-stack developer with 8+ years of experience",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      department: "Marketing",
      email: "emily.r@company.com",
      phone: "+1 (555) 345-6789",
      location: "Austin, TX",
      avatar: "ER",
      status: "away",
      tasksCompleted: 38,
      tasksInProgress: 6,
      performance: 88,
      joinDate: "Jun 2023",
      skills: ["SEO", "Content Strategy", "Analytics"],
      bio: "Data-driven marketer focused on growth",
    },
    {
      id: "4",
      name: "David Park",
      role: "Product Manager",
      department: "Product",
      email: "david.p@company.com",
      phone: "+1 (555) 456-7890",
      location: "Seattle, WA",
      avatar: "DP",
      status: "active",
      tasksCompleted: 41,
      tasksInProgress: 7,
      performance: 92,
      joinDate: "Sep 2022",
      skills: ["Product Strategy", "Agile", "Data Analysis"],
      bio: "Building products that users love",
    },
    {
      id: "5",
      name: "Jessica Lee",
      role: "UX Researcher",
      department: "Design",
      email: "jessica.l@company.com",
      phone: "+1 (555) 567-8901",
      location: "Portland, OR",
      avatar: "JL",
      status: "offline",
      tasksCompleted: 29,
      tasksInProgress: 3,
      performance: 90,
      joinDate: "Feb 2024",
      skills: ["User Research", "Usability Testing", "Data Analysis"],
      bio: "Understanding user needs through research",
    },
    {
      id: "6",
      name: "Alex Thompson",
      role: "Sales Director",
      department: "Sales",
      email: "alex.t@company.com",
      phone: "+1 (555) 678-9012",
      location: "Chicago, IL",
      avatar: "AT",
      status: "active",
      tasksCompleted: 56,
      tasksInProgress: 9,
      performance: 97,
      joinDate: "Apr 2021",
      skills: ["B2B Sales", "Negotiation", "CRM"],
      bio: "Closing deals and building relationships",
    },
    {
      id: "7",
      name: "Olivia Martinez",
      role: "HR Specialist",
      department: "HR",
      email: "olivia.m@company.com",
      phone: "+1 (555) 789-0123",
      location: "Miami, FL",
      avatar: "OM",
      status: "active",
      tasksCompleted: 33,
      tasksInProgress: 4,
      performance: 89,
      joinDate: "Aug 2023",
      skills: ["Recruitment", "Employee Relations", "HRIS"],
      bio: "Supporting team growth and culture",
    },
    {
      id: "8",
      name: "Ryan Foster",
      role: "DevOps Engineer",
      department: "Engineering",
      email: "ryan.f@company.com",
      phone: "+1 (555) 890-1234",
      location: "Denver, CO",
      avatar: "RF",
      status: "away",
      tasksCompleted: 44,
      tasksInProgress: 6,
      performance: 94,
      joinDate: "Nov 2022",
      skills: ["AWS", "Docker", "Kubernetes"],
      bio: "Automating infrastructure and deployments",
    },
  ]);

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
    avgPerformance: Math.round(
      teamMembers.reduce((sum, m) => sum + m.performance, 0) /
        teamMembers.length
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                Team Members
              </h1>
              <p className="text-sm text-gray-600">
                Manage your team and collaborate effectively
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              Add Member
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Members</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Now</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.active}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Departments</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.departments}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Performance</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {stats.avgPerformance}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, role, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white text-sm font-medium text-gray-700"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>

                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "grid"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === "list"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
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
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No team members found
              </h3>
              <p className="text-sm text-gray-600 text-center mb-6">
                Try adjusting your search or filters to find what you're looking
                for
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDepartment("All Departments");
                }}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}

        {/* Team Members Grid/List */}
        {filteredMembers.length > 0 &&
          (viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="p-6">
                    {/* Avatar and Status */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md">
                          {member.avatar}
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-5 h-5 ${
                            STATUS_COLORS[member.status]
                          } rounded-full border-2 border-white`}
                        />
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Member Info */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {member.role}
                      </p>
                      <span className="inline-block px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg">
                        {member.department}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-100">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Completed</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {member.tasksCompleted}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">
                          In Progress
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {member.tasksInProgress}
                        </p>
                      </div>
                    </div>

                    {/* Performance */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-600">
                          Performance
                        </span>
                        <span className="text-xs font-semibold text-gray-900">
                          {member.performance}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${member.performance}%` }}
                        />
                      </div>
                    </div>

                    {/* Contact Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                        <Mail className="w-4 h-4" />
                        Email
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        Chat
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Member
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Tasks
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Performance
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredMembers.map((member) => (
                      <tr
                        key={member.id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => setSelectedMember(member)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                                {member.avatar}
                              </div>
                              <div
                                className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${
                                  STATUS_COLORS[member.status]
                                } rounded-full border-2 border-white`}
                              />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {member.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {member.role}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg">
                            {member.department}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="text-gray-900">{member.email}</p>
                            <p className="text-gray-600">{member.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="text-gray-900 font-medium">
                              {member.tasksCompleted} completed
                            </p>
                            <p className="text-gray-600">
                              {member.tasksInProgress} in progress
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-100 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                                style={{ width: `${member.performance}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                              {member.performance}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg ${
                              member.status === "active"
                                ? "text-green-700 bg-green-50"
                                : member.status === "away"
                                ? "text-yellow-700 bg-yellow-50"
                                : "text-gray-700 bg-gray-50"
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
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Mail className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white px-6 py-5 border-b border-gray-200 flex items-center justify-between z-10">
              <h3 className="text-lg font-semibold text-gray-900">
                Member Details
              </h3>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Profile Section */}
              <div className="flex items-start gap-6 mb-6 pb-6 border-b border-gray-200">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {selectedMember.avatar}
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-6 h-6 ${
                      STATUS_COLORS[selectedMember.status]
                    } rounded-full border-3 border-white`}
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {selectedMember.name}
                  </h2>
                  <p className="text-gray-600 mb-3">{selectedMember.role}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg">
                      {selectedMember.department}
                    </span>
                    <span className="inline-block px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg">
                      Joined {selectedMember.joinDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              {selectedMember.bio && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    About
                  </h4>
                  <p className="text-sm text-gray-600">{selectedMember.bio}</p>
                </div>
              )}

              {/* Contact Information */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Contact Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">
                      {selectedMember.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">
                      {selectedMember.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">
                      {selectedMember.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Performance
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <p className="text-xs text-blue-600 mb-1">Completed</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {selectedMember.tasksCompleted}
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <p className="text-xs text-orange-600 mb-1">In Progress</p>
                    <p className="text-2xl font-bold text-orange-700">
                      {selectedMember.tasksInProgress}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <p className="text-xs text-green-600 mb-1">Success Rate</p>
                    <p className="text-2xl font-bold text-green-700">
                      {selectedMember.performance}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="w-4 h-4" />
                Send Email
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <MessageSquare className="w-4 h-4" />
                Start Chat
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                <Video className="w-4 h-4" />
                Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Add New Member
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="e.g. Senior Designer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white">
                    {DEPARTMENTS.filter((d) => d !== "All Departments").map(
                      (dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="email@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="City, State"
                  />
                </div>
              </form>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamPage;
