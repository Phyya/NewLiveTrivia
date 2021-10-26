import { useState, useContext, useEffect } from "react";
import { GiCoins } from "react-icons/gi";
import { SearchPlayerModal } from "./RedirectModal";
import { Store, get } from "../context/Store";
import { capitalize } from "../Helpers/Functions";
import "./style2.css";
const INSTANT_GAME_API =
  "https://anter-trivia-game.herokuapp.com/api/v1/user/instantgame";
const INSTANT_GAME_API2 =
  "https://anter-trivia-game.herokuapp.com/api/v1/user/instantgame-zone";
let t;

const SelectLevel = ({ setPlaying, setFirstQuestion, count, setCount}) => {
  const [searchModal, setSearchModal] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [stake, setStake] = useState("");
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");
  const [loop, setLoop] = useState(false);
  
  const [searching, setSearching] = useState(false);
  const [found, setFound] = useState(false);
  const [user, setUser] = useState("");
  const { dispatch, state } = useContext(Store);

  const goToGameZone = () => {
    console.log(count);
    setCount(5);
    if (count > 10) {
      setFound(false);
      setSearching(false);
      clearInterval(t);
      return;
    }
    setSearching(true);
    setSearchModal(true);
    fetch(INSTANT_GAME_API2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "from instant gamezone endpoint");
        if (data.message === "User Found!") {
          setSearching(false);
          setFound(true);
          setUser(data.user);
          clearInterval(t);
        }
        if (data.question) {
          clearInterval(t);
          const questionObj = {
            question: data.question,
            options: data.options,
          };
          setSearchModal(false);
          setFirstQuestion(questionObj);
          setPlaying(true);
        } else {
          // setCount((prev) => prev + 1);
          console.log(count ,"2")
        }
      })
      .catch((err) => console.log(err));
  };


  const startSearch = (e) => {
    e.preventDefault();
    setError("");
    if (!category || !stake) {
      setError("Please select both category and stake amount");
      return;
    } else if (!state.userDetails.coins || state.userDetails.coins < stake) {
      setError("Insufficient coin balance. Please top up.");
      return;
    } else {
      setSearching(true);
      setSearchModal(true);
      fetch(INSTANT_GAME_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ categoryName: category, stake: +stake }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "from instant game endpoint");
          if (data.status === "fail") {
          } else {
            t = setInterval(() => goToGameZone(), 10000);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const restartSearch = () => {
    setCount(0);
    goToGameZone();
  };

  useEffect(() => {
    return () => {
      clearInterval(t);
    };
  }, []);

  const fetchCategory = async () => {
    const token = await get("token");
    setToken(token)
    fetch(
      "https://anter-trivia-game.herokuapp.com/api/v1/user/questions/categories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let categories = data.data.categories;
        categories = categories.map((el) => el.name);
        setAllCategories(categories);
      })
      .catch((err) => console.log(err));
  };

  const stopSearching = () => {
    clearInterval(t);
    setSearchModal(false)
  }
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <div className="questions" style={{ color: "white" }}>
      <form action="" className="questions__select" onSubmit={startSearch}>
        <label htmlFor="select">
          <p className="question-spash-header">Select Category</p>
        </label>
        <select
          style={{ backgroundColor: "white" }}
          className="questions__select-difficulty"
          name="select"
          id="select"
          onChange={(e) => setCategory(e.target.value)}
        >
          {allCategories.map((c) => (
            <option value={c} className="levels">
              {capitalize(c)}
            </option>
          ))}
        </select>
        <p>Stake with:</p>
        <div className="stake_div">
          <button
            type="button"
            className="each__stake"
            onClick={() => setStake(100)}
          >
            <p>
              100
              <GiCoins className="stake__coins" />
            </p>
          </button>
          <button
            type="button"
            className="each__stake"
            onClick={() => setStake(300)}
          >
            <p>
              300
              <GiCoins className="stake__coins" />
            </p>
          </button>
          <button
            type="button"
            className="each__stake"
            onClick={() => setStake(500)}
          >
            <p>
              500
              <GiCoins className="stake__coins" />
            </p>
            {/* <span className="stake__span">Win 5,500 Naira</span> */}
          </button>
          <button
            type="button"
            className="each__stake"
            onClick={() => setStake(1000)}
          >
            <p>
              1000
              <GiCoins className="stake__coins" />
            </p>
          </button>
          <button
            type="button"
            className="each__stake"
            onClick={() => setStake(2000)}
          >
            <p>
              2000
              <GiCoins className="stake__coins" />
            </p>
          </button>
          <button
            type="button"
            className="each__stake"
            onClick={() => setStake(5000)}
          >
            <p>
              5000
              <GiCoins className="stake__coins" />
            </p>
          </button>
        </div>
        {error && <p className="error__span redText">{error}</p>}
        <button className="btn select-btn">
          <p>Continue</p>
        </button>
      </form>
      {searchModal && (
        <SearchPlayerModal
          goToGameZone={goToGameZone}
          searching={searching}
          close={stopSearching}
          startSearch={restartSearch}
          found={found}
          user={user}
        />
      )}
    </div>
  );
};

export default SelectLevel;
