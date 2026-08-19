import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  form: ReturnType<FormBuilder['group']>;
  loading = signal(false);
  error   = signal('');

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.error.set('');

    this.auth.login(this.form.value as any).subscribe({
      next: () => this.router.navigate(['/tickets']),
      error: (err) => {
        this.error.set(err.error?.message ?? 'Invalid email or password.');
        this.loading.set(false);
      }
    });
  }

  // Quick-fill helpers for the demo
  fillAdmin() { this.form.setValue({ email: 'admin@ticketing.com', password: 'Password123!' }); }
  fillAgent() { this.form.setValue({ email: 'agent@ticketing.com', password: 'Password123!' }); }
  fillUser()  { this.form.setValue({ email: 'user@ticketing.com',  password: 'Password123!' }); }
}
