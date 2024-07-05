import React, { createContext, useState, useContext } from "react";
import AuthContext from "../auth/context";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [unreadNotifCount, setUnreadNotifCount] = useState(
    authContext.user.unreadNotifs
  );

  return (
    <NotificationContext.Provider
      value={{ unreadNotifCount, setUnreadNotifCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
