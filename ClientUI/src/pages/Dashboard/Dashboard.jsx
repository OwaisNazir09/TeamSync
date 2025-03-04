import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import DashboardNavbar from "./DashboardNavbar/DashboardNavbar";
import DashboardHome from "./MainScreen/DashboardHome";
import UserProfilePage from "./MainScreen/UserProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateTeam from './MainScreen/CreateTeam'

function Dashboard() {
    return (
        <div className="h-screen flex flex-col">
            {/* Navbar (Optional) */}
            {/* <div className="w-full">
                <DashboardNavbar />
            </div> */}

            <div className="flex flex-1">
                <Sidebar />
                <div className="p-4 flex-1 overflow-auto mt-10 md:mt-0">
                    <Routes>
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <DashboardHome />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="userprofile"
                            element={
                                <ProtectedRoute>
                                    <UserProfilePage />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="createTeam"
                            element={
                                <ProtectedRoute>
                                    <CreateTeam />
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
