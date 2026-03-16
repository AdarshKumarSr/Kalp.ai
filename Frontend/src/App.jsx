import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

import { useLoader } from "./context/LoaderContext";
import TopLoader from "./components/TopLoader";
import RouteLoader from "./components/RouteLoader";

import IntroVideo from "./components/IntroVideo";
import CustomCursor from "./components/CustomCursor";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Research from "./pages/Research";
import About from "./pages/About";
import VerifyOtp from "./pages/VerifyOtp";

function AppRoutes() {
  const { loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route
        path="/research"
        element={
          <ProtectedRoute>
            <Research />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  const { loading } = useLoader();

  return (
    <>
      <CustomCursor />
      {loading && <TopLoader />}
      <RouteLoader />
      <AppRoutes />
    </>
  );
}