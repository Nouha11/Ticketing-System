import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ticket } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.scss'
})
export class TicketListComponent implements OnInit {
  tickets = signal<Ticket[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.loading.set(true);
    this.error.set('');
    this.ticketService.getAll().subscribe({
      next: (data) => {
        this.tickets.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load tickets. Make sure the API is running.');
        this.loading.set(false);
      }
    });
  }

  deleteTicket(id: number): void {
    if (!confirm('Delete this ticket?')) return;
    this.ticketService.delete(id).subscribe(() => this.loadTickets());
  }

  priorityClass(priority: string): string {
    const map: Record<string, string> = {
      Critical: 'badge-critical',
      High: 'badge-high',
      Medium: 'badge-medium',
      Low: 'badge-low'
    };
    return map[priority] ?? '';
  }

  statusClass(status: string): string {
    const map: Record<string, string> = {
      Open: 'status-open',
      InProgress: 'status-inprogress',
      Resolved: 'status-resolved',
      Closed: 'status-closed'
    };
    return map[status] ?? '';
  }
}
