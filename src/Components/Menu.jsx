import React, { useContext } from "react";
import { BsBookmark } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { FaUserFriends } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import {
  MdAdd,
  MdOutlineModeEdit,
  MdOutlineLogout,
  MdOutlineLightMode,
  MdOutlineSettings,
} from "react-icons/md";
import MenuItem from "./MenuItem";
import { auth } from "../config/firebase";
import { CiDark } from "react-icons/ci";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { appContext } from "../Context/AppContext";

const Menu = ({ activeUser, handleTheme, isDark, handleClose }) => {
  const { setActiveUser } = useContext(appContext);
  const navigate = useNavigate();
  const signOutUser = () => {
    signOut(auth)
      .then((response) => {
        setActiveUser(null);
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="footer__container">
      <ul className="flex-column align-items-start">
        <MenuItem
          handleClose={handleClose}
          to={`profile/${activeUser?.userID}`}
          Icon={ImProfile}
          text={`${activeUser ? activeUser?.username : "Profile"}`}
          activeUser={activeUser}
        />
        <MenuItem
          handleClose={handleClose}
          to={`/${activeUser?.username}/friends`}
          Icon={FaUserFriends}
          activeUser={activeUser}
          text="Friends"
        />
        <MenuItem
          handleClose={handleClose}
          to={`/${activeUser?.username}/newpost`}
          Icon={MdAdd}
          activeUser={activeUser}
          text="New Post"
        />
        <MenuItem
          handleClose={handleClose}
          to={`/${activeUser?.username}/saved`}
          Icon={BsBookmark}
          activeUser={activeUser}
          text="Bookmarks"
        />

        <Dropdown>
          <Dropdown.Toggle
            variant="none"
            className="d-flex align-items-baseline"
          >
            <MenuItem
              text="Settings"
              Icon={MdOutlineSettings}
              activeUser={activeUser}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu variant={`${isDark ? "dark" : "light"} `}>
            <Dropdown.Item>
              {" "}
              <MenuItem
                handleClose={handleClose}
                to="/editProfile"
                Icon={MdOutlineModeEdit}
                activeUser={activeUser}
                text="Edit Profile"
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <MenuItem
                to="/"
                Icon={MdOutlineLogout}
                activeUser={activeUser}
                text="Log out"
                signOutUser={signOutUser}
                handleClose={handleClose}
              />
            </Dropdown.Item>
            <Dropdown.Item>
              <li
                className="nav-item mb-4 d-flex align-items-center"
                onClick={handleClose}
              >
                <h5
                  className="mx-auto"
                  style={{
                    color: !activeUser ? "grey" : "#007bff",
                    cursor: "pointer",
                  }}
                  onClick={handleTheme}
                >
                  {isDark ? <MdOutlineLightMode /> : <CiDark />}
                  {isDark ? " Light Mode" : " Dark Mode"}
                </h5>
              </li>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ul>
    </div>
  );
};

export default Menu;
