import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LoginBg from "./assests/LoginPageBg.png";
import LogindevBg from "./assests/LogindevBg.png";


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);

    const handleSendOtp = () => {
        if (email) {
            setOtpSent(true);
          
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    return (
        <>
            <Navbar />
            <div
                className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
                style={{ backgroundImage: `url(${LoginBg})` }}
            >
                <div className="w-full max-w-4xl relative">
                   
                    <div
                        className="absolute inset-0 rounded-xl bg-cover bg-center"
                        style={{ backgroundImage: `url(${LogindevBg})` }}
                    ></div>

                    
                    <div className="relative flex flex-col md:flex-row bg-black/80 backdrop-blur-lg rounded-xl border border-white/20 shadow-2xl overflow-hidden">

                    
                        <div className="w-full md:w-1/2 border-r-0 md:border-r border-white/10">
                            <div className="p-6 border-b border-white/10">
                                <h2 className="text-2xl font-bold text-white text-center">
                                    Welcome Back
                                </h2>
                                <p className="text-white/60 text-center mt-1">
                                    Sign in to continue to your dashboard
                                </p>
                            </div>

                            <div className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-white/80">
                                            Work Email
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="name@company.com"
                                                className="flex-1 bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={handleSendOtp}
                                                className={`whitespace-nowrap px-3 py-2 rounded-lg text-sm font-medium transition-all ${otpSent
                                                        ? "bg-green-600/20 text-green-400 border border-green-500/30"
                                                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                                                    }`}
                                            >
                                                {otpSent ? "OTP Sent" : "Send OTP"}
                                            </button>
                                        </div>
                                    </div>

                       
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-sm font-medium text-white/80">
                                                Password
                                            </label>
                                            <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300">
                                                Forgot password?
                                            </a>
                                        </div>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 text-white/80">
                                            One-Time Password
                                        </label>
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder="Enter 6-digit OTP"
                                            className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            maxLength={6}
                                            pattern="[0-9]{6}"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-500/30 mt-6"
                                    >
                                        Log In
                                    </button>
                                </form>
                            </div>

                            <div className="p-4 bg-black/40 border-t border-white/10 text-center md:hidden">
                                <p className="text-white/60 text-sm">
                                    Don't have an account?{" "}
                                    <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium">
                                        Sign Up
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center p-8 bg-gradient-to-br from-indigo-900/40 to-purple-900/40">
                            <div className="max-w-md text-center">
                                <div className="mb-6 mx-auto w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4">Secure Access Portal</h3>

                                <p className="text-white/80 mb-6 italic text-lg">
                                    "Innovation is the ability to see change as an opportunity - not a threat."
                                </p>

                                <p className="text-white/60 text-sm">
                                    — Steve Jobs
                                </p>

                                <div className="mt-12 space-y-3">
                                    <p className="text-white/70 text-sm flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Enhanced security with 2FA
                                    </p>
                                    <p className="text-white/70 text-sm flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Enterprise-grade protection
                                    </p>
                                </div>

                                {/* Footer for desktop view */}
                                <div className="mt-12 pt-4 border-t border-white/10">
                                    <p className="text-white/60 text-sm">
                                        Don't have an account?{" "}
                                        <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium">
                                            Sign Up
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default LoginPage;