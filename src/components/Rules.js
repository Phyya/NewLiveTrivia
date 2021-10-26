import React from "react";
import {
  LiveRules,
  WithFriendRules,
  WithStrangerRules,
} from "../Helpers/DummyData";

const Rules = () => {
  return (
    <div className="rules__container">
      <h1>HOW IT WORKS</h1>
      <div className="each_rules">
        <h3 className="white__h1">PLAYING AN INSTANT GAME</h3>
        <ul>
          {WithStrangerRules.map((r) => (
            <li className="live_game_rules" key={r}>
              {r}
            </li>
          ))}
        </ul>
      </div>
      <div className="each_rules">
        <h3 className="white__h1">PLAYING WITH FRIEND(S)</h3>
        <ul>
          {WithFriendRules.map((r) => (
            <li className="live_game_rules" key={r}>
              {r}
            </li>
          ))}
        </ul>
      </div>
      <div className="each_rules">
        <h3 className="white__h1">LIVE GAMES</h3>
        <ul>
          {LiveRules.map((r) => (
            <li className="live_game_rules" key={r}>
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rules;
