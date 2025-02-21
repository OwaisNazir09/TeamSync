import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LoginBg from "./assests/LoginPageBg.png";
import LogindevBg from "./assests/LogindevBg.png";

function SignupPage() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        nationality: "",
        email: "",
        phone_number: "",
        job_title: "",
        employee_id: "",
        password: "",
        confirm_password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your registration logic here
        console.log("Form submitted:", formData);
    };

    return (
        <>
            <Navbar />
            <div
                className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 py-12"
                style={{ backgroundImage: `url(${LoginBg})` }}
            >
                <div className="w-full max-w-5xl relative">
                    {/* Blurred background effect */}
                    <div
                        className="absolute inset-0 rounded-xl bg-cover bg-center"
                        style={{ backgroundImage: `url(${LogindevBg})` }}
                    ></div>

                    {/* Main container with split layout */}
                    <div className="relative flex flex-col md:flex-row bg-black/80 backdrop-blur-lg rounded-xl border border-white/20 shadow-2xl overflow-hidden">
                        
                        {/* LEFT SIDE - Signup Form */}
                        <div className="w-full md:w-3/5 border-r-0 md:border-r border-white/10">
                            <div className="p-6 border-b border-white/10">
                                <h2 className="text-2xl font-bold text-white text-center">
                                    Create Your Account
                                </h2>
                                <p className="text-white/60 text-center mt-1">
                                    Join our platform to get started
                                </p>
                            </div>

                            <div className="p-6">
                                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* First Name */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-white/80">
                                            First Name*
                                        </label>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            placeholder="Enter first name"
                                            className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-white/80">
                                            Last Name*
                                        </label>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            placeholder="Enter last name"
                                            className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Date of Birth */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-white/80">
                                            Date of Birth*
                                        </label>
                                        <input
                                            type="date"
                                            name="date_of_birth"
                                            value={formData.date_of_birth}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-white/80">
                                            Gender*
                                        </label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            required
                                        >
                                            <option value="" disabled className="bg-gray-800">Select gender</option>
                                            <option value="Male" className="bg-gray-800">Male</option>
                                            <option value="Female" className="bg-gray-800">Female</option>
                                            <option value="Other" className="bg-gray-800">Other</option>
                                        </select>
                                    </div>

                                
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-white/80">
                                            Email Address*
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="name@company.com"
                                            className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-white/80">
                                            Phone Number*
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone_number"
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                            placeholder="Enter phone number"
                                            className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>

                                   

                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-medium mb-1 text-white/80">
                                            Password*
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Create a strong password"
                                            className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Confirm Password - spans full width */}
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-medium mb-1 text-white/80">
                                            Confirm Password*
                                        </label>
                                        <input
                                            type="password"
                                            name="confirm_password"
                                            value={formData.confirm_password}
                                            onChange={handleChange}
                                            placeholder="Confirm your password"
                                            className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            required
                                        />
                                    </div>

                                    {/* Terms and Conditions Checkbox */}
                                    <div className="col-span-1 md:col-span-2 mt-2">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                required
                                                className="rounded bg-white/5 border-white/20 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="text-sm text-white/70">
                                                I agree to the <a href="#" className="text-indigo-400 hover:text-indigo-300">Terms of Service</a> and <a href="#" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</a>
                                            </span>
                                        </label>
                                    </div>

                                    {/* Sign up button - spans full width */}
                                    <div className="col-span-1 md:col-span-2 mt-4">
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-500/30"
                                        >
                                            Create Account
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Card footer for mobile view only */}
                            <div className="p-4 bg-black/40 border-t border-white/10 text-center md:hidden">
                                <p className="text-white/60 text-sm">
                                    Already have an account?{" "}
                                    <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium">
                                        Sign In
                                    </a>
                                </p>
                            </div>
                        </div>
                        
                        {/* RIGHT SIDE - Information Section */}
                        <div className="hidden md:flex md:w-2/5 flex-col justify-center items-center p-8 bg-gradient-to-br from-indigo-900/40 to-purple-900/40">
                            <div className="max-w-md text-center">
                                <div className="mb-6 mx-auto w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                </div>
                                
                                <h3 className="text-2xl font-bold text-white mb-4">Join Our Community</h3>
                                
                                <p className="text-white/80 mb-6">
                                    Create your account to access exclusive features and personalized experiences.
                                </p>
                                
                                <div className="mt-8 space-y-4">
                                    <div className="flex items-start text-left space-x-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h4 className="text-white font-medium">Secure Access</h4>
                                            <p className="text-white/60 text-sm">Your data is encrypted and protected with enterprise-grade security</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start text-left space-x-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h4 className="text-white font-medium">Streamlined Experience</h4>
                                            <p className="text-white/60 text-sm">Access all your tools and resources in one place</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start text-left space-x-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 text-green-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h4 className="text-white font-medium">Collaboration</h4>
                                            <p className="text-white/60 text-sm">Connect with team members for better productivity</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Footer for desktop view */}
                                <div className="mt-12 pt-4 border-t border-white/10">
                                    <p className="text-white/60 text-sm">
                                        Already have an account?{" "}
                                        <a href="#" className="text-indigo-400 hover:text-indigo-300 font-medium">
                                            Sign In
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

export default SignupPage;