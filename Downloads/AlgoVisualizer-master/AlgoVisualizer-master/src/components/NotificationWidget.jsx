import React, { useState, useEffect } from "react";
import { useNotifications } from "../contexts/NotificationsContext";

const NotificationWidget = () => {
  const { notifications, markAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className={`absolute z-[900] ${isMobile ? "top-20 left-2.5" : "top-[92px] left-5"}`}>
      <button
        className={`px-${isMobile ? "2" : "3"} py-${isMobile ? "1.5" : "2"} text-${isMobile ? "xs" : "sm"} rounded-lg border border-gray-300 bg-white text-gray-800 shadow transition-all whitespace-nowrap`}
        onClick={() => setOpen(!open)}
      >
        {isMobile ? `🔔 ${unreadCount}` : `Notifications (${unreadCount})`}
      </button>
      {open && (
        <div
          className={`absolute mt-2 ${isMobile ? "-right-2.5" : "right-0"} bg-white border border-gray-300 rounded-lg p-${isMobile ? "3" : "4"} shadow-lg w-[300px] max-h-[60vh] overflow-y-auto`}
          style={isMobile ? { width: `${Math.min(300, window.innerWidth - 20)}px` } : {}}
        >
          {notifications.length === 0 && (
            <p className={`m-0 text-gray-500 text-${isMobile ? "xs" : "sm"}`}>
              No notifications
            </p>
          )}
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`mb-2 rounded bg-${n.read ? "gray-100" : "blue-100"} px-2 py-${isMobile ? "1" : "2"} cursor-pointer text-${isMobile ? "xs" : "sm"} leading-tight transition-opacity break-words`}
              onClick={() => markAsRead(n.id)}
              onMouseEnter={(e) => {
                e.target.style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = "1";
              }}
            >
              {n.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationWidget;
