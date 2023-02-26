import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { appContext } from "../Context/AppContext";
import Inputs from "./Inputs";
const Login = ({ isDark }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { users, setActiveUser } = useContext(appContext);

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setActiveUser(
        users.find((user) => user?.userID === credentials.user.uid)
      );
      e.target.reset();
      navigate("/");
    } catch (error) {
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        setError("Wrong email or password");
      }
    }
  };
  return (
    <>
      <form
        onSubmit={handleLogIn}
        className={`col-10 col-md-6 mx-auto py-3 px-5  shadow-lg bg-${
          isDark ? "dark" : "light"
        }`}
      >
        <Inputs
          label="Email adress"
          id="xampleInputEmail1"
          type="email"
          setValue={setEmail}
          isDark={isDark}
          ariaDescribely="emailHelp"
        />
        <Inputs
          label="Password"
          id="exampleInputPassword1"
          type="password"
          setValue={setPassword}
          isDark={isDark}
          ariaDescribely="passwordHelp"
        />

        {error?.length > 0 && <p className="text-danger">{error}</p>}
        <button
          type="submit"
          className={`btn btn-${isDark ? "outline-light" : "primary"} mx-4`}
        >
          Login
        </button>
        <div className="my-3">
          <p>
            Don't have an account ? <Link to="/register">Register</Link>
          </p>
          <p>
            <Link to="/"> Continue as Guest</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
