import React, { useState } from "react";
import questionsData from "./questions"; // serve para imporatr as quetões que estão no question.jssimport './styles/quiz_css_styles.css'; // como o arquivo de scc esta na parta styles tem esta importação 


function App() {
  const [questions] = useState(questionsData); // Define as perguntas diretamente
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    questions.reduce((acc, question) => {
      acc[question.id] = null;
      return acc;
    }, {})
  );
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [highestScore, setHighestScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (questionId, value) => {
    setUserAnswers({ ...userAnswers, [questionId]: value });
  };

  const submitQuiz = () => {
    const correctAnswers = questions.reduce((score, question) => {
      const correctAnswer = question.answers.find((answer) => answer.value === "1");
      return score + (userAnswers[question.id] === correctAnswer?.value ? 1 : 0);
    }, 0);

    setHighestScore(Math.max(highestScore, correctAnswers));
    setAttemptsLeft(attemptsLeft - 1);

    if (attemptsLeft > 1) {
      alert(`Você acertou ${correctAnswers} de ${questions.length} questões.`);
      setUserAnswers(
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

  // As funções a baixos servem para navergar de um pergunta para a outr, lembra de escrever o que cada uma faz depois 
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

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
          <div>
            <p>
              {currentQuestionIndex + 1}. {questions[currentQuestionIndex].text}
            </p>
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

          <div>
            <button onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
              Anterior
            </button>
            <button onClick={nextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
              Próximo
            </button>
          </div>

          <button onClick={submitQuiz}>Enviar</button>
        </>
      )}
    </div>
  );
}

export default App;

