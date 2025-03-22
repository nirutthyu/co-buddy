import React,{useState} from "react";
import {FaStar} from "react-icons/fa";
const API_URL = process.env.REACT_APP_API_URL;
function Review(){
    const[rating,setRtaing]=useState(null)
    const[rateclr,setColor]=useState(null)
    
    const handleReviewSubmit = async () => {
        const email = localStorage.getItem("useremail"); // Get user email
        const data = { rating, email };
        
    
        try {
          const response = await fetch(`${API_URL}/save-rating`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          const result = await response.json();
          if (result.status === "success") {
            alert("Rating submitted successfully!");
          } else {
            alert("Failed to submit rating.");
          }
        } catch (error) {
          console.error("Error submitting rating:", error);
        }
      };
      
    const starStyle = {
        filter: "drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.2))", // Adding a shadow effect to stars
      };
    return(        
    <>
        {[...Array(5)].map((star,index)=>{
            const currentrate=index+1
            return(
                <>
                <label>
                <input type="radio" name="rate"
                value={currentrate}
                onClick={()=>setRtaing(currentrate)}
                style={{display:"none"}}
                />
                <FaStar size={50}
                color={currentrate <=(rateclr || rating)? "#FFD700":"grey"}
                style={starStyle}
                onMouseEnter={() => setColor(rateclr)}
                onMouseLeave={() => setColor(null)}
                />
                </label>
                </>
            )
        }
        )}
        <br></br>

        <button onClick={handleReviewSubmit} style={{ marginTop: "10px",border:"none",backgroundColor:"rgb(106, 90, 205)",borderRadius:"5px",color:"white"}}>
        Submit Rating
      </button>
    </>
  );
}

export default Review;