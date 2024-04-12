import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import shuffle from 'lodash/shuffle';

function TestPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialWords = location.state?.words || [];
  const [words, setWords] = useState([]);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [buttonStatuses, setButtonStatuses] = useState({});

  useEffect(() => {
    if (initialWords.length === 0) {
      console.error("No words to display.");
      navigate('/');
      return;
    }

    const preparedWords = initialWords.map(word => {
      const correctOption = { translation: word.translation, isCorrect: true };
      const otherOptions = shuffle(initialWords.filter(w => w.polish !== word.polish))
                             .slice(0, 4)
                             .map(w => ({ translation: w.translation, isCorrect: false }));
      return {
        polish: word.polish,
        options: shuffle([correctOption, ...otherOptions])
      };
    });

    setWords(shuffle(preparedWords));
    setButtonStatuses({});
  }, [initialWords, navigate]);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleAnswer = (option, index) => {
    setTotalAttempts(totalAttempts + 1);
    const newStatuses = { ...buttonStatuses, [index]: option.isCorrect ? 'correct' : 'incorrect' };
    setButtonStatuses(newStatuses);

    if (option.isCorrect) {
      setTimeout(() => {
        setCorrectAnswers(correctAnswers + 1);
        setCurrentWordIndex(currentIndex => currentIndex + 1);
        setButtonStatuses({});
      }, 500); 
    }
  };

  if (currentWordIndex >= words.length) {
    const successPercentage = (correctAnswers / totalAttempts) * 100;
    navigate('/summary', { state: { correctAnswers, totalAttempts, successPercentage } });
    return null;
  }

  const currentWord = words[currentWordIndex];

  return (
    <div className="container mt-5 text-center">
      <h1>{currentWord.polish}</h1>
      <div className="card-deck d-flex justify-content-center mt-3">
        {currentWord.options.map((option, index) => {
          const buttonClass = buttonStatuses[index] === 'correct' ? 'btn-success'
                          : buttonStatuses[index] === 'incorrect' ? 'btn-danger'
                          : 'btn-outline-primary';
          return (
            <button
              key={index}
              className={`btn ${buttonClass} btn-lg m-2`} // Dodano btn-lg dla większych przycisków
              onClick={() => handleAnswer(option, index)}
              style={{ fontSize: '1.25rem' }} // Zwiększony rozmiar tekstu
            >
              {option.translation}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TestPage;
