// Importa o React e o useState para gerenciar o estado do componente
import React, { useState } from "react";

// Importa as perguntas do arquivo questions.js
import questions from "./questions";

// Importa o arquivo de estilos para o componente
import './styles/estilo.css';

// Função que define o componente App
function App() {
  // Estado para armazenar o índice da pergunta atual
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Estado para armazenar as respostas do usuário
  const [userAnswers, setUserAnswers] = useState(
    // Inicializa as respostas como null para cada pergunta
    questions.reduce((acc, question) => {
      acc[question.id] = null;
      return acc;
    }, {})
  );

  // Estado para armazenar a pontuação do usuário
  const [score, setScore] = useState(0);

  // Estado para armazenar o número de tentativas do usuário
  const [attempts, setAttempts] = useState(0);

  // Estado para armazenar a maior pontuação alcançada pelo usuário
  const [maxScore, setMaxScore] = useState(0);

  // Estado para controlar a exibição dos resultados
  const [showResults, setShowResults] = useState(false);

  // Função para lidar com a seleção de respostas
  const handleAnswer = (questionId, value) => {
    // Atualiza as respostas do usuário com a nova resposta
    setUserAnswers({ ...userAnswers, [questionId]: value });
  };

  // Função para avançar para a próxima pergunta
  const nextQuestion = () => {
    // Verifica se a próxima pergunta existe
    if (currentQuestionIndex < questions.length - 1) {
      // Avança para a próxima pergunta
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Função para voltar para a pergunta anterior
  const prevQuestion = () => {
    // Verifica se a pergunta anterior existe
    if (currentQuestionIndex > 0) {
      // Volta para a pergunta anterior
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Função para enviar as respostas e calcular a pontuação
  const submitAnswers = () => {
    // Calcula a pontuação do usuário
    const correctAnswers = questions.reduce((score, question) => {
      const correctAnswer = question.answers.find((answer) => answer.value === "1");
      return score + (userAnswers[question.id] === correctAnswer?.value ? 1 : 0);
    }, 0);

    // Atualiza a pontuação do usuário
    setScore(correctAnswers);

    // Incrementa o número de tentativas
    setAttempts(attempts + 1);

    // Verifica se a pontuação atual é maior que a maior pontuação alcançada
    if (correctAnswers > maxScore) {
      // Atualiza a maior pontuação alcançada
      setMaxScore(correctAnswers);
    }

    // Verifica se o usuário já fez 3 tentativas
    if (attempts < 2) {
      // Reinicializa as respostas do usuário
      setUserAnswers(
        questions.reduce((acc, question) => {
          acc[question.id] = null;
          return acc;
        }, {})
      );

      // Volta para a primeira pergunta
      setCurrentQuestionIndex(0);
    } else {
      // Exibe os resultados
      setShowResults(true);
    }
  };

  // Retorna o JSX do componente
  return (
    <div className="container">
      <header>
        <h1>Questionário de Desenvolvimento Web</h1>
      </header>

      {showResults ? (
        // Exibe os resultados
        <div>
          <h2>Resultado:</h2>
          <p>Sua maior pontuação foi {maxScore} de {questions.length} perguntas.</p>
        </div>
      ) : (
        // Exibe as perguntas
        <div>
          <div className="question">
            <p>
              {currentQuestionIndex + 1}. {questions[currentQuestionIndex].text}
            </p>
            <div className="quiz-options">
              {questions[currentQuestionIndex].answers.map((answer, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name={`q${questions[currentQuestionIndex].id}`}
                    value={answer.value}
                    onChange={() => handleAnswer(questions[currentQuestionIndex].id, answer.value)}
                    checked={userAnswers[questions[currentQuestionIndex].id] === answer.value}
                  />
                  <label>{answer.text}</label>
                </div>
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
            <button onClick={submitAnswers}>
              Enviar Respostas
            </button>
          </div>
          <p>Tentativas restantes: {3 - attempts}</p>
        </div>
      )}
    </div>
  );
}

// Exporta o componente App para ser utilizado em outros arquivos
export default App;