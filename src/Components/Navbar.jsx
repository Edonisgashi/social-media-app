import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CiDark } from "react-icons/ci";
import { appContext } from "../Context/AppContext";
const Navbar = ({ isDark, handleTheme }) => {
  const { currentUser } = useContext(appContext);
  console.log(currentUser.email);
  return (
    <nav
      className={`d-flex align-items-center justify-content-evenly mb-5 py-4 shadow-lg
      ${!isDark ? "bg-primary" : "bg-dark bg-opacity-50"}`}
    >
      <Link to="/" className="text-decoration-none text-light">
        Home Page
      </Link>
      <br />
      {!currentUser ? (
        <>
          <Link to="/login" className="text-decoration-none text-light">
            Login
          </Link>
          <br />
          <Link to="/register" className="text-decoration-none text-light">
            Register
          </Link>
        </>
      ) : (
        <p>{currentUser.email}</p>
      )}
      <div className="themeBtn">
        <button onClick={handleTheme} className="btn btn-none text-light">
          {" "}
          <CiDark />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
