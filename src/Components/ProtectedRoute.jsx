import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "../Context/AppContext";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [showComponent, setShowComponent] = useState(false);
  const navigate = useNavigate();
  const { activeUser } = useContext(appContext);

  useEffect(() => {
    if (activeUser !== null) {
      setShowComponent(true);
    } else {
      navigate("/login");
    }
  }, [activeUser]);

  return <>{showComponent ? <Component /> : null}</>;
};

export default ProtectedRoute;
