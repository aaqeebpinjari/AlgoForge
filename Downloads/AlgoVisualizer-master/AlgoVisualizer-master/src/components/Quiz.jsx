import React, { useState } from "react";

const Quiz = ({ questions, category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  if (!questions || questions.length === 0) {
    return <p>No questions available for {category}.</p>;
  }

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div>
        <h2>{category} Quiz Result</h2>
        <p>
          You scored {score} out of {questions.length}
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div>
      <h2>{category} Quiz</h2>
      <p>
        Question {currentIndex + 1} of {questions.length}
      </p>
      <p>{currentQuestion.question}</p>
      {currentQuestion.options.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(option.isCorrect)}>
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
