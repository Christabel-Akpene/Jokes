import React from "react";
import "./index.css";

const Card = ({
  setup,
  punchline,
  funny,
  humorless,
  funnyBtn,
  humorlessBtn,
}) => {
  // console.log("card.jsx", funnyBtn, humorlessBtn);

  return (
    <div className="container">
      <p>{setup}</p>
      <p>
        <span>{punchline}</span>
      </p>
      <div className="buttons">
        <button onClick={humorless} disabled={humorlessBtn}>
          😏
        </button>
        <button onClick={funny} disabled={funnyBtn}>
          🤣
        </button>
      </div>
    </div>
  );
};

export default Card;
