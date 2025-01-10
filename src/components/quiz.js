import React, { useState } from 'react';
import questions from './questions'; // Usando o arquivo JSON de perguntas


const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState(
    questions.reduce((acc, question) => {
      acc[question.id] = null; // Inicializa todas as respostas como null
      return acc;
    }, {})
  );

  const handleAnswerChange = (questionId, value) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value, // Atualiza a resposta do usuário para a questão
    }));
  };

  const submitQuiz = () => {
    const correctAnswers = questions.reduce((score, question) => {
      const correctAnswer = question.answers.find((answer) => answer.value === "1");
      return score + (userAnswers[question.id] === correctAnswer?.value ? 1 : 0); // Calcula as respostas corretas
    }, 0);

    alert(`Você acertou ${correctAnswers} de ${questions.length} questões.`);
  };

  return (
    <div>
      <h1>Quiz</h1>
      {questions.map((question) => (
        <div key={question.id}>
          <h2>{question.text}</h2>
          {question.answers.map((answer) => (
            <div key={answer.text}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={answer.value}
                checked={userAnswers[question.id] === answer.value}
                onChange={() => handleAnswerChange(question.id, answer.value)}
              />
              <label>{answer.text}</label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={submitQuiz}>Enviar</button>
    </div>
  );
};

export default Quiz;


