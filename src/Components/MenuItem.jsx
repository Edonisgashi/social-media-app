import React from "react";
import { Link } from "react-router-dom";
const MenuItem = ({ to, Icon, activeUser, text, signOutUser, handleClose }) => {
  return (
    <li className="nav-item mb-4" onClick={handleClose}>
      <Link
        to={to}
        style={{
          pointerEvents: !activeUser ? "none" : "auto",
          color: !activeUser ? "grey" : "#007bff",
        }}
        onClick={signOutUser ? signOutUser : null}
      >
        <Icon className="mx-2" />
        <span>{text}</span>
      </Link>
    </li>
  );
};
export default MenuItem;
