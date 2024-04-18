import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import TicketForm from './components/TicketForm';
import TicketTable from './components/TicketTable';
import TicketDetails from './components/TicketDetails';

const App = () => {
  
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tickets/new" element={<TicketForm />} />
          <Route path="/tickets" element={<TicketTable />} />
          <Route path="/ticket/:id" element={<TicketDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;