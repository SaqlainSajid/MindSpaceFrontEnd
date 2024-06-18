import React, { useState } from "react";

const NotificationsContext = React.createContext();

export const NotificationsProvider = ({ children }) => {
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  return (
    <NotificationsContext.Provider
      value={{ hasNewNotifications, setHasNewNotifications }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContext;
