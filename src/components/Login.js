import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; 

function Login() {
    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data === "exist") {
                localStorage.setItem("useremail", email);
                history("/home", { state: { id: email } });
            } else if (data === "notexist") {
                alert("User has not signed up");
            } else {
                alert("Wrong details or server error");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to login. Please try again.");
        }
    }

    return (
        <div className="login-container">
            <div className="login">
                <h1>Login</h1>
                <form onSubmit={submit}>
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
                    <button type="submit">Login</button>
                </form>
                <br />
                <p>OR</p>
                <br />
                <Link to="/signup">Signup Page</Link>
            </div>
        </div>
    );
}

export default Login;
