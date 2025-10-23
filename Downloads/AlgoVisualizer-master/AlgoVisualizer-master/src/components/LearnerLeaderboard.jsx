import React from "react";

const learners = [
  { name: "Alice", points: 120 },
  { name: "Bob", points: 95 },
  { name: "Kajal", points: 75 },
];

const LearnerLeaderboard = () => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-2">⭐ Learner Leaderboard</h2>
      <ol className="space-y-2">
        {learners
          .sort((a, b) => b.points - a.points)
          .map((learner, index) => (
            <li
              key={index}
              className="flex justify-between p-2 border rounded-lg"
            >
              <span>
                #{index + 1} {learner.name}
              </span>
              <span className="font-semibold">{learner.points} pts</span>
            </li>
          ))}
      </ol>
    </div>
  );
};


export default LearnerLeaderboard;
