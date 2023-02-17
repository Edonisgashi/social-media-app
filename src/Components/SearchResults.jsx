import React from "react";
import { Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
const SearchResults = ({ searchResult, isDark, clearInput }) => {
  console.log(searchResult);
  return searchResult?.map((user, i) => {
    return (
      <Toast key={i}>
        <Toast.Body
          className={`bg-${isDark ? "dark" : "light"}`}
          onClick={clearInput}
        >
          <UserAvatar firstName={user.firstName} lastName={user.lastName} />
          <Link to={`/profile/${user.userID}`} className="mx-3 fs-5">
            @{user.username}
          </Link>
        </Toast.Body>
      </Toast>
    );
  });
};

export default SearchResults;
