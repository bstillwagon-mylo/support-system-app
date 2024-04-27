import { Ticket } from './types' // Assuming you have a Ticket type defined
const apiUrl = process.env.REACT_APP_BACKEND_URL || ''

export async function getTickets(): Promise<Ticket[]> {
  const response = await fetch(apiUrl + `/api/tickets`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch tickets')
  }

  return await response.json()
}

export async function getTicket(id: string): Promise<Ticket[]> {
  const response = await fetch(apiUrl + `/api/tickets/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch tickets')
  }

  return await response.json()
}

export async function createTicket(ticket: {
  name: string
  email: string
  description: string
}): Promise<Ticket> {
  const response = await fetch(apiUrl + '/api/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticket),
  })

  if (!response.ok) {
    throw new Error('Failed to create ticket')
  }

  return await response.json()
}

export async function updateTicketStatus(
  ticketId: string,
  newStatus: 'In Progress' | 'Resolved'
): Promise<Ticket> {
  const response = await fetch(apiUrl + `/api/tickets/${ticketId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: newStatus }),
  })

  if (!response.ok) {
    throw new Error('Failed to update ticket status')
  }

  return await response.json()
}

export async function sendResponseMessage(id: string, message: string) {
  const response = await fetch(apiUrl + '/api/sendMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: message }),
  })

  if (!response.ok) {
    throw new Error('Failed to send message')
  }

  return await response.json()
}
