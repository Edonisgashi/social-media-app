import React from "react";
import { Link } from "react-router-dom";
const MenuItem = ({ to, Icon, activeUser, text }) => {
  return (
    <li className="nav-item mb-4">
      <Link
        to={to}
        style={{
          pointerEvents: activeUser === null ? "none" : "auto",
          color: activeUser === null ? "grey" : "#007bff",
        }}
      >
        <Icon className="mx-2" />
        <span>{text}</span>
      </Link>
    </li>
  );
};
export default MenuItem;
