/* eslint-disable react/prop-types */
import "./index.css";

function Card({setup, punchline, handleFunnyClick, handleHumorlessClick, humorlessBtnDisabled, funnyBtnDisabled}){
  return (
    <div className="container">
      <p>{setup}</p>
      <p>
        <span>{punchline}</span>
      </p>
      <div className="buttons">
        <button disabled={humorlessBtnDisabled} onClick={handleHumorlessClick}>
          😏
        </button>
        <button disabled={funnyBtnDisabled} onClick={handleFunnyClick}>
          🤣
        </button>
      </div>
    </div> 
)}



export default Card;
