import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './ticket-form.html',
  styleUrl: './ticket-form.scss'
})
export class TicketFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = signal(false);
  ticketId?: number;
  submitting = signal(false);
  error = signal('');

  priorities = ['Low', 'Medium', 'High', 'Critical'];
  categories = ['Hardware', 'Software', 'Network', 'Account', 'Other'];
  statuses   = ['Open', 'InProgress', 'Resolved', 'Closed'];

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title:       ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      priority:    ['Medium', Validators.required],
      category:    ['Other', Validators.required],
      status:      ['Open', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.ticketId = +id;
      this.ticketService.getById(this.ticketId).subscribe({
        next: (t) => this.form.patchValue(t),
        error: () => this.error.set('Could not load ticket.')
      });
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);
    this.error.set('');

    const action = this.isEdit()
      ? this.ticketService.update(this.ticketId!, this.form.value)
      : this.ticketService.create(this.form.value);

    action.subscribe({
      next: () => this.router.navigate(['/tickets']),
      error: () => {
        this.error.set('Save failed. Check the API is running.');
        this.submitting.set(false);
      }
    });
  }
}
