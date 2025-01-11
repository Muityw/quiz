import React from "react";
import questions from "./questions"; // Importa as perguntas do arquivo questions.js

const Quiz = ({ currentQuestionIndex, handleAnswer, userAnswers }) => {
  return (
    <div className="quiz">
      <h2>{questions[currentQuestionIndex].text}</h2>
      <div className="options">
        {questions[currentQuestionIndex].answers.map((answer, index) => (
          <label key={index}>
            <input
              type="radio"
              name={`q${questions[currentQuestionIndex].id}`}
              value={answer.value}
              onChange={() => handleAnswer(questions[currentQuestionIndex].id, answer.value)}
              checked={userAnswers[questions[currentQuestionIndex].id] === answer.value}
            />
            {answer.text}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Quiz;