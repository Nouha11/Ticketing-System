export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'Open' | 'InProgress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  category: 'Hardware' | 'Software' | 'Network' | 'Account' | 'Other';
  createdAt: string;
  updatedAt?: string;
}
