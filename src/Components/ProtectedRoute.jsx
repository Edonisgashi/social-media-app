import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [showComponent, setShowComponent] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(window.localStorage.getItem("isLoggedIn"));
  console.log(currentUser);

  useEffect(() => {
    if (currentUser !== null) {
      setShowComponent(true);
    } else {
      navigate("/login");
    }
  }, [currentUser]);

  return <>{showComponent ? <Component /> : null}</>;
};

export default ProtectedRoute;
