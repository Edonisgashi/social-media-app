import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CiDark } from "react-icons/ci";
import { MdOutlineLogout, MdOutlineLogin } from "react-icons/md";
import { RiRegisteredLine } from "react-icons/ri";
import { VscHome } from "react-icons/vsc";
import { ImProfile } from "react-icons/im";
import { appContext } from "../Context/AppContext";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Navbar = ({ isDark, handleTheme }) => {
  const { currentUser } = useContext(appContext);
  const navigate = useNavigate();
  const signOutUser = () => {
    signOut(auth)
      .then((response) => navigate("/login"))
      .catch((error) => console.log(error));
  };
  return (
    <nav
      className={`d-flex align-items-center justify-content-around mb-5 col-12 py-4 shadow-lg
      ${!isDark ? "bg-primary" : "bg-dark bg-opacity-50"}`}
    >
      <Link to="/" className="text-decoration-none text-light">
        <h3 className="d-flex align-items-center">
          <VscHome />
          <span className="d-none d-lg-flex mx-1">Home Page</span>{" "}
        </h3>
      </Link>
      <br />
      {!currentUser ? (
        <>
          <Link to="/login" className="text-decoration-none text-light">
            <h3 className="d-flex align-items-center">
              <MdOutlineLogin />{" "}
              <span className="d-none d-lg-flex mx-1">Login</span>
            </h3>
          </Link>
          <br />
          <Link to="/register" className="text-decoration-none text-light">
            <h3 className="d-flex align-items-center">
              <RiRegisteredLine />{" "}
              <span className="d-none d-lg-flex mx-1">Register</span>
            </h3>
          </Link>
        </>
      ) : (
        <>
          <Link
            to={`profile/${currentUser?.uid}`}
            className="text-decoration-none text-light"
          >
            <h3 className="d-flex align-items-center ">
              <ImProfile />{" "}
              <span className="d-none d-lg-flex mx-1">
                {currentUser?.displayName}
              </span>
            </h3>
          </Link>
          <Link
            to="/"
            className="text-decoration-none text-light"
            onClick={signOutUser}
          >
            <h3 className="d-flex align-items-center ">
              <MdOutlineLogout />{" "}
              <span className="d-none d-lg-flex mx-1">Logout</span>
            </h3>
          </Link>
        </>
      )}
      <div className="themeBtn">
        <button
          onClick={handleTheme}
          className="btn btn-none text-light"
          disabled={currentUser === null}
        >
          {" "}
          <h3>
            <CiDark />
          </h3>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
