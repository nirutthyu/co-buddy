import React from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 


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
                body: JSON.stringify({ name, email, password: "google-oauth" }) // dummy password if needed
            });
            const response=await res.json()
            console.log(response)
            // Save to localStorage or send to backend for verification
            localStorage.setItem("useremail", email);
            localStorage.setItem("name", name);
            
            // Redirect to home
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
            <div className="login">
                <h1>Sign in with Google</h1>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                />
            </div>
        </div>
    );
}

export default Login;
