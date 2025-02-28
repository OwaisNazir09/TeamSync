import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import DashboardNavbar from "./DashboardNavbar/DashboardNavbar";
import DashboardHome from "./MainScreen/DashboardHome";
import Analytics from "./MainScreen/Analytics";
import ProtectedRoute from "./components/ProtectedRoute"

function Dashboard() {
    return (
        <div className="h-screen flex flex-col">
            <div className="w-full">
                <DashboardNavbar />
            </div>

            <div className="flex flex-1">
                <Sidebar />

                <div className="p-4 flex-1 overflow-auto">
                    <Outlet />
                    <Routes>
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <DashboardHome />
                                </ProtectedRoute>
                            }
                        />

                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
