import React, { useState } from "react";
import {
  coinsPowerup,
  erasersPowerup,
  livesPowerup,
} from "../Helpers/DummyData";
import { GiTwoCoins } from "react-icons/gi";
import naira from "../img/blackNaira.svg";
import { ImHeart } from "react-icons/im";
import newEraserBig from "../img/NewEraserBig.svg";

import "./styles3.css";

export const CoinsComponent = () => {
  const [stake, setStake] = useState();
  return (
    <div className="powerups_card">
      <h3>Coins</h3>
      <p className="descrip_tag">Get more coins and play without limits.</p>
      <div className="powerups_row">
        {coinsPowerup.map((c) => (
          <div
            className="each__powerup__select"
            onClick={() => setStake(c.amount)}
          >
            <p className="amount_paragraph">
              {c.amount}
              <GiTwoCoins
                className="yellow__coins"
                style={{ marginLeft: "4px" }}
              />
            </p>
            <div className="price_div">
              <div className="glow">&nbsp;</div>
              {c.amount}
              <img src={naira} alt="" style={{ marginLeft: "4px" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export const ErasersComponent = () => {
  const [stake, setStake] = useState();
  return (
    <div className="powerups_card">
      <h3>Erasers</h3>
      <p className="descrip_tag">
        Increase your chances of winning by hiding one wrong answer with an
        Eraser.
      </p>
      <div className="powerups_row">
        {erasersPowerup.map((c) => (
          <div
            className="each__powerup__select"
            onClick={() => setStake(c.amount)}
          >
            <p className="amount_paragraph">
              {c.amount}
              {/* <RiEraserFill className="blue-color" /> */}
              <img src={newEraserBig} alt="" className="blue-color" />
            </p>
            <div className="price_div">
              <div className="glow">&nbsp;</div>
              {c.price} <GiTwoCoins className="yellow__coins" />{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export const LivesComponent = () => {
  const [stake, setStake] = useState();
  return (
    <div className="powerups_card">
      <h3>Extra Lives</h3>
      <p className="descrip_tag">
        Wrong answer? Use an extra life to get back in the game.
      </p>
      <div className="powerups_row">
        {livesPowerup.map((c) => (
          <div
            className="each__powerup__select"
            onClick={() => setStake(c.amount)}
          >
            <p className="amount_paragraph">
              <span>{c.amount}</span>
              <ImHeart className="red-color" />
            </p>
            <div className="price_div">
              <div className="glow">&nbsp;</div>
              {c.price} <GiTwoCoins className="yellow__coins" />{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
