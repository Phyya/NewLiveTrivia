import React, { useEffect, useState, useContext } from "react";
import { FcAlarmClock } from "react-icons/fc";
import { Store, get } from "../context/Store";
import "../pages/MyStyles.css";
import Drawer from "@material-ui/core/Drawer";
import { IoIosPeople, IoMdPaper } from "react-icons/io";
import FalseTime from "./LiveComponents/FalseTime";
import GameMode from "./LiveComponents/GameMode";

const LiveGame = () => {
  const { state } = useContext(Store);
  const countdownTime = state.isTime[1]?.gameTime
    ? state.isTime[1]?.gameTime
    : state.currentLiveGame.gameTime;
  const now = new Date().getTime();
  const differenceInTimes = countdownTime - now;
  const [gameMode, setGameMode] = useState(differenceInTimes === 0);
  const [anchor, setAnchor] = useState("");
  const [position, setPosition] = useState({
    left: false,

    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setPosition({ ...position, [anchor]: open });
  };

  const goLeft = () => {
    setPosition({ right: false, left: true });
    toggleDrawer("left", true);
  };
  const goRight = () => {
    setPosition({ left: false, right: true });
    toggleDrawer("left", true);
  };

  useEffect(() => {
    differenceInTimes <= 0 && setGameMode(true);
  }, []);

  return (
    <div>
      {!gameMode && (
        <>
          <div className="live__game__header">
            <span
              className="live__game__header__span"
              onClick={() => {
                goLeft();
                setAnchor("left");
              }}
            >
              <IoIosPeople />
              Participants
            </span>
          </div>
          <Drawer
            anchor={anchor}
            open={position[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="drawer__div">
              {anchor === "left" ? "Participants" : "Rules"}
            </div>
          </Drawer>
          <FalseTime
            setGameMode={setGameMode}
            gameTime={countdownTime}
            redirected={state.isTime[1]?.gameTime ? true : false}
          />
        </>
      )}
      {gameMode && <GameMode />}
    </div>
  );
};
export default LiveGame;
