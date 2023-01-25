import React, { useState } from "react";
import { db, usersRef, postsRef, auth } from "../config/firebase";
import {
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [ID, setID] = useState("");

  //getting docs from a collection

  // const fetchData = () => {
  //   getDocs(usersRef).then((snapshot) => {
  //     const users = [];
  //     snapshot.docs.forEach((doc) => {
  //       users.push({ ...doc.data(), id: doc.id });
  //     });
  //     console.log(users);
  //   });
  //   getDocs(postsRef).then((snapshot) => {
  //     const posts = [];
  //     snapshot.docs.forEach((doc) => {
  //       posts.push({ ...doc.data(), id: doc.id });
  //     });
  //     console.log(posts);
  //   });
  // };

  // Real-time collection data

  const fetchData = () => {
    // fetch only data based on a condition;

    // const q = query(usersRef, where("username", "==", "anaya"));

    // get a snapshot in all users
    onSnapshot(usersRef, (snapshot) => {
      // and then get real-time collection obly for that query
      // onSnapshot(q, (snapshot) => {
      const users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
        console.log(users);
      });
    });
  };

  //Adding Docs in a collection

  const addUser = async (e) => {
    e.preventDefault();
    addDoc(usersRef, {
      username: username,
      createdAt: serverTimestamp(),
    }).then((snapshot) => {
      console.log(snapshot);
      e.target.reset();
    });
  };

  //Deletin' Docs from a collection

  const deleteUser = (e) => {
    e.preventDefault();
    const docRef = doc(db, "users", ID);

    deleteDoc(docRef).then(e.target.reset());
  };

  // fetching a single user...

  const getAUser = (e) => {
    e.preventDefault();
    const docRef = doc(db, "users", ID);
    getDoc(docRef).then((snapshot) => console.log(snapshot.data()));
    e.target.reset();
  };

  // Updating a user

  const updateUser = (e) => {
    e.preventDefault();
    const docRef = doc(db, "users", ID);
    updateDoc(docRef, {
      username: "new updated username",
    });
    e.target.reset();
  };

  // Sign Up with Firebase Auth
  const signUpUser = (e) => {
    e.preventDefault();

    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user created", cred.user);
        e.target.reset();
      })
      .catch((error) => console.log(error.message));
  };

  // Logging in & out.

  const logOut = () => {
    signOut(auth)
      .then(() => {
        console.log("user signed out");
      })
      .catch((err) => console.log(err.message));
  };

  const logIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log("user logged in ", response.user);
        e.target.reset();
      })
      .catch((err) => console.log(err.message));
  };

  // Subscribing to auth changes

  onAuthStateChanged(auth, (user) => {
    console.log("user state", user);
  });
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={fetchData}>Fetch data</button>

      <form action="" onSubmit={addUser}>
        <input
          type="text"
          placeholder="enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>Add user</button>
      </form>
      <form action="" onSubmit={deleteUser}>
        <input
          type="text"
          placeholder="your id"
          onChange={(e) => setID(e.target.value)}
        />
        <button>Delete user</button>
      </form>
      <form action="" onSubmit={getAUser}>
        <input
          type="text"
          placeholder="your id"
          onChange={(e) => setID(e.target.value)}
        />
        <button>Get a user</button>
      </form>
      <form action="" onSubmit={updateUser}>
        <input
          type="text"
          placeholder="your id"
          onChange={(e) => setID(e.target.value)}
        />
        <button>update a user</button>
      </form>

      <h1>Firebase Auth</h1>

      <form action="" onSubmit={signUpUser}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Sign Up</button>
      </form>

      <h2>Login</h2>

      <form action="" onSubmit={logIn}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button>Log in</button>
      </form>
      <button onClick={logOut}>Log out</button>
    </div>
  );
};

export default Home;
