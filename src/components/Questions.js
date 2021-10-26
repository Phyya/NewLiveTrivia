import { useState, useEffect, useContext } from "react";
import ConfettiCanvas from "react-confetti-canvas";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import Zoom from "@material-ui/core/Zoom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSound from "use-sound";
import right from "../Sounds/right.wav";
import wrong from "../Sounds/wrong.wav";
import completed from "../Sounds/completed.wav";
import notCompleted from "../Sounds/notCompleted.wav";
import timerAttention from "../Sounds/timerAttention.wav";
import { useHistory } from "react-router-dom";
import { Store, set } from "../context/Store";
import { shuffle } from "../Helpers/Functions";
import { HiEmojiSad } from "react-icons/hi";
import Powerups, { LostLife } from "./Powerups";
import Waiting, { QuestionLoading } from "./Waiting";
import Countdown from "./Countdown";

const TIMER_START_VALUE = 10;
const GAME_API = "https://sharewave.ng/live/public/user/gamezone.php";
let t1;
let t2;
let t3;
let t4;

const Question = ({ firstQuestion, auth, playedLiveGames }) => {
  const history = useHistory();
  const { state, dispatch } = useContext(Store);
  const { token, identifier } = auth;
  const [secondsRemaining, setSecondsRemaining] = useState(null);
  const [extraLifeSeconds, setExtraLifeSeconds] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIMER_START_VALUE);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [hideOption, setHideOption] = useState(false);
  const [flash, setFlash] = useState(false);
  const [success] = useSound(right);
  const [fail] = useSound(wrong);
  const [attention] = useSound(timerAttention);
  const [won] = useSound(completed);
  const [lost] = useSound(notCompleted);
  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [indexx, setIndex] = useState();
  const [clicked, setClicked] = useState(false);
  const [lives, setLives] = useState(state.userDetails.extraLives > 0 ? 1 : 0);
  const [gameOver, setGameOver] = useState(false);
  const [winGame, setWinGame] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [gameModal, setGameModal] = useState(false);
  const [question, setQuestion] = useState(firstQuestion);
  const { optionA, optionB, optionC } = question.options[0]
    ? question.options[0]
    : {};
  const answerOptions = [optionA, optionB, optionC];
  const [low, setLow] = useState(false);

  const updateTimer = () => {
    if (timer > 0 && !revealAnswers) {
      t1 = setTimeout(() => setTimer(timer - 1), 1000);
    }
  };

  const warning = () => {
    t2 = setInterval(() => attention(), 1000);
  };
  const startMainGame = () => {
    setStartGame(true);
    setTimeout(() => updateTimer(), 1000);
  };
  const reset = () => {
    setWrongAnswer(false);
    setCorrectAnswer(false);
    setSelectedAnswer(null);
    setLow(false);
    setIndex(null);
    setFlash(false);
    setClicked(false);
    setExtraLifeSeconds(null);
    setRevealAnswers(false);
    setTimer(TIMER_START_VALUE);
  };
  const giveUp = async (message) => {
    clearTimeout(t1);
    clearInterval(t2);
    clearInterval(t3);
    clearInterval(t4);
    await set("playedLiveGames", [...playedLiveGames, identifier]);
    setGameOver(true);
    setGameOverMessage(message);
    setSecondsRemaining(null);
    setNextQuestion(false);
    setGameModal(false);
    if (!winGame) lost();
  };

  const failHandler = () => {
    clearTimeout(t1);
    clearInterval(t2);
    if (lives > 0) {
      setGameModal(true);
      return;
    } else {
      giveUp("Oops. No lives to keep playing. You lose.");
    }
  };

  const correctDisplay = (currentSeconds) => {
    if (Math.floor(currentSeconds - new Date().getTime()) / 1000 <= 7) {
      setCorrectAnswer(true);
      setScore(score + 1);
      setTimeout(() => {
        success();
        setSecondsRemaining(6);
        clearInterval(t3);
      }, 1000);
    }
  };
  const wrongDisplay = (currentSeconds) => {
    setExtraLifeSeconds(7);
    const secondsLeft = (currentSeconds - new Date().getTime()) / 1000;
    if (Math.floor(currentSeconds - new Date().getTime()) / 1000 <= 18) {
      setWrongAnswer(true);
      setTimeout(() => {
        fail();
        failHandler();
        clearInterval(t4);
      }, 1000);
    }
  };

  const handleAnswerClick = (selectedAnswer) => {
    setRevealAnswers(true);
    setClicked(true);
    clearTimeout(t1);
    clearInterval(t2);
    if (!selectedAnswer || selectedAnswer === "" || clicked) {
      return;
    } else {
      setFlash(true);
      setSelectedAnswer(selectedAnswer);
      fetch(GAME_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          livegameId: identifier,
          answer: selectedAnswer.trim(),
          token: token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "from answer click");

          if (data.message === "Correct!") {
            t3 = setInterval(() => correctDisplay(+data.timer));
          } else if (data.message === "Wrong!") {
            t4 = setInterval(() => wrongDisplay(+data.timer));
          } else {
            giveUp(data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleNextQuestionClick = () => {
    clearTimeout(t1);
    clearInterval(t2);
    clearInterval(t3);
    clearInterval(t4);
    setRevealAnswers(false);
    setSelectedAnswer(null);
    setLow(false);
    setIndex(null);
    setFlash(false);
    setClicked(false);

    if (currentQuestionIndex <= 10) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setCorrectAnswer(false);
      setWrongAnswer(false);
      setSecondsRemaining(null);
      setNextQuestion(true);
    }

    if (currentQuestionIndex > 10) {
      return;
    }
    if (!gameOver) {
      fetch(GAME_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          livegameId: identifier,
          action: "getQuestion",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSecondsRemaining(null);
          console.log(data, "from nextQuestion");
          if (data.question) {
            const questionObj = {
              question: data.question,
              options: data.options,
            };
            setQuestion(questionObj);
            setTimer(TIMER_START_VALUE);
            setNextQuestion(false);
          } else {
            setNextQuestion(false);
            giveUp(data.message);
            if (currentQuestionIndex > 10) {
              setWinGame(true);
              won();
            }
            return;
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const useEraser = () => {
    if (state.userDetails.erasers > 0 && !clicked) {
      fetch(GAME_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          livegameId: identifier,
          action: "eraser",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, `from eraser click`);
          if (data.question) {
            const questionObj = {
              question: data.question,
              options: data.options,
            };
            const rightAnswer = data.answer;
            setQuestion(questionObj);
            setHideOption(true);
            const filtered = answerOptions.filter((w) => w !== rightAnswer);
            let random = shuffle(filtered);
            random = random[Math.floor(Math.random() * 2)];
            const wrongAnswer = answerOptions.indexOf(random);
            setIndex(wrongAnswer);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const useExtraLife = async () => {
    if (state.userDetails.extraLives > 0) {
      fetch(GAME_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          livegameId: identifier,
          action: "extralife",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, `from eraser click`);
          if (data.question) {
            const questionObj = {
              question: data.question,
              options: data.options,
            };
            setLives((prev) => prev - 1);
            setGameModal(false);
            reset();
            setCurrentQuestionIndex((prev) => prev + 1);
            setQuestion(questionObj);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const noAnswerAtAll = async () => {
    setGameModal(false);
    fetch(GAME_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        livegameId: identifier,
        answer: "No answer",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "from no answer sent");
        giveUp(
          "Oops, Game over! You lose and you're no longer a participant in this game."
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch({
      type: "ITSTIME",
      payload: [],
    });
  }, []);

  useEffect(() => {
    startGame && startMainGame();
    if (timer < 5) {
      setLow(true);
    }
    if (timer <= 3) {
      warning();
    }
    if (timer === 0) {
      handleAnswerClick("wrong dummy answer");
    }
    return () => {
      clearTimeout(t1);
      clearInterval(t2);
    };
  }, [timer]);

  if (!startGame) return <Countdown startGame={startMainGame} />;
  if (secondsRemaining)
    return (
      <Waiting
        time={secondsRemaining}
        request={handleNextQuestionClick}
        end={currentQuestionIndex >= 10}
      />
    );
  if (nextQuestion) return <QuestionLoading end={currentQuestionIndex >= 10} />;
  else
    return (
      <div className="questions__container" style={{ color: "white" }}>
        {!gameOver ? (
          <>
            <Powerups
              lives={lives}
              action={useEraser}
              usedEraserOption={hideOption}
              noEraser={state.userDetails.erasers < 1}
            />
            <div className="questions__QandA">
              <div className="questions__timer">
                <span className="timer">{timer}</span>
              </div>
              <div className="timer-wrapper">
                <div
                  className={`timer-countdown-bar ${low && "red"} ${
                    timer > 7 && "green"
                  }`}
                  style={{ width: (timer / TIMER_START_VALUE) * 100 + "%" }}
                ></div>
              </div>
              <div className="question-count">
                <span>Question {currentQuestionIndex}</span>
              </div>
              <div className="questions__display">{question.question}</div>

              <div>
                {answerOptions.map((answerOption, index) => (
                  <div key={index} className="answer-item">
                    <AnswerButton
                      answerOption={answerOption}
                      correctAnswer={correctAnswer}
                      isSelectedAnswer={answerOption === selectedAnswer}
                      revealAnswers={revealAnswers}
                      handleAnswerClick={handleAnswerClick}
                      index={index}
                      indexx={indexx}
                      flash={flash}
                      wrongAnswer={wrongAnswer}
                    />
                  </div>
                ))}
              </div>
              {revealAnswers && timer !== 0 && (
                <p className="confirm__answer">Confirming answer...</p>
              )}
            </div>
          </>
        ) : (
          <div>
            <div className="questions__result">
              <h3 className="question-splash-header">{gameOverMessage}</h3>
              <div className="questions__result--earned">
                {!winGame ? (
                  <div>
                    <Zoom in={true}>
                      <HiEmojiSad className="sad__heart1" />
                    </Zoom>
                    <Zoom in={true} style={{ transitionDelay: "500ms" }}>
                      <HiEmojiSad className="sad__heart2" />
                    </Zoom>
                    <Zoom in={true} style={{ transitionDelay: "700ms" }}>
                      <HiEmojiSad className="sad__heart3" />
                    </Zoom>
                    <Zoom in={true} style={{ transitionDelay: "1000ms" }}>
                      <HiEmojiSad className="sad__heart4" />
                    </Zoom>
                  </div>
                ) : (
                  <div
                    className="moneyrain__container"
                    style={{ overflow: "hidden" }}
                  >
                    <ConfettiCanvas duration={0.05} ribbonParticleThick={4.0} />
                  </div>
                )}
              </div>

              <button
                onClick={() => history.push("/homepage")}
                className="btn startGame"
                style={{ marginTop: "10px" }}
              >
                Go Back To HomePage
              </button>
            </div>
          </div>
        )}
        {gameModal && (
          <LostLife
            close={noAnswerAtAll}
            lives={lives}
            action={useExtraLife}
            secondsToExtraLife={extraLifeSeconds}
          />
        )}
      </div>
    );
};

/******* ANSWER BUTTON COMPONENT ********/
const AnswerButton = ({
  answerOption,
  correctAnswer,
  isSelectedAnswer,
  index,
  indexx,
  handleAnswerClick,
  flash,
  wrongAnswer,
}) => {
  let backgroundColor, icon;
  if (isSelectedAnswer && !wrongAnswer && !correctAnswer) {
    backgroundColor = "#3b076b";
    icon = faTimesCircle;
  } else if (correctAnswer && isSelectedAnswer) {
    backgroundColor = "#2f922f";
    icon = faCheckCircle;
  } else if (wrongAnswer && isSelectedAnswer) {
    backgroundColor = "#ff3333";
    icon = faTimesCircle;
  } else {
    icon = faCircleRegular;
  }

  return (
    <div
      className={`questions__options  ${isSelectedAnswer && flash && "flash"}`}
      style={{ backgroundColor: backgroundColor, color: "white" }}
      onClick={() => handleAnswerClick(index === indexx ? "" : answerOption)}
    >
      <div className="answer__icon">
        <FontAwesomeIcon className="answer-item-circle" icon={icon} />
      </div>
      <span className="answer__option">
        {index === indexx ? "" : answerOption}
      </span>
    </div>
  );
};

export default Question;
