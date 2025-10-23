import React, { useState } from "react";
import "../../../styles/fundamentals.css";

const MERNFundamentals = () => {
  const [activeTab, setActiveTab] = useState("intro");
  const [copiedCode, setCopiedCode] = useState("");

  const copyCode = async (code, identifier) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(identifier);
      setTimeout(() => setCopiedCode(""), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div
      className="notes-page"
      style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}
    >
      {/* Header */}
      <header
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          padding: "2rem 0",
          background: "linear-gradient(135deg, #10b981, #059669)",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: 800 }}>
          MERN Stack Fundamentals
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "700px",
            margin: "0 auto",
            opacity: 0.9,
            color: window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "#ffffff"
              : "#1a1a1a",
          }}
        >
          Complete guide to MongoDB, Express.js, React.js, and Node.js with
          modern development practices.
        </p>
      </header>

      {/* Navigation */}
      <nav
        style={{
          position: "sticky",
          top: "2rem",
          background: "var(--card-bg, #ffffff)",
          borderRadius: "12px",
          padding: "1.5rem",
          boxShadow: "0 6px 18px rgba(16,24,40,0.04)",
          marginBottom: "2rem",
          zIndex: 100,
        }}
      >
        <h3 style={{ marginTop: 0, color: "#0f172a" }}>
          <i
            className="fas fa-bookmark"
            style={{ marginRight: "0.5rem", color: "#10b981" }}
          ></i>
          Contents
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {[
            { id: "intro", label: "Introduction & Setup" },
            { id: "mongodb", label: "MongoDB & Mongoose" },
            { id: "express", label: "Express.js" },
            { id: "react", label: "React.js" },
            { id: "nodejs", label: "Node.js" },
            { id: "api", label: "RESTful APIs" },
            { id: "crud", label: "CRUD Operations" },
            { id: "authentication", label: "Authentication" },
            { id: "deployment", label: "Deployment" },
            { id: "bestpractices", label: "Best Practices" },
            { id: "fullstack", label: "Full Stack Example" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: activeTab === item.id ? "#10b981" : "transparent",
                color: activeTab === item.id ? "white" : "#10b981",
                border: "2px solid #10b981",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "0.9rem",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Introduction & Setup */}
      {activeTab === "intro" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2>
              <i className="fas fa-play-circle"></i> 1. Introduction & Setup
            </h2>
            <p>
              The MERN stack is a popular JavaScript stack for building modern
              web applications, consisting of MongoDB, Express.js, React.js, and
              Node.js.
            </p>

            <h3>Stack Components</h3>
            <ul>
              <li>
                <strong>MongoDB:</strong> NoSQL database for data storage
              </li>
              <li>
                <strong>Express.js:</strong> Web application framework for
                Node.js
              </li>
              <li>
                <strong>React.js:</strong> Frontend library for building user
                interfaces
              </li>
              <li>
                <strong>Node.js:</strong> JavaScript runtime environment
              </li>
            </ul>

            <h3>Project Setup</h3>
            <div className="code-container">
              <button
                className={`copy-btn ${copiedCode === "setup" ? "copied" : ""}`}
                onClick={() =>
                  copyCode(
                    `# Create project directory
mkdir mern-app
cd mern-app

# Initialize backend
mkdir backend
cd backend
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install -D nodemon

# Initialize frontend
cd ..
npx create-react-app frontend
cd frontend
npm install axios react-router-dom`,
                    "setup"
                  )
                }
              >
                {copiedCode === "setup" ? "Copied!" : "Copy"}
              </button>
              <pre>{`# Create project directory
mkdir mern-app
cd mern-app

# Initialize backend
mkdir backend
cd backend
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install -D nodemon

# Initialize frontend
cd ..
npx create-react-app frontend
cd frontend
npm install axios react-router-dom`}</pre>
            </div>

            <div
              style={{
                background: "var(--card-bg, #ffffff)",
                borderLeft: "4px solid #f59e0b",
                padding: "1rem 1.5rem",
                margin: "1.5rem 0",
                borderRadius: "0 12px 12px 0",
              }}
            >
              <strong>Note:</strong> Ensure you have Node.js (v14 or higher) and
              MongoDB installed on your system before starting.
            </div>
          </div>
        </section>
      )}

      {/* MongoDB & Mongoose */}
      {activeTab === "mongodb" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2>
              <i className="fas fa-database"></i> 2. MongoDB & Mongoose
            </h2>

            <h3>MongoDB Basics</h3>
            <ul>
              <li>Document-based NoSQL database</li>
              <li>Collections instead of tables</li>
              <li>Documents instead of rows</li>
              <li>JSON-like format (BSON)</li>
            </ul>

            <h3>Mongoose Schema and Model</h3>
            <div className="code-container">
              <button
                className={`copy-btn ${
                  copiedCode === "mongoose" ? "copied" : ""
                }`}
                onClick={() =>
                  copyCode(
                    `const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for user's full profile
userSchema.virtual('profile').get(function() {
  return {
    name: this.name,
    email: this.email,
    role: this.role
  };
});

// Instance method
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Static method
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

module.exports = mongoose.model('User', userSchema);`,
                    "mongoose"
                  )
                }
              >
                {copiedCode === "mongoose" ? "Copied!" : "Copy"}
              </button>
              <pre>{`const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for user's full profile
userSchema.virtual('profile').get(function() {
  return {
    name: this.name,
    email: this.email,
    role: this.role
  };
});

// Instance method
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Static method
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

module.exports = mongoose.model('User', userSchema);`}</pre>
            </div>

            <h3>Database Connection</h3>
            <div className="code-container">
              <button
                className={`copy-btn ${
                  copiedCode === "dbconnection" ? "copied" : ""
                }`}
                onClick={() =>
                  copyCode(
                    `const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mernapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

module.exports = connectDB;`,
                    "dbconnection"
                  )
                }
              >
                {copiedCode === "dbconnection" ? "Copied!" : "Copy"}
              </button>
              <pre>{`const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mernapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

module.exports = connectDB;`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Express.js */}
      {activeTab === "express" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2>
              <i className="fas fa-server"></i> 3. Express.js
            </h2>

            <h3>Basic Express Server</h3>
            <div className="code-container">
              <button
                className={`copy-btn ${
                  copiedCode === "expressserver" ? "copied" : ""
                }`}
                onClick={() =>
                  copyCode(
                    `const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`Server running in \${process.env.NODE_ENV} mode on port \${PORT}\`);
});`,
                    "expressserver"
                  )
                }
              >
                {copiedCode === "expressserver" ? "Copied!" : "Copy"}
              </button>
              <pre>{`const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`Server running in \${process.env.NODE_ENV} mode on port \${PORT}\`);
});`}</pre>
            </div>

            <h3>Custom Middleware</h3>
            <div className="code-container">
              <button
                className={`copy-btn ${
                  copiedCode === "middleware" ? "copied" : ""
                }`}
                onClick={() =>
                  copyCode(
                    `// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided, authorization denied'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

// Admin middleware
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin rights required.'
    });
  }
};

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  });
};

module.exports = { authMiddleware, adminMiddleware, errorHandler };`,
                    "middleware"
                  )
                }
              >
                {copiedCode === "middleware" ? "Copied!" : "Copy"}
              </button>
              <pre>{`// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided, authorization denied'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Token is not valid'
    });
  }
};

// Admin middleware
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied. Admin rights required.'
    });
  }
};

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  });
};

module.exports = { authMiddleware, adminMiddleware, errorHandler };`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* React.js */}
      {activeTab === "react" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2>
              <i className="fab fa-react"></i> 4. React.js
            </h2>

            <h3>Functional Components with Hooks</h3>
            <div className="code-container">
              <button
                className={`copy-btn ${
                  copiedCode === "reacthooks" ? "copied" : ""
                }`}
                onClick={() =>
                  copyCode(
                    `import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useContext(UserContext);

  // Memoized API call
  const fetchUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users/profile', {
        headers: {
          Authorization: \`Bearer \${localStorage.getItem('token')}\`
        }
      });
      setUser(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUserProfile();
    }
  }, [currentUser, fetchUserProfile]);

  // Memoized full name
  const fullName = useMemo(() => {
    return user ? \`\${user.firstName} \${user.lastName}\` : '';
  }, [user]);

  const handleUpdateProfile = async (formData) => {
    try {
      const response = await axios.put('/api/users/profile', formData, {
        headers: {
          Authorization: \`Bearer \${localStorage.getItem('token')}\`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setUser(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {user && (
        <div className="profile-card">
          <img src={user.avatar} alt={fullName} />
          <h3>{fullName}</h3>
          <p>{user.email}</p>
          <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;`,
                    "reacthooks"
                  )
                }
              >
                {copiedCode === "reacthooks" ? "Copied!" : "Copy"}
              </button>
              <pre>{`import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useContext(UserContext);

  // Memoized API call
  const fetchUserProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/users/profile', {
        headers: {
          Authorization: \`Bearer \${localStorage.getItem('token')}\`
        }
      });
      setUser(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUserProfile();
    }
  }, [currentUser, fetchUserProfile]);

  // Memoized full name
  const fullName = useMemo(() => {
    return user ? \`\${user.firstName} \${user.lastName}\` : '';
  }, [user]);

  const handleUpdateProfile = async (formData) => {
    try {
      const response = await axios.put('/api/users/profile', formData, {
        headers: {
          Authorization: \`Bearer \${localStorage.getItem('token')}\`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setUser(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {user && (
        <div className="profile-card">
          <img src={user.avatar} alt={fullName} />
          <h3>{fullName}</h3>
          <p>{user.email}</p>
          <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;`}</pre>
            </div>

            <h3>Context API for State Management</h3>
            <div className="code-container">
              <button
                className={`copy-btn ${
                  copiedCode === "context" ? "copied" : ""
                }`}
                onClick={() =>
                  copyCode(
                    `import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null
};

// Action types
const ACTION_TYPES = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case ACTION_TYPES.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    
    case ACTION_TYPES.LOGIN_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
        error: action.payload
      };
    
    case ACTION_TYPES.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        error: null
      };
    
    case ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email, password) => {
    dispatch({ type: ACTION_TYPES.LOGIN_START });
    
    try {
      // API call would go here
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        dispatch({
          type: ACTION_TYPES.LOGIN_SUCCESS,
          payload: {
            user: data.user,
            token: data.token
          }
        });
      } else {
        dispatch({
          type: ACTION_TYPES.LOGIN_FAILURE,
          payload: data.message
        });
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.LOGIN_FAILURE,
        payload: 'Login failed. Please try again.'
      });
    }
  };

  const logout = () => {
    dispatch({ type: ACTION_TYPES.LOGOUT });
  };

  const clearError = () => {
    dispatch({ type: ACTION_TYPES.CLEAR_ERROR });
  };

  const value = {
    user: state.user,
    token: state.token,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};`,
                    "context"
                  )
                }
              >
                {copiedCode === "context" ? "Copied!" : "Copy"}
              </button>
              <pre>{`import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null
};

// Action types
const ACTION_TYPES = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case ACTION_TYPES.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      };
    
    case ACTION_TYPES.LOGIN_FAILURE:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        user: null,
        token: null,
        error: action.payload
      };
    
    case ACTION_TYPES.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        error: null
      };
    
    case ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email, password) => {
    dispatch({ type: ACTION_TYPES.LOGIN_START });
    
    try {
      // API call would go here
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        dispatch({
          type: ACTION_TYPES.LOGIN_SUCCESS,
          payload: {
            user: data.user,
            token: data.token
          }
        });
      } else {
        dispatch({
          type: ACTION_TYPES.LOGIN_FAILURE,
          payload: data.message
        });
      }
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.LOGIN_FAILURE,
        payload: 'Login failed. Please try again.'
      });
    }
  };

  const logout = () => {
    dispatch({ type: ACTION_TYPES.LOGOUT });
  };

  const clearError = () => {
    dispatch({ type: ACTION_TYPES.CLEAR_ERROR });
  };

  const value = {
    user: state.user,
    token: state.token,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Node.js */}
      {activeTab === "nodejs" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2>
              <i className="fab fa-node-js"></i> 5. Node.js
            </h2>

            <h3>Environment Configuration</h3>
            <div className="code-container">
              <button
                className={`copy-btn ${copiedCode === "env" ? "copied" : ""}`}
                onClick={() =>
                  copyCode(
                    `// .env file
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mernapp
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

// config.js
const dotenv = require('dotenv');

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mernapp',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE || '30d',
    cookieExpire: process.env.JWT_COOKIE_EXPIRE || 30
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI'];
requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(\`Missing required environment variable: \${envVar}\`);
    process.exit(1);
  }
});

module.exports = config;`,
                    "env"
                  )
                }
              >
                {copiedCode === "env" ? "Copied!" : "Copy"}
              </button>
              <pre>{`// .env file
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mernapp
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

// config.js
const dotenv = require('dotenv');

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mernapp',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE || '30d',
    cookieExpire: process.env.JWT_COOKIE_EXPIRE || 30
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  },
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET', 'MONGODB_URI'];
requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(\`Missing required environment variable: \${envVar}\`);
    process.exit(1);
  }
});

module.exports = config;`}</pre>
            </div>

            <h3>Utility Functions</h3>
            <div className="code-container">
              <button
                className={`copy-btn ${copiedCode === "utils" ? "copied" : ""}`}
                onClick={() =>
                  copyCode(
                    `// utils/jwtGenerator.js
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expire,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.jwt.secret);
};

const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken
};

// utils/responseHandler.js
const successResponse = (res, message, data = null, statusCode = 200) => {
  const response = {
    success: true,
    message,
  };

  if (data) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

const errorResponse = (res, message, statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

const validationError = (res, errors) => {
  return errorResponse(
    res,
    'Validation failed',
    400,
    errors
  );
};

module.exports = {
  successResponse,
  errorResponse,
  validationError
};

// utils/asyncHandler.js
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;

// utils/fileUpload.js
const cloudinary = require('cloudinary').v2;
const config = require('../config');

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const uploadToCloudinary = async (file, folder = 'mern-app') => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: 'auto',
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error('File upload failed');
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error('File deletion failed');
  }
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary
};`,
                    "utils"
                  )
                }
              >
                {copiedCode === "utils" ? "Copied!" : "Copy"}
              </button>
              <pre>{`// utils/jwtGenerator.js
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expire,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.jwt.secret);
};

const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken
};

// utils/responseHandler.js
const successResponse = (res, message, data = null, statusCode = 200) => {
  const response = {
    success: true,
    message,
  };

  if (data) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

const errorResponse = (res, message, statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

const validationError = (res, errors) => {
  return errorResponse(
    res,
    'Validation failed',
    400,
    errors
  );
};

module.exports = {
  successResponse,
  errorResponse,
  validationError
};

// utils/asyncHandler.js
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;

// utils/fileUpload.js
const cloudinary = require('cloudinary').v2;
const config = require('../config');

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

const uploadToCloudinary = async (file, folder = 'mern-app') => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: 'auto',
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error('File upload failed');
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error('File deletion failed');
  }
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary
};`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* RESTful APIs */}
      {activeTab === "api" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2>
              <i className="fas fa-code"></i> 6. RESTful APIs
            </h2>

            <h3>User Routes</h3>
            <div className="code-container">
              <button
                className={`copy-btn ${
                  copiedCode === "userroutes" ? "copied" : ""
                }`}
                onClick={() =>
                  copyCode(
                    `const express = require('express');
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (require authentication)
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.delete('/profile', authMiddleware, deleteProfile);

// Admin only routes
router.get('/', authMiddleware, adminMiddleware, getAllUsers);
router.get('/:id', authMiddleware, adminMiddleware, getUserById);
router.put('/:id', authMiddleware, adminMiddleware, updateUser);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

module.exports = router;

// Auth Routes
const express = require('express');
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  refreshToken
} = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);
router.post('/refresh-token', refreshToken);

module.exports = router;`,
                    "userroutes"
                  )
                }
              >
                {copiedCode === "userroutes" ? "Copied!" : "Copy"}
              </button>
              <pre>{`const express = require('express');
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (require authentication)
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.delete('/profile', authMiddleware, deleteProfile);

// Admin only routes
router.get('/', authMiddleware, adminMiddleware, getAllUsers);
router.get('/:id', authMiddleware, adminMiddleware, getUserById);
router.put('/:id', authMiddleware, adminMiddleware, updateUser);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

module.exports = router;

// Auth Routes
const express = require('express');
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  refreshToken
} = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);
router.post('/refresh-token', refreshToken);

module.exports = router;`}</pre>
            </div>

            <h3>Controller Structure</h3>
            <div className="code-container">
              <button
                className={`copy-btn ${
                  copiedCode === "controller" ? "copied" : ""
                }`}
                onClick={() =>
                  copyCode(
                    `const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');
const { generateToken } = require('../utils/jwtGenerator');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return errorResponse(res, 'User already exists with this email', 400);
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password
  });

  // Generate token
  const token = generateToken({ id: user._id });

  // Send response
  successResponse(res, 'User registered successfully', {
    user: user.getPublicProfile(),
    token
  }, 201);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return errorResponse(res, 'Please provide email and password', 400);
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return errorResponse(res, 'Invalid credentials', 401);
  }

  // Check if password matches
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return errorResponse(res, 'Invalid credentials', 401);
  }

  // Generate token
  const token = generateToken({ id: user._id });

  successResponse(res, 'Login successful', {
    user: user.getPublicProfile(),
    token
  });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  successResponse(res, 'Profile retrieved successfully', {
    user: user.getPublicProfile()
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(key => {
    if (fieldsToUpdate[key] === undefined) {
      delete fieldsToUpdate[key];
    }
  });

  const user = await User.findByIdAndUpdate(
    req.user.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true
    }
  );

  successResponse(res, 'Profile updated successfully', {
    user: user.getPublicProfile()
  });
});

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile
};`,
                    "controller"
                  )
                }
              >
                {copiedCode === "controller" ? "Copied!" : "Copy"}
              </button>
              <pre>{`const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');
const { generateToken } = require('../utils/jwtGenerator');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return errorResponse(res, 'User already exists with this email', 400);
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password
  });

  // Generate token
  const token = generateToken({ id: user._id });

  // Send response
  successResponse(res, 'User registered successfully', {
    user: user.getPublicProfile(),
    token
  }, 201);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return errorResponse(res, 'Please provide email and password', 400);
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return errorResponse(res, 'Invalid credentials', 401);
  }

  // Check if password matches
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return errorResponse(res, 'Invalid credentials', 401);
  }

  // Generate token
  const token = generateToken({ id: user._id });

  successResponse(res, 'Login successful', {
    user: user.getPublicProfile(),
    token
  });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  successResponse(res, 'Profile retrieved successfully', {
    user: user.getPublicProfile()
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(key => {
    if (fieldsToUpdate[key] === undefined) {
      delete fieldsToUpdate[key];
    }
  });

  const user = await User.findByIdAndUpdate(
    req.user.id,
    fieldsToUpdate,
    {
      new: true,
      runValidators: true
    }
  );

  successResponse(res, 'Profile updated successfully', {
    user: user.getPublicProfile()
  });
});

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile
};`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* CRUD Operations */}
      {activeTab === "crud" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2>
              <i className="fas fa-tasks"></i> 7. CRUD Operations
            </h2>

            <h3>Complete CRUD Controller</h3>
            <div className="code-container">
              <button
                className={`copy-btn ${
                  copiedCode === "crudcontroller" ? "copied" : ""
                }`}
                onClick={() =>
                  copyCode(
                    `const Post = require('../models/Post');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  // Filtering
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(field => delete queryObj[field]);

  // Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\\b(gte|gt|lte|lt)\\b/g, match => \`$\${match}\`);
  
  let query = Post.find(JSON.parse(queryStr)).populate('user', 'name email');

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Post.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Execute query
  const posts = await query;

  // Pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  successResponse(res, 'Posts retrieved successfully', {
    count: posts.length,
    pagination,
    posts
  });
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('user', 'name email');
  
  if (!post) {
    return errorResponse(res, 'Post not found', 404);
  }

  successResponse(res, 'Post retrieved successfully', { post });
});

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const post = await Post.create(req.body);
  
  // Populate user data
  await post.populate('user', 'name email');

  successResponse(res, 'Post created successfully', { post }, 201);
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return errorResponse(res, 'Post not found', 404);
  }

  // Check if user owns the post or is admin
  if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return errorResponse(res, 'Not authorized to update this post', 403);
  }

  post = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).populate('user', 'name email');

  successResponse(res, 'Post updated successfully', { post });
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return errorResponse(res, 'Post not found', 404);
  }

  // Check if user owns the post or is admin
  if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return errorResponse(res, 'Not authorized to delete this post', 403);
  }

  await Post.findByIdAndDelete(req.params.id);

  successResponse(res, 'Post deleted successfully');
});

// @desc    Get user's posts
// @route   GET /api/posts/user/my-posts
// @access  Private
const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id })
    .sort('-createdAt')
    .populate('user', 'name email');

  successResponse(res, 'User posts retrieved successfully', {
    count: posts.length,
    posts
  });
});

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getUserPosts
};`,
                    "crudcontroller"
                  )
                }
              >
                {copiedCode === "crudcontroller" ? "Copied!" : "Copy"}
              </button>
              <pre>{`const Post = require('../models/Post');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  // Filtering
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(field => delete queryObj[field]);

  // Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\\b(gte|gt|lte|lt)\\b/g, match => \`$\${match}\`);
  
  let query = Post.find(JSON.parse(queryStr)).populate('user', 'name email');

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Post.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Execute query
  const posts = await query;

  // Pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  successResponse(res, 'Posts retrieved successfully', {
    count: posts.length,
    pagination,
    posts
  });
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('user', 'name email');
  
  if (!post) {
    return errorResponse(res, 'Post not found', 404);
  }

  successResponse(res, 'Post retrieved successfully', { post });
});

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  // Add user to req.body
  req.body.user = req.user.id;

  const post = await Post.create(req.body);
  
  // Populate user data
  await post.populate('user', 'name email');

  successResponse(res, 'Post created successfully', { post }, 201);
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return errorResponse(res, 'Post not found', 404);
  }

  // Check if user owns the post or is admin
  if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return errorResponse(res, 'Not authorized to update this post', 403);
  }

  post = await Post.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).populate('user', 'name email');

  successResponse(res, 'Post updated successfully', { post });
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return errorResponse(res, 'Post not found', 404);
  }

  // Check if user owns the post or is admin
  if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return errorResponse(res, 'Not authorized to delete this post', 403);
  }

  await Post.findByIdAndDelete(req.params.id);

  successResponse(res, 'Post deleted successfully');
});

// @desc    Get user's posts
// @route   GET /api/posts/user/my-posts
// @access  Private
const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id })
    .sort('-createdAt')
    .populate('user', 'name email');

  successResponse(res, 'User posts retrieved successfully', {
    count: posts.length,
    posts
  });
});

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getUserPosts
};`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Authentication */}
      {activeTab === "authentication" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2>
              <i className="fas fa-lock"></i> 8. Authentication & Authorization
            </h2>

            <h3>Enhanced User Model with Authentication</h3>
            <div className="code-container">
              <button
                className={`copy-btn ${
                  copiedCode === "authmodel" ? "copied" : ""
                }`}
                onClick={() =>
                  copyCode(
                    `const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'publisher', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for isLocked
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  // Only run if password was modified
  if (!this.isModified('password')) {
    next();
  }

  // Check if account is locked
  if (this.isLocked) {
    next(new Error('Account is temporarily locked due to too many login attempts'));
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Generate JWT token
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id },
    config.jwt.secret,
    { expiresIn: config.jwt.expire }
  );
};

// Generate email verification token
userSchema.methods.generateVerificationToken = function() {
  const verificationToken = crypto.randomBytes(20).toString('hex');
  
  this.verificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  return verificationToken;
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Increment login attempts
userSchema.methods.incrementLoginAttempts = async function() {
  // If previous lock has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    });
  }

  // Otherwise increment
  const updates = { $inc: { loginAttempts: 1 } };

  // Lock the account if we've reached max attempts and it's not locked already
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }

  return this.updateOne(updates);
};

// Reset login attempts on successful login
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $set: { loginAttempts: 0 },
    $unset: { lockUntil: 1 }
  });
};

// Cascade delete posts when user is deleted
userSchema.pre('remove', async function(next) {
  await this.model('Post').deleteMany({ user: this._id });
  next();
});

// Reverse populate with virtuals
userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user',
  justOne: false
});

module.exports = mongoose.model('User', userSchema);`,
                    "authmodel"
                  )
                }
              >
                {copiedCode === "authmodel" ? "Copied!" : "Copy"}
              </button>
              <pre>{`const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*(\\.\\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'publisher', 'admin'],
    default: 'user'
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for isLocked
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  // Only run if password was modified
  if (!this.isModified('password')) {
    next();
  }

  // Check if account is locked
  if (this.isLocked) {
    next(new Error('Account is temporarily locked due to too many login attempts'));
  }

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Generate JWT token
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id },
    config.jwt.secret,
    { expiresIn: config.jwt.expire }
  );
};

// Generate email verification token
userSchema.methods.generateVerificationToken = function() {
  const verificationToken = crypto.randomBytes(20).toString('hex');
  
  this.verificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  return verificationToken;
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');

  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Increment login attempts
userSchema.methods.incrementLoginAttempts = async function() {
  // If previous lock has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    });
  }

  // Otherwise increment
  const updates = { $inc: { loginAttempts: 1 } };

  // Lock the account if we've reached max attempts and it's not locked already
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }

  return this.updateOne(updates);
};

// Reset login attempts on successful login
userSchema.methods.resetLoginAttempts = function() {
  return this.updateOne({
    $set: { loginAttempts: 0 },
    $unset: { lockUntil: 1 }
  });
};

// Cascade delete posts when user is deleted
userSchema.pre('remove', async function(next) {
  await this.model('Post').deleteMany({ user: this._id });
  next();
});

// Reverse populate with virtuals
userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user',
  justOne: false
});

module.exports = mongoose.model('User', userSchema);`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Deployment */}
      {activeTab === "deployment" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2>
              <i className="fas fa-rocket"></i> 9. Deployment
            </h2>

            <h3>Production Configuration</h3>
            <div className="code-container">
              <button
                className={`copy-btn ${
                  copiedCode === "deployment" ? "copied" : ""
                }`}
                onClick={() =>
                  copyCode(
                    `// package.json (Backend)
{
  "name": "mern-backend",
  "version": "1.0.0",
  "description": "MERN Stack Backend",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "build": "npm install",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install"
  },
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "cloudinary": "^1.32.0",
    "multer": "^1.4.5",
    "nodemailer": "^6.9.1",
    "helmet": "^6.1.5",
    "express-rate-limit": "^6.7.0",
    "express-mongo-sanitize": "^2.2.0",
    "xss-clean": "^0.1.4",
    "hpp": "^0.2.3",
    "compression": "^1.7.4"
  },
  "devDependencies": {
    "nodemon": "^2.0.22",
    "jest": "^29.5.0"
  }
}

// server.js (Production ready)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/database');

// Connect to database
connectDB();

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api', limiter);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Compression middleware
app.use(compression());

// CORS middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

// Error handling middleware
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(\`Server running in \${process.env.NODE_ENV} mode on port \${PORT}\`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', err);
  server.close(() => {
    process.exit(1);
  });
});

// package.json (Frontend)
{
  "name": "mern-frontend",
  "version": "1.0.0",
  "description": "MERN Stack Frontend",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "proxy": "http://localhost:5000",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "axios": "^1.3.0",
    "react-router-dom": "^6.8.0"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`,
                    "deployment"
                  )
                }
              >
                {copiedCode === "deployment" ? "Copied!" : "Copy"}
              </button>
              <pre>{`// package.json (Backend)
{
  "name": "mern-backend",
  "version": "1.0.0",
  "description": "MERN Stack Backend",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "build": "npm install",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install"
  },
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "cloudinary": "^1.32.0",
    "multer": "^1.4.5",
    "nodemailer": "^6.9.1",
    "helmet": "^6.1.5",
    "express-rate-limit": "^6.7.0",
    "express-mongo-sanitize": "^2.2.0",
    "xss-clean": "^0.1.4",
    "hpp": "^0.2.3",
    "compression": "^1.7.4"
  },
  "devDependencies": {
    "nodemon": "^2.0.22",
    "jest": "^29.5.0"
  }
}

// server.js (Production ready)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/database');

// Connect to database
connectDB();

const app = express();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api', limiter);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

// Compression middleware
app.use(compression());

// CORS middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

// Error handling middleware
app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(\`Server running in \${process.env.NODE_ENV} mode on port \${PORT}\`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', err);
  server.close(() => {
    process.exit(1);
  });
});

// package.json (Frontend)
{
  "name": "mern-frontend",
  "version": "1.0.0",
  "description": "MERN Stack Frontend",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "proxy": "http://localhost:5000",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "axios": "^1.3.0",
    "react-router-dom": "^6.8.0"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Best Practices */}
      {activeTab === "bestpractices" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2>
              <i className="fas fa-star"></i> 10. Best Practices
            </h2>

            <h3>Backend Best Practices</h3>
            <ul>
              <li>
                <strong>Environment Variables:</strong> Never commit sensitive
                data to version control
              </li>
              <li>
                <strong>Input Validation:</strong> Validate all incoming data
                using Joi or express-validator
              </li>
              <li>
                <strong>Error Handling:</strong> Implement centralized error
                handling middleware
              </li>
              <li>
                <strong>Security:</strong> Use helmet, rate limiting, CORS, and
                data sanitization
              </li>
              <li>
                <strong>Code Structure:</strong> Follow MVC pattern with proper
                separation of concerns
              </li>
              <li>
                <strong>Database:</strong> Use indexes, proper schemas, and
                connection pooling
              </li>
            </ul>

            <h3>Frontend Best Practices</h3>
            <ul>
              <li>
                <strong>Component Structure:</strong> Create reusable,
                single-responsibility components
              </li>
              <li>
                <strong>State Management:</strong> Use Context API or Redux for
                global state
              </li>
              <li>
                <strong>Performance:</strong> Implement code splitting, lazy
                loading, and memoization
              </li>
              <li>
                <strong>Error Boundaries:</strong> Catch JavaScript errors in
                component tree
              </li>
              <li>
                <strong>API Calls:</strong> Use axios interceptors for
                authentication and error handling
              </li>
              <li>
                <strong>Responsive Design:</strong> Ensure mobile-first
                responsive design
              </li>
            </ul>

            <h3>Project Structure</h3>
            <div className="code-container">
              <button
                className={`copy-btn ${
                  copiedCode === "structure" ? "copied" : ""
                }`}
                onClick={() =>
                  copyCode(
                    `mern-app/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── postController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── posts.js
│   ├── utils/
│   │   ├── responseHandler.js
│   │   ├── asyncHandler.js
│   │   └── jwtGenerator.js
│   ├── uploads/
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.js
│   │   │   │   ├── Footer.js
│   │   │   │   └── LoadingSpinner.js
│   │   │   ├── auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   └── posts/
│   │   │       ├── PostList.js
│   │   │       ├── PostItem.js
│   │   │       └── PostForm.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── AppContext.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useApi.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Dashboard.js
│   │   │   └── Profile.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── authService.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   └── components.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md`,
                    "structure"
                  )
                }
              >
                {copiedCode === "structure" ? "Copied!" : "Copy"}
              </button>
              <pre>{`mern-app/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── postController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── posts.js
│   ├── utils/
│   │   ├── responseHandler.js
│   │   ├── asyncHandler.js
│   │   └── jwtGenerator.js
│   ├── uploads/
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.js
│   │   │   │   ├── Footer.js
│   │   │   │   └── LoadingSpinner.js
│   │   │   ├── auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   └── posts/
│   │   │       ├── PostList.js
│   │   │       ├── PostItem.js
│   │   │       └── PostForm.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── AppContext.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useApi.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Dashboard.js
│   │   │   └── Profile.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── authService.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── helpers.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   └── components.css
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
└── README.md`}</pre>
            </div>
          </div>
        </section>
      )}

      {/* Full Stack Example */}
      {activeTab === "fullstack" && (
        <section style={{ marginBottom: "2rem" }}>
          <div className="card">
            <h2>
              <i className="fas fa-terminal"></i> Full Stack Example
            </h2>

            <h3>Complete Blog Application</h3>
            <div className="code-container">
              <button
                className={`copy-btn ${
                  copiedCode === "fullstack" ? "copied" : ""
                }`}
                onClick={() =>
                  copyCode(
                    `// Backend: server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/database');
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running smoothly',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

// Frontend: App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import PrivateRoute from './components/common/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

// Frontend: AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await authService.getProfile();
        setUser(userData);
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError('');
      const { user: userData, token } = await authService.login(email, password);
      localStorage.setItem('token', token);
      setUser(userData);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      setError('');
      const { user: newUser, token } = await authService.register(userData);
      localStorage.setItem('token', token);
      setUser(newUser);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Frontend: api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;`,
                    "fullstack"
                  )
                }
              >
                {copiedCode === "fullstack" ? "Copied!" : "Copy"}
              </button>
              <pre>{`// Backend: server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/database');
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running smoothly',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

// Frontend: App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import PrivateRoute from './components/common/PrivateRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

// Frontend: AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await authService.getProfile();
        setUser(userData);
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError('');
      const { user: userData, token } = await authService.login(email, password);
      localStorage.setItem('token', token);
      setUser(userData);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      setError('');
      const { user: newUser, token } = await authService.register(userData);
      localStorage.setItem('token', token);
      setUser(newUser);
      return { success: true };
    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Frontend: api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;`}</pre>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MERNFundamentals;
