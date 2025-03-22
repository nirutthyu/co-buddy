import React from "react";
import { Link } from "react-router-dom";
import "./index.css"; // Import the external CSS file

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Co-Buddy!</h1>
      <p>Start your learning journey with AI-generated quizzes</p>
      <div className="button-container">
        <Link to="/quiz"><button className="btn">Quiz</button></Link>
        <Link to="/Dashboard"><button className="btn">My Progress</button></Link>
      </div>
    </div>
  );
}
