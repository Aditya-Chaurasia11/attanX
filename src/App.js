import React, { lazy, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { themeChange } from "theme-change";
import checkAuth from "./app/auth";
import initializeApp from "./app/init";
import ClassWithID from "./pages/protected/ClassWithID";
import AttendanceWithId from "./pages/protected/AttendanceWithId";

// Importing pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const Documentation = lazy(() => import("./pages/Documentation"));

// Initializing different libraries
initializeApp();

// Check for login and initialize axios
const token = checkAuth();

function App() {
  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/documentation" element={<Documentation />} />

          {/* Place new routes over this */}

          <Route path="/app/*" element={<Layout />} />
          <Route path="/app/class/:id" element={<ClassWithID />} />
          <Route path="/app/attendance/:id" element={<AttendanceWithId />} />

          <Route
            path="*"
            element={
              <Navigate to={token ? "/app/leads" : "/login"} replace />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
