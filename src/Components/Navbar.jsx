import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  MdOutlineLogin,
  MdOutlineNotificationsNone,
  MdOutlineSearch,
  MdOutlineHome,
} from "react-icons/md";
import { RiRegisteredLine } from "react-icons/ri";
import Search from "./Search";
import { appContext } from "../Context/AppContext";
import Sidebar from "./Sidebar";

const Navbar = ({ isDark, handleTheme }) => {
  const { activeUser } = useContext(appContext);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos;
      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav
      className={`header d-flex align-items-center justify-content-around   py-4 shadow-lg  ${
        visible ? "header--visible" : "header--hidden"
      }
      ${!isDark ? "bg-primary " : "bg-dark bg-opacity-75"}`}
    >
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-light nav-link" : "text-decoration-none text-light"
        }
        onClick={scrollTop}
      >
        <h3 className="d-flex align-items-center">
          <MdOutlineHome />
          <span className="d-none d-lg-flex mx-1">Timeline</span>
        </h3>
      </NavLink>

      {!activeUser ? (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-light nav-link"
                : "text-decoration-none text-light"
            }
          >
            <h3 className="d-flex align-items-center">
              <MdOutlineLogin />{" "}
              <span className="d-none d-lg-flex mx-1">Login</span>
            </h3>
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "text-light nav-link"
                : "text-decoration-none text-light"
            }
          >
            <h3 className="d-flex align-items-center">
              <RiRegisteredLine />{" "}
              <span className="d-none d-lg-flex mx-1">Register</span>
            </h3>
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-light nav-link"
                : "text-decoration-none text-light"
            }
            to="/user/notifications"
          >
            <h3 className="d-flex align-items-center ">
              <MdOutlineNotificationsNone />
              <span className="d-none d-lg-flex mx-1">Notifications</span>
            </h3>
          </NavLink>

          <div className="d-none d-md-block">
            <Search isDark={isDark} />
          </div>
          <div className="d-block d-md-none">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-light nav-link"
                  : "text-decoration-none text-light"
              }
              to="/search"
            >
              <h3 className="d-flex align-items-center ">
                <MdOutlineSearch />
                <span className="d-none d-lg-flex mx-1">Search</span>
              </h3>
            </NavLink>
          </div>
          <div></div>
        </>
      )}
      <NavLink className="text-decoration-none text-light">
        <h3 className="d-flex align-items-center ">
          <Sidebar isDark={isDark} handleTheme={handleTheme} />
        </h3>
      </NavLink>
    </nav>
  );
};

export default Navbar;
