export interface Ticket {
    id: string;
    name: string;
    email: string;
    description: string;
    status: 'New' | 'In Progress' | 'Resolved';
  }
  
  export interface User {
    id: string;
    email: string;
    username: string;
    created_at: string;
    updated_at: string;
  }