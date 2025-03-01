import React, { useState, useEffect } from "react";
import { useDashboardstatsQuery, useCreatenoteMutation, useDeletenoteMutation, useTaskUpdateMutation } from "./services";
import { Calendar, Bell, CheckCircle, Clock, Search, Trash, ChevronDown } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

function DashboardHome() {
    const { data, error, isLoading, refetch } = useDashboardstatsQuery();
    const [tasks, setTasks] = useState([]);
    const [personalnotes, setPersonalNotes] = useState([]);
    const [notes, setNotes] = useState({ title: '', text: '' });
    const [createNote, { isLoading: isCreatingNote }] = useCreatenoteMutation();
    const [deleteNote] = useDeletenoteMutation();
    const [updateTask] = useTaskUpdateMutation();
    const [performanceData, setPerformanceData] = useState([]);
    const [notices, setNotices] = useState([]);

    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(3); // March
    const [currentYear, setCurrentYear] = useState(2025);
    const [searchTerm, setSearchTerm] = useState("");
    const [taskFilter, setTaskFilter] = useState("All");
    const [showAllTasks, setShowAllTasks] = useState(false);

    const firstname = data ? data.dashboardstats.user.first_name : "Loading...";
    const lastname = data ? data.dashboardstats.user.last_name : "Loading...";

    // Load data when available
    useEffect(() => {
        if (data && data.dashboardstats) {
            // Set tasks from dashboardstats
            if (Array.isArray(data.dashboardstats.tasks)) {
                setTasks(data.dashboardstats.tasks);
            }

            // Set performance data if available
            if (Array.isArray(data.performanceData)) {
                setPerformanceData(data.performanceData);
            }

            // Set personal notes explicitly checking for array
            if (data.dashboardstats.personalnotes && Array.isArray(data.dashboardstats.personalnotes)) {
                setPersonalNotes(data.dashboardstats.personalnotes);
            } else if (data.personalnotes && Array.isArray(data.personalnotes)) {
                // Alternative location in case the API structure is different
                setPersonalNotes(data.personalnotes);
            } else {
                setPersonalNotes([]);
                console.log("No personal notes found in the API response");
            }

            if (data.dashboardstats.notices && Array.isArray(data.dashboardstats.notices) && data.dashboardstats.notices.length > 0) {
                const formattedNotices = data.dashboardstats.notices.map(notice => ({
                    id: notice._id,
                    title: notice.title,
                    date: new Date(notice.createdAt).toISOString().split('T')[0],
                    read: notice.read || false,
                    message: notice.message
                }));
                setNotices(formattedNotices);
            } else {
                // Set empty notices array instead of fallback
                setNotices([]);
            }

            // Log the structure of the data for debugging
            console.log("Dashboard data structure:", data);
        }
    }, [data]);

    // Work log data
    const workLog = {
        "2025-03-01": 5.5,
        "2025-03-02": 7.0,
        "2025-03-03": 6.2,
        "2025-03-04": 4.8,
        "2025-03-05": 8.0,
    };

    // Get days in month
    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    const daysInMonth = Array.from({ length: getDaysInMonth(currentYear, currentMonth) }, (_, i) => i + 1);

    // Get day of week
    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month - 1, 1).getDay();
    };

    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Handle task filtering and searching
    const filteredTasks = tasks.filter(task => {
        if (!task || !task.title) return false;
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase() || "");
        const matchesFilter = taskFilter === "All" ||
            (task.taskstatus && task.taskstatus.toLowerCase().trim() === taskFilter.toLowerCase().trim());
        return matchesSearch && matchesFilter;
    });

    // Display only 5 tasks initially
    const displayedTasks = showAllTasks ? filteredTasks : filteredTasks.slice(0, 5);
    const hasMoreTasks = filteredTasks.length > 5;

    const handleSaveNotes = async () => {
        if (notes.title.trim() && notes.text.trim()) {
            try {
                const result = await createNote(notes).unwrap();
                console.log("Note created successfully:", result);

                // Clear the form
                setNotes({ title: '', text: '' });

                // Refetch data to get updated notes
                refetch();
            } catch (err) {
                console.error('Failed to create note:', err);
            }
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            const result = await deleteNote(id).unwrap();
            console.log("Note deleted successfully:", result);

            // Refetch data to get updated notes list
            refetch();
        } catch (err) {
            console.error('Failed to delete note:', err);
        }
    };

    const handleMarkNoticeAsRead = async (id) => {
        try {
            // Here you would typically call an API to update the notice read status
            // For example: await updateNoticeReadStatus({ id, read: true }).unwrap();

            // For now, just update the local state
            setNotices(notices.map(notice =>
                notice.id === id ? { ...notice, read: true } : notice
            ));

            // Optionally refetch if you implement the API call
            // refetch();
        } catch (err) {
            console.error('Failed to update notice read status:', err);
        }
    };

    const handleUpdateTaskStatus = async (taskId, newStatus) => {
        try {
            // Call API to update task status
            await updateTask({ id: taskId, status: newStatus }).unwrap();

            // Refetch data to get updated tasks
            refetch();
        } catch (err) {
            console.error('Failed to update task status:', err);
        }
    };

    const changeMonth = (delta) => {
        let newMonth = currentMonth + delta;
        let newYear = currentYear;

        if (newMonth > 12) {
            newMonth = 1;
            newYear += 1;
        } else if (newMonth < 1) {
            newMonth = 12;
            newYear -= 1;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const getTaskStatusColor = (status) => {
        if (!status) return "bg-gray-100 text-gray-800";

        switch (status.trim()) {
            case "Completed": return "bg-green-100 text-green-800";
            case "In Progress": return "bg-blue-100 text-blue-800";
            case "Pending": return "bg-yellow-100 text-yellow-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (e) {
            return "Invalid Date";
        }
    };

    if (isLoading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-3 text-lg">Loading dashboard...</p>
        </div>
    );

    if (error && error.status !== 401) return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Error Loading Dashboard</h2>
            <p>Error: {error.message || "Unknown error occurred"}</p>
            <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md" onClick={() => refetch()}>
                Try Again
            </button>
        </div>
    );

    const unreadNotices = notices.filter(notice => !notice.read).length;
    const currentDate = new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Debugging info - to be removed in production
    console.log("Personal notes being rendered:", personalnotes);

    return (
        <div className="p-2 sm:p-4 bg-gray-50 min-h-screen">
            {/* Header with welcome message and profile */}
            <div className="mb-4 sm:mb-6 flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Welcome, <span className="text-blue-600">{firstname} {lastname}</span></h1>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">{currentDate}</p>
                </div>

                <div className="flex items-center mt-3 md:mt-0">
                    <div className="relative mr-4">
                        <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 cursor-pointer hover:text-blue-500 transition-colors" />
                        {unreadNotices > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {unreadNotices}
                            </span>
                        )}
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-0.5 rounded-full shadow">
                        <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-lg">
                            {firstname.charAt(0)}{lastname.charAt(0)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Tasks Card */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden col-span-1 lg:col-span-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-100 py-2 sm:py-3 px-3 sm:px-4">
                        <h2 className="text-base sm:text-lg font-semibold text-white flex items-center">
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> My Tasks
                        </h2>
                    </div>
                    <div className="p-3 sm:p-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                <div className="relative">
                                    <Search className="h-4 w-4 text-gray-400 absolute left-2 top-2.5" />
                                    <input
                                        type="text"
                                        placeholder="Search tasks..."
                                        className="w-full sm:w-auto pl-8 pr-2 py-1 border rounded-md text-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <select
                                    className="border rounded-md text-sm px-2 py-1 focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                                    value={taskFilter}
                                    onChange={(e) => setTaskFilter(e.target.value)}
                                >
                                    <option value="All">All</option>
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>

                        <div className="rounded-lg border border-gray-200 overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-600">Task</th>
                                        <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-600">Status</th>
                                        <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-600">Due Date</th>
                                        <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedTasks.length > 0 ? (
                                        displayedTasks.map((task) => (
                                            <tr key={task._id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                                                <td className="py-2 sm:py-3 px-2 sm:px-4">{task.title}</td>
                                                <td className="py-2 sm:py-3 px-2 sm:px-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${getTaskStatusColor(task.taskstatus)}`}>
                                                        {task.taskstatus || "Unknown"}
                                                    </span>
                                                </td>
                                                <td className="py-2 sm:py-3 px-2 sm:px-4">{formatDate(task.dueDate)}</td>
                                                <td className="py-2 sm:py-3 px-2 sm:px-4">
                                                    <div className="relative inline-block text-left">
                                                        <select
                                                            className="border border-gray-300 rounded-md text-sm px-2 py-1"
                                                            value={task.taskstatus || ""}
                                                            onChange={(e) => handleUpdateTaskStatus(task._id, e.target.value)}
                                                        >
                                                            <option value="">Select Status</option>
                                                            <option value="Pending">Pending</option>
                                                            <option value="In Progress">In Progress</option>
                                                            <option value="Completed">Completed</option>
                                                        </select>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="py-6 text-center text-gray-500">
                                                {searchTerm || taskFilter !== "All"
                                                    ? "No tasks match your search or filter"
                                                    : "No tasks available"}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {hasMoreTasks && (
                            <div className="mt-3 text-center">
                                <button
                                    onClick={() => setShowAllTasks(!showAllTasks)}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center mx-auto"
                                >
                                    {showAllTasks ? "Show Less" : "Show All"}
                                    <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-200 ${showAllTasks ? "transform rotate-180" : ""}`} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Performance Charts */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-green-100 py-2 sm:py-3 px-3 sm:px-4">
                        <h2 className="text-base sm:text-lg font-semibold text-white">Task Performance</h2>
                    </div>
                    <div className="p-3 sm:p-4">
                        <div className="h-48 sm:h-64">
                            {performanceData && performanceData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={performanceData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={60}
                                            paddingAngle={5}
                                            dataKey="value"
                                            label={({ name, percent }) =>
                                                `${name} ${(percent * 100).toFixed(0)}%`
                                            }
                                        >
                                            {performanceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color || "#999"} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [`${value} tasks`, 'Count']} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex h-full items-center justify-center text-gray-500">
                                    No performance data available
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Calendar Card */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-100 py-2 sm:py-3 px-3 sm:px-4">
                        <h2 className="text-base sm:text-lg font-semibold text-white flex items-center">
                            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Calendar
                        </h2>
                    </div>
                    <div className="p-3 sm:p-4">
                        <div className="flex justify-between items-center mb-3">
                            <button
                                className="p-1 rounded-md hover:bg-gray-100"
                                onClick={() => changeMonth(-1)}
                            >
                                &lt;
                            </button>
                            <span className="font-medium">{monthNames[currentMonth - 1]} {currentYear}</span>
                            <button
                                className="p-1 rounded-md hover:bg-gray-100"
                                onClick={() => changeMonth(1)}
                            >
                                &gt;
                            </button>
                        </div>

                        {/* Day labels */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {dayLabels.map(day => (
                                <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar grid */}
                        <div className="grid grid-cols-7 gap-1">
                            {/* Empty cells for days before the 1st of the month */}
                            {Array.from({ length: firstDayOfMonth }, (_, i) => (
                                <div key={`empty-${i}`} className="h-6 sm:h-9"></div>
                            ))}

                            {/* Actual days */}
                            {daysInMonth.map((day) => {
                                const dateKey = `${currentYear}-${currentMonth.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                                const hasWorkLog = workLog[dateKey] !== undefined;
                                const isToday = dateKey === "2025-03-01"; // Just for example

                                return (
                                    <div
                                        key={day}
                                        className={`relative h-6 sm:h-9 rounded-md text-center cursor-pointer transition-all flex items-center justify-center
                                          ${hasWorkLog ? "bg-purple-100 hover:bg-purple-200" : "hover:bg-gray-100"}
                                          ${isToday ? "border-2 border-purple-500 font-bold" : ""}
                                        `}
                                        onClick={() => setSelectedDate(dateKey)}
                                    >
                                        <span className={`text-xs sm:text-sm ${hasWorkLog ? "text-purple-800" : ""}`}>{day}</span>
                                        {hasWorkLog && (
                                            <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-1 w-1 bg-purple-500 rounded-full"></span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {selectedDate && workLog[selectedDate] !== undefined && (
                            <div className="mt-4 p-2 sm:p-3 bg-purple-50 rounded-md border border-purple-200">
                                <p className="font-semibold text-purple-800 text-xs sm:text-sm">{selectedDate}</p>
                                <div className="flex items-center mt-1">
                                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-purple-500" />
                                    <p className="text-gray-800 text-xs sm:text-sm">Hours worked: <span className="font-medium">{workLog[selectedDate]}</span></p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Personal Notes Card */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-100 py-3 px-4">
                        <h2 className="text-lg font-semibold text-white">Personal Notes</h2>
                    </div>
                    <div className="p-4">
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Note title"
                                className="w-full p-2 border rounded-md mb-2 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300"
                                value={notes.title}
                                onChange={(e) => setNotes({ ...notes, title: e.target.value })}
                            />
                            <textarea
                                className="w-full p-2 border rounded-md h-24 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300"
                                placeholder="Type your note here..."
                                value={notes.text}
                                onChange={(e) => setNotes({ ...notes, text: e.target.value })}
                            />
                            <button
                                className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors w-full"
                                onClick={handleSaveNotes}
                                disabled={isCreatingNote}
                            >
                                {isCreatingNote ? 'Saving...' : 'Save Note'}
                            </button>
                        </div>

                        {/* Saved Notes */}
                        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                            {personalnotes && personalnotes.length > 0 ? (
                                personalnotes.map((note) => (
                                    <div key={note._id || note.id} className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs text-gray-500">
                                                {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : "No date"}
                                            </p>
                                            <button
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                                onClick={() => handleDeleteNote(note._id || note.id)}
                                                title="Delete note"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <h3 className="font-medium mt-1 text-yellow-800">{note.title}</h3>
                                        <p className="mt-1 text-sm">{note.text}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-6 bg-gray-50 rounded-lg">
                                    <p className="text-gray-500">No saved notes</p>
                                    <p className="text-sm text-gray-400 mt-1">Create your first note above</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Notices Card */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-red-100 py-3 px-4">
                        <h2 className="text-lg font-semibold text-white flex items-center">
                            <Bell className="h-5 w-5 mr-2" /> Notices
                            {unreadNotices > 0 && (
                                <span className="ml-2 bg-white text-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {unreadNotices}
                                </span>
                            )}
                        </h2>
                    </div>
                    <div className="p-4">
                        {notices.length > 0 ? (
                            <ul className="space-y-3">
                                {notices.map((notice) => (
                                    <li
                                        key={notice.id}
                                        className={`p-3 border-l-4 rounded-lg cursor-pointer transition-all ${notice.read
                                            ? 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                                            : 'border-red-500 bg-red-50 hover:bg-red-100'
                                            }`}
                                        onClick={() => handleMarkNoticeAsRead(notice.id)}
                                    >
                                        <div className="flex items-start">
                                            <div className="flex-grow">
                                                <p className={`font-medium ${notice.read ? 'text-gray-700' : 'text-red-800'}`}>
                                                    {notice.title}
                                                </p>
                                                <p className="text-sm text-gray-500 mt-1">Posted: {notice.date}</p>
                                                {notice.message && (
                                                    <p className="text-sm mt-2">{notice.message}</p>
                                                )}
                                            </div>
                                            {!notice.read && (
                                                <div className="h-2 w-2 rounded-full bg-red-500 mt-1 animate-pulse"></div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-6 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">No current notices</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;