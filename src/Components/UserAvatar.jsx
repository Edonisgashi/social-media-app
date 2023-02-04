import React from "react";
import Avatar from "react-avatar";
const UserAvatar = ({ firstName, lastName }) => {
  return (
    <Avatar name={`${firstName} ${lastName}`} size="75" color="black" round />
  );
};

export default UserAvatar;
