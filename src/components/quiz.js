import React, { useEffect, useState } from 'react';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch("/questions.xml");
        if (!response.ok) {
          throw new Error("Falha ao carregar o XML.");
        }

        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "application/xml");

        const questionNodes = xmlDoc.getElementsByTagName("question");
        const parsedQuestions = Array.from(questionNodes).map((question) => {
          const questionText = question.getElementsByTagName("text")[0]?.textContent.trim() || "";
          const answers = Array.from(question.getElementsByTagName("answer")).map((answer) => ({
            value: answer.getAttribute("value"),
            text: answer.textContent.trim(),
          }));
          return {
            id: question.getAttribute("id"),
            text: questionText,
            answers,
          };
        });

        setQuestions(parsedQuestions);
        setLoading(false);

        setUserAnswers(
          parsedQuestions.reduce((acc, question) => {
            acc[question.id] = null;
            return acc;
          }, {})
        );
      } catch (error) {
        console.error("Erro ao carregar o XML:", error);
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleAnswerChange = (questionId, value) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  if (loading) {
    return <div>Carregando perguntas...</div>;
  }

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
    </div>
  );
};

export default Quiz;
