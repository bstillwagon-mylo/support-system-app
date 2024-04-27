export interface Ticket {
  id: string
  name: string
  email: string
  description: string
  status: 'New' | 'In Progress' | 'Resolved'
}
