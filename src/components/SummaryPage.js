import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function SummaryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { correctAnswers, totalAttempts, successPercentage } = location.state || { correctAnswers: 0, totalAttempts: 0, successPercentage: 0 };

  useEffect(() => {
    if (!location.state || !correctAnswers || !totalAttempts) {
      navigate('/add-words'); 
    }
  }, [location.state, navigate, correctAnswers, totalAttempts]);

  const restartTest = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5 text-center">
      <h1 style={{ marginBottom: '3rem' }}>Podsumowanie Testu</h1>
      <div className="card mt-3 mx-auto" style={{ maxWidth: '500px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <div className="card-body">
          <table className="table table-hover">
            <tbody>
              <tr>
                <th scope="row">Liczba poprawnych odpowiedzi</th>
                <td>{correctAnswers}</td>
              </tr>
              <tr>
                <th scope="row">Liczba wszystkich prób</th>
                <td>{totalAttempts}</td>
              </tr>
              <tr>
                <th scope="row">Skuteczność (%)</th>
                <td>{successPercentage.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={restartTest}>Rozpocznij test ponownie</button>
    </div>
  );
}

export default SummaryPage;
