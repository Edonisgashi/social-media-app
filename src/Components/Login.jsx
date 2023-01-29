import React from "react";

const Login = ({ isDark }) => {
  return (
    <form
      className={`w-25 mx-auto py-3 px-5  shadow-lg bg-${
        isDark ? "dark" : "light"
      }`}
    >
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className={`form-control ${
            isDark ? "bg-dark text-white" : "bg-light text-dark"
          }`}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className={`form-control ${
            isDark ? "bg-dark text-white" : "bg-light text-dark"
          }`}
          id="exampleInputPassword1"
        />
      </div>

      <button
        type="submit"
        className={`btn btn-${isDark ? "outline-light" : "primary"} mx-4`}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
