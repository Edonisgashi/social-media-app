import React, { useContext } from "react";
import { appContext } from "../Context/AppContext";
import Posts from "./Posts";

const SavedPosts = ({ isDark }) => {
  const { activeUser } = useContext(appContext);

  return (
    <div className="vw-100">
      {activeUser?.saved?.map((post, i) => {
        return (
          <Posts
            key={post.id}
            activeUser={activeUser}
            i={i}
            post={post}
            isDark={isDark}
          />
        );
      })}
    </div>
  );
};

export default SavedPosts;
