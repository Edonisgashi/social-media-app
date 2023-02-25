import React, { useContext } from "react";
import { appContext } from "../Context/AppContext";
import Sidebar from "./Sidebar";
import AddPost from "./AddPost";
import UsersList from "./UsersList";
import Posts from "./Posts";

const Home = ({ isDark, handleTheme }) => {
  const { posts, currentUser, activeUser } = useContext(appContext);
  console.log(activeUser);
  return (
    <div
      className="d-flex justify-content-between col-12"
      style={{ overflowX: "hidden" }}
    >
      <div className="timeline d-flex flex-column col-10 mb-5 ">
        <h1 className="text-muted text-center d-block d-md-none my-5">
          Your Timeline
        </h1>
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
