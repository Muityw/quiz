import React, { useState, useEffect } from "react";
import "./styles/estilo.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [highestScore, setHighestScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false); // Estado para controle do fim do quiz
  const [loading, setLoading] = useState(true); // Estado para controle de carregamento

  // Carrega as perguntas do XML
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch("/questions.xml");
        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "application/xml");

        // Verifica se o XML foi carregado corretamente
        const questionNodes = xmlDoc.getElementsByTagName("question");
        if (questionNodes.length === 0) {
          throw new Error("Nenhuma pergunta encontrada no XML.");
        }

        const parsedQuestions = Array.from(questionNodes).map((question) => ({
          id: question.getAttribute("id"),
          text: question.getElementsByTagName("text")[0].textContent,
          answers: Array.from(question.getElementsByTagName("answer")).map((answer) => ({
            value: answer.getAttribute("value"),
            text: answer.textContent,
          })),
        }));

        setQuestions(parsedQuestions);

        // Inicializa as respostas do usuário
        setUserAnswers(
          parsedQuestions.reduce((acc, question) => {
            acc[question.id] = null;
            return acc;
          }, {})
        );

        setLoading(false); // Define que o carregamento foi concluído
      } catch (error) {
        console.error("Erro ao carregar o XML:", error);
        setLoading(false); // Finaliza o carregamento mesmo se houver erro
      }
    };

    loadQuestions();
  }, []); // A dependência vazia garante que isso ocorra apenas uma vez ao carregar o componente

  // Manipula a resposta do usuário
  const handleAnswer = (questionId, value) => {
    setUserAnswers({ ...userAnswers, [questionId]: value });
  };

  // Envia o questionário
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
      setQuizFinished(true); // Marca o quiz como finalizado
    }

    // Desabilita o botão de envio após a primeira tentativa
    document.getElementById("submit-button").disabled = true;
  };

  // Função para exibir a próxima questão
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Função para exibir a questão anterior
  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Renderização do questionário
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

      {attemptsLeft === 0 && <p>Você não pode mais responder o questionário.</p>}
      {quizFinished && <p>O questionário foi finalizado.</p>}

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
        {loading ? (
          <p>Carregando perguntas...</p>
        ) : questions.length > 0 && attemptsLeft > 0 ? (
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
                    userAnswers[questions[currentQuestionIndex].id] === answer.value
                  }
                />
                {answer.text}
              </label>
            ))}
          </div>
        ) : (
          <p>Sem perguntas disponíveis.</p>
        )}
      </main>

      {attemptsLeft > 0 && !quizFinished && (
        <>
          <div className="navigation-buttons">
            <button onClick={previousQuestion} disabled={currentQuestionIndex === 0}>
              ← Anterior
            </button>
            <button
              onClick={nextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
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
        </>
      )}
    </div>
  );
}

export default App;
