import React, { useState, useEffect } from "react";
import { Calendar, Bell, CheckCircle, Clock, AlertCircle, Plus, Search, Trash } from "lucide-react";
import { useDashboardstatsQuery } from "./services";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

function DashboardHome() {
    const { data, error, isLoading } = useDashboardstatsQuery();
    const [tasks, setTasks] = useState([]);


    const [performanceData, setPerformanceData] = useState([]);
    const [notices, setNotices] = useState([
        { id: 1, title: "Office closed on March 15", date: "2025-02-20", read: false },
        { id: 2, title: "New policy update", date: "2025-02-26", read: false },
        { id: 3, title: "Upcoming team event", date: "2025-02-27", read: false },
    ]);
    // console.log(data.taskDetails.user.email)

    const [notes, setNotes] = useState("");
    const [savedNotes, setSavedNotes] = useState([
        { id: 1, content: "saved note 1", timestamp: "2025-02-20" },
        { id: 2, content: "saved note 2", timestamp: "2025-02-22" },
        { id: 3, content: "saved note 3", timestamp: "2025-02-25" },
        { id: 4, content: "saved note 4", timestamp: "2025-02-26" }
    ]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(3); // March
    const [currentYear, setCurrentYear] = useState(2025);
    const [searchTerm, setSearchTerm] = useState("");
    const [taskFilter, setTaskFilter] = useState("All");
    const [newTask, setNewTask] = useState({ title: "", dueDate: "", taskstatus: "Pending" });
    const [showNewTaskForm, setShowNewTaskForm] = useState(false);

    const firstname = data ? data.taskDetails.user.first_name : "Loading...";
    const lastname = data ? data.taskDetails.user.last_name : "Loading...";
    // Load data when available
    useEffect(() => {
        if (data) {
            setTasks(data.taskDetails.tasks);
            setPerformanceData(data.performanceData);
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

    // Weekly productivity data
    const weeklyData = [
        { name: "Monday", hours: 7.5, tasks: 6 },
        { name: "Tuesday", hours: 8.2, tasks: 8 },
        { name: "Wednesday", hours: 6.8, tasks: 5 },
        { name: "Thursday", hours: 7.3, tasks: 7 },
        { name: "Friday", hours: 5.9, tasks: 4 },
    ];

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
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = taskFilter === "All" || task.taskstatus === taskFilter;
        return matchesSearch && matchesFilter;
    });

    const handleSaveNotes = () => {
        if (notes.trim()) {
            const newNote = {
                id: savedNotes.length + 1,
                content: notes,
                timestamp: new Date().toISOString().slice(0, 10)
            };
            setSavedNotes([newNote, ...savedNotes]);
            setNotes("");
        }
    };

    const handleDeleteNote = (id) => {
        setSavedNotes(savedNotes.filter(note => note.id !== id));
    };

    const handleMarkNoticeAsRead = (id) => {
        setNotices(notices.map(notice =>
            notice.id === id ? { ...notice, read: true } : notice
        ));
    };

    const handleAddTask = () => {
        if (newTask.title.trim() && newTask.dueDate) {
            const task = {
                id: tasks.length + 1,
                title: newTask.title,
                taskstatus: newTask.taskstatus,
                dueDate: newTask.dueDate
            };
            setTasks([...tasks, task]);
            setNewTask({ title: "", dueDate: "", taskstatus: "Pending" });
            setShowNewTaskForm(false);
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
        switch (status) {
            case "Completed": return "bg-green-100 text-green-800";
            case "In Progress": return "bg-blue-100 text-blue-800";
            case "Pending": return "bg-yellow-100 text-yellow-800";
            case "Overdue": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    if (isLoading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="ml-3 text-lg">Loading dashboard...</p>
        </div>
    );

    if (error && error.status !== 401) return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Error Loading Dashboard</h2>
            <p>Error: {error.message}</p>
            <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md" onClick={() => window.location.reload()}>
                Try Again
            </button>
        </div>
    );

    const unreadNotices = notices.filter(notice => !notice.read).length;

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <h1 className="text-2xl font-bold text-gray-800">welcome <span

                    className="ml-0.5">
                    {
                        firstname
                    }
                </span>
                    <span

                        className="ml-0.5">
                        {
                            lastname
                        }
                    </span></h1>

                <div className="flex items-center mt-3 md:mt-0">
                    <div className="relative mr-4">
                        <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
                        {unreadNotices > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                {unreadNotices}
                            </span>
                        )}
                    </div>
                    <div className="bg-white p-2 rounded-full shadow">
                        <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                            U
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Tasks Card */}
                <div className="bg-white shadow-md rounded-lg p-4 col-span-1 lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">My Tasks</h2>
                        <div className="flex space-x-2">
                            <div className="relative">
                                <Search className="h-4 w-4 text-gray-400 absolute left-2 top-2.5" />
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    className="pl-8 pr-2 py-1 border rounded-md text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select
                                className="border rounded-md text-sm px-2 py-1"
                                value={taskFilter}
                                onChange={(e) => setTaskFilter(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Overdue">Overdue</option>
                            </select>
                            <button
                                className="bg-blue-500 text-white rounded-md p-1"
                                title="Add new task"
                                onClick={() => setShowNewTaskForm(!showNewTaskForm)}
                            >
                                <Plus className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {showNewTaskForm && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                            <h3 className="font-medium mb-2">Add New Task</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <input
                                    type="text"
                                    placeholder="Task title"
                                    className="p-2 border rounded-md"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                />
                                <input
                                    type="date"
                                    className="p-2 border rounded-md"
                                    value={newTask.dueDate}
                                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                />
                                <select
                                    className="p-2 border rounded-md"
                                    value={newTask.taskstatus}
                                    onChange={(e) => setNewTask({ ...newTask, taskstatus: e.target.value })}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <div className="flex justify-end mt-2 space-x-2">
                                <button
                                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm"
                                    onClick={() => setShowNewTaskForm(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                                    onClick={handleAddTask}
                                >
                                    Add Task
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="pb-2 text-left">Task</th>
                                    <th className="pb-2 text-left">Status</th>
                                    <th className="pb-2 text-left">Due Date</th>
                                    <th className="pb-2 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTasks.length > 0 ? (
                                    filteredTasks.map((task) => (
                                        <tr key={task.id} className="border-b hover:bg-gray-50">
                                            <td className="py-3">{task.title}</td>
                                            <td className="py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs ${getTaskStatusColor(task.taskstatus)}`}>
                                                    {task.taskstatus}
                                                </span>
                                            </td>
                                            <td className="py-3">{new Date(task.dueDate).toLocaleDateString()}</td>
                                            <td className="py-3">
                                                <div className="flex space-x-2">
                                                    <button className="text-green-600 hover:text-green-800" title="Mark as complete">
                                                        <CheckCircle className="h-4 w-4" />
                                                    </button>
                                                    <button className="text-blue-600 hover:text-blue-800" title="Edit task">
                                                        <Clock className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-4 text-center text-gray-500">
                                            {searchTerm || taskFilter !== "All"
                                                ? "No tasks match your search or filter"
                                                : "No tasks available"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Performance Charts */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-2">Task Performance</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={performanceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {performanceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => [`${value} tasks`, 'Count']} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* <h2 className="text-lg font-semibold mt-6 mb-2">Weekly Activity</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="hours" name="Hours Worked" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="tasks" name="Tasks Completed" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div> */}
                </div>

                {/* Calendar Card */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold flex items-center">
                            <Calendar className="h-5 w-5 mr-2" /> Calendar
                        </h2>
                        <div className="flex items-center space-x-2">
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
                    </div>

                    {/* Day labels */}
                    <div className="grid grid-cols-7 gap-1 mt-2 mb-1">
                        {dayLabels.map(day => (
                            <div key={day} className="text-center text-xs font-medium text-gray-500">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {/* Empty cells for days before the 1st of the month */}
                        {Array.from({ length: firstDayOfMonth }, (_, i) => (
                            <div key={`empty-${i}`} className="h-8"></div>
                        ))}

                        {/* Actual days */}
                        {daysInMonth.map((day) => {
                            const dateKey = `2025-${currentMonth.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                            const hasWorkLog = workLog[dateKey] !== undefined;
                            const isToday = dateKey === "2025-03-01"; // Just for example

                            return (
                                <div
                                    key={day}
                                    className={`relative h-8 rounded-md text-center cursor-pointer transition-all flex items-center justify-center
                    ${hasWorkLog ? "bg-green-100 hover:bg-green-200" : "bg-gray-50 hover:bg-gray-100"}
                    ${isToday ? "border-2 border-blue-500" : ""}
                  `}
                                    onClick={() => setSelectedDate(dateKey)}
                                >
                                    <span className="text-sm">{day}</span>
                                    {hasWorkLog && (
                                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1 bg-green-500 rounded-full"></span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {selectedDate && workLog[selectedDate] !== undefined && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-md">
                            <p className="font-semibold text-blue-800">{selectedDate}</p>
                            <div className="flex items-center mt-1">
                                <Clock className="h-4 w-4 mr-1 text-blue-500" />
                                <p className="text-gray-800">Hours worked: <span className="font-medium">{workLog[selectedDate]}</span></p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Personal Notes Card */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-3">Personal Notes</h2>

                    <div className="mb-3">
                        <textarea
                            className="w-full p-2 border rounded-md h-24 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            placeholder="Type your notes here..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <button
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            onClick={handleSaveNotes}
                        >
                            Save Note
                        </button>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {savedNotes.map((note) => (
                            <div key={note.id} className="p-2 bg-yellow-50 rounded border-l-4 border-yellow-400 group">
                                <div className="flex justify-between">
                                    <p className="text-xs text-gray-500">{note.timestamp}</p>
                                    <button
                                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => handleDeleteNote(note.id)}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </button>
                                </div>
                                <p className="mt-1">{note.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notices Card */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-3">Notices</h2>
                    <ul className="space-y-2">
                        {notices.map((notice) => (
                            <li
                                key={notice.id}
                                className={`p-3 border-l-4 rounded ${notice.read ? 'border-gray-300 bg-gray-50' : 'border-blue-500 bg-blue-50'}`}
                                onClick={() => handleMarkNoticeAsRead(notice.id)}
                            >
                                <div className="flex items-start">
                                    <div className="flex-grow">
                                        <p className={`font-medium ${notice.read ? 'text-gray-700' : 'text-blue-800'}`}>{notice.title}</p>
                                        <p className="text-sm text-gray-500 mt-1">Posted: {notice.date}</p>
                                    </div>
                                    {!notice.read && (
                                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-1"></div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;