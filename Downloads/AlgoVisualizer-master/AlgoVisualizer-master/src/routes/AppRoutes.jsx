// src/routes/AppRoutes.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import Sorting from "../pages/Sorting.jsx";
import Searching from "../pages/Searching.jsx";
import TreePage from "../pages/TreePage.jsx";
import LinkedListPage from "../pages/LinkedListPage.jsx";
import SortingDoc from "../pages/SortingDoc.jsx";
import Quiz from "../pages/Quiz.jsx";
import Contact from "../pages/contact.jsx";
import Privacy from "../pages/privacy.jsx";
import Terms from "../pages/terms.jsx";
import About from "../pages/about.jsx";
import Settings from "../components/Settings.jsx";
// Add other pages as needed

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/sorting" element={<Sorting />} />
        <Route path="/sorting-doc" element={<SortingDoc />} />
        <Route path="/searching" element={<Searching />} />
        <Route path="/tree" element={<TreePage />} />
        <Route path="/linkedlist" element={<LinkedListPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />

        {/* Add more routes for other pages/components */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
