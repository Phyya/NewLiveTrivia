import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Store, get } from "../context/Store";
import { AiOutlineWifi } from "react-icons/ai";
import { BiWifiOff } from "react-icons/bi";
import { IonSpinner } from "@ionic/react";

let t;
const RedirectModal = ({ liveId }) => {
  const [seconds, setSeconds] = useState(10);
  const history = useHistory();
  useEffect(() => {
    t = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    seconds === 0 && history.push(`/livegame/${liveId}`);
    return () => {
      clearInterval(t);
    };
  });
  return (
    <>
      <div className="overlay"></div>

      <div className="redirect__modal">
        Redirecting to Live Game in {seconds} seconds
      </div>
    </>
  );
};

export default RedirectModal;

export const SearchPlayerModal = ({
  goToGameZone,
  close,
  searching,
  startSearch,
  found,
  user,
}) => {
  const [playing, setPlaying] = useState(false);

  const fetchQuestion = () => {
    setPlaying(true);
    goToGameZone();
  };
  const searchAgain = () => {
    setPlaying(false);
    startSearch();
  };
  return (
    <>
      <div className="overlay" onClick={close}></div>

      <div className="searchPlayer__modal">
        {searching && (
          <div className="wifi__search">
            <AiOutlineWifi className="newWifi" />
            <p>Searching for player...</p>
          </div>
        )}

        {!searching && (
          <div>
            <h5 style={{ textAlign: "center" }}>
              {found ? "1" : "No"} player found
              <span
                style={{
                  color: "#8a2be2",
                  fontWeight: "600",
                  marginLeft: "5px",
                }}
              >
                {user}
              </span>
            </h5>

            {found ? (
              <button className="btn select-btn" onClick={fetchQuestion}>
                Play
              </button>
            ) : (
              <button className="btn select-btn" onClick={searchAgain}>
                Keep searching
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};
