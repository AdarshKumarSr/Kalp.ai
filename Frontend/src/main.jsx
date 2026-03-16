import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./auth/AuthContext";
import { LoaderProvider } from "./context/LoaderContext";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ ADD

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoaderProvider>
      <AuthProvider>
        <ThemeProvider> {/* ✅ HERE */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </LoaderProvider>
  </StrictMode>
);
