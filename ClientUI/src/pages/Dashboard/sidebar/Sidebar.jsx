import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
    const [hovered, setHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Check if screen is mobile size
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkIfMobile();

        // Add event listener for window resize
        window.addEventListener("resize", checkIfMobile);

        // Cleanup
        return () => window.removeEventListener("resize", checkIfMobile);
    }, []);

    const navItems = [
        { path: "/dashboard", icon: "🏠", label: "Home" },
        { path: "/dashboard/users", icon: "👤", label: "Users" },
        { path: "/dashboard/settings", icon: "⚙️", label: "Settings" },
        { path: "/dashboard/createteam", icon: "tt", label: "createteam" }
    ];

    // Mobile hamburger menu
    const HamburgerIcon = () => (
        <div
            className="md:hidden fixed top-4 left-4 z-30 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
            <div className="w-6 h-1 bg-white mb-1 rounded"></div>
            <div className="w-6 h-1 bg-white mb-1 rounded"></div>
            <div className="w-6 h-1 bg-white rounded"></div>
        </div>
    );

    if (isMobile) {
        return (
            <>
                <HamburgerIcon />

                {/* Mobile Sidebar - opens from left */}
                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <div
                        className={`h-screen w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                            } shadow-lg relative`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Decorative sidebar accent */}
                        <div className="absolute top-0 right-0 w-1 h-full bg-blue-500"></div>

                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            ✕
                        </button>

                        {/* Sidebar Header */}
                        <div className="flex items-center p-4 border-b border-gray-700">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold">
                                D
                            </div>
                            <h2 className="ml-3 font-bold text-xl">Dashboard</h2>
                        </div>

                        {/* Navigation Links */}
                        <nav className="mt-6 px-3">
                            <ul>
                                {navItems.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <li key={item.path} className="mb-4">
                                            <Link
                                                to={item.path}
                                                className={`flex items-center p-3 rounded-lg transition-all duration-200 ${isActive
                                                    ? "bg-blue-700 text-white"
                                                    : "text-gray-300 hover:bg-gray-700"
                                                    }`}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <span className="text-xl">{item.icon}</span>
                                                <span className="ml-4">{item.label}</span>
                                                {isActive && (
                                                    <div className="ml-auto">
                                                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                                    </div>
                                                )}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* Bottom section */}
                        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-700">
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-600"></div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium">User Name</p>
                                    <p className="text-xs text-gray-400">Admin</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Desktop version
    return (
        <div
            className={`h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white transition-all duration-300 ease-in-out ${hovered ? "w-64" : "w-20"
                } shadow-lg relative hidden md:block`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Decorative sidebar accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>

            {/* Sidebar Header */}
            <div className="flex items-center p-4 border-b border-gray-700">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold">
                    D
                </div>
                <h2 className={`ml-3 font-bold text-xl transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"
                    }`}>
                    Dashboard
                </h2>
            </div>

            {/* Navigation Links */}
            <nav className="mt-6 px-3">
                <ul>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.path} className="mb-4">
                                <Link
                                    to={item.path}
                                    className={`flex items-center p-5    rounded-lg transition-all duration-200 ${isActive
                                        ? "bg-blue-700 text-white"
                                        : "text-gray-300 hover:bg-gray-700"
                                        }`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className={`ml-4 transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"
                                        }`}>
                                        {item.label}
                                    </span>
                                    {isActive && (
                                        <div className="ml-auto">
                                            <div className={`w-2 h-2 rounded-full bg-blue-400 ${hovered ? "opacity-100" : "opacity-0"
                                                }`}></div>
                                        </div>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom section */}
            <div className={`absolute bottom-0 left-0 w-full p-4 border-t border-gray-700 transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"
                }`}>
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-600"></div>
                    <div className="ml-3">
                        <p className="text-sm font-medium">User Name</p>
                        <p className="text-xs text-gray-400">Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;