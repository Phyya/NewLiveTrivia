import { useState, useEffect, useContext } from "react";
import userAvatar from "../img/user-alt.svg";
import { useHistory } from "react-router";
import pencil from "../img/Pencil.svg";
import { Store, get } from "../context/Store";
import { IonSpinner } from "@ionic/react";
import { usePhoto } from "../hooks/usePhoto";
import { PhotoCamera } from "@material-ui/icons";
const ChooseUsername = () => {
  const { takePhoto, photo, loading, setLoading } = usePhoto();
  const [imageUpload, setImageUpload] = useState(userAvatar);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [serverPhoto, setServerPhoto] = useState("");
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState("");
  const { dispatch } = useContext(Store);
  const history = useHistory();

  useEffect(() => {
    setImageUpload(photo);
  }, [photo]);
  const imageUploadHandler = () => {
    takePhoto();
    setImageUpload(imageUpload);
  };

  const getUser = async () => {
    setLoading(true);
    const token = await get("token");
    console.log(token, "token");
    dispatch({ type: "GETTOKEN", payload: token });
    fetch("https://sharewave.ng/live/public/user/user-details.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error("Something went wrong");
          });
        }
      })
      .then((data) => {
        console.log(data);
        setServerPhoto(data.userDetails.picture);
        data && setImageUpload(data.userDetails.picture);
        data && setUsername(data.userDetails.username);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  const submitHandler = async (e) => {
    setIsLoading(true);
    setServerError("");
    setError(false);
    const token = await get("token");
    localStorage.setItem("token", JSON.stringify(token));
    e.preventDefault();

    if (username === "") {
      setError(true);
      setIsLoading(false);
      return;
    }

    fetch(
      "https://sharewave.ng/live/public/user/update-username-and-picture.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          picture: imageUpload,
          token: token,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            setServerError("Something went wrong. Please try again.");
            throw new Error("Something went wrong");
          });
        }
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        if (!data.success) {
          setServerError(data.message.errorMessage);
        } else {
          setImageUpload(data.data.picture);
          history.push("/homepage");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <div>
      <div className="chooseUser-container">
        <div className="user-profile-photo-container">
          <div className="user-profile-photo-container__pp">
            <div className="pp-image-container">
              <div className="pp-image">
                <img src={imageUpload} alt="profileImage" className="pp-img" />
              </div>
              <div className="pp-camera-icon">
                <PhotoCamera
                  onClick={imageUploadHandler}
                  className="pp-icon"
                  style={{ fontSize: "3.6rem" }}
                />
              </div>
              <div className="ion-spinner-container">
                {" "}
                {loading && (
                  <IonSpinner name="bubbles" className="ion-spinner" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="userName-container">
          <label htmlFor="userName" className="userName-label">
            Choose Username
          </label>
          <div
            className={`userName-input-container ${error && "error-boundary"}`}
          >
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              onFocus={() => setError(false)}
              name="userName"
              id="userName"
              className={`userName-input`}
            />
            <img src={pencil} alt="" className="userName-icon" />
          </div>
          {error && (
            <p
              style={{ color: "red", textAlign: "center", fontSize: "1.3rem" }}
            >
              Username must not be empty
            </p>
          )}
          {serverError && (
            <p
              style={{ color: "red", textAlign: "center", fontSize: "1.3rem" }}
            >
              {serverError}
            </p>
          )}
          <p className="userName-text">
            Your username will be visible to your other online users.
          </p>
          <button
            onClick={submitHandler}
            className="btn splash-screen__btn link-btn"
          >
            {isLoading ? (
              <>
                <p>
                  Updating
                  <IonSpinner name="bubbles" className="white_spinner" />
                </p>
              </>
            ) : (
              <p>Next</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseUsername;
