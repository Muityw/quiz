import React from "react";
import questions from "./questions"; // Importa as perguntas do arquivo questions.js

const Quiz = ({ currentQuestionIndex, handleAnswer, userAnswers }) => {
  if (!questions || currentQuestionIndex < 0 || currentQuestionIndex >= questions.length) {
    return <div>Erro: Pergunta inválida ou não encontrada.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz">
      <h2>{currentQuestion.text}</h2>
      <div className="options">
        {Array.isArray(currentQuestion.answers) ? (
          currentQuestion.answers.map((answer) => (
            <label
              key={answer.id}
              className={userAnswers[currentQuestion.id] === answer.id ? "selected" : ""}
            >
              <input
                type="radio"
                name={`q${currentQuestion.id}`}
                value={answer.id}
                onChange={() => handleAnswer(currentQuestion.id, answer.id)} // Atualiza o estado diretamente
                checked={userAnswers[currentQuestion.id] === answer.id} // Verifica se a resposta foi selecionada
              />
              {answer.text}
            </label>
          ))
        ) : (
          <p>Erro: Respostas não disponíveis.</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;


