import React, { useContext } from "react";
import { appContext } from "../Context/AppContext";
import Posts from "./Posts";

const SavedPosts = ({ isDark }) => {
  const { activeUser } = useContext(appContext);

  return (
    <>
      {activeUser?.saved?.map((post) => {
        return <Posts key={post.id} activeUser={activeUser} post={post} />;
      })}
    </>
  );
};

export default SavedPosts;
