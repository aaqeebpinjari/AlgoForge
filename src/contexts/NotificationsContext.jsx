// contexts/NotificationsContext.jsx
import { createContext, useContext, useState } from "react";

const NotificationsContext = createContext();

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]); // algorithm IDs

  // Add a new notification
  const addNotification = (message, algorithmId = null) => {
    setNotifications((prev) => [
      ...prev,
      { id: Date.now(), message, algorithmId, read: false },
    ]);
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Subscribe to algorithm updates
  const subscribe = (algorithmId) => {
    if (!subscriptions.includes(algorithmId)) {
      setSubscriptions((prev) => [...prev, algorithmId]);
    }
  };

  const unsubscribe = (algorithmId) => {
    setSubscriptions((prev) => prev.filter((id) => id !== algorithmId));
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        subscriptions,
        subscribe,
        unsubscribe,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
