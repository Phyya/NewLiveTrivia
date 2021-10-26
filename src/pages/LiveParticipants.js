import React, { useEffect, useState, useContext } from "react";
import { FcAlarmClock } from "react-icons/fc";
import { Store, get } from "../context/Store";
import "./MyStyles.css";
import { Rules } from "../Helpers/DummyData";
import FalseTime from "../components/LiveComponents/FalseTime";
import GameMode from "../components/LiveComponents/GameMode";

const LiveParticipants = () => {
  const { state } = useContext(Store);
  const countdownTime = state.isTime[1]?.gameTime
    ? state.isTime[1]?.gameTime
    : state.currentLiveGame.gameTime;
  const now = new Date().getTime();
  const differenceInTimes = countdownTime - now;
  const [gameMode, setGameMode] = useState(differenceInTimes === 0);

  useEffect(() => {
    differenceInTimes <= 0 && setGameMode(true);
  }, []);

  return (
    <div>
      {!gameMode && (
        <FalseTime setGameMode={setGameMode} gameTime={countdownTime} />
      )}
      {gameMode && <GameMode />}
    </div>
  );
};
export default LiveParticipants;
