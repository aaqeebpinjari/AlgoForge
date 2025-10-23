// components/SubscribeButton.jsx
import React from "react";
import { useNotifications } from "../contexts/NotificationsContext";

const SubscribeButton = ({ algorithmId }) => {
  const { subscriptions, subscribe, unsubscribe } = useNotifications();
  const isSubscribed = subscriptions.includes(algorithmId);

  return (
    <button
      onClick={() =>
        isSubscribed ? unsubscribe(algorithmId) : subscribe(algorithmId)
      }
      style={{
        padding: "0.5rem 1rem",
        background: isSubscribed ? "red" : "green",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
      }}
    >
      {isSubscribed ? "Unsubscribe" : "Subscribe"}
    </button>
  );
};

export default SubscribeButton;
