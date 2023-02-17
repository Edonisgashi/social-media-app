import React, { useContext, useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { appContext } from "../Context/AppContext";
import { db } from "../config/firebase";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { activeUser } = useContext(appContext);

  const readNotifications = async (id) => {
    const userRef = doc(db, "users", id);
    const getUser = await getDoc(userRef);
    const userData = getUser.data();
    const userNotifications = userData.notifications;

    const updateNotifications = {
      ...userData,
      notifications: userNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    };
    updateDoc(userRef, updateNotifications);
  };

  useEffect(() => {
    setNotifications(
      activeUser?.notifications
        ?.map((notification) => notification)
        .filter((notification) => notification.read === false)
    );
  }, [activeUser]);

  return (
    <div>
      <h2 className="text-center text-muted mb-5 pt-3">Notifications</h2>
      <span
        className="btn btn-info mx-3"
        onClick={() => readNotifications(activeUser?.id)}
      >
        {" "}
        Mark as Read
      </span>
      {notifications?.map((notification, i) => {
        return <h1 key={i}>{notification.notification}</h1>;
      })}
    </div>
  );
};

export default Notifications;
