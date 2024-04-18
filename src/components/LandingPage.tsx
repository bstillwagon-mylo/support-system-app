import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import './LandingPage.css'

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleCreateTicket = async () => {
    // Check if the user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      navigate('/tickets/new');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="landing-page">
      <h1 className="landing-page__title">Welcome to My Ticket App</h1>
      <p className="landing-page__description">
        Manage your customer support tickets with ease.
      </p>
      <div className="landing-page__actions">
        <button className="landing-page__action" onClick={handleLogin}>
          Login
        </button>
        <button className="landing-page__action" onClick={handleCreateTicket}>
          Create Ticket
        </button>
      </div>
    </div>
  );
};

export default LandingPage;