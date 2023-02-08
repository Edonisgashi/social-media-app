import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineLogin,
  MdOutlineNotificationsNone,
  MdPersonSearch,
} from "react-icons/md";
import { RiRegisteredLine } from "react-icons/ri";

import { appContext } from "../Context/AppContext";

const Navbar = ({ isDark }) => {
  const { currentUser } = useContext(appContext);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(false);

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
      className={`header d-flex align-items-center justify-content-around mb-5 w-100 py-4 shadow-lg  ${
        visible ? "header--visible" : "header--hidden"
      }
      ${!isDark ? "bg-primary " : "bg-dark bg-opacity-75"}`}
      style={{
        "@media (minWidth: 576px)": {
          maxWidth: "50%",
        },
      }}
    >
      <Link to="/" className="text-decoration-none text-light">
        <h3 className="d-flex align-items-center">
          <span class="material-icons">diversity_3</span>
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
          <Link className="text-decoration-none text-light">
            <h3 className="d-flex align-items-center ">
              <MdOutlineNotificationsNone />
              <span className="d-none d-lg-flex mx-1">Notifications</span>
            </h3>
          </Link>
          <Link className="text-decoration-none text-light">
            <h3 className="d-flex align-items-center ">
              <MdPersonSearch />
              <span className="d-none d-lg-flex mx-1">Search</span>
            </h3>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
