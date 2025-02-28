import React from "react";
import { Navigate } from "react-router-dom";
import { useDashboardstatsQuery } from "../MainScreen/services";

const ProtectedRoute = ({ children }) => {
    const { error, isLoading } = useDashboardstatsQuery();

    if (isLoading) return <p>AAA terrrr su chuii mooool</p>;

    if (error?.status === 401) {
        console.log("Unauthorized! Redirecting to login...");
        return <Navigate to="/UserAuth/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
