import React, { useState } from "react";
import questions from "./questions"; // Importa as perguntas do arquivo questions.js
import './styles/estilo.css'; // Importa o arquivo de estilos

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUser Answers] = useState(
    questions.reduce((acc, question) => {
      acc[question.id] = null; // Inicializa todas as respostas como null
      return acc;
    }, {})
  );
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [highestScore, setHighestScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Função para lidar com a seleção de respostas
  const handleAnswer = (questionId, value) => {
    setUser Answers({ ...userAnswers, [questionId]: value });
  };

  // Função para enviar o quiz e calcular a pontuação
  const submitQuiz = () => {
    const correctAnswers = questions.reduce((score, question) => {
      const correctAnswer = question.answers.find((answer) => answer.value === "1");
      return score + (userAnswers[question.id] === correctAnswer?.value ? 1 : 0);
    }, 0);

    setHighestScore(Math.max(highestScore, correctAnswers));
    setAttemptsLeft(attemptsLeft - 1);

    if (attemptsLeft > 1) {
      alert(`Você acertou ${correctAnswers} de ${questions.length} questões.`);
      setUser Answers(
        questions.reduce((acc, question) => {
          acc[question.id] = null;
          return acc;
        }, {})
      );
    } else {
      alert("Você esgotou todas as suas tentativas.");
      setQuizFinished(true);
    }
  };

  // Função para avançar para a próxima pergunta
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Função para voltar para a pergunta anterior
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Questionário de Desenvolvimento Web</h1>
        <p>
          <strong>Tentativas restantes:</strong> {attemptsLeft}
        </p>
        <p>
          <strong>Maior pontuação:</strong> {highestScore}
        </p>
      </header>

      {quizFinished ? (
        <p>O questionário foi finalizado.</p>
      ) : (
        <>
          <div className="question active">
            <p>
              {currentQuestionIndex + 1}. {questions[currentQuestionIndex].text}
            </p>
            <div className="quiz-options">
              {questions[currentQuestionIndex].answers.map((answer, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name={`q${questions[currentQuestionIndex].id}`}
                    value={answer.value}
                    onChange={() => handleAnswer(questions[currentQuestionIndex].id, answer.value)}
                    checked={userAnswers[questions[currentQuestion Index].id] === answer.value}
                  />
                  {answer.text}
                </label>
              ))}
            </div>
          </div>

          <div className="navigation">
            <button onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
              Pergunta Anterior
            </button>
            <button onClick={nextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
              Próxima Pergunta
            </button>
            <button onClick={submitQuiz}>
              Enviar Respostas
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;