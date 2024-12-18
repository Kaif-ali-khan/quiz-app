import React, { useState, useEffect } from "react";
import "../Components/Quiz.css";

const questionsArr = [
  {
    id: 1,
    question: "What Does HTML Stands For",
    options: [
      "Hyper Text Preprocesser",
      "Hyper Text Markup Language",
      "Hyper Text",
      "Hyper Test Me Language",
    ],
    correctoption: "Hyper Text Markup Language",
  },
  {
    id: 2,
    question: "What Does CSS Stands For",
    options: [
      "Central Service Selection",
      "Cascading Style Sheet",
      "Cyber Security Service",
      "Cascading Sheet Style",
    ],
    correctoption: "Cascading Style Sheet",
  },
  {
    id: 3,
    question: "What Does JS Stands For",
    options: ["JavaScript", "Java Script", "Jeva Scribe", "Javascript Script"],
    correctoption: "JavaScript",
  },
  {
    id: 4,
    question: "What Does HTTP Stands For",
    options: [
      "Hyper Text Transfer Protocol",
      "Hill Tim Tuber Piper",
      "Hyper Transfer Protocol",
      "hui hui hui",
    ],
    correctoption: "Hyper Text Transfer Protocol",
  },
];

const Quiz = () => {
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [option, setOption] = useState();
  const [result, setResult] = useState(0);
  const [timer, setTimer] = useState(10);
  const [timerActive, setTimerActive] = useState(true);

  const nextBtn = () => {
    if (option === questionsArr[currentQuestionIndex]?.correctoption) {
      setResult(result + 1);
    }
    setcurrentQuestionIndex(currentQuestionIndex + 1);
    setOption(null);
    resetTimer();
  };

  const backBtn = () => {
    setcurrentQuestionIndex(currentQuestionIndex - 1);
    resetTimer();
  };

  const optionCheck = (e) => {
    const val = e.target.value;
    setOption(val);
  };

  const totalQuestions = questionsArr.length;
  const percentage = Math.round((result / totalQuestions) * 100);
  const progressPercentage =
    ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const resetTimer = () => {
    setTimer(10);
  };

  useEffect(() => {
    let interval;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      nextBtn();
    }
    return () => clearInterval(interval);
  }, [timer, timerActive]);

  return (
    <>
      {currentQuestionIndex > questionsArr.length - 1 ? (
        <div className="container">
          <div className="quiz-result-div">
            <h1 className="mainHeading">Quiz Marks</h1>
            <h3 className="result-footer">
              {result} out of {totalQuestions}
            </h3>
            <p
              style={{
                color: percentage >= 50 ? "yellow" : "red",
                textAlign: "center",
                fontSize: "45px",
                fontWeight: "bolder",
              }}
            >
              {percentage}% - {percentage >= 50 ? "Pass" : "Fail"}
            </p>
            <button onClick={() => window.location.reload()} className="btn">
              Retake Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <h1 className="mainHeading">Quiz App</h1>

          {/* Timer */}
          <div
            className="timer"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {timer}s
          </div>

          {/* Progress Bar */}
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="quizAppDiv">
            <h2>{questionsArr[currentQuestionIndex].question}</h2>
            <div className="quizList">
              {questionsArr[currentQuestionIndex]?.options?.map((d, index) => (
                <div className="quizBox" key={index}>
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={d}
                    className="radioBtn"
                    onChange={optionCheck}
                    checked={option === d}
                  />
                  <h3 className="heading3">{d}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="footerQuiz">
            <h3>
              {currentQuestionIndex + 1} of {questionsArr.length} Questions
            </h3>
            <div className="btnDiv">
              <button
                className="btn"
                onClick={backBtn}
                disabled={currentQuestionIndex === 0}
              >
                Back
              </button>
              <button className="btn" onClick={nextBtn} disabled={!option}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
