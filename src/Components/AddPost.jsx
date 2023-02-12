import React, { useContext, useState } from "react";
import { addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { postsRef, db } from "../config/firebase";
import { appContext } from "../Context/AppContext";
import {
  Form,
  Button,
  InputGroup,
  FormControl,
  Container,
} from "react-bootstrap";
const AddPost = ({ isDark }) => {
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState();
  const { activeUser } = useContext(appContext);

  const addPost = async (e) => {
    e.preventDefault();
    const userPost = doc(db, "users", activeUser?.id);
    const userSnapshot = await getDoc(userPost);
    const userData = userSnapshot.data();
    const currentPosts = userData.posts;
    const currentDate = new Date();

    const post = {
      likes: 0,
      postID: activeUser.userID,
      title: text,
      user: activeUser.username,
      comments: [],
      postedTime: currentDate,
    };
    if (text !== "") {
      addDoc(postsRef, post).then((response) => {
        e.target.reset();
      });
      const updatedUser = {
        ...userData,
        posts: [...currentPosts, post],
      };
      updateDoc(userPost, updatedUser)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <Container className="col-8 flex-wrap mt-2 mb-5">
        <Form
          onSubmit={addPost}
          className={`d-flex flex-column ${
            isDark ? "bg-dark text-light" : "bg-light text-dark"
          }`}
        >
          <InputGroup
            className={`bg-${isDark ? "dark text-light" : "light text-dark"}`}
          >
            <FormControl
              as="textarea"
              className={`bg-${isDark ? "dark text-light" : "light text-dark"}`}
              placeholder="What's on your mind?"
              onChange={(e) => setText(e.target.value)}
              rows={3}
            />
          </InputGroup>
          <InputGroup className="d-flex flex-column my-2">
            <Button variant={`outline-${isDark ? "light" : "primary"} col-3`}>
              Choose File
            </Button>
            <FormControl
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="d-none"
            />
          </InputGroup>
          <Button variant={`outline-${isDark ? "light" : "primary"} col-3`}>
            Post
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddPost;
