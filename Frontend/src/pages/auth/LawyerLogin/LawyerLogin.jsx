import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";

function LawyerLogin() {
  const navigate = useNavigate();
  const { backendUrl, setLawyerData, getLawyerData } = useContext(AppContext);
  const [email, setEmailLocal] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Submitting login:", { email, password, url: `${backendUrl}/api/lawyer/login` });

    try {
      const response = await axios.post(
        `${backendUrl}/api/lawyer/login`,
        { email, password },
        { withCredentials: true }
      );

      console.log("Login response:", response.data);

      // Check success based on msg, since success field isn’t in your response
      if (response.data.msg === "Logged in successfully") {
        console.log("Login successful, setting lawyer data:", {
          _id: response.data._id,
          fullName: response.data.fullName,
          username: response.data.username,
        });
        setLawyerData({
          _id: response.data._id,
          fullName: response.data.fullName,
          username: response.data.username,
        });

        toast.success(response.data.msg, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        console.log("Starting navigation timeout...");
        setTimeout(() => {
          console.log("Inside timeout: Fetching lawyer data...");
          getLawyerData()
            .then(() => {
              console.log("Navigating to lawyer-dashboard...");
              navigate("/lawyer-dashboard");
            })
            .catch((err) => {
              console.error("Error in getLawyerData:", err);
              toast.error("Failed to fetch lawyer data, but logged in.");
              navigate("/lawyer-dashboard"); // Navigate anyway
            });
        }, 500);
      } else {
        console.log("Login failed with message:", response.data.msg);
        toast.error(response.data.msg || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      const errorMsg = err.response?.data?.msg || "Something went wrong. Please try again.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat p-5">
      <div className="flex flex-col md:flex-row max-w-[1000px] bg-white rounded-[12px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] overflow-hidden md:animate-float">
        <div className="hidden md:flex md:w-[60%] bg-gradient-to-br from-[#0022fc] to-[#001cd8] justify-center items-center overflow-hidden p-4">
          <video
            src="images/gtrfe-1.mp4"
            autoPlay
            loop
            muted
            className="w-full h-auto rounded-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
          ></video>
        </div>
        <div className="w-full md:w-[60%] p-6 md:p-8 flex flex-col justify-center items-center text-center">
          <h1 className="text-[24px] md:text-[28px] font-bold text-[#02189c] mb-4">
            Log in to your account
          </h1>
          <div className="h-[2px] bg-[#3652fc] w-[80px] mx-auto mb-6"></div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            <div className="input-group">
              <label className="text-[14px] font-semibold text-[#827ee3] text-left mb-2">
                Email
              </label>
              <input
                className="border-[2px] border-[#eaeaec] rounded-[8px] px-4 py-3 w-full text-[14px] bg-[#f9f9f9] focus:border-[#3652fc] focus:bg-white focus:outline-none transition-all duration-200"
                type="email"
                value={email}
                onChange={(e) => setEmailLocal(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={isLoading}
              />
            </div>
            <div className="input-group">
              <label className="text-[14px] font-semibold text-[#827ee3] text-left mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  className="border-[2px] border-[#eaeaec] rounded-[8px] px-4 py-3 w-full text-[14px] bg-[#f9f9f9] focus:border-[#3652fc] focus:bg-white focus:outline-none transition-all duration-200 pr-[50px]"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 bg-transparent border-none cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <img src="images/close.png" alt="Hide password" className="w-6 h-6" />
                  ) : (
                    <img src="images/open.png" alt="Show password" className="w-6 h-6" />
                  )}
                </button>
              </div>
              <p className="text-[#3652fc] text-[14px] mt-2 text-right">
                <a
                  href="#"
                  onClick={() => navigate("/lawyer-email-for-password-reset")}
                  className="hover:underline"
                >
                  Forgot Password?
                </a>
              </p>
            </div>
            <button
              type="submit"
              className="text-[16px] font-bold rounded-[20px] py-3 px-6 bg-[#3652fc] text-white hover:bg-[#6277fe] transition-colors duration-300 disabled:opacity-70"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Submit"}
            </button>
          </form>
          <div className="mt-6">
            <p className="text-[14px] text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                onClick={() => navigate("/lawyer-create-account")}
                className="text-[#3652fc] font-semibold hover:underline"
              >
                Sign up now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LawyerLogin;