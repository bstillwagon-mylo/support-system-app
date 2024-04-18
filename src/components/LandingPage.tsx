import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleCreateTicket = async () => {
    navigate('/tickets/new');
  };

  return (
    <div className="landing-page">
      <h1 className="landing-page__title">Welcome to My Ticket App</h1>
      <p className="landing-page__description">
        Manage your customer support tickets with ease.
      </p>
      <div className="landing-page__actions">
      <button className="landing-page__action" onClick={handleCreateTicket}>
          Create Support Ticket
        </button>
        <button className="landing-page__action" onClick={handleLogin}>
          Support Login
        </button>
        
      </div>
    </div>
  );
};

export default LandingPage;