import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Login.css"; 

const API_URL = process.env.REACT_APP_API_URL;

function Login() {
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            const { email, name } = decoded;

            const res = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password: "google-oauth" })
            });

            const response = await res.json();
            console.log(response);

            localStorage.setItem("useremail", email);
            localStorage.setItem("name", name);

            navigate("/home", { state: { id: email } });
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed");
        }
    };

    const handleError = () => {
        alert("Google Sign-In was unsuccessful. Please try again.");
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Sign in with Google</h1>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                />
            </div>
        </div>
    );
}

export default Login;
