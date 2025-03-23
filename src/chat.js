import React, { useState } from "react";
import {Link} from "react-router-dom"
import Footer from "./Footer"

const API_URL = process.env.REACT_APP_API_URL;
export default function Chat() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const getResponse = async () => {
    if (!value) {
      setError("Please ask a question");
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ message: value, history: chatHistory }),
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(`${API_URL}/gemini`, options);
      if (!response.ok) {
        throw new Error("Failed to get response from server");
      }
      const data = await response.text();
      console.log(data);
      setChatHistory(oldChatHistory=>[...oldChatHistory,{role:"user",parts:[{ text: value }]},{role:"model",parts:[{ text:data }]}])
      setValue("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong, please try again");
    }
  };

  const clear = () => {
    setValue("");
    setError("");
    setChatHistory([]);
  };

  return (
    <>
    <div style={{backgroundColor:"#e6e6fa",height:"8vh",position:"sticky",top:"0",alignContent:"center"}}>
      <Link class="linkStyle" to="/home"><button class="btnStyle">Back</button></Link>
    </div>
    <div className="chat">
      <div className="chat-container">
        <div className="chat-history">
          {chatHistory.map((chatItem, index) => (
            <div
              key={index}
              className={`chat-item ${chatItem.role === "user" ? "user" : "model"}`}
            > 
              <p>{chatItem.parts[0].text}</p>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            placeholder="Type here..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {!error && (
            <button  className="btn btn-dark btnStyle" onClick={getResponse}>
              Ask me
            </button>
          )}
          {error && (
            <button className="btn btn-dark btnStyle" onClick={clear}>
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
