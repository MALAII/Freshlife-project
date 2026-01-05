import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../apis/authApi";
import signupIcon from "../assets/Logo.png";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser({
        username,
        // email,
        password,
      });

      if (res.data.success) {
        toast.success("Registration Successful");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup Error");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white shadow-lg flex">

        {/* Left Branding */}
        <div className="hidden md:flex w-1/2 border-r items-center justify-center p-10">
          <img src={signupIcon} alt="Logo" className="w-64 object-contain" />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Sign up to get started
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full border px-3 py-2 focus:outline-none focus:border-purple-600"
              />
            </div>

            {/* Email */}
            {/* <div>
              <label className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border px-3 py-2 focus:outline-none focus:border-purple-600"
              />
            </div> */}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border px-3 py-2 focus:outline-none focus:border-purple-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 font-medium hover:bg-purple-700 transition"
            >
              Sign Up
            </button>

            {/* Redirect */}
            <p className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-purple-600 cursor-pointer font-medium"
              >
                Login
              </span>
            </p>

            <p className="text-xs text-gray-400 text-center pt-4 border-t">
              Designed & Developed by{" "}
              <span className="text-purple-600 font-medium">
                Malaiyarasi
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
