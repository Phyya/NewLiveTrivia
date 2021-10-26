import { createContext, useReducer, useState, useRef } from "react";
import { useHistory } from "react-router";
import { Storage } from "@capacitor/storage";
import { convertTime } from "../Helpers/Functions";

export const Store = createContext();
let phoneNum;
let interval = useRef;
const user = "user";
const initialState = {
  user: {
    phoneNumber: phoneNum ? phoneNum : "",
  },
  Token: "",
  userDetails: {},
  currentLiveGame: {},
  allLiveGames: [],
  reload: false,
  isTime: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "ADDINFO":
      return { ...state, userDetails: action.payload };
    case "LOGOUT":
      return { user: null };
    case "GETQUESTIONS":
      return { ...state, Questions: action.payload };
    case "GETTOKEN":
      return { ...state, Token: action.payload };
    case "ADDCURRENTLIVEGAME":
      return { ...state, currentLiveGame: action.payload };
    case "ADDALLLIVEGAME":
      return { ...state, allLiveGames: action.payload };
    case "RELOADHOMEPAGE":
      return { ...state, reload: action.payload };
    case "ITSTIME":
      return { ...state, isTime: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  const gameZoneEndPoint = (id) => {
    const token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null;
    fetch(`https://sharewave.ng/live/public/user/gamezone.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        body: JSON.stringify({
          livegameId: id,
          action: "getQuestions",
          token: token,
        }),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "from gamezone endpoint");
      })
      .catch((err) => console.log(err));
  };

  const redirectToGameZone = () => {
    interval = setInterval(() => {
      state.userDetails.activeGames?.forEach((activeGame) => {
        const countDownTime = new Date(+activeGame.gameTime).getTime();

        const now = new Date().getTime();
        let differenceInTimes = countDownTime - now;
        const hours = Math.floor(
          (differenceInTimes % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (differenceInTimes % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds2 = Math.floor((differenceInTimes % (1000 * 60)) / 1000);

        if (hours === 0 && minutes === 2 && seconds2 < 10) {
          gameZoneEndPoint(activeGame.livegameId);
          console.log(minutes, "minutes", seconds2, "seconds2");
        } else if (hours === 0 && minutes === 0 && seconds2 === 20) {
          // gameZoneEndPoint(activeGame.categoryId);
          dispatch({
            type: "ITSTIME",
            payload: [true, activeGame],
          });
        } else {
          console.log("not time");
        }
      });
    }, 1000);
  };
  const updateHomePage = () => {
    dispatch({
      type: "RELOADHOMEPAGE",
      payload: true,
    });
  };

  const value = {
    state,
    dispatch,
    redirectToGameZone,
    interval,
    updateHomePage,
  };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export async function set(key, value) {
  await Storage.set({
    key: key,
    value: JSON.stringify(value),
  });
}
export async function get(key) {
  const item = await Storage.get({ key: key });
  return JSON.parse(item.value);
}
export async function remove(key) {
  await Storage.remove({
    key: key,
  });
}

export const getNumber = async () => {
  const phoneNo = await get("userNumber");
  phoneNum = await phoneNo;
  return phoneNo;
};
