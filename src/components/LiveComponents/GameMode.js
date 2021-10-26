import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router";
import { GiCoins } from "react-icons/gi";
import { Store, get } from "../../context/Store";
import Questions from "../Questions.js";
import Countdown from "../Countdown.js";

import { IonSpinner } from "@ionic/react";
import "../style2.css";

const GameMode = () => {
  const { dispatch, state } = useContext(Store);
  const history = useHistory();
  const [refresh, setRefresh] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(true);
  const [auth, setAuth] = useState({});
  const [playedLiveGames, setPlayedLiveGames] = useState([]);
  const [firstQuestion, setFirstQuestion] = useState({});

  const fetchLivegame = async () => {
    const identifier = state.isTime[1]?.categoryId
      ? state.isTime[1]?.categoryId
      : state.currentLiveGame.livegameId;

    const token = await get("token");
    const playedLiveGames1 = await get("playedLiveGames");
    setPlayedLiveGames(playedLiveGames);
    setAuth({ identifier: identifier, token: token });
    console.log(identifier);
    fetch(`https://sharewave.ng/live/public/user/gamezone.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        livegameId: identifier,
        action: "getQuestions",
        token: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "from joining");
        setLoading(false);
        if (!data.success) {
          setMessage(data.message.errorMessage);
        }
        // if (data.question && playedLiveGames1?.includes(identifier)) {
        //   setMessage("You are no longer a participant in this game!!!");
        //   return;
        // }
        // if (data.question && !playedLiveGames1?.includes(identifier)) {
        //   const questionObj = {
        //     question: data.question,
        //     options: data.options,
        //   };
        //   setFirstQuestion(questionObj);
        //   setPlaying(true);
        // }
        // if (data.message === "Wait for next question") {
        //   setRefresh(true);
        // }
        else {
          setMessage(data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchLivegame();
  }, []);

  return (
    <div>
      {(loading || message) && !playing && (
        <div className="centralize">
          {loading && <IonSpinner name="bubbles" style={{ color: "white" }} />}
          {message && (
            <p className="error__span" style={{ textAlign: "center" }}>
              {message}{" "}
            </p>
          )}
          {!loading && !playing && (
            <button
              onClick={() => history.push("/homepage")}
              className="btn shortbtn"
              style={{ marginTop: "10px" }}
            >
              Go Back To HomePage
            </button>
          )}
        </div>
      )}

      {!loading && playing && (
        <>
          <Questions
            firstQuestion={firstQuestion}
            auth={auth}
            playedLiveGames={playedLiveGames}
          />
        </>
      )}
    </div>
  );
};

export default GameMode;

//  <div className="live__game__header">
//         <span
//           className="live__game__header__span"
//           onClick={() => {
//             goLeft();
//             setAnchor("left");
//           }}
//         >
//           <IoIosPeople />
//           Participants
//         </span>
//         <span
//           className="live__game__header__span"
//           onClick={() => {
//             goRight();
//             setAnchor("right");
//           }}
//         >
//           <IoMdPaper />
//           Rules
//         </span>
//       </div>
//       <Drawer
//         anchor={anchor}
//         open={position[anchor]}
//         onClose={toggleDrawer(anchor, false)}
//       >
//         <div className="drawer__div">
//           {anchor === "left" ? "Participants" : <RulesComponent />}
//         </div>
//       </Drawer>
