import { useHistory } from "react-router";
import ellipses from "../img/Ellipse 4 (1).svg";
import ellipses1 from "../img/Ellipse 4.svg";
import musicimg from "../img/music-Img.svg";
import Carousel from "react-material-ui-carousel";
import "react-multi-carousel/lib/styles.css";

const data = [
  { category: "Questions On Football", img: ellipses },
  { category: "Questions on Music", img: ellipses1 },
  { category: "Questions on Gadgets", img: musicimg },
];

const SplashScreen = () => {
  const history = useHistory();
  return (
    <div>
      <div className="splash-screen">
        <div className="splash-screen__container">
          <Carousel animation="slide" autoPlay={false} swipe={true}>
            {data.map((category, i) => (
              <div key={i}>
                <h1 className="splash-screen__header">LIVE TRIVIA</h1>
                <div className="splash-screen__img">
                  <img src={category.img} alt="Getting Started" className="" />
                </div>
                <p className="splash-screen__text">{category.category}</p>
              </div>
            ))}
          </Carousel>
          <button
            onClick={(e) => {
              e.preventDefault();
              history.push("/login");
            }}
            className="btn splash-screen__btn"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
