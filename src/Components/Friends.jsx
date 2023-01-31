import React from "react";
import { useParams } from "react-router-dom";

const Friends = () => {
  const { profile } = useParams();
  console.log(profile);
  return <div>Friends</div>;
};

export default Friends;
