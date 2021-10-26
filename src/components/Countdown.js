import React, { useState, useEffect } from "react";
import "./style2.css";
const TIMER_VALUE = 3;

const Countdown = ({ startGame }) => {
  const [seconds, setSeconds] = useState(TIMER_VALUE);
  let t;
  const updateTimer = () => {
    t = setInterval(() => setSeconds((prev) => prev - 1), 1000);
  };
  useEffect(() => {
    if (seconds >= 1) updateTimer();
    else startGame();
    seconds === 0 && startGame();
    return () => {
      clearInterval(t);
    };
  }, [seconds]);

  return (
    <div className="countdown__div">
      <div className="countdown__overlay"> </div>
        <h1 className="ready__h1">ARE YOU READY?!!!</h1>
        <span className="seconds__animation">{seconds}</span>
        {seconds <= 1 && <span className="lets-go">Let's go!</span>}
      </div>
  );
};

export default Countdown;
