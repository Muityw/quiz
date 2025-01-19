import React, { useState } from "react";
import questions from "./questions";
import "./styles/estilo.css";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Atualiza a resposta do usuário
  const handleAnswer = (questionId, value) => {
    setUserAnswers({ ...userAnswers, [questionId]: value });
  };

  // Envia as respostas e calcula a pontuação
  const submitAnswers = () => {
    let currentScore = 0;

    questions.forEach((question) => {
      const correctAnswer = question.answers.find((answer) => answer.isCorrect);
      if (userAnswers[question.id] === correctAnswer?.id) {
        currentScore++;
      }
    });

    setScore(currentScore);

    if (attempts < 2) {
      setAttempts(attempts + 1);
    } else {
      setShowResults(true);
    }
  };

  // Reinicia o quiz para outra tentativa
  const restartAttempt = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  // Reinicia o quiz completamente
  const restartQuiz = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setScore(0);
    setAttempts(0);
    setShowResults(false);
  };

  return (
    <div className="container">
      <header>
        <h1>Questionário de Desenvolvimento Web</h1>
      </header>

      {showResults ? (
        <div>
          <h2>Resultado Final</h2>
          <p>
            Você acertou {score} de {questions.length} perguntas.
          </p>
          <button onClick={restartQuiz}>Iniciar Novo Quiz</button>
        </div>
      ) : (
        <div>
          {attempts > 0 && attempts < 3 && (
            <div>
              <h2>
                Você acertou {score} de {questions.length} na tentativa {attempts}.
              </h2>
              <button onClick={restartAttempt}>
                Tentar Novamente ({3 - attempts} restante
                {3 - attempts > 1 ? "s" : ""})
              </button>
            </div>
          )}

          {attempts < 3 && (
            <div>
              <div className="question">
                <p>
                  {currentQuestionIndex + 1}.{" "}
                  {questions[currentQuestionIndex]?.text}
                </p>
                <div className="quiz-options">
                  {questions[currentQuestionIndex]?.answers.map((answer) => (
                    <div key={answer.id}>
                      <input
                        type="radio"
                        name={`q${questions[currentQuestionIndex]?.id}`}
                        value={answer.id}
                        onChange={() =>
                          handleAnswer(
                            questions[currentQuestionIndex]?.id,
                            answer.id
                          )
                        }
                        checked={
                          userAnswers[questions[currentQuestionIndex]?.id] ===
                          answer.id
                        }
                      />
                      <label>{answer.text}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="navigation">
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                  disabled={currentQuestionIndex === 0}
                >
                  Pergunta Anterior
                </button>
                <button
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Próxima Pergunta
                </button>
                {currentQuestionIndex === questions.length - 1 && (
                  <button onClick={submitAnswers}>Enviar Respostas</button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

