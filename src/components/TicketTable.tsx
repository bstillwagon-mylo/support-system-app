import React, { useState, useEffect } from 'react'
import { Ticket } from '../utils/types'
import { getTickets } from '../utils/api'
import useSupabaseSession from '../utils/helpers'
import LoginPage from './LoginPage'
import { useNavigate } from 'react-router-dom'
import './TicketTable.css'

const TicketTable: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const navigate = useNavigate()
  const { user } = useSupabaseSession()

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets()
        setTickets(data)
      } catch (error) {
        console.error('Error fetching tickets:', error)
      }
    }

    fetchTickets()
  }, [])

  return (
    <div className='ticketTable'>
      {user ? (
        <>
          <h1>Ticket Table</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Customer Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  onClick={() => navigate(`/ticket/${ticket.id}`)}
                >
                  <td>{ticket.id}</td>
                  <td>{ticket.status}</td>
                  <td>{ticket.name}</td>
                  <td>{ticket.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <LoginPage onLogin={() => navigate('/tickets')} />
      )}
    </div>
  )
}

export default TicketTable
