import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css"; 
const API_URL = process.env.REACT_APP_API_URL;
function Signup() {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[name,setName]=useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name,email, password }),
            });

            const data = await res.json();

            if (data === "exist") {
                alert("User already exists");
            } else if (data === "notexist") {
                localStorage.setItem("useremail", email);
                localStorage.setItem("name", name);
                history("/home", { state: { id: email } });
            }
        } catch (error) {
            alert("Wrong details or server error");
            console.error("Error:", error);
        }
    }

    return (
        <div className="signup-container">
            <div className="signup">
                <h1>Signup</h1>
                <form onSubmit={submit}>
                <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <button type="submit">Signup</button>
                </form>
                <br />
                <p>OR</p>
                <br />
                <Link to="/">Login Page</Link>
            </div>
        </div>
    );
}

export default Signup;
