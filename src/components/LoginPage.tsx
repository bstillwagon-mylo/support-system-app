import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../utils/supabase';
import './LoginPage.css'
import useSupabaseSession from '../utils/helpers';
import TicketTable from './TicketTable';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const user = useSupabaseSession()


  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    try {
      await signIn(email, password);
      navigate('/tickets');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return ( 
    <div>
    {
    !user ? (<> <div className="login-page">
    <h1 className="login-page__title">Login</h1>
    <form className="login-page__form" onSubmit={handleLogin}>
      <div className="login-page__field">
        <label htmlFor="email" className="login-page__label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="login-page__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="login-page__field">
        <label htmlFor="password" className="login-page__label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="login-page__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="login-page__error">{error}</div>}
      <button type="submit" className="login-page__submit">
        Login
      </button>
    </form>
  </div> </>) : (<TicketTable/>)
  }
   </div> 
  );
};

export default LoginPage;