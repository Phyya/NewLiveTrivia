import Nav from "./NavLink";
import Header from "./Header";
import { useState } from "react";
import { GiCoins, GiTwoCoins } from "react-icons/gi";
import { ImHeart } from "react-icons/im";
import { RiEraserFill } from "react-icons/ri";
import {
  CoinsComponent,
  ErasersComponent,
  LivesComponent,
  ComboComponent,
} from "./PowerupsComponent";
import { coinsPowerup, erasersPowerup } from "../Helpers/DummyData";

const Powerups = ({ close }) => {
  const [tab, setTab] = useState(0);
  const [stake, setStake] = useState();
  return (
    <div className="powerups__modal">
      <div className="powerups__modal__inner">
        <div className="powerups__left">
          <div
            onClick={() => setTab(0)}
            className="powerup__type"
            style={
              tab === 0
                ? { border: "2px solid saddlebrown" }
                : {}
            }
          >
            <GiCoins style={{ fontSize: "20px", color: "#fe9923" }} />
            Coins
          </div>
          <div onClick={() => setTab(1)} className="powerup__type" style={
              tab === 1
                ? { border: "2px solid #3c82f2" }
                : {}
            }>
            <RiEraserFill style={{ fontSize: "20px", color: "blue" }} />
            Erasers
          </div>
          <div onClick={() => setTab(2)} className="powerup__type">
            <ImHeart
              className="powerups__heart red"
              style={{ fontSize: "20px" }}
            />
            Lives
          </div>
          <div onClick={() => setTab(3)} className="powerup__type">
            Combo
          </div>
        </div>
        <div className="powerups__right">
          {tab === 0 && <CoinsComponent />}

          {tab === 1 && <ErasersComponent />}

          {tab === 2 && <LivesComponent />}
          {tab === 3 && <div>Combo</div>}
        </div>
      </div>
      <p
        onClick={close}
        style={{ color: "white", marginTop: "-5px", fontWeight: "bold" }}
      >
        X
      </p>
    </div>
  );
};

export default Powerups;
