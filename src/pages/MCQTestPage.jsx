import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MCQTestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Test Data (Simulated)
  useEffect(() => {
    setTimeout(() => {
      setTest({
        id: parseInt(id),
        title: "Cybersecurity Fundamentals Quiz",
        description: "Test your knowledge of cybersecurity fundamentals.",
        duration: 30,
        questions: [
          {
            id: 1,
            question: "What is the primary goal of cybersecurity?",
            options: [
              "To make systems as complex as possible",
              "To protect systems, networks, and data from digital attacks",
              "To monitor employee internet usage",
              "To create as many passwords as possible",
            ],
            correctAnswer: 1,
          },
          {
            id: 2,
            question: "Which of the following is NOT a common type of malware?",
            options: ["Virus", "Worm", "Firewall", "Trojan"],
            correctAnswer: 2,
          },
          {
            id: 3,
            question: 'What does the acronym "CIA" stand for in cybersecurity?',
            options: [
              "Central Intelligence Agency",
              "Confidentiality, Integrity, Availability",
              "Computer Incident Analysis",
              "Cybersecurity Information Assurance",
            ],
            correctAnswer: 1,
          },
          {
            id: 4,
            question:
              "Which encryption algorithm is considered secure for most applications today?",
            options: ["DES", "MD5", "AES", "SHA-1"],
            correctAnswer: 2,
          },
          {
            id: 5,
            question: "What is phishing?",
            options: [
              "A method to catch fish online",
              "A type of malware that encrypts files",
              "A fraudulent attempt to obtain sensitive information",
              "A network monitoring technique",
            ],
            correctAnswer: 2,
          },
        ],
      });

      setTimeRemaining(30 * 60);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  // Submit Handler (fixed with useCallback)
  const handleSubmitTest = useCallback(() => {
    setIsTestSubmitted(true);

    let correctAnswers = 0;

    test.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / test.questions.length) * 100;

    setTimeout(() => {
      alert(`Test submitted! Your score: ${score.toFixed(2)}%`);
      navigate("/dashboard");
    }, 1000);
  }, [answers, navigate, test]);

  // Timer (fixed dependency warning)
  useEffect(() => {
    if (timeRemaining > 0 && !isTestSubmitted) {
      const timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isTestSubmitted) {
      handleSubmitTest();
    }
  }, [timeRemaining, isTestSubmitted, handleSubmitTest]);

  const handleAnswerChange = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading test...</p>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="error-container">
        <h2>Test not found</h2>
        <p>This test does not exist or was removed.</p>
        <button className="btn btn-primary" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (isTestSubmitted) {
    return (
      <div className="test-submitted">
        <h2>Test Successfully Submitted!</h2>
        <p>You will be redirected shortly...</p>
      </div>
    );
  }

  return (
    <div className="mcq-test">
      <div className="test-header">
        <div className="test-info">
          <h1 className="test-title">{test.title}</h1>
          <p className="test-description">{test.description}</p>
        </div>
        <div className="test-timer">
          <div className={`timer ${timeRemaining < 300 ? "timer-warning" : ""}`}>
            {formatTime(timeRemaining)}
          </div>
        </div>
      </div>

      <div className="test-content">
        <div className="question-navigator">
          <h3>Questions</h3>
          <div className="question-grid">
            {test.questions.map((q, i) => (
              <button
                key={q.id}
                className={`question-button ${
                  i === currentQuestion ? "active" : ""
                } ${answers[q.id] !== undefined ? "answered" : ""}`}
                onClick={() => handleJumpToQuestion(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button className="btn btn-primary btn-block" onClick={handleSubmitTest}>
            Submit Test
          </button>
        </div>

        <div className="question-container">
          <div className="question-header">
            <h2>
              Question {currentQuestion + 1} of {test.questions.length}
            </h2>
          </div>

          <div className="question-content">
            <p>{test.questions[currentQuestion].question}</p>

            <div className="options-container">
              {test.questions[currentQuestion].options.map((option, index) => (
                <label key={index} className="option-label">
                  <input
                    type="radio"
                    name={`question-${test.questions[currentQuestion].id}`}
                    checked={
                      answers[test.questions[currentQuestion].id] === index
                    }
                    onChange={() =>
                      handleAnswerChange(
                        test.questions[currentQuestion].id,
                        index
                      )
                    }
                  />
                  <span className="option-text">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="question-navigation">
            <button
              className="btn btn-outline"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>

            <button
              className="btn btn-primary"
              onClick={handleNextQuestion}
              disabled={currentQuestion === test.questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCQTestPage;
