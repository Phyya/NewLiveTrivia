import React from "react";
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import yellowCoin from "../img/yellow-coin.svg";
import naira from "../img/naira.svg";
import undrawVidGame from "../img/undraw_video_game_night_8h8m 2.svg";
import football from "../img/football.svg";
import { basicShare } from "../hooks/usePhoto";
import {
  capitalize,
  timeFormat,
  dateFormat,
  differenceInDates,
} from "../Helpers/Functions";
import musicImg from "../img/music-Img.svg";
import Nav from "./NavLink";
import Header from "./Header";
import notifications from "./LocalNotification";
import { Store, get } from "../context/Store";

const LivegameList = ({ livegames, empty }) => {
  const history = useHistory();
  const { dispatch, state } = useContext(Store);
  let livegamesSorted = livegames;

  livegamesSorted.filter((l) => differenceInDates(+l.gameTime) > 1);
  console.log(livegamesSorted, "sorted");

  const storedLivegames =
    livegames.length !== 0 ? livegames : state.allLiveGames;

  const joinLiveGame = (livegame) => {
    dispatch({ type: "ADDCURRENTLIVEGAME", payload: livegame });
    history.push(`/livegame/${livegame.livegameId}`);
  };

  const checkGame = (id) => {
    let inIt = "";
    const allActiveGames = state.userDetails.activeGames;

    allActiveGames?.forEach((a) => {
      if (a.categoryId === id) {
        inIt = id;
      }
    });
    return inIt;
  };

  const sortedGames =
    storedLivegames.length !== 0
      ? storedLivegames.sort(function (a, b) {
          return Object.values(
            dateFormat(new Date(+a.gameTime).toISOString())
          ) < Object.values(dateFormat(new Date(+b.gameTime).toISOString()))
            ? -1
            : 1;
        })
      : [];

  return (
    <>
      <h3 className="home-page-header marginTop50">
        {livegames.length > 0 && "Upcoming Live Games"}
        {empty && "No Live Games Yet."}
      </h3>
      {sortedGames.map((l) => {
        const {
          activeParticipants,
          activeStatus,
          categoryName,
          entryFee,
          gameTime,
          participants,
          questions,
          reward,
          rewardType,
          shares,
          _id,
        } = l;
        console.log(differenceInDates(+gameTime));
        return (
          <div className="homePage-next-live-game" key={_id}>
            <div className="homePage-next-live-game__description">
              <div className="btn time-btn  btn-top-right">
                <span className="timer">
                  {`${dateFormat(
                    new Date(+gameTime).toISOString()
                  )}  ${timeFormat(new Date(+gameTime).toISOString())}`}
                </span>
                {/* <span className="timer">{timeFormat(+gameTime)}</span> */}
              </div>
              <h1 className="description-header">{capitalize(categoryName)}</h1>
              <p className="home-page-text text-small-width">
                Questions on {categoryName} only
              </p>
              <img src={football} alt="" className="homePage-img" />
              <div className="homePage-next-live-game__description__entry">
                <div className="entry">
                  <span className="entry-text">Entry fee:</span>
                  <span className="entry-figure">{entryFee}</span>
                  <span className="coin">
                    <img src={yellowCoin} alt="" style={{ marginTop: "2px" }} />
                  </span>
                </div>
                <div className="reward">
                  <span className="entry-text">Reward:</span>
                  <span className="entry-figure">{reward}</span>
                  <img
                    src={rewardType === "coin" ? yellowCoin : naira}
                    alt="reward-type"
                    style={{ marginTop: "2px" }}
                  />
                </div>
              </div>
            </div>
            <div className="homePage-btn-container">
              <button onClick={() => basicShare()} className="btn homePage-btn">
                Share
              </button>
              <button
                className="btn homePage-btn"
                onClick={() => {
                  //   notifications.schedule();
                  joinLiveGame(l);
                }}
              >
                {checkGame(_id) === _id ? "Already Joined" : "Join game"}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default LivegameList;
