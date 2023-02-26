import React, { useContext, useState, useEffect } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { usersRef, auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { appContext } from "../Context/AppContext";
import Inputs from "./Inputs";
const Register = ({ isDark }) => {
  const [birthDate, setBirthDate] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [username, setUserame] = useState();
  const [isRegistered, setIsRegistered] = useState(false);
  const [errorUsername, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const { activeUser, users, currentUser, setActiveUser } =
    useContext(appContext);

  const checkUsername = (username) => {
    try {
      users.forEach((user) => {
        if (user.username === username) {
          throw "Username already exists";
        }
      });
      setErrorUsername("");
    } catch (error) {
      setErrorUsername(error);
    }
  };

  const checkEmail = (email) => {
    try {
      users.forEach((user) => {
        if (user.email === email) {
          throw "Email already exists";
        }
      });
      setErrorEmail("");
    } catch (error) {
      setErrorEmail(error);
    }
  };

  const registerUserForm = async (e) => {
    e.preventDefault();

    if (errorEmail || errorUsername) return;

    await createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        updateProfile(cred.user, { displayName: username });
        const userObj = {
          password: password,
          firstName: firstName,
          username: username,
          lastName: lastName,
          email: email,
          birthDate: birthDate,
          posts: [],
          friends: [],
          groups: [],
          saved: [],
          createdAt: serverTimestamp(),
          userID: cred.user.uid,
          photoURL: cred.user.photoURL,
          isEmailVerified: cred.user.emailVerified,
        };
        setIsRegistered(true);
        addDoc(usersRef, userObj);
      })
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    setActiveUser(users.find((user) => user.userID === currentUser?.uid));
  }, [isRegistered]);
  return (
    <form
      onSubmit={registerUserForm}
      className={`d-flex flex-column justify-content-around  my-5 mx-auto shadow-lg p-5  col-8 col-sm-6  bg-${
        isDark ? "dark" : "light"
      }`}
    >
      <Inputs
        id="firstName"
        label="First Name:"
        type="text"
        isDark={isDark}
        placeholder="Enter your First Name"
        setValue={setFirstName}
      />

      <Inputs
        id="lastName"
        label="Last Name:"
        type="text"
        isDark={isDark}
        placeholder="Enter your Last Name"
        setValue={setLastName}
      />

      <Inputs
        id="username"
        label="Username:"
        type="text"
        isDark={isDark}
        placeholder="Enter your Username"
        setValue={setUserame}
        checkValue={checkUsername}
      />

      {errorUsername && <p className="text-danger">{errorUsername}</p>}

      <Inputs
        id="email"
        label="Email:"
        type="email"
        isDark={isDark}
        placeholder="Enter your email"
        setValue={setEmail}
        checkValue={checkEmail}
      />
      {errorEmail && <p className="text-danger">{errorEmail}</p>}

      <Inputs
        id="password"
        label="Password:"
        type="password"
        isDark={isDark}
        placeholder="Enter your password"
        setValue={setPassword}
      />

      <Inputs
        id="birthDate"
        label="Your birthdate:"
        type="date"
        isDark={isDark}
        placeholder="Enter your birthdate"
        setValue={setBirthDate}
      />

      <button
        className={`btn btn-outline-${
          isDark ? "light" : "primary"
        } my-3 mx-auto col-10 col-sm-8 col=md-6 col-lg-5`}
      >
        Sign Up
      </button>
    </form>
  );
};

export default Register;
