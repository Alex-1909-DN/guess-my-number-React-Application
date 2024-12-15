import { useState } from "react";
import PropTypes from "prop-types";

function Main({ score, message, timeLeft, onGuess }) {
  const [guess, setGuess] = useState("");

  const handleSubmit = () => {
    if (guess) {
      onGuess(Number(guess));
      setGuess("");
    }
  };

  return (
    <main>
      <div>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter a number..."
        />
        <button onClick={handleSubmit} className="btn submit">
          Submit
        </button>
      </div>
      <div>
        <p className="message">{message}</p>
        <p className="score">Score: {score}</p>
        <p className="timer">⏰ Time Left: {timeLeft} seconds</p>
      </div>
    </main>
  );
}

// Prop type validation
Main.propTypes = {
  score: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  timeLeft: PropTypes.number.isRequired,
  onGuess: PropTypes.func.isRequired,
};

export default Main;
