import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
export default function Dashboard() {
  const [gold, setGold] = useState(0);
  const [silver, setSilver] = useState(0);
  const [bronze, setBronze] = useState(0);
  const fetchMedalCounts = async () => {
    const email = localStorage.getItem("useremail");
    try {
      const response = await fetch("http://localhost:3001/get-medal-counts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (
        data &&
        data.gold !== undefined &&
        data.silver !== undefined &&
        data.bronze !== undefined
      ) {
        setGold(data.gold);
        setSilver(data.silver);
        setBronze(data.bronze);
      }
    } catch (error) {
      console.error("Error fetching medal counts:", error);
    }
  };

  useEffect(() => {
    fetchMedalCounts(); 
  }, []);

  return (
    <>
      {" "}
      <div
        style={{
          backgroundColor: "#e6e6fa",
          height: "8vh",
          position: "sticky",
          top: "0",
          alignContent: "center",
        }}
      >
        <Link class="linkStyle" to="/home">
          <button class="btnStyle">Back</button>
        </Link>
      </div>
      <div className="dashboard-container">
        <div className="d-flex flex-row align-items-center">
          <img
            src="https://png.pngtree.com/png-vector/20230725/ourmid/pngtree-golden-award-badge-vector-png-image_8669069.png"
            className="medals"
            alt="Gold Medal"
          />
          <div>{gold}</div>
        </div>
        <div className="d-flex flex-row align-items-center">
          <img
            src="https://png.pngtree.com/png-clipart/20230801/original/pngtree-silver-round-award-badge-on-white-picture-image_7742721.png"
            className="medals"
            alt="Silver Medal"
          />
          <div>{silver}</div>
        </div>
        <div className="d-flex flex-row align-items-center">
          <img
            src="https://i.pinimg.com/originals/e7/9d/cc/e79dccfab135d113c95d1d33f1ebed50.png"
            className="medals"
            alt="Bronze Medal"
          />
          <div>{bronze}</div>
        </div>
      </div>
    </>
  );
}