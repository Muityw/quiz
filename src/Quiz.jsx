import React, { useState } from 'react';
import questions from './questions';

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="container">
      <h1>Questionário de Desenvolvimento Web</h1>
      <div className="question-nav">
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Anterior
        </button>
        <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
          Próximo
        </button>
      </div>
      {questions.map((question, index) => (
        <div key={question.id} className={`question ${index === currentQuestionIndex ? 'active' : ''}`}>
          <h2>{question.text}</h2>
          <div className="quiz-options">
            {question.answers.map((answer, idx) => (
              <label key={idx}>
                <input type="radio" name={`question-${question.id}`} value={answer.value} />
                {answer.text}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Quiz;
