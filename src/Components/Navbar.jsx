import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      className={`header d-flex align-items-center justify-content-around  w-100 py-4 shadow-lg  ${
        visible ? "header--visible" : "header--hidden"
      }
      ${!isDark ? "bg-primary " : "bg-dark bg-opacity-75"}`}
      style={{
        "@media (minWidth: 576px)": {
          maxWidth: "50%",
        },
      }}
    >
      <Link
        to="/"
        className="text-decoration-none text-light"
        onClick={scrollTop}
      >
        <h3 className="d-flex align-items-center">
          <MdOutlineHome />
          <span className="d-none d-lg-flex mx-1">Timeline</span>
        </h3>
      </Link>

      {!activeUser ? (
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
            className="text-decoration-none text-light"
            to="/user/notifications"
          >
            <h3 className="d-flex align-items-center ">
              <MdOutlineNotificationsNone />
              <span className="d-none d-lg-flex mx-1">Notifications</span>
            </h3>
          </Link>

          <div className="d-none d-md-block">
            <Search isDark={isDark} />
          </div>
          <div className="d-block d-md-none">
            <Link className="text-decoration-none text-light" to="/search">
              <h3 className="d-flex align-items-center ">
                <MdOutlineSearch />
                <span className="d-none d-lg-flex mx-1">Search</span>
              </h3>
            </Link>
          </div>
          <div>
            <Link className="text-decoration-none text-light">
              <h3 className="d-flex align-items-center ">
                <Sidebar isDark={isDark} handleTheme={handleTheme} />
              </h3>
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
