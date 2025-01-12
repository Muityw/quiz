// Importa o React e o useState 
import React, { useState } from "react";
import questions from "./questions";
import './styles/estilo.css';

// Função que define o componente App
/*esta função serve para o armazemaneto da resposta dada
 pelo usuario, ela utiliza currentQuestionIndex, 
 para que seja armazemado a ordem das peguguntas .
E o userAnswer serve para armazemas as respostas do usuario */
function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
   
    questions.reduce((acc, question) => {
      acc[question.id] = null;
      return acc;
    }, {})
  );

  //  serve para que seja realizado a soma da pontuação 
  //setScore é usada para atualizar o valor
  const [score, setScore] = useState(0);

  // serve para dizer quandas vezes o usuario tentou realizar o quiz 
  const [attempts, setAttempts] = useState(0);

  // Vai ser responsavel por dar o feedback da maior pontuação do usuario no quiz
  const [maxScore, setMaxScore] = useState(0);

  // Serve para mostrar  os resultados encontrados 
  // qualdo chegar a true quer dizer que o usuario acabou o quiz 
  const [showResults, setShowResults] = useState(false);

  // vai ser a função responsavél por atualizar a resposta que o usuario der, usando o 
  // userAnswer 
  const handleAnswer = (questionId, value) => {
    setUserAnswers({ ...userAnswers, [questionId]: value });
  };

 

  // Função para avançar para a próxima pergunta
  // o if serve para fazer uma verificação se existe mais oerguntas a frenet.
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // A mesma coisa da questão anterios porém ela vai servir para
  //  que seja possivel voltar o questionario
  const prevQuestion = () => {

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  //enviar as respostas e calcular a pontuação
  const submitAnswers = () => {
    /* Esta parte serve para confirmar a questão do usuario
    reduce  vai soamr a pontuação da questão,começando do zero.
    dessa forma o score vai procurar o valor 1, q vai ser a resposta correta */

    const correctAnswers = questions.reduce((score, question) => {
      const correctAnswer = question.answers.find((answer) => answer.value === "1");
      return score + (userAnswers[question.id] === correctAnswer?.value ? 1 : 0);
    }, 0);

    // Atualiza a pontuação do usuário
    setScore(correctAnswers);

    // Incrementa o número de tentativas
    setAttempts(attempts + 1);

    /* oeste if serve para verificar a pontuação, caso ela seja maior do que estav 
    armazedo no maxScore vai ser atulizada no setMaxScore  */ 
    if (correctAnswers > maxScore) {
      setMaxScore(correctAnswers);
    }

    // este if vai verificar se o usuario realizou as 3 tentativas, 
    // caso isso ocora o jogo não reacilizar 
    if (attempts < 2) {
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

  
  return (
    <div className="container">
      <header>
        <h1>Questionário de Desenvolvimento Web</h1>
      </header>

      {showResults ? (
        // showResults fica resposavel por mostrar o resultado da pontuação
        <div>
          <h2>Resultado:</h2>
          <p>Sua maior pontuação foi {maxScore} de {questions.length} perguntas.</p>
        </div>
      ) : (

        // Exibe as perguntas
        // {currentQuestionIndex + 1}. {questions[currentQuestionIndex].text}  
        // resposavel por extrati o texto de question.js//

        /*{questions[currentQuestionIndex].answers.map((answer, index) => 
          o map fica resposável por precorrer as questões de acordo com o index */ 

          /**  onChange={() => handleAnswer, é acionada quando o usuario escolhe a opção desejada 
           * a função handleAnswer foi declarada no inicio do codigo +/- na linha 37*/

          /** checked={userAnswers[questions[currentQuestionIndex].id] === answer.value}
           * fica responsavel por compara a resposta que foi dada com a correta 
           */

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