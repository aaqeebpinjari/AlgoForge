import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Eye, EyeOff, Mail, Lock, User, AlertCircle } from "lucide-react";
import { useTheme } from "../ThemeContext";
import { useGoogleAuth } from "../contexts/GoogleAuthContext";
import authService from "../services/authService";
import "../styles/AuthModal.css";
import { GoogleLogin } from "@react-oauth/google";

const AuthModal = ({ onClose, initialMode = "login" }) => {
  const { theme } = useTheme();
  const { renderGoogleButton } = useGoogleAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLogin(initialMode === "login");
  }, [initialMode]);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const response = await authService.login(loginData.email, loginData.password);
      
      if (response.success) {
        // Store user data and token in localStorage
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        localStorage.setItem("isLoggedIn", "true");
        
        if (loginData.rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }
        
        onClose();
        navigate("/sorting");
      } else {
        setError(response.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    
    if (!signupData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const name = `${signupData.firstName} ${signupData.lastName}`.trim();
      const response = await authService.signup(name, signupData.email, signupData.password);
      
      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        localStorage.setItem("isLoggedIn", "true");
        
        onClose();
        navigate("/sorting");
      } else {
        setError(response.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during signup. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };



  return (
    <div className={`auth-modal-overlay ${theme === "dark" ? "dark" : "light"}`}>
      <div className="auth-modal">
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="auth-modal-header">
          <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>
          <p>
            {isLogin 
              ? "Sign in to continue your learning journey" 
              : "Join us to start your learning journey"}
          </p>
        </div>

        <div className="auth-tabs">
          <button 
            className={`tab ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={`tab ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <Mail className="input-icon" size={18} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <Lock className="input-icon" size={18} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={loginData.rememberMe}
                  onChange={handleLoginChange}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleSignupSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="input-container">
                  <User className="input-icon" size={18} />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={signupData.firstName}
                    onChange={handleSignupChange}
                    placeholder="First name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="input-container">
                  <User className="input-icon" size={18} />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={signupData.lastName}
                    onChange={handleSignupChange}
                    placeholder="Last name"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="signupEmail">Email</label>
              <div className="input-container">
                <Mail className="input-icon" size={18} />
                <input
                  id="signupEmail"
                  name="email"
                  type="email"
                  required
                  value={signupData.email}
                  onChange={handleSignupChange}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="signupPassword">Password</label>
              <div className="input-container">
                <Lock className="input-icon" size={18} />
                <input
                  id="signupPassword"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={signupData.password}
                  onChange={handleSignupChange}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-container">
                <Lock className="input-icon" size={18} />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div className="form-options">
              <div className="agree-terms">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={signupData.agreeToTerms}
                  onChange={handleSignupChange}
                />
                <label htmlFor="agreeToTerms">
                  I agree to the Terms and Privacy Policy
                </label>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        )}

        <div className="separator">
          <span>or</span>
        </div>

        <div className="google-auth-container">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log("Google login success:", credentialResponse);
              // Process Google login and redirect
              onClose();
              navigate("/sorting");
            }}
            onError={() => {
              setError("Google authentication failed");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthModal;