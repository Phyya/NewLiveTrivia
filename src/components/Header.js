import { useContext } from "react";
import { Store } from "../context/Store";
import extraLife from "../img/extral-life.svg";
import eraser from "../img/eraser.svg";
import { GiTwoCoins } from "react-icons/gi";
import naira from "../img/naira.svg";
import newEraser from "../img/NewEraser.svg";

const Header = ({ handleHide }) => {
  const { state } = useContext(Store);
  return (
    <div>
      <header className="navigation">
        <div className="nav">
          <div className="nav__property">
            <div className="nav__property--top">
              <img src={naira} alt="" className="icons" />
              <span className="nav-earned amount-earned">
                {state.userDetails.earnings ? state.userDetails.earnings : 0}
              </span>
            </div>
            <div className="nav__property--bottom">
              <p className="nav-text">Earned</p>
            </div>
          </div>
          <div className="nav__property">
            <div className="nav__property--top">
              <span className="nav-earned amount-earned">
                {state.userDetails.coins ? state.userDetails.coins : 0}
              </span>
              <GiTwoCoins
                alt=""
                className="icons"
                style={{ color: "goldenrod" }}
              />
            </div>
            <div className="nav__property--bottom">
              <p className="nav-text">
                Coin{state.userDetails.coins == 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div className="nav__property">
            <div className="nav__property--top">
              <span className="nav-earned amount-earned">
                {state.userDetails.extraLives
                  ? state.userDetails.extraLives
                  : 0}
              </span>
              <img src={extraLife} alt="" className="icons" />
            </div>
            <div className="nav__property--bottom">
              <p className="nav-text">
                Li{state.userDetails.extraLives == 1 ? "fe" : "ves"}
              </p>
            </div>
          </div>

          <div className="nav__property">
            <div className="nav__property--top">
              <span className="nav-earned amount-earned">
                {state.userDetails.erasers ? state.userDetails.erasers : 0}
              </span>
              <img src={newEraser} alt="" className="icons" />
            </div>
            <div className="nav__property--bottom">
              <p className="nav-text">
                Eraser{state.userDetails.erasers == 1 ? "" : "s"}
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
