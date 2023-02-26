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
  Alert,
  Toast,
} from "react-bootstrap";
import { MdOutlineDoneOutline } from "react-icons/md";

const AddPost = ({ isDark, textProp }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [text, setText] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [postImage, setPostImage] = useState("");
  const { activeUser } = useContext(appContext);

  const bgClass = isDark ? "bg-dark text-light" : "bg-light text-dark";

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
          <Toast.Header>Success Message</Toast.Header>
          <Toast.Body>
            Posted successfully <MdOutlineDoneOutline className="mx-3" />
          </Toast.Body>
        </Toast>
      )}
      {textProp && (
        <h2 className="text-muted text-center mb-5 pt-5 pt-md-0">
          What's on your mind ?
        </h2>
      )}

      <Container className="col-8 flex-wrap mt-2 mb-5">
        <Form onSubmit={addPost} className={`d-flex flex-column ${bgClass}`}>
          <InputGroup className={bgClass}>
            <FormControl
              as="textarea"
              className={bgClass}
              placeholder="What's on your mind?"
              onChange={(e) => setText(e.target.value)}
              rows={3}
            />
          </InputGroup>
          <InputGroup className={`${bgClass} my-2`}>
            <FormControl
              type="text"
              as="textarea"
              className={bgClass}
              placeholder="Post's image"
              onChange={(e) => setPostImage(e.target.value)}
            />
          </InputGroup>
          <Button
            variant={`${isDark ? "dark" : "primary"} col-8 col-md-3 border`}
            type="submit"
            onClick={() =>
              errorMsg.length > 0
                ? setShowAlert(true)
                : text || postImage
                ? setShowToast(true)
                : setErrorMsg(
                    "Sorry , your post must include either a description or an image link or both of them !"
                  )
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
