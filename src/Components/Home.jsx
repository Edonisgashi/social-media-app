import React, { useContext } from "react";
import { appContext } from "../Context/AppContext";
import Sidebar from "./Sidebar";
import AddPost from "./AddPost";
import UsersList from "./UsersList";
import Posts from "./Posts";

const Home = ({ isDark, handleTheme }) => {
  const { posts, currentUser, activeUser } = useContext(appContext);

  return (
    <div className=" col-12">
      <div
        className="d-flex justify-content-between"
        style={{ overflowX: "hidden" }}
      >
        <Sidebar isDark={isDark} handleTheme={handleTheme} />
        <div className="timeline d-flex flex-column col-10 col-lg-8 align-items-center my-5 mx-auto">
          {currentUser !== null ? (
            <AddPost className="position-top" isDark={isDark} />
          ) : null}
          {posts?.length > 0 &&
            posts?.map((post, i) => {
              return (
                <Posts
                  post={post}
                  i={i}
                  isDark={isDark}
                  activeUser={activeUser}
                />
              );
            })}
        </div>
        <UsersList isDark={isDark} />
      </div>
    </div>
  );
};

export default Home;
