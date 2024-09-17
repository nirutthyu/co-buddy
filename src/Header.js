import React from "react";
export default function Header() {
  let name=localStorage.getItem("name");
  name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  return (
    <div className="container-fluid d-flex align-items-center header " style={{ backgroundColor: "#6a5acd", color: "#fff", padding: "10px 20px" }}>
        <div style={{ flex: "1" }}>
        <h4 style={{ fontFamily: "Arial, sans-serif" }}>Hey there ! Welcome back {name} </h4>
        </div>
        <div style={{flex: "1", justifyContent: "flex-end",marginLeft:"auto",  display: "flex", alignItems: "center" }} className="d-flex align-items-center ">
        <img className="rounded-circle profile m-2" src="https://dorelaiepan.com/wp-content/uploads/2023/03/computer-icon-education-studying-2429310-1024x1024.png" alt="Profile" style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "50%" }} />
        <div className="mt-3" style={{ marginLeft: "10px" }}><p style={{ fontFamily: "Arial, sans-serif", color: "#fff", fontWeight: "bold" }}></p></div>
        </div>
    </div>
  );
}