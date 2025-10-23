import React from "react";
import Quiz from "../components/Quiz";
import gitQuiz from "../data/gitQuiz.json";

const GitBasicsQuiz = () => {
  return <Quiz questions={gitQuiz} category="Git Basics" />;
};

export default GitBasicsQuiz;
