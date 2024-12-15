import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import "./styles.css";

// Random number generator function
const generateRandomNumber = (max) => Math.floor(Math.random() * max) + 1;

function App() {
  const [maxNumber, setMaxNumber] = useState(20);
  const [secretNumber, setSecretNumber] = useState(generateRandomNumber(20));
  const [score, setScore] = useState(20);
  const [message, setMessage] = useState("Start guessing...");
  const [timeLeft, setTimeLeft] = useState(30);

  const timerRef = useRef(null); // Use useRef to persist the timer

  // Timer logic
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timerRef.current);
          setMessage("⏰ Time's up! You lost!");
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, []);

  const handleGuess = (guess) => {
    if (guess === secretNumber) {
      setMessage("🎉 Correct number!");
      clearInterval(timerRef.current); // Stop the timer
    } else if (guess > secretNumber) {
      setScore((prev) => prev - 1);
      setMessage("😒 Too high!");
    } else {
      setScore((prev) => prev - 1);
      setMessage("😒 Too low!");
    }
  };

  const handleReset = () => {
    setSecretNumber(generateRandomNumber(maxNumber));
    setScore(20);
    setMessage("Start guessing...");
    setTimeLeft(30);
    clearInterval(timerRef.current); // Clear previous timer
    timerRef.current = setInterval(() => {
      // Restart the timer
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timerRef.current);
          setMessage("⏰ Time's up! You lost!");
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);
  };

  const handleMaxNumberChange = (e) => {
    const newMaxNumber = Number(e.target.value);
    if (!isNaN(newMaxNumber) && newMaxNumber > 0) {
      setMaxNumber(newMaxNumber);
      setSecretNumber(generateRandomNumber(newMaxNumber));
    }
  };

  return (
    <div className="app">
      {/* Header Section with Reset Button */}
      <Header onReset={handleReset} />

      {/* Input to dynamically change the max range */}
      <div>
        <label>Set Max Number: </label>
        <input
          type="number"
          value={maxNumber}
          onChange={handleMaxNumberChange}
          className="btn max-number"
        />
      </div>

      {/* Main Game Section */}
      <Main
        score={score}
        message={message}
        timeLeft={timeLeft}
        onGuess={handleGuess}
      />
    </div>
  );
}

export default App;
