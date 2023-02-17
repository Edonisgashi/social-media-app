import React, { useContext } from "react";
import { appContext } from "../Context/AppContext";
import Sidebar from "./Sidebar";
import AddPost from "./AddPost";
import UsersList from "./UsersList";
import Posts from "./Posts";

const Home = ({ isDark, handleTheme }) => {
  const { posts, currentUser, activeUser } = useContext(appContext);

  return (
    <div
      className="d-flex justify-content-between col-12"
      style={{ overflowX: "hidden" }}
    >
      <div className="timeline d-flex flex-column col-10  align-items-center my-5 mx-auto">
        {currentUser !== null ? <AddPost isDark={isDark} /> : null}
        {posts?.length > 0 &&
          posts?.map((post, i) => {
            return (
              <Posts
                post={post}
                key={i}
                isDark={isDark}
                activeUser={activeUser}
              />
            );
          })}
      </div>
      <UsersList isDark={isDark} />
    </div>
  );
};

export default Home;
