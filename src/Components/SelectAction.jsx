import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { TbDots } from "react-icons/tb";
import {
  MdOutlineBookmarkBorder,
  MdOutlineContentCopy,
  MdDeleteOutline,
} from "react-icons/md";
import { db } from "../config/firebase";
import { appContext } from "../Context/AppContext";
const SelectAction = ({ isDark, post }) => {
  const { activeUser } = useContext(appContext);
  const [saveBtnText, setSaveBtnText] = useState("Save");
  const addBookmark = async (post) => {
    const userRef = doc(db, "users", activeUser?.id);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    const usersavedPost = userData.saved;

    if (saveBtnText === "Save") {
      setSaveBtnText("Saved");
      const updateUser = {
        ...userData,
        saved: [...usersavedPost, post],
      };
      updateDoc(userRef, updateUser);
    }
  };

  const deletePost = (id) => {
    const postRef = doc(db, "posts", id);

    deleteDoc(postRef);
  };
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant={`outline-${isDark ? "light" : "none"}`}
        id="dropdown-basic"
      >
        <TbDots />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => addBookmark(post)}
          className="d-flex align-items-center"
        >
          <MdOutlineBookmarkBorder />

          <span className="mx-2 d-none d-sm-flex">{saveBtnText}</span>
        </Dropdown.Item>
        <Dropdown.Item className="d-flex align-items-center">
          <MdOutlineContentCopy />
          <span className="mx-2 d-none d-sm-flex">Copy link</span>
        </Dropdown.Item>
        {activeUser?.userID === post?.postID ? (
          <Dropdown.Item
            onClick={() => deletePost(post.id)}
            className="d-flex align-items-center"
          >
            <MdDeleteOutline />{" "}
            <span className="mx-2 d-none d-sm-flex">Delete Post</span>
          </Dropdown.Item>
        ) : null}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SelectAction;
