import React, { useState } from "react";
import { CheckCircle, Star } from "lucide-react";

const ProgressTracker = ({ topics }) => {
  const [completed, setCompleted] = useState([]);
  const [badges, setBadges] = useState([]);

  const toggleComplete = (topic) => {
    setCompleted((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );

    // Unlock badge example
    if (completed.length + 1 === topics.length) {
      if (!badges.includes("Master Learner")) {
        setBadges([...badges, "Master Learner"]);
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-2">📘 Progress Tracker</h2>

      <ul className="space-y-2">
        {topics.map((topic, i) => (
          <li
            key={i}
            className="flex items-center justify-between p-2 border rounded-lg"
          >
            <span>{topic}</span>
            <button
              onClick={() => toggleComplete(topic)}
              className={`flex items-center px-2 py-1 rounded ${
                completed.includes(topic)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              {completed.includes(topic) ? "Done" : "Mark"}
            </button>
          </li>
        ))}
      </ul>

      {badges.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-1">🏅 Badges Earned</h3>
          <div className="flex gap-2">
            {badges.map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-1 bg-yellow-200 px-3 py-1 rounded-full"
              >
                <Star className="w-4 h-4 text-yellow-600" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default ProgressTracker;
