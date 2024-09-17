import React,{useState} from "react";
import {FaStar} from "react-icons/fa";
function Review(){
    const[rating,setRtaing]=useState(null)
    const[rateclr,setColor]=useState(null)
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
        <p>Your rating is {rating}</p>
    </>
    )
}
export default Review;