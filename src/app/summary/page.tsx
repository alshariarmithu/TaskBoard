"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Users,
  TrendingUp,
  AlertCircle,
  Loader2,
} from "lucide-react";

type StatShape = {
  activeProjects: number;
  totalTasks: number;
  upcomingEvents: number;
  teamMembers: number;
};

type Project = {
  id: string;
  name: string;
  team: number;
  deadline?: string | null;
};

type Task = {
  id: string;
  title: string;
  project?: string;
  priority?: "low" | "medium" | "high";
  status?: "completed" | "in-progress" | "in-review" | "assigned";
  assignee?: string;
};

type EventItem = {
  id: string;
  title: string;
  date: string;
  time?: string;
  project?: string;
};

type DashboardData = {
  stats: StatShape;
  projects: Project[];
  tasks: Task[];
  events: EventItem[];
};

export default function Page() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const [selectedFilter, setSelectedFilter] = useState<"all" | string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    stats: {
      activeProjects: 0,
      totalTasks: 0,
      upcomingEvents: 0,
      teamMembers: 0,
    },
    projects: [],
    tasks: [],
    events: [],
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }

      const response = await fetch(`${API_BASE_URL}/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to fetch dashboard data");
      }

      const result = await response.json();

      if (result.success && result.data) {
        setDashboardData(result.data);
      } else {
        throw new Error(result.message || "Unexpected response from server");
      }
    } catch (err) {
      console.error("fetchDashboardData error:", err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50";
      case "in-progress":
        return "text-blue-600 bg-blue-50";
      case "in-review":
        return "text-purple-600 bg-purple-50";
      case "assigned":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "-"
      : date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  };

  const getEventDateParts = (dateString?: string) => {
    if (!dateString) return { day: "--", month: "---" };
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? { day: "--", month: "---" }
      : {
          day: String(date.getDate()).padStart(2, "0"),
          month: date.toLocaleDateString("en-US", { month: "short" }),
        };
  };

  const filteredTasks = dashboardData.tasks.filter(
    (task) => selectedFilter === "all" || task.status === selectedFilter
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-gray-900 font-semibold mb-2">Error loading</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );

  const stats = [
    {
      label: "Active Projects",
      value: dashboardData.stats.activeProjects,
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      label: "Total Tasks",
      value: dashboardData.stats.totalTasks,
      icon: CheckCircle2,
      color: "bg-green-500",
    },
    {
      label: "Upcoming Events",
      value: dashboardData.stats.upcomingEvents,
      icon: Calendar,
      color: "bg-purple-500",
    },
    {
      label: "Team Members",
      value: dashboardData.stats.teamMembers,
      icon: Users,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Summary</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here’s what’s happening.
            </p>
          </div>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow flex items-center space-x-4"
              >
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Projects & Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Active Projects
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData.projects.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No active projects
                </p>
              ) : (
                dashboardData.projects.map((project) => (
                  <div
                    key={project.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <h3 className="font-semibold text-gray-900">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {project.team} members
                      </span>
                      {project.deadline && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Due {formatDate(project.deadline)}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Events */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Upcoming Events
              </h2>
            </div>
            <div className="p-6 space-y-3">
              {dashboardData.events.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No upcoming events
                </p>
              ) : (
                dashboardData.events.map((event) => {
                  const { day, month } = getEventDateParts(event.date);
                  return (
                    <div
                      key={event.id}
                      className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="w-12 text-center">
                        <div className="text-sm font-semibold text-gray-900">
                          {day}
                        </div>
                        <div className="text-xs text-gray-600">{month}</div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          {event.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {event.time ?? "-"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {event.project ?? "-"}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Tasks
            </h2>
            <div className="flex gap-2">
              {["all", "in-progress", "completed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFilter(f)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    selectedFilter === f
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {f === "all"
                    ? "All"
                    : f === "in-progress"
                    ? "In Progress"
                    : "Completed"}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            {filteredTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No tasks found</p>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {["Task", "Project", "Priority", "Status", "Assignee"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap flex items-center">
                        {task.status === "completed" ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-gray-400 mr-2" />
                        )}
                        <span className="text-sm font-medium text-gray-900">
                          {task.title}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {task.project ?? "-"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority ?? "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status ?? "-"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {task.assignee ?? "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
