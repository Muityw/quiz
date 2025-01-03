import React, { useState, useEffect } from "react";
import "./estilo.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [highestScore, setHighestScore] = useState(0);

  useEffect(() => {
    fetch("questions.xml")
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "application/xml");
        const questionNodes = xmlDoc.getElementsByTagName("question");
        const parsedQuestions = Array.from(questionNodes).map((question) => ({
          id: question.getAttribute("id"),
          text: question.getElementsByTagName("text")[0].textContent,
          answers: Array.from(question.getElementsByTagName("answer")).map(
            (answer) => ({
              value: answer.getAttribute("value"),
              text: answer.textContent,
            })
          ),
        }));
        setQuestions(parsedQuestions);
      })
      .catch((error) => console.error("Erro ao carregar o XML:", error));
  }, []);

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
      setUserAnswers({});
    } else {
      alert("Você esgotou todas as suas tentativas.");
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

      <div className="question-nav">
        {questions.map((_, index) => (
          <a
            key={index}
            href="#!"
            onClick={(e) => {
              e.preventDefault();
              setCurrentQuestionIndex(index);
            }}
          >
            Questão {index + 1}
          </a>
        ))}
      </div>

      <main>
        {questions.length > 0 && (
          <div className="question">
            <p>
              {currentQuestionIndex + 1}.{" "}
              {questions[currentQuestionIndex].text}
            </p>
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={`q${questions[currentQuestionIndex].id}`}
                  value={answer.value}
                  onChange={() =>
                    handleAnswer(questions[currentQuestionIndex].id, answer.value)
                  }
                  checked={
                    userAnswers[questions[currentQuestionIndex].id] ===
                    answer.value
                  }
                />
                {answer.text}
              </label>
            ))}
          </div>
        )}
      </main>

      <div className="navigation-buttons">
        <button
          onClick={() =>
            setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
          }
        >
          ← Anterior
        </button>
        <button
          onClick={() =>
            setCurrentQuestionIndex((prev) =>
              Math.min(prev + 1, questions.length - 1)
            )
          }
        >
          Próxima →
        </button>
      </div>

      <button
        id="submit-button"
        onClick={submitQuiz}
        disabled={attemptsLeft === 0}
      >
        Enviar
      </button>
    </div>
  );
}

export default App;
