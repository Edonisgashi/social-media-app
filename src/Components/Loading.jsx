import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(progress + 1);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [progress]);
  return (
    <div
      className="loading d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <ProgressBar
        animated
        now={progress}
        label={`${progress}%`}
        variant="primary"
        style={{ width: "50%" }}
      />
    </div>
  );
};

export default Loading;
