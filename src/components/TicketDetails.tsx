import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTicket, updateTicketStatus, sendResponseMessage } from '../utils/api'
import { Ticket } from '../utils/types'
import useSupabaseSession from '../utils/helpers'
import LoginPage from './LoginPage'
import './TicketDetails.css'

const TicketDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [responseMessage, setResponseMessage] = useState('')
  const navigate = useNavigate()
  const { user } = useSupabaseSession()

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        // @ts-ignore: Object is possibly 'null'.
        const data = await getTicket(id)
        // @ts-ignore: Object is possibly 'null'.
        setTicket(data)
      } catch (error) {
        console.error('Error fetching ticket:', error)
      }
    }
    fetchTicket()
  }, [id])

  const handleUpdateStatus = async (newStatus: string) => {
    try {
      // @ts-ignore: Object is possibly 'null'.
      const data = await updateTicketStatus(id, newStatus)
      setTicket(data)
      console.log('setTicket')
    } catch (error) {
      console.error('Error updating ticket:', error)
    }
  }

  const handleSendResponse = async () => {
    try {
      // @ts-ignore: Object is possibly 'null'.
      await sendResponseMessage(id, responseMessage)
      setResponseMessage('')
      console.log('Response sent successfully')
    } catch (error) {
      console.error('Error sending response:', error)
    }
  }

  if (!ticket) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {user ? (
        <>
          {' '}
          <div className='ticketDetails'>
            <h1>Ticket Details</h1>
            <p>Customer Name: {ticket.name}</p>
            <p>Customer Email: {ticket.email}</p>
            <p>Description: {ticket.description}</p>
            <p>Status: {ticket.status}</p>
            <textarea
              value={responseMessage}
              onChange={(e) => setResponseMessage(e.target.value)}
              placeholder="Enter your response"
            />
            <button onClick={handleSendResponse}>Send Response</button>
            {ticket.status === 'New' && (
              <button onClick={() => handleUpdateStatus('In Progress')}>
                Mark as In Progress
              </button>
            )}
            {ticket.status === 'In Progress' && (
              <button onClick={() => handleUpdateStatus('Resolved')}>
                Mark as Resolved
              </button>
            )}
            <button onClick={() => navigate('/tickets')}>
              Back to Ticket Table
            </button>
          </div>
        </>
      ) : (
        <LoginPage onLogin={() => navigate(`/ticket/${id}`)} />
      )}
    </div>
  )
}

export default TicketDetails