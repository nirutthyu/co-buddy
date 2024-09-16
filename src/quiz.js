import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Quiz.css"; 
import Footer from "./Footer";

export default function Quiz({score,setScore}) {
  const [topic, setTopic] = useState("");
  const [quizData, setQuizData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const generateQuiz = async () => {
    if (!topic) {
      console.log("Topic is not entered");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ topic }),
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch("http://localhost:3001/gemini/quiz", options);
      if (!response.ok) {
        throw new Error("Failed to get response from server");
      }
      const data = await response.json();
      setQuizData(data.questions);
      setAnswers(data.answers);
      setResults(null); 
      setScore(0); 
      setUserAnswers({}); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    setUserAnswers((prevUserAnswers) => ({
      ...prevUserAnswers,
      [index]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("submitting the answers");
    let newScore = 0;
    const results = quizData.map((question, index) => {
      const userAnswer = userAnswers[index] || "";
      const correctAnswer = answers[index].replace("Answer:", "").trim();
      const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
      if (isCorrect) {
        newScore += 1;
      }
      return {
        question,
        correctAnswer,
        userAnswer,
        isCorrect,
      };
    });

    setScore(newScore);
    setResults(results);
    setUserAnswers({});
    const email = localStorage.getItem("useremail");
    if (email) {
      try {
        const response = await fetch("http://localhost:3001/save-score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, score: newScore }),
        });
        const data = await response.json();
        if (data.status === "success") {
          console.log("Score saved successfully");
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error saving score:", error);
      }
    } else {
      console.error("No email found in localStorage");
    }
};

  const questions = quizData.map((question, index) => (
    <div key={index} className="question-container">
      <p className="question">{question.replace("**Question**:", "").trim()}</p>
      <input
        type="text"
        onChange={(e) => handleInputChange(e, index)}
        value={userAnswers[index] || ""}
        className="answer-input"
      />
    </div>
  ));

  return (
    <>
       <div style={{backgroundColor:"#e6e6fa",height:"8vh",position:"sticky",top:"0",alignContent:"center"}}>
      <Link class="linkStyle" to="/home"><button class="btnStyle">Back</button></Link>
    </div>
      <div className="quiz-wrapper">
        <div className="quiz-container">
          <h1 className="title">Quiz Generator</h1>
          <div className="input-container">
            <p className="input-label">Enter a topic:</p>
            <input
              type="text"
              onChange={(e) => setTopic(e.target.value)}
              value={topic}
              className="topic-input"
            />
            <button onClick={generateQuiz} className="generate-button">Generate</button>
          </div>
          <div className="questions-container">
            {questions}
            {quizData.length > 0 && (
              <button onClick={handleSubmit} className="submit-button">Submit Answers</button>
            )}
          </div>
          {results && (
            <div className="results-container">
              <h2>Score: {score} / {quizData.length}</h2>
              <h2>Results:</h2>
              {results.map((result, index) => (
                <div key={index} className="result-item">
                  <p>Question: {result.question}</p>
                  <p>Your Answer: {result.userAnswer}</p>
                  <p>Correct Answer: {result.correctAnswer}</p>
                  <p className={result.isCorrect ? 'correct' : 'incorrect'}>
                    {result.isCorrect ? 'Correct' : 'Incorrect'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
