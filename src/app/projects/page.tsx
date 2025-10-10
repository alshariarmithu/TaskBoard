"use client";

import React, { useState, useEffect } from "react";
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Star,
  Edit,
  Trash2,
  Archive,
  ExternalLink,
  Grid3x3,
  List,
  Loader2,
  X,
} from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5555/api";

interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
}

interface Project {
  _id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold" | "planning";
  progress: number;
  team: TeamMember[];
  dueDate: string;
  priority: "high" | "medium" | "low";
  tasksCompleted: number;
  totalTasks: number;
  category: string;
  isFavorite: boolean;
}

interface ProjectFormData {
  name: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  dueDate: string;
  totalTasks: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>({
    name: "",
    description: "",
    status: "planning",
    priority: "medium",
    category: "",
    dueDate: "",
    totalTasks: 0,
  });

  const statusConfig = {
    active: {
      label: "Active",
      color: "bg-blue-100 text-blue-700 border-blue-200",
      icon: Clock,
    },
    completed: {
      label: "Completed",
      color: "bg-green-100 text-green-700 border-green-200",
      icon: CheckCircle2,
    },
    "on-hold": {
      label: "On Hold",
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      icon: AlertCircle,
    },
    planning: {
      label: "Planning",
      color: "bg-purple-100 text-purple-700 border-purple-200",
      icon: TrendingUp,
    },
  };

