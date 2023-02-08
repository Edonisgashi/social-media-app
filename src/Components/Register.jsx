import React, { useContext, useState, useEffect } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { usersRef, auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { appContext } from "../Context/AppContext";

const Register = ({ isDark }) => {
  const [birthDate, setBirthDate] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [username, setUserame] = useState();
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState();

  const { activeUser, users, currentUser, setActiveUser } =
    useContext(appContext);

  const registerUserForm = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log(cred.user);
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
    console.log(activeUser, currentUser);
  }, [isRegistered]);
  return (
    <form
      onSubmit={registerUserForm}
      className={`d-flex flex-column justify-content-around  my-5 mx-auto shadow-lg p-5  col-8 col-sm-6 col-md-4 col-lg-4 bg-${
        isDark ? "dark" : "light"
      }`}
    >
      <label htmlFor="firstName" className="my-1">
        First Name:
        <input
          type="text"
          id="firstName"
          name="firstName"
          className={`form-control my-1 ${
            isDark ? "bg-dark text-white" : "bg-light text-dark"
          }`}
          placeholder="Enter your First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>

      <label htmlFor="lastName" className="my-1">
        Last Name:
        <input
          type="text"
          id="lastName"
          className={`form-control my-1 ${
            isDark ? "bg-dark text-white" : "bg-light text-dark"
          }`}
          name="lastName"
          placeholder="Enter your Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>

      <label htmlFor="username" className="my-1">
        Username:
      </label>
      <input
        type="text"
        id="username"
        name="username"
        className={`form-control my-1 ${
          isDark ? "bg-dark text-white" : "bg-light text-dark"
        }`}
        placeholder="Enter your Username"
        onChange={(e) => setUserame(e.target.value)}
      />

      <label htmlFor="email" className="my-1">
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className={`form-control my-1 ${
          isDark ? "bg-dark text-white" : "bg-light text-dark"
        }`}
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password" className="my-1">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className={`form-control my-1 ${
          isDark ? "bg-dark text-white" : "bg-light text-dark"
        }`}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label htmlFor="birthDate" className="my-1">
        You birthdate
      </label>
      <input
        type="date"
        id="birthDate"
        name="birthDate"
        className={`form-control my-1 ${
          isDark ? "bg-dark text-white" : "bg-light text-dark"
        }`}
        onChange={(e) => setBirthDate(e.target.value)}
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
