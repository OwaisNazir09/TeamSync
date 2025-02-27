import React, { useEffect } from "react";
import { useDashboardstatsQuery } from "./services";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Tooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";

function Analytics() {
    const navigate = useNavigate();
    const { data, error, isLoading } = useDashboardstatsQuery();

    useEffect(() => {
        if (error?.status === 401) {
            console.log("Unauthorized! Redirecting to login...");
            navigate("/UserAuth/login");
        }
    }, [error, navigate]);

    if (isLoading) return <p>Loading...</p>;
    if (error && error.status !== 401) return <p>Error: {error.message}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Dashboard Stats</h1>
            <p>Choose an option from the sidebar to get started.</p>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    showDaysOutsideCurrentMonth
                    fixedWeekNumber={5}
                    slots={{
                        day: (props) => {
                            const dateStr = dayjs(props.day).format("YYYY-MM-DD");
                            const details = data?.[dateStr]; // Get details for the date

                            return (
                                <Tooltip title={details || "No data"} arrow>
                                    <div
                                        style={{
                                            padding: "5px",
                                            backgroundColor: details ? "#fffa90" : "transparent",
                                            borderRadius: "50%",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {props.day.date()}
                                    </div>
                                </Tooltip>
                            );
                        },
                    }}
                />
            </LocalizationProvider>
        </div>
    );
}

export default Analytics;
