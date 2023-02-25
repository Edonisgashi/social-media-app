import React, { useContext, useState } from "react";
import { addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { postsRef, db, storage } from "../config/firebase";
import { appContext } from "../Context/AppContext";
import {
  Form,
  Button,
  InputGroup,
  FormControl,
  Container,
  Alert,
  Toast,
} from "react-bootstrap";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const AddPost = ({ isDark, textProp }) => {
  const [errorMsg, seterrorMsg] = useState("");
  const [text, setText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [postImage, setPostImage] = useState("");
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
      image: postImage,
    };
    if (text !== "" || postImage !== "") {
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
    } else {
      seterrorMsg(
        "Sorry , your post must include either a description or an image link or both of them !"
      );
    }
  };

  return (
    <>
      {showAlert && (
        <Alert
          variant="danger"
          onClose={() => setShowAlert(false)}
          dismissible
          className="mx-auto"
        >
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{errorMsg}</p>
        </Alert>
      )}
      {showToast && (
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          className="mx-auto"
        >
          <Toast.Header bg="success">Success Message</Toast.Header>
          <Toast.Body>Posted successfully</Toast.Body>
        </Toast>
      )}
      {textProp && (
        <h2 className="text-muted text-center mb-5 pt-5 pt-md-0">
          What's on your mind ?
        </h2>
      )}

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
          <InputGroup
            className={`bg-${
              isDark ? "dark text-light" : "light text-dark"
            } my-2`}
          >
            <FormControl
              type="text"
              as="textarea"
              className={`bg-${isDark ? "dark text-light" : "light text-dark"}`}
              placeholder="Post's image"
              onChange={(e) => setPostImage(e.target.value)}
            />
          </InputGroup>
          {/* <InputGroup className="d-flex flex-column my-2">
            <Form.Label
              htmlFor="file"
              className={`btn btn-${
                isDark ? "dark" : "primary"
              } col-8 col-md-3 border`}
            >
              Choose File
            </Form.Label>
            <FormControl
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="d-none"
              id="file"
            />
          </InputGroup> */}
          <Button
            variant={`${isDark ? "dark" : "primary"} col-8 col-md-3 border`}
            type="submit"
            onClick={() =>
              errorMsg.length > 0 ? setShowAlert(true) : setShowToast(true)
            }
          >
            Post
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddPost;
