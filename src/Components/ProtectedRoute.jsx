import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "../Context/AppContext";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [showComponent, setShowComponent] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(appContext);
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
