import React, { useState } from "react";

const TruncateText = ({ text, isDark }) => {
  const [showFullText, setShowFullText] = useState(false);
  const maxLength = 200;

  if (text.length <= maxLength) {
    // If the text is already shorter than or equal to the maximum allowed length, render the full text.
    return (
      <p className="mb-3" style={{ whiteSpace: "pre-wrap" }}>
        {text}
      </p>
    );
  }
  if (showFullText) {
    // If the "See More" button has been clicked, render the full text.
    return (
      <p className="mb-3" style={{ whiteSpace: "pre-wrap" }}>
        {text}
        <span
          onClick={() => setShowFullText(false)}
          className=" see_less_btn d-block lead"
        >
          See Less
        </span>
      </p>
    );
  }
  const truncatedText = text.slice(0, maxLength) + "...";
  return (
    <p className="mb-3" style={{ whiteSpace: "pre-wrap" }}>
      {truncatedText}
      <span
        onClick={() => setShowFullText(true)}
        className=" see_less_btn d-block lead"
      >
        See More
      </span>
    </p>
  );
};

export default TruncateText;
