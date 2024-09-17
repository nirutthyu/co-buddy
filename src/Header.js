import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  let name=localStorage.getItem("name")
  name=name.charAt(0).toUpperCase()+name.slice(1).toLowerCase()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const navigate = useNavigate();

  

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    navigate("/"); 
  };




  return (
    <div className="container-fluid d-flex align-items-center header" style={{ backgroundColor: "#6a5acd", color: "#fff", padding: "10px 20px", position: 'relative' }}>
      <div style={{ flex: "1" }}>
        <h4 style={{ fontFamily: "Arial, sans-serif" }}>Hey there! Welcome back {name}</h4>
      </div>
      <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <img
          className="rounded-circle profile m-2"
          src="https://dorelaiepan.com/wp-content/uploads/2023/03/computer-icon-education-studying-2429310-1024x1024.png"
          alt="Profile"
          style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "50%", cursor: "pointer" }}
          onClick={handleMenuToggle}
        />
        {isMenuOpen && (
          <div style={{
            position: "absolute",
            top: "60px", 
            right: "20px", 
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: "5px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            zIndex: 1000
          }}>
    
            <button onClick={handleLogout} style={menuItemStyle}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

const menuItemStyle = {
  display: "block",
  background: "none",
  border: "none",
  padding: "10px",
  textAlign: "left",
  width: "100%",
  cursor: "pointer",
  fontFamily: "Arial, sans-serif",
  color: "#333"
};