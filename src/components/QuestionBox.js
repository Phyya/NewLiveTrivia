import  { useState, useEffect } from "react";
import {
  faCheckCircle,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Question = () => {
  const TIMER_START_VALUE = 15;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIMER_START_VALUE);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [hideOption, setHideOption] = useState(false)
  const [newOptions, setNewOptions]= useState()
  const [low, setLow]= useState(false)
  const [start, setStart] = useState(false)
  const [questions] = useState([
    {
      questionText: "What is the capital of Ireland",
      answerOptions: ["New York", "Dublin", "Madrid", "Paris"],
      answer: "Dublin"
    },
    {
      questionText: "Luke Skywalker is a character from which film series",
      answerOptions: [
        "The Lion King",
        "Harry Potter",
        "Star Wars",
        "Lord of the Rings"
      ],
      answer: "Star Wars"
    },
    {
      questionText: "How many days are in September",
      answerOptions: ["28", "29", "30", "31"],
      answer: "30"
    },
    {
      questionText: "What is the house number of the Simpsons?",
      answerOptions: ["1", "64", "742", "0"],
      answer: "742"
    },
    {
      questionText: "Which of these is not a planet?",
      answerOptions: ["Earth", "Jupitor", "Mars", "Florida"],
      answer: "Florida"
    }
  ]);

  
  useEffect(() => {
    updateTimer();
	if(timer<7){
		setLow(true)
	}
  }, [timer]);

  // This is a helper to help tidy up the code
  const currentQuestion = questions[currentQuestionIndex];

  const updateTimer = () => {
    if (!revealAnswers &&  timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setRevealAnswers(true);
    }
  };

  const handleNextQuestionClick = () => {
    setRevealAnswers(false);
	setLow(false)
	setHideOption(false)
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setTimer(TIMER_START_VALUE);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(TIMER_START_VALUE);
  };

  // do the simple stuff first. If the answers are revealed we don't want to do anything with the button click
  const handleAnswerClick = selectedAnswer => {
    if (revealAnswers) {
      return;
    }
    setSelectedAnswer(selectedAnswer);
	
    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1);
    }
    setRevealAnswers(true);

  };

  const handleHide=()=>{
    setHideOption(true)
   const index = Math.floor(Math.random()*2)
  const wrongAnswers=  currentQuestion.answerOptions.filter(option=> option !==currentQuestion.answer)
  const rightAnswer=  currentQuestion.answerOptions.find(option=> option ===currentQuestion.answer)
   wrongAnswers.splice(index, 1)
    console.log(rightAnswer)
    setNewOptions([...wrongAnswers, rightAnswer])
  
  }


  return (
    <div className="quiz-wrapper">
      {currentQuestionIndex < questions.length ? (
        <>
          <div className="question-count">
            <span>Question {currentQuestionIndex + 1}</span>/{questions.length}
          </div>
		{!start &&  <button  style={{padding:'10px'}} onClick={()=> setStart(true)}>Start</button>}
          <div className="timer-wrapper">
            <div
              className={`timer-countdown-bar ${low && 'red'}`}
              style={{ width: (timer / TIMER_START_VALUE) * 100 + "%" }}
            ></div>
          </div>
          <button style={{padding:'10px'}} disabled={hideOption} onClick={handleHide}>Hide Option</button>

          <div className="question">{currentQuestion.questionText}?</div>
       { !hideOption ?    <div className="answer-list">
            { currentQuestion.answerOptions.map((answerOption, index) => (
              <div className="answer-item" key={`answer_button_${index}`}>
                <AnswerButton
                  answerOption={answerOption}
                  isCorrectAnswer={answerOption === currentQuestion.answer}
                  isSelectedAnswer={answerOption === selectedAnswer}
                  revealAnswers={revealAnswers}
                  handleAnswerClick={handleAnswerClick}
                />
              </div>
            ))}
          </div>:   <div className="answer-list">
            { newOptions.map((answerOption, index) => (
              <div className="answer-item" key={`answer_button_${index}`}>
                <AnswerButton
                  answerOption={answerOption}
                  isCorrectAnswer={answerOption === currentQuestion.answer}
                  isSelectedAnswer={answerOption === selectedAnswer}
                  revealAnswers={revealAnswers}
                  handleAnswerClick={handleAnswerClick}
                />
              </div>
            ))}
          </div>}
          {revealAnswers && (
            <div className="next-question-wrapper">
              <button onClick={handleNextQuestionClick}>
                <span>Next</span>
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="quiz-score">
            You scored {score} out of {questions.length}
          </div>
          <div className="play-again-wrapper">
            <button className="play-again-button" onClick={() => resetQuiz()}>
              Play Again
            </button>
          </div>
        </>
      )}
    </div>
  );
};

/******* ANSWER BUTTON COMPONENT ********/
const AnswerButton = ({
  answerOption,
  isCorrectAnswer,
  isSelectedAnswer,
  revealAnswers,
  handleAnswerClick
}) => {
  let backgroundColor;
  let icon;

 
  if (revealAnswers && isCorrectAnswer) {
    backgroundColor = "#2f922f";
    icon = faCheckCircle;
  } else if (revealAnswers && isSelectedAnswer) {
    backgroundColor = "#ff3333";
    icon = faTimesCircle;
  } else {
    icon = faCircleRegular;
  }

  return (
    <button
      style={{ backgroundColor: backgroundColor, color:'white' }}
      onClick={() => handleAnswerClick(answerOption)}
    >
      <FontAwesomeIcon className="answer-item-circle" icon={icon} />
      
      {answerOption}
    </button>
  );
};

export default Question;