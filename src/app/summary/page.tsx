"use client";
import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Users,
  TrendingUp,
  AlertCircle,
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's what's happening with your projects.
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
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-6 flex items-center space-x-4"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Projects Summary */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Active Projects
              </h2>
            </div>
            <div className="p-6 space-y-4">
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
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Upcoming Events
              </h2>
            </div>
            <div className="p-6 space-y-3">
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
            </div>
          </div>
        </div>

        {/* Tasks Summary */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Tasks
            </h2>
            <div className="flex gap-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}
