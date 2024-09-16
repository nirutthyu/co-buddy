import Login from "./components/Login"
import Signup from "./components/Signup"
import App from "./App"
import Chat from "./chat.js"
import Quiz from "./quiz.js"
import Home from "./Home"
import Dashboard from "./Dashboard"
import {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export default function Main() {
  const [score, setScore] = useState(0);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<App/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/quiz" element={<Quiz score={score} setScore={setScore}/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard score={score} setScore={setScore}/>}/>
        </Routes>
      </Router>
    </div>
  );
}
