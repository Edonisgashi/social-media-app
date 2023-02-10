import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { appContext } from "../Context/AppContext";
const Login = ({ isDark }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { users, setActiveUser } = useContext(appContext);

  const handleLogIn = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        setActiveUser(
          users.find((user) => user?.userID === credentials.user.uid)
        );

        e.target.reset();
      })
      .catch((error) => console.log(error.message));
    navigate("/");
  };
  return (
    <form
      onSubmit={handleLogIn}
      className={`col-10 col-md-4 mx-auto py-3 px-5  shadow-lg bg-${
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
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
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
