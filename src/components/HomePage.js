import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiBook, BiLayer, BiGame } from 'react-icons/bi';
import '../assets/css/home-page.css'; 

function HomePage() {
  const navigate = useNavigate();

  const goToTestOrAddWords = () => {
    const words = JSON.parse(localStorage.getItem('words')) || [];
    if (words.length > 0) {
        navigate('/test', { state: { words: words } });
    } else {
      navigate('/add-words');
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1 style={{ marginBottom: '3rem' }}>Pewnie musisz nauczyć się słówek?<br /> Z nami pójdzie ci łatwiej!</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h4 className="card-title mb-3">Quiz ze słówek</h4>
              <p className="card-text">Sprawdź swoją wiedzę w naszym quizie!</p>
              <button onClick={goToTestOrAddWords} className="btn btn-primary m-3 btn-lg">
                <BiLayer />
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h4 className="card-title mb-3">Gra Memory</h4>
              <p className="card-text m-3">Popraw swoją pamięć z naszą grą memory.</p>
              <button onClick={goToTestOrAddWords} className="btn btn-primary m-3 btn-lg">
                <BiGame />
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate('/add-words')}
        className="words-btn btn-circle"
      >
        <BiBook />
      </button>
    </div>
  );
}

export default HomePage;
