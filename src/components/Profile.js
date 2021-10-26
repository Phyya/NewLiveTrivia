import Nav from "./NavLink";
import { useState, useEffect, useContext } from "react";
import { get, Store } from "../context/Store";
import { useHistory, Link } from "react-router-dom";

import pencil from "../img/Pencil.svg";
import yellowCoin from "../img/yellow-coin.svg";
import notification from "../img/bell.svg";
import Header from "./Header";
const Profile = () => {
  const history = useHistory();
  const [imageUpload, setImageUpload] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch, state } = useContext(Store);

  const getUser = async () => {
    const token = await get("token");
    fetch("https://anter-trivia-game.herokuapp.com/api/v1/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log("putDATA", data);
            throw new Error("Something went wrong");
          });
        }
      })
      .then((data) => {
        console.log(data);
        console.log(data.user.profilePicture);
        setImageUpload(data.user.profilePicture);
        setUsername(data.user.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateUser = () => {
    // fetch(
    //   "https://sharewave.ng/live/public/user/update-username-and-picture.php",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username: username,
    //       picture: imageUpload,
    //       token: token,
    //     }),
    //   }
    // )
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       return res.json().then((data) => {
    //         setServerError("Something went wrong. Please try again.");
    //         throw new Error("Something went wrong");
    //       });
    //     }
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setIsLoading(false);
    //     if (!data.success) {
    //       setServerError(data.message.errorMessage)
    //     }
    //     else {
    //       setImageUpload(data.data.picture);
    //       history.push("/homepage")
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setIsLoading(false);
    //   });
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container" style={{ color: "white" }}>
      <Header />
      <div className="profile">
        <div className="profile__user">
          <div className="profile__user-details">
            <div className="profile__user-details__img">
              <div className="profile__img-container">
                <img className="dp-img" src={imageUpload} alt="" />
              </div>
              <button
                className="icon-container"
                onClick={() => {
                  history.push("/chooseusername");
                }}
              >
                <Link to="/chooseusername">
                  <img src={pencil} alt="pencil pic" />
                </Link>
              </button>
            </div>
            <div className="profile__user-details__other-details">
              <div className="profile__user-details__other-details__username">
                <span className="userName">{username}</span>
                {/* <span className="edit-btn" role="button" >
                        <img src={pencil} onClick={()=>{history.push('/chooseusername')}} alt=""/>
                    </span> */}
              </div>
              <div className="profile__user-details__other-details__rank">
                <span>Rank:</span> &nbsp; <span className="user-rank">100</span>
              </div>
            </div>
          </div>
          <div className="profile__user-notification">
            <div className="profile__user-notification-icon">
              <img src={notification} alt="" />
              <span className="notification">4</span>
            </div>
          </div>

          <div className="profile__user__invite">
            <p className="invite-text">
              Invite your friends to live Trivia to earn coins!
            </p>
            <button className="btn invite-btn">
              Share: {`${username}125`}
            </button>
          </div>
          <div className="profile__user__refer">
            <h4 className="referral-heading">Enter a Referral code </h4>
            <p className="invite-text">
              Enter your code to get a free reward that will help you win live
              trivia..
            </p>
            <form action="" className="referral-code">
              <input
                type="text"
                className="referral-input"
                placeholder="Enter referal code"
              />
              <input
                className="btn referral-btn"
                type="button"
                value="Submit"
              />
            </form>
          </div>
        </div>
        <div className="profile__opt-btns">
          <button className="btn profile-btn">Withdraw</button>
          <button
            className="btn profile-btn"
            onClick={() => history.push("/rules")}
          >
            How it Works
          </button>
          <button className="btn profile-btn">Message Support</button>
        </div>

        <div className="profile__settings">
          <h3 className="settings-header">Settings</h3>
          <div className="profile__settings--notification">
            <p className="settings-text">
              <span>Enable Notifications</span>
              <span>Get notifications from us</span>
            </p>
            <button className="enable-btn">
              <span className="enable-btn__ball">&nbsp;</span>
            </button>
          </div>

          <div className="profile__settings--notification">
            <p className="settings-text">
              <span>Auto Add Contacts</span>
              <span>Enable this to atm</span>
            </p>
            <button className="enable-btn">
              <span className="enable-btn__ball">&nbsp;</span>
            </button>
          </div>
        </div>
        <div className="profile__others">
          {/*  <div className="profile__others--flex">
            <button className="btn profile-btn-2">
                Review
                <div className="legal">

                </div>
            </button>

            
            <input type="radio" name="legal" id="legal-btn" className="legal-radio"/>
            <label htmlFor="legal-btn" className="btn profile-btn-2 profile-radio-btn">
                Legal
            </label>
            <div className="legal">
                <ul className="legal__lists">
                    <li className="legal__lists--items">Terms And Conditions</li>
                    <li className="legal__lists--items">Privacy Policy</li>
                    <li className="legal__lists--items">Rules</li>
                    <li className="legal__lists--items">
                        <input type="radio" name="legal" id="legal-btn-2" className="legal-radio"/>
                        <label htmlFor="legal-btn-2"><span className="red-text">Cancel</span></label>
                    </li>
                </ul>
            </div>
             <div className="bg-black">&nbsp;</div>
        </div> */}
          <button className="btn profile-btn-2 justify-self">Logout</button>
          <div className="bg-black">&nbsp;</div>
        </div>
      </div>
      <Nav />
    </div>
  );
};

export default Profile;
