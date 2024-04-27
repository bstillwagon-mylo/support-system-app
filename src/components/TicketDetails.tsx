import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  getTicket,
  updateTicketStatus,
  sendResponseMessage,
} from '../utils/api'
import { Ticket } from '../utils/types'
import useSupabaseSession from '../utils/helpers'
import LoginPage from './LoginPage'
import './TicketDetails.css'

interface TicketDetailsProps {
  onSubmitSuccess?: () => void
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ onSubmitSuccess }) => {
  const { id } = useParams<{ id: string }>()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [responseMessage, setResponseMessage] = useState('')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
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
    } catch (error) {
      console.error('Error updating ticket:', error)
    }
  }

  const handleSendResponse = async () => {
    try {
      // @ts-ignore: Object is possibly 'null'.
      const response = await sendResponseMessage(id, responseMessage)

      if (response) {
        setShowSuccessMessage(true)
        if (onSubmitSuccess) {
          onSubmitSuccess()
        }
        setResponseMessage('')
        console.log('Response sent successfully')
      } else {
        console.log('Error sending response:', response)
      }
    } catch (error) {
      console.error('Error sending response:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShowSuccessMessage(false)
    setResponseMessage(e.target.value)
  }

  if (!ticket) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {user ? (
        <>
          <div className="ticket-details">
            <Link to="/tickets" className="back-link">
              Back to Ticket Table
            </Link>
            <h1 className="ticket-details__title">Ticket Details</h1>
            <div className="ticket-details__info">
              <div className="ticket-details__info-item">
                <span className="ticket-details__info-label">
                  Customer:
                </span>
                <span className="ticket-details__info-value">
                  {ticket.name}
                </span>
              </div>
              <div className="ticket-details__info-item">
                <span className="ticket-details__info-label">
                  Email:
                </span>
                <span className="ticket-details__info-value">
                  {ticket.email}
                </span>
              </div>
              <div className="ticket-details__info-item">
                <span className="ticket-details__info-label">Description:</span>
                <span className="ticket-details__info-value">
                  {ticket.description}
                </span>
              </div>
              <div className="ticket-details__info-item">
                <span className="ticket-details__info-label">Status:</span>
                <span className="ticket-details__info-value ticket-details__status">
                  {ticket.status}
                  {ticket.status === 'New' && (
                    <button
                      className="ticket-details__status-button"
                      onClick={() => handleUpdateStatus('In Progress')}
                    >
                      Mark In Progress
                    </button>
                  )}
                  {ticket.status === 'In Progress' && (
                    <button
                      className="ticket-details__status-button"
                      onClick={() => handleUpdateStatus('Resolved')}
                    >
                      Mark Resolved
                    </button>
                  )}
                </span>
              </div>
            </div>
            <textarea
              className="ticket-details__response"
              value={responseMessage}
              onChange={handleInputChange}
              placeholder="Enter your response"
            />
            <button
              className="ticket-details__submit"
              onClick={handleSendResponse}
            >
              Send Response
            </button>
            {showSuccessMessage && (
              <div className="ticket-form__success">
                Response sent successfully!
              </div>
            )}
          </div>
        </>
      ) : (
        <LoginPage onLogin={() => navigate(`/ticket/${id}`)} />
      )}
    </div>
  )
}

export default TicketDetails
