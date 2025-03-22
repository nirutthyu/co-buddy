import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Header() {
  let name = localStorage.getItem("name");
  name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    navigate("/"); 
  };

  return (
    <div className="header-container">
      <div className="header-text">
        <h4>Hey there! Welcome back {name}</h4>
      </div>
      <div className="header-profile">
        <img
          className="profile-img"
          src="https://dorelaiepan.com/wp-content/uploads/2023/03/computer-icon-education-studying-2429310-1024x1024.png"
          alt="Profile"
          onClick={handleMenuToggle}
        />
        {isMenuOpen && (
          <div className="menu-container">
            <button onClick={handleLogout} className="menu-item">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}