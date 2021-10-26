import { useState, useEffect, useContext } from "react";
import {
  CoinsComponent,
  ErasersComponent,
  LivesComponent,
} from "./PowerupsComponent";
import { Store } from "../context/Store";
import RedirectModal from "./RedirectModal";
import { GiTwoCoins } from "react-icons/gi";
// import { RiEraserFill } from "react-icons/bs";
import { RiEraserFill } from "react-icons/ri";
import { ImHeart } from "react-icons/im";
import newEraser from "../img/NewEraser.svg";
import Nav from "./NavLink";

const Extra = () => {
  const [liveId, setLiveId] = useState("");
  const { state } = useContext(Store);
  const [redirectModal, setRedirectModal] = useState(false);

  useEffect(() => {
    if (state.isTime[0]) {
      setRedirectModal(true);
      setLiveId(state.isTime[1].categoryId);
    }
  }, [state]);

  return (
    <div className="shop_container">
      <div className="shop_header">
        <h3>Shop</h3>
        <div className="user_powerups">
          <span className="icon_span">
            {state.userDetails.coins ? state.userDetails.coins : 0}
            <GiTwoCoins className="yellow__coins" />
          </span>
          <span className="icon_span">
            {state.userDetails.erasers ? state.userDetails.erasers : 0}
            {/* <RiEraserFill className="blue-color fitted" /> */}
            <img src={newEraser} alt="" className="blue-color fitted" />
          </span>
          <span className="icon_span">
            {state.userDetails.extraLives ? state.userDetails.extraLives : 0}
            <ImHeart className="red-color fitted" />
          </span>
        </div>
      </div>
      {/* <div className="powerups_component"> */}
      <CoinsComponent />
      <ErasersComponent />
      <LivesComponent />
      {/* </div> */}
      {/* <div style={{ height: "100px", width: "100%", border: "1px solid red" }}>
        AAAAA
      </div> */}
      <Nav />

      {redirectModal && <RedirectModal liveId={liveId} />}
    </div>
  );
};

export default Extra;
