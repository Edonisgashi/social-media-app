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
import NavItem from "./NavItem";

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
      <NavItem
        to="/"
        scrollTop={scrollTop}
        Icon={MdOutlineHome}
        text="Timeline"
      />

      {!activeUser ? (
        <>
          <NavItem to="/login" Icon={MdOutlineLogin} text="Login" />

          <NavItem to="/register" Icon={RiRegisteredLine} text="Register" />
        </>
      ) : (
        <>
          <NavItem
            to="/user/notifications"
            Icon={MdOutlineNotificationsNone}
            text="Notifications"
          />

          <div className="d-none d-md-block">
            <Search isDark={isDark} />
          </div>
          <div className="d-block d-md-none">
            <NavItem to="/search" Icon={MdOutlineSearch} text="Search" />
          </div>
        </>
      )}
      <div>
        <NavLink className="text-decoration-none text-light">
          <h3 className="d-flex align-items-center ">
            <Sidebar isDark={isDark} handleTheme={handleTheme} />
          </h3>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
