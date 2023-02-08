import React from "react";
import { Link } from "react-router-dom";
const MenuItem = ({ to, Icon, activeUser, text, signOutUser }) => {
  return (
    <li className="nav-item mb-4">
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
