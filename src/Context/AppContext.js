import React, { useEffect, useState, createContext } from "react";
import { postsRef, usersRef, auth } from "../config/firebase";
import { onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { createTheme } from "@mui/system";
export const appContext = createContext();
const AppContext = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light");
  const [currentUser, setCurrentUser] = useState(null);
  const [activeUser, setActiveUser] = useState(null);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const materialTheme = createTheme({
    palette: {
      mode: theme,
      // Other theme options here...
    },
    // Other theme options here...
  });

  const fetchUsers = async () => {
    await onSnapshot(usersRef, (snapshot) => {
      const users = [];

      snapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setUsers(users);

      setLoader(true);
    });
  };
  const fetchPosts = async () => {
    await onSnapshot(postsRef, (snapshot) => {
      const posts = [];
      snapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      setPosts(posts);
    });
  };

  useEffect(() => {
    fetchUsers();
    fetchPosts();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setActiveUser(users.find((user) => currentUser?.uid === user.userID));
      } else {
        setCurrentUser(null);
      }
    });
  }, [activeUser]);

  return (
    <appContext.Provider
      value={{
        users,
        posts,
        error,
        currentUser,
        activeUser,
        setActiveUser,
        toggleTheme,
        materialTheme,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppContext;
