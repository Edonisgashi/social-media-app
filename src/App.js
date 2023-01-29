import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import AppContext from "./Context/AppContext";
import Profile from "./Components/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddPost from "./Components/AddPost";

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const handleTheme = () => {
    setIsDark(!isDark);
  };
  return (
    <>
      <div
        className={`${
          isDark ? "bg-dark text-light" : "bg-light text-dark"
        } min-vh-100`}
      >
        <AppContext>
          <Router>
            <Navbar isDark={isDark} handleTheme={handleTheme} />

            <Routes>
              <Route path="/" element={<Home isDark={isDark} />} />
              <Route path="/login" element={<Login isDark={isDark} />} />
              <Route path="/register" element={<Register isDark={isDark} />} />
              <Route
                path="/profile/:id"
                element={<Profile isDark={isDark} />}
              />
              <Route
                path="/newpost"
                element={<ProtectedRoute component={AddPost} />}
              />
            </Routes>
          </Router>
        </AppContext>
      </div>
    </>
  );
};
export default App;
