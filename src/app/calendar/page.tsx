"use client";
import React, { useState, useEffect } from "react";
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
  _id?: string;
  id?: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  location?: string;
  attendees?: number;
  color: string;
  description?: string;
}

interface EventFormData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  attendees: number;
  color: string;
  description: string;
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    attendees: 0,
    color: "blue",
    description: "",
  });

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      const response = await fetch(
        `${API_BASE_URL}/events?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust based on your auth
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }

      const data = await response.json();
      const formattedEvents = data.map((event: any) => ({
        ...event,
        id: event._id,
        date: new Date(event.date),
      }));

      setEvents(formattedEvents);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events");
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: EventFormData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...eventData,
          date: new Date(eventData.date),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const newEvent = await response.json();

      setEvents([
        ...events,
        { ...newEvent, id: newEvent._id, date: new Date(newEvent.date) },
      ]);
      setShowCreateModal(false);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create event");
      console.error("Error creating event:", err);
    }
  };

  const updateEvent = async (id: string, eventData: Partial<CalendarEvent>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      const updatedEvent = await response.json();

      setEvents(
        events.map((e) =>
          e.id === id || e._id === id
            ? {
                ...updatedEvent,
                id: updatedEvent._id,
                date: new Date(updatedEvent.date),
              }
            : e
        )
      );

      setShowCreateModal(false);
      setIsEditMode(false);
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update event");
      console.error("Error updating event:", err);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      setEvents(events.filter((e) => e.id !== id && e._id !== id));
      setSelectedEvent(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete event");
      console.error("Error deleting event:", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEvent(formData);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      attendees: 0,
      color: "blue",
      description: "",
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthLastDay - i),
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }

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
              onClick={() => {
                setShowCreateModal(true);
                setFormData({
                  ...formData,
                  date: selectedDate.toISOString().split("T")[0],
                });
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
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
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextMonth}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-150"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-7 gap-2 mb-3">
                      {DAYS.map((day) => (
                        <div key={day} className="text-center">
                          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            {day}
                          </span>
                        </div>
                      ))}
                    </div>

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
                              ${
                                isCurrentDay ? "bg-blue-50 border-blue-300" : ""
                              }
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
                                      key={event.id || event._id}
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
                  </>
                )}
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
                          key={event.id || event._id}
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

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {isEditMode ? "Edit Event" : "Create Event"}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isEditMode && selectedEvent) {
                  updateEvent(selectedEvent._id || selectedEvent.id || "", {
                    ...formData,
                    date: new Date(formData.date),
                  });
                } else {
                  createEvent(formData);
                }
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Event title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Event location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attendees
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.attendees}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      attendees: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color
                </label>
                <div className="flex gap-2">
                  {EVENT_COLORS.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, color: color.id })
                      }
                      className={`w-8 h-8 rounded-full ${color.class} ${
                        formData.color === color.id
                          ? "ring-2 ring-offset-2 ring-gray-400"
                          : ""
                      } transition-all`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Event description"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

                {selectedEvent.attendees && selectedEvent.attendees > 0 && (
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
              <button
                onClick={() => {
                  if (!selectedEvent) return;

                  setFormData({
                    title: selectedEvent.title,
                    date: selectedEvent.date.toISOString().split("T")[0],
                    startTime: selectedEvent.startTime,
                    endTime: selectedEvent.endTime,
                    location: selectedEvent.location || "",
                    attendees: selectedEvent.attendees || 0,
                    color: selectedEvent.color || "blue",
                    description: selectedEvent.description || "",
                  });

                  setIsEditMode(true);
                  setShowCreateModal(true);
                  setSelectedEvent(null); // close detail modal
                }}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this event?"
                    )
                  ) {
                    deleteEvent(selectedEvent.id || selectedEvent._id || "");
                  }
                }}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
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
