"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
  MoreVertical,
  X,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  location?: string;
  attendees?: number;
  color: string;
  description?: string;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const EVENT_COLORS = [
  {
    id: "blue",
    class: "bg-blue-500",
    light: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  {
    id: "purple",
    class: "bg-purple-500",
    light: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
  },
  {
    id: "green",
    class: "bg-green-500",
    light: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
  },
  {
    id: "orange",
    class: "bg-orange-500",
    light: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
  },
  {
    id: "pink",
    class: "bg-pink-500",
    light: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-700",
  },
];

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"month" | "week">("month");

  // Sample events
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Team Standup Meeting",
      date: new Date(2025, 9, 10, 9, 0),
      startTime: "9:00 AM",
      endTime: "9:30 AM",
      location: "Conference Room A",
      attendees: 8,
      color: "blue",
      description: "Daily team sync-up",
    },
    {
      id: "2",
      title: "Project Review",
      date: new Date(2025, 9, 10, 14, 0),
      startTime: "2:00 PM",
      endTime: "3:30 PM",
      location: "Zoom Meeting",
      attendees: 12,
      color: "purple",
      description: "Q4 project milestone review",
    },
    {
      id: "3",
      title: "Client Presentation",
      date: new Date(2025, 9, 12, 10, 0),
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      location: "Client Office",
      attendees: 6,
      color: "green",
      description: "Final proposal presentation",
    },
    {
      id: "4",
      title: "Design Workshop",
      date: new Date(2025, 9, 15, 13, 0),
      startTime: "1:00 PM",
      endTime: "4:00 PM",
      attendees: 15,
      color: "orange",
      description: "UX/UI design collaboration session",
    },
  ]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Previous month's days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthLastDay - i),
      });
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }

    // Next month's days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }

    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const getColorClasses = (colorId: string) => {
    return EVENT_COLORS.find((c) => c.id === colorId) || EVENT_COLORS[0];
  };

  const days = getDaysInMonth(currentDate);
  const todayEvents = getEventsForDate(selectedDate).sort(
    (a, b) =>
      new Date(`2000-01-01 ${a.startTime}`).getTime() -
      new Date(`2000-01-01 ${b.startTime}`).getTime()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                Calendar
              </h1>
              <p className="text-sm text-gray-600">
                Manage your schedule and events
              </p>
            </div>
            <button
              onClick={() => setShowEventModal(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Calendar Header */}
              <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {MONTHS[currentDate.getMonth()]}{" "}
                      {currentDate.getFullYear()}
                    </h2>
                    <button
                      onClick={goToToday}
                      className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150"
                    >
                      Today
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={previousMonth}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                      aria-label="Previous month"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextMonth}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                      aria-label="Next month"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-3">
                  {DAYS.map((day) => (
                    <div key={day} className="text-center">
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {day}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {days.map((dayInfo, index) => {
                    const dayEvents = getEventsForDate(dayInfo.date);
                    const isCurrentDay = isToday(dayInfo.date);
                    const isSelectedDay = isSelected(dayInfo.date);

                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(dayInfo.date)}
                        className={`
                          relative min-h-[80px] p-2 rounded-xl border-2 transition-all duration-200
                          ${
                            dayInfo.isCurrentMonth
                              ? "bg-white hover:bg-gray-50 border-gray-200"
                              : "bg-gray-50/50 border-gray-100 text-gray-400"
                          }
                          ${
                            isSelectedDay
                              ? "ring-2 ring-blue-500 border-blue-500"
                              : ""
                          }
                          ${isCurrentDay ? "bg-blue-50 border-blue-300" : ""}
                        `}
                      >
                        <div className="flex flex-col items-start h-full">
                          <span
                            className={`
                            text-sm font-medium mb-1
                            ${
                              isCurrentDay
                                ? "w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white"
                                : dayInfo.isCurrentMonth
                                ? "text-gray-900"
                                : "text-gray-400"
                            }
                          `}
                          >
                            {dayInfo.day}
                          </span>
                          <div className="w-full space-y-1">
                            {dayEvents.slice(0, 2).map((event) => {
                              const colors = getColorClasses(event.color);
                              return (
                                <div
                                  key={event.id}
                                  className={`text-[10px] px-1.5 py-0.5 rounded ${colors.class} text-white truncate`}
                                  title={event.title}
                                >
                                  {event.title}
                                </div>
                              );
                            })}
                            {dayEvents.length > 2 && (
                              <div className="text-[10px] text-gray-500 font-medium">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Events Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-8">
              <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {todayEvents.length}{" "}
                  {todayEvents.length === 1 ? "event" : "events"}
                </p>
              </div>

              <div className="p-6 max-h-[600px] overflow-y-auto">
                {todayEvents.length > 0 ? (
                  <div className="space-y-3">
                    {todayEvents.map((event) => {
                      const colors = getColorClasses(event.color);
                      return (
                        <div
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          className={`p-4 rounded-xl border-2 ${colors.border} ${colors.light} cursor-pointer hover:shadow-md transition-all duration-200`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 text-sm">
                              {event.title}
                            </h4>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Clock className="w-3.5 h-3.5" />
                              <span>
                                {event.startTime} - {event.endTime}
                              </span>
                            </div>

                            {event.location && (
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{event.location}</span>
                              </div>
                            )}

                            {event.attendees && (
                              <div className="flex items-center gap-2 text-xs text-gray-600">
                                <Users className="w-3.5 h-3.5" />
                                <span>{event.attendees} attendees</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <Clock className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      No events scheduled
                    </p>
                    <p className="text-xs text-gray-500 text-center">
                      Click "Add Event" to schedule something
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Event Details
              </h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedEvent.title}
                </h4>
                {selectedEvent.description && (
                  <p className="text-sm text-gray-600">
                    {selectedEvent.description}
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {selectedEvent.startTime} - {selectedEvent.endTime}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedEvent.date.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {selectedEvent.location && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">
                      {selectedEvent.location}
                    </span>
                  </div>
                )}

                {selectedEvent.attendees && (
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">
                      {selectedEvent.attendees} attendees
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3">
              <button className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Edit
              </button>
              <button className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