  const priorityConfig = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-orange-100 text-orange-700 border-orange-200",
    low: "bg-slate-100 text-slate-700 border-slate-200",
  };

  // Fetch projects from API
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/projects`);
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          progress: 0,
          tasksCompleted: 0,
          team: [],
          isFavorite: false,
        }),
      });

      if (!response.ok) throw new Error("Failed to create project");

      await fetchProjects();
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    }
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/projects/${editingProject._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to update project");

      await fetchProjects();
      setShowModal(false);
      setEditingProject(null);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update project");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");

      await fetchProjects();
      setActiveDropdown(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete project");
    }
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      status: project.status,
      priority: project.priority,
      category: project.category,
      dueDate: project.dueDate
        ? new Date(project.dueDate).toISOString().split("T")[0]
        : "",
      totalTasks: project.totalTasks,
    });
    setShowModal(true);
    setActiveDropdown(null);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      status: "planning",
      priority: "medium",
      category: "",
      dueDate: "",
      totalTasks: 0,
    });
    setEditingProject(null);
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const formatDate = (date: string) => {
    if (!date) return "No due date";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      icon: FolderKanban,
      color: "from-blue-500 to-blue-600",
      change: "+2 this month",
    },
    {
      label: "Active",
      value: projects.filter((p) => p.status === "active").length,
      icon: Clock,
      color: "from-purple-500 to-purple-600",
      change: "In progress",
    },
    {
      label: "Completed",
      value: projects.filter((p) => p.status === "completed").length,
      icon: CheckCircle2,
      color: "from-green-500 to-green-600",
      change: "Finished",
    },
    {
      label: "On Hold",
      value: projects.filter((p) => p.status === "on-hold").length,
      icon: AlertCircle,
      color: "from-orange-500 to-orange-600",
      change: "Paused",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-2">
                Projects
              </h1>
              <p className="text-slate-600">
                Manage and track all your projects in one place
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              New Project
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-600">
                      {stat.label}
                    </h3>
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-slate-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500">{stat.change}</p>
                </div>
              );
            })}
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-300">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full pl-12 pr-4 py-3 bg-slate-100 border border-slate-300 rounded-xl placeholder:text-slate-400 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors text-sm font-medium text-slate-700"
                >
                  <Filter className="w-5 h-5" />
                  Filter
                  {filterStatus !== "all" && (
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                      1
                    </span>
                  )}
                </button>
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-10">
                    <button
                      onClick={() => {
                        setFilterStatus("all");
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                        filterStatus === "all"
                          ? "text-blue-600 font-semibold"
                          : "text-slate-700"
                      }`}
                    >
                      All Projects
                    </button>
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setFilterStatus(key);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                          filterStatus === key
                            ? "text-blue-600 font-semibold"
                            : "text-slate-700"
                        }`}
                      >
                        {config.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {/* Projects Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const StatusIcon = statusConfig[project.status].icon;
              return (
                <div
                  key={project._id}
                  className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Card Header */}
                  <div className="p-6 border-b border-slate-100">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {project.name}
                          </h3>
                          {project.isFavorite && (
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          )}
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === project._id
                                ? null
                                : project._id
                            )
                          }
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-slate-400" />
                        </button>
                        {activeDropdown === project._id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-10">
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                              <ExternalLink className="w-4 h-4" />
                              Open Project
                            </button>
                            <button
                              onClick={() => openEditModal(project)}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                              <Archive className="w-4 h-4" />
                              Archive
                            </button>
                            <div className="border-t border-slate-100 my-1"></div>
                            <button
                              onClick={() => handleDeleteProject(project._id)}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status and Priority Badges */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                          statusConfig[project.status].color
                        }`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusConfig[project.status].label}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          priorityConfig[project.priority]
                        }`}
                      >
                        {project.priority.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700">
                          Progress
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        {project.tasksCompleted} of {project.totalTasks} tasks
                        completed
                      </p>
                    </div>

                    {/* Team and Due Date */}
                    <div className="flex items-center justify-between">
                      {/* Team Avatars */}
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 3).map((member, idx) => (
                          <div
                            key={member.id}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-md"
                            title={member.name}
                          >
                            {getInitials(member.name)}
                          </div>
                        ))}
                        {project.team.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 text-xs font-bold border-2 border-white shadow-md">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>

                      {/* Due Date */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">
                          {formatDate(project.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => {
              const StatusIcon = statusConfig[project.status].icon;
              return (
                <div
                  key={project._id}
                  className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Left Section */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">
                          {project.name}
                        </h3>
                        {project.isFavorite && (
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        )}
                        <span
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                            statusConfig[project.status].color
                          }`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusConfig[project.status].label}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(project.dueDate)}
                        </span>
                        <span>
                          {project.tasksCompleted}/{project.totalTasks} tasks
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 rounded-full">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                      {/* Progress */}
                      <div className="hidden sm:block w-32">
                        <div className="text-xs font-semibold text-slate-700 mb-1">
                          {project.progress}%
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Team */}
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 3).map((member) => (
                          <div
                            key={member.id}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                            title={member.name}
                          >
                            {getInitials(member.name)}
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="relative">
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === project._id
                                ? null
                                : project._id
                            )
                          }
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-slate-400" />
                        </button>
                        {activeDropdown === project._id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-10">
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                              <ExternalLink className="w-4 h-4" />
                              Open Project
                            </button>
                            <button
                              onClick={() => openEditModal(project)}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                              <Archive className="w-4 h-4" />
                              Archive
                            </button>
                            <div className="border-t border-slate-100 my-1"></div>
                            <button
                              onClick={() => handleDeleteProject(project._id)}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FolderKanban className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No projects found
            </h3>
            <p className="text-slate-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterStatus("all");
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {editingProject ? "Edit Project" : "Create New Project"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setEditingProject(null);
                      resetForm();
                    }}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>

              <form
                onSubmit={
                  editingProject ? handleUpdateProject : handleCreateProject
                }
                className="p-6 space-y-6"
              >
                {/* Project Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter project name"
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-xl placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter project description"
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-xl placeholder:text-slate-400 text-slate-900 min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Status & Priority */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-xl placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="planning">Planning</option>
                      <option value="active">Active</option>
                      <option value="on-hold">On Hold</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({ ...formData, priority: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-xl placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                {/* Category & Due Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      placeholder="e.g., Development, Marketing"
                      className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-xl placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, dueDate: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-xl placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Total Tasks */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Total Tasks
                  </label>
                  <input
                    type="number"
                    value={formData.totalTasks}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalTasks: parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="0"
                    min="0"
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-xl placeholder:text-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingProject(null);
                      resetForm();
                    }}
                    className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {editingProject ? "Update Project" : "Create Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
