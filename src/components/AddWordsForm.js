import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiTrash, BiPlus, BiPlay } from 'react-icons/bi'; 
import '../assets/css/add-words-form.css';

function AddWordsForm() {
  const navigate = useNavigate();
  const [wordPairs, setWordPairs] = useState([{ polish: '', translation: '', id: Date.now(), error: false }]);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    const loadedWords = JSON.parse(localStorage.getItem('words')) || [];
    setWordPairs(loadedWords.map(word => ({ ...word, error: false })));
  }, []);

  const addWordField = () => {
    setWordPairs([...wordPairs, { polish: '', translation: '', id: Date.now(), error: false }]);
  };

  const handleWordChange = (index, field, value) => {
    const updatedWordPairs = wordPairs.map((pair, i) =>
      i === index ? { ...pair, [field]: value, error: false } : pair
    );
    setWordPairs(updatedWordPairs);
    localStorage.setItem('words', JSON.stringify(updatedWordPairs));
  };

  const removeWordPair = (id) => {
    const updatedWordPairs = wordPairs.filter(pair => pair.id !== id);
    setWordPairs(updatedWordPairs);
    localStorage.setItem('words', JSON.stringify(updatedWordPairs));
  };

  const startTest = () => {
    const updatedWordPairs = wordPairs.map(pair => ({
      ...pair,
      error: !pair.polish || !pair.translation
    }));
    setWordPairs(updatedWordPairs);
    const incomplete = updatedWordPairs.some(pair => pair.error);

    if (incomplete) {
      setSubmitAttempted(true);
      return;
    }

    navigate('/test', { state: { words: wordPairs.filter(pair => !pair.error) } });
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className='mb-3'>Lista słówek</h1>
      {wordPairs.map((pair, index) => (
        <div key={pair.id} className="row align-items-end mb-3">
          <div className="col">
            <input
              type="text"
              className={`form-control ${submitAttempted && pair.error ? 'border-danger' : ''} mb-2`}
              placeholder="Polskie słówko"
              value={pair.polish}
              onChange={(e) => handleWordChange(index, 'polish', e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className={`form-control ${submitAttempted && pair.error ? 'border-danger' : ''} mb-2`}
              placeholder="Tłumaczenie"
              value={pair.translation}
              onChange={(e) => handleWordChange(index, 'translation', e.target.value)}
            />
          </div>
          <div className="col-auto">
            <button onClick={() => removeWordPair(pair.id)} className="btn btn-danger mb-2">
              <BiTrash />
            </button>
          </div>
        </div>
      ))}
      <div className="floating-buttons">
        <button onClick={addWordField} className="btn-circle add-btn mb-2">
          <BiPlus />
        </button>
        <button onClick={startTest} className="btn-circle start-btn ml-2 mb-2">
          <BiPlay />
        </button>
      </div>
    </div>
  );
}

export default AddWordsForm;
