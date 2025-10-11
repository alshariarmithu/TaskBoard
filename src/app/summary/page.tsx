"use client";
<<<<<<< HEAD

import React, { useState, useEffect } from "react";
=======
import { useState } from "react";
>>>>>>> 17e6dd51795a3cce0ef8bca7779af3927d9ec747
import {
  Calendar,
  CheckCircle2,
  Clock,
  Users,
  TrendingUp,
  AlertCircle,
<<<<<<< HEAD
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
=======
} from "lucide-react";

export default function Page() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Sample data
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      progress: 75,
      status: "active",
      team: 5,
      deadline: "2025-10-25",
    },
    {
      id: 2,
      name: "Mobile App Development",
      progress: 45,
      status: "active",
      team: 8,
      deadline: "2025-11-15",
    },
    {
      id: 3,
      name: "Marketing Campaign",
      progress: 90,
      status: "active",
      team: 4,
      deadline: "2025-10-18",
    },
    {
      id: 4,
      name: "Database Migration",
      progress: 30,
      status: "active",
      team: 3,
      deadline: "2025-12-01",
    },
  ];

  const tasks = [
    {
      id: 1,
      title: "Design homepage mockup",
      project: "Website Redesign",
      priority: "high",
      status: "in-progress",
      assignee: "Sarah Chen",
    },
    {
      id: 2,
      title: "API integration",
      project: "Mobile App Development",
      priority: "high",
      status: "in-progress",
      assignee: "Mike Johnson",
    },
    {
      id: 3,
      title: "Content review",
      project: "Marketing Campaign",
      priority: "medium",
      status: "pending",
      assignee: "Emily Davis",
    },
    {
      id: 4,
      title: "User testing",
      project: "Website Redesign",
      priority: "medium",
      status: "completed",
      assignee: "Tom Wilson",
    },
    {
      id: 5,
      title: "Schema design",
      project: "Database Migration",
      priority: "high",
      status: "in-progress",
      assignee: "Alex Kumar",
    },
  ];

  const events = [
    {
      id: 1,
      title: "Sprint Planning",
      date: "2025-10-14",
      time: "10:00 AM",
      type: "meeting",
      project: "Mobile App Development",
    },
    {
      id: 2,
      title: "Client Presentation",
      date: "2025-10-15",
      time: "2:00 PM",
      type: "presentation",
      project: "Website Redesign",
    },
    {
      id: 3,
      title: "Design Review",
      date: "2025-10-16",
      time: "11:00 AM",
      type: "review",
      project: "Website Redesign",
    },
    {
      id: 4,
      title: "Campaign Launch",
      date: "2025-10-18",
      time: "9:00 AM",
      type: "milestone",
      project: "Marketing Campaign",
    },
    {
      id: 5,
      title: "Team Standup",
      date: "2025-10-14",
      time: "9:30 AM",
      type: "meeting",
      project: "All Projects",
    },
  ];

  const stats = [
    {
      label: "Active Projects",
      value: "4",
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      label: "Total Tasks",
      value: "42",
      icon: CheckCircle2,
      color: "bg-green-500",
    },
    {
      label: "Upcoming Events",
      value: "8",
      icon: Calendar,
      color: "bg-purple-500",
    },
    { label: "Team Members", value: "20", icon: Users, color: "bg-orange-500" },
  ];

  const getPriorityColor = (priority: any) => {
>>>>>>> 17e6dd51795a3cce0ef8bca7779af3927d9ec747
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

<<<<<<< HEAD
  const getStatusColor = (status?: string) => {
=======
  const getStatusColor = (status: any) => {
>>>>>>> 17e6dd51795a3cce0ef8bca7779af3927d9ec747
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50";
      case "in-progress":
        return "text-blue-600 bg-blue-50";
<<<<<<< HEAD
      case "in-review":
        return "text-purple-600 bg-purple-50";
      case "assigned":
=======
      case "pending":
>>>>>>> 17e6dd51795a3cce0ef8bca7779af3927d9ec747
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

<<<<<<< HEAD
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

=======
>>>>>>> 17e6dd51795a3cce0ef8bca7779af3927d9ec747
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
<<<<<<< HEAD
            <h1 className="text-3xl font-bold text-gray-900">Summary</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here’s what’s happening.
=======
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's what's happening with your projects.
>>>>>>> 17e6dd51795a3cce0ef8bca7779af3927d9ec747
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
<<<<<<< HEAD
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow flex items-center space-x-4"
=======
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-6 flex items-center space-x-4"
>>>>>>> 17e6dd51795a3cce0ef8bca7779af3927d9ec747
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

<<<<<<< HEAD
        {/* Projects & Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects */}
=======
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects Summary */}
>>>>>>> 17e6dd51795a3cce0ef8bca7779af3927d9ec747
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Active Projects
              </h2>
            </div>
            <div className="p-6 space-y-4">
<<<<<<< HEAD
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
=======
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {project.team} members
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Due {project.deadline}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Events */}
>>>>>>> 17e6dd51795a3cce0ef8bca7779af3927d9ec747
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Upcoming Events
              </h2>
            </div>
            <div className="p-6 space-y-3">
<<<<<<< HEAD
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
=======
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 text-center">
                    <div className="text-sm font-semibold text-gray-900">
                      {event.date.split("-")[2]}
                    </div>
                    <div className="text-xs text-gray-600">Oct</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {event.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">{event.time}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {event.project}
                    </p>
                  </div>
                </div>
              ))}
>>>>>>> 17e6dd51795a3cce0ef8bca7779af3927d9ec747
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Tasks */}
=======
        {/* Tasks Summary */}
>>>>>>> 17e6dd51795a3cce0ef8bca7779af3927d9ec747
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Tasks
            </h2>
            <div className="flex gap-2">
<<<<<<< HEAD
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
=======
              <button
                onClick={() => setSelectedFilter("all")}
                className={`px-3 py-1 rounded-md text-sm ${
                  selectedFilter === "all"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter("in-progress")}
                className={`px-3 py-1 rounded-md text-sm ${
                  selectedFilter === "in-progress"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setSelectedFilter("completed")}
                className={`px-3 py-1 rounded-md text-sm ${
                  selectedFilter === "completed"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Completed
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assignee
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks
                  .filter(
                    (task) =>
                      selectedFilter === "all" || task.status === selectedFilter
                  )
                  .map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {task.status === "completed" ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-gray-400 mr-2" />
                          )}
                          <span className="text-sm font-medium text-gray-900">
                            {task.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {task.project}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {task.assignee}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
>>>>>>> 17e6dd51795a3cce0ef8bca7779af3927d9ec747
          </div>
        </div>
      </div>
    </div>
  );
}
