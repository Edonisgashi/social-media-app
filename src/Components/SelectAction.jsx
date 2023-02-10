import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { TbDots } from "react-icons/tb";
import { db } from "../config/firebase";
import { appContext } from "../Context/AppContext";
const SelectAction = ({ isDark, post }) => {
  const { activeUser } = useContext(appContext);

  const addBookmark = async (post) => {
    const userRef = doc(db, "users", activeUser?.id);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    const usersavedPost = userData.saved;

    const updateUser = {
      ...userData,
      saved: [...usersavedPost, post],
    };
    updateDoc(userRef, updateUser);
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
        <Dropdown.Item onClick={() => addBookmark(post)}>Save</Dropdown.Item>
        <Dropdown.Item>Copy link</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SelectAction;
