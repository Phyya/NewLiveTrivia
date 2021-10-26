import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import undrawVidGame from "../img/undraw_video_game_night_8h8m 2.svg";
import football from "../img/football.svg";
import { basicShare } from "../hooks/usePhoto";
import { capitalize } from "../Helpers/Functions";
import { Store, get, set, remove } from "../context/Store";
import musicImg from "../img/music-Img.svg";
import Nav from "./NavLink";
import Header from "./Header";
import notifications from "./LocalNotification";
import LivegameList from "./LivegameList";
import { IonSpinner } from "@ionic/react";
import RedirectModal from "./RedirectModal";

const HomePage = () => {
  const history = useHistory();
  const { state, dispatch, redirectToGameZone, interval } = useContext(Store);
  const [loading, setLoading] = useState(false);
  const [livegames, setLivegames] = useState(state.allLiveGames);
  const [redirectModal, setRedirectModal] = useState(false);
  const [liveId, setLiveId] = useState("");
  const [empty, setEmpty] = useState(false);

  const getUser = async () => {
    const token = await get("token");
    console.log(token, "token");
    dispatch({ type: "GETTOKEN", payload: token });

    fetch("https://sharewave.ng/live/public/user/user-details.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error("Something went wrong");
          });
        }
      })
      .then((data) => {
        console.log(data, "userdetails");
        if (!data.success) {
          return;
        }
        dispatch({
          type: "ADDINFO",
          payload: {
            username: data.userDetails.username,
            coins: +data.userDetails.coins,
            earnings: data.userDetails.earnings,
            erasers: +data.userDetails.erasers,
            extraLives: +data.userDetails.extraLives,
            phone: data.userDetails.phone,
            activeGames: data.userDetails.activeGames,
            profilePic: data.userDetails.profilePic,
            accountNumber: data.userDetails.accountNumber,
            bank: data.userDetails.bank,
            fullName: data.userDetails.fullName,
            phoneNumber: data.userDetails.phoneNumber,
            totalEarnings: data.userDetails.totalEarnings,
            userId: data.userDetails.userId,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("https://sharewave.ng/live/public/user/view-livegames.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "livegames");
        setLoading(false);
        if (!data.success) throw new Error(data.message.errorMessage);
        else {
          const mapped = data.livegames.map((l) => {
            return { ...l, gameTime: +l.gameTime * 1000 };
          });
          setLivegames(mapped);
          if (data.livegames.length === 0) setEmpty(true);
          dispatch({
            type: "ADDALLLIVEGAME",
            payload: data.livegames,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUser();
    if (state.reload || JSON.stringify(state.userDetails) === "{}") {
      setLoading(true);
    }
    dispatch({
      type: "RELOADHOMEPAGE",
      payload: false,
    });
    dispatch({ type: "ADDCURRENTLIVEGAME", payload: [] });

    const currentTimer = interval.current;

    return () => {
      clearInterval(currentTimer);
    };
  }, []);

  useEffect(() => {
    redirectToGameZone();
    if (state.isTime[0]) {
      setRedirectModal(true);
      setLiveId(state.isTime[1].livegameId);
    }
  }, [state]);

  return (
    <div className="container" style={{ color: "white" }}>
      <Header />
      {state.userDetails.username && (
        <h2 style={{ marginTop: "-5px" }}>
          Welcome, {capitalize(state.userDetails.username)}{" "}
        </h2>
      )}
      <div className="homePage-instant-game">
        <h3 className="home-page-header">Instant game</h3>
        <div className="homePage-instant-game__description">
          <p className="home-page-text">
            You can play instantly with someone online.
          </p>
          <img src={undrawVidGame} alt="" className="homePage-img" />
        </div>
        <button
          onClick={() => {
            history.push("/instantgame");
          }}
          className="btn homePage-btn btn-right"
        >
          Play instantly
        </button>
      </div>
      {loading ? (
        <IonSpinner
          name="bubbles"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            margin: "auto",
            marginTop: "50px",
            color: "white",
          }}
        />
      ) : (
        <LivegameList livegames={livegames} empty={empty} />
      )}

      <Nav />
      {redirectModal && <RedirectModal liveId={liveId} />}
    </div>
  );
};

export default HomePage;
