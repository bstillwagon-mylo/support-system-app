import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getTicket, updateTicketStatus} from '../utils/api'
import { Ticket } from '../utils/types';
import useSupabaseSession from '../utils/helpers';
import LoginPage from './LoginPage';

const TicketDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [response, setResponse] = useState('');
  const navigate = useNavigate();
  const user = useSupabaseSession();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        // @ts-ignore: Object is possibly 'null'.
        const data  = await getTicket(id)
        // @ts-ignore: Object is possibly 'null'.
        setTicket(data);
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };

    fetchTicket();
  }, [id]);

  const handleUpdateStatus = async (newStatus: string) => {
    try {
      // @ts-ignore: Object is possibly 'null'.
      const data = await updateTicketStatus(id, newStatus)  
      setTicket(data);
      console.log('setTicket')
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        {
            !user ? (<> <div>
      <h1>Ticket Details</h1>
      <p>Customer Name: {ticket.name}</p>
      <p>Customer Email: {ticket.email}</p>
      <p>Description: {ticket.description}</p>
      <p>Status: {ticket.status}</p>
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Enter your response"
      />
      {ticket.status === 'New' && (
        <button onClick={() => handleUpdateStatus('In Progress')}>Mark as In Progress</button>
      )}
      {ticket.status === 'In Progress' && (
        <button onClick={() => handleUpdateStatus('Resolved')}>Mark as Resolved</button>
      )}
      <button onClick={() => navigate('/tickets')}>Back to Ticket Table</button>
      </div></> ) : (<LoginPage/>) }
    </div>
  );
};

export default TicketDetails;