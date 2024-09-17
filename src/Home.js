import React from "react"
import {Link} from "react-router-dom" 


export default function Home(){
    
    return(
        <div style={{backgroundColor:"#e6e6fa",minHeight:"100vh",padding:"20px", display: "flex",flexDirection: "column",alignItems: "center"}}>
            <h1><center>Welcome to Co-Buddy!</center></h1>
            <p><center>Start your learning journey with quizzes and chat support.</center></p>
        <div className="button-container" style={buttonContainerStyle}>
        <Link style={linkStyle} to="/quiz"><button style={btnStyle}>Quiz</button></Link>
        <Link style={linkStyle} to="/chat"><button style={btnStyle}>Chat</button></Link>
        <Link style={linkStyle} to="/Dashboard"><button style={btnStyle}>My progress</button></Link>
        </div>
            <section style={sectionStyle}>
                <center>
                <h2>What Our Users Say</h2>
                <blockquote>"This app is fantastic for learning!"</blockquote>
                <blockquote>"I love the quizzes and chat feature!"</blockquote>
                </center>
            </section>
        </div>
    );
}
const buttonContainerStyle = {
    display: "flex",
    flexDirection: "column", 
    alignItems: "center",
    marginTop: "20px",
    gap: "10px"
};

const btnStyle = {
    padding: "15px 30px",
    backgroundColor: "#6a5acd",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "250px" 
};

const linkStyle = {
    textDecoration: "none",
    color: "inherit",
    fontWeight: "bold"
};

const sectionStyle = {
    textAlign: "center",
    marginTop: "30px",
    backgroundColor: "#f8f8ff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "90%",
    maxWidth: "600px"
};