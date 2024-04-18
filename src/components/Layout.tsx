import React, { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../utils/supabase';
import './Layout.css'

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="layout">
      <header className="layout__header">
        <div className="layout__logo" onClick={() => navigate('/')}>
          Support Ticket App
        </div>
        <nav className="layout__nav">
          <button className="layout__nav-link" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>
      <main className="layout__content">{children}</main>
      <footer className="layout__footer">
        <p>&copy;2024 My Ticket App</p>
      </footer>
    </div>
  );
};

export default Layout;