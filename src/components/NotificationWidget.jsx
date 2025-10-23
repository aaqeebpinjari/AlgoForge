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
    <div className={`fixed z-[1150] ${isMobile ? "top-20 right-2.5" : "top-[92px] right-5"}`}>
      <button
        aria-label={`Notifications (${unreadCount} unread)`}
        title={`Notifications (${unreadCount} unread)`}
        className="notification-bell-button"
        onClick={() => setOpen(!open)}
      >
        {/* Bell icon SVG */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className="bell-icon"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
        </svg>
        <span className={`notification-badge ${unreadCount === 0 ? 'zero' : ''}`}>
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      </button>
      {open && (
        <div
          className="notification-dropdown"
          style={{
            width: isMobile ? `${Math.min(300, window.innerWidth - 32)}px` : "300px",
            maxWidth: "calc(100vw - 32px)"
          }}
        >
          {notifications.length === 0 && (
            <p className="notification-empty">No notifications</p>
          )}
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`notification-item-card ${n.read ? 'read' : 'unread'}`}
              onClick={() => markAsRead(n.id)}
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
