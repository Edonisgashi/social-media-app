import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, scrollTop, Icon, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "text-light nav-link" : "text-decoration-none text-light"
      }
      onClick={scrollTop}
    >
      <h3 className="d-flex align-items-center">
        <Icon />
        <span className="d-none d-lg-flex mx-1">{text}</span>
      </h3>
    </NavLink>
  );
};

export default NavItem;
