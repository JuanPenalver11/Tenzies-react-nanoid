import React from "react";
import "../styles/Die.css";

function Die(props) {

    let background = props.isHeld ? {background:"pink"} : {background:"white"}

    
  return (
    <div className="die" style={background} onClick={props.handleClick}>
      <p>{props.value}</p>
    </div>
  );
}

export default Die;