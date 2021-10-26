import { useState, useEffect, useContext } from "react";
import { ImHeart, ImHeartBroken } from "react-icons/im";
import { RiEraserFill } from "react-icons/ri";
import { Store } from "../context/Store";
import newEraserBig from "../img/NewEraserBig.svg";

import "./style2.css";
let t;

const Powerups = ({ lives, action, usedEraserOption, noEraser }) => {
  const { state } = useContext(Store);
  const [usedEraser, setUsedEraser] = useState(false);
  const useEraser = () => {
    setUsedEraser(true);
    !usedEraserOption && action();
  };

  return (
    <div className="powerups__container">
      <div className="powerups__lives">
        <div className={`powerups__icon ${lives <= 1 && "smallFontHeart"}`}>
          {lives > 0 && (
            <ImHeart className={`powerups__heart ${lives >= 1 && "red"}`} />
          )}
        </div>
      </div>
      {state.userDetails.erasers > 0 && (
        <button
          className={`powerups__eraserDiv ${
            usedEraserOption && "disableEraser"
          }`}
          onClick={useEraser}
          disabled={usedEraserOption}
        >
          {usedEraserOption && <span className="powerups__disable">\</span>}
          <div className="powerups__icon__eraser">
            <img src={newEraserBig} alt="" className="powerups__eraser" />
          </div>
        </button>
      )}
    </div>
  );
};

export default Powerups;

export const LostLife = ({ close, lives, action }) => {
  const [usedLife, setUsedLife] = useState(false);
  const [seconds, setSeconds] = useState(10);
  useEffect(() => {
    t = setInterval(() => !usedLife && setSeconds((prev) => prev - 1), 1000);
    if (seconds <= 0) {
      close();
      clearInterval(t);
    }
    return () => {
      clearInterval(t);
    };
  });
  const usedExtraLife = () => {
    setUsedLife(true);
    clearInterval(t);
    action();
  };
  return (
    <>
      <div className="overlay"></div>

      <div className="life__modal">
        <p style={{ marginBottom: "20px", fontSize: "15px" }}>
          Failed! Don't give up yet!
        </p>
        <button
          onClick={usedExtraLife}
          className="btn shortbtn pRelative"
          style={{ position: "relative" }}
        >
          Use 1
          {!usedLife ? (
            <ImHeart style={{ background: "transparent", color: "red" }} />
          ) : (
            <ImHeartBroken
              style={{ background: "transparent", color: "red" }}
            />
          )}
          <span
            className="extraLife__time"
            style={{
              position: "absolute",
              right: "0",
              top: "0",
              fontSize: "20px !important",
            }}
          >
            {seconds}
          </span>
        </button>
        <button className="btn shortbtn spacing" onClick={close}>
          I give up!
        </button>
      </div>
    </>
  );
};
