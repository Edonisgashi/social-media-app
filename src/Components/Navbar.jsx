import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link to="/">Home Page</Link>
      <br />
      <Link to="/login">Login</Link>
    </>
  );
};

export default Navbar;
