import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import Friends from "./Components/Friends";
import AppContext, { appContext } from "./Context/AppContext";
import Profile from "./Components/Profile";
import SavedPosts from "./Components/SavedPosts";
import ProtectedRoute from "./Components/ProtectedRoute";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddPost from "./Components/AddPost";
import Notifications from "./Components/Notifications";
import Search from "./Components/Search";
import Loading from "./Components/Loading";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const handleTheme = () => {
    setIsDark(!isDark);
  };
  useEffect(() => {
    // Simulate a delay to show the placeholder
    setTimeout(() => setIsLoading(false), 3500);
  }, []);
  return (
    <div
      className={` ${
        isDark ? "bg-dark text-light" : "bg-light text-dark"
      } min-vh-100`}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <AppContext>
          <Router>
            <Navbar isDark={isDark} handleTheme={handleTheme} />

            <Routes>
              <Route
                path="/"
                element={<Home isDark={isDark} handleTheme={handleTheme} />}
              />
              <Route path="/login" element={<Login isDark={isDark} />} />
              <Route path="/register" element={<Register isDark={isDark} />} />
              <Route
                path="/profile/:id"
                element={<Profile isDark={isDark} />}
              />
              <Route
                path="/:profile/newpost"
                element={<AddPost isDark={isDark} textProp />}
              />
              <Route
                path="/:profile/friends"
                element={<ProtectedRoute component={Friends} />}
              />
              <Route
                path="/:profile/saved"
                element={<SavedPosts isDark={isDark} />}
              />
              <Route
                path="/:user/notifications"
                element={<ProtectedRoute component={Notifications} />}
              />
              <Route path="/search" element={<Search isDark={isDark} />} />
            </Routes>
          </Router>
        </AppContext>
      )}
    </div>
  );
};
export default App;
