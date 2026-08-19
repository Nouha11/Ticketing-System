import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  template: `
    @if (auth.isLoggedIn()) {
      <nav class="navbar">
        <span class="brand">🎫 IT Ticketing</span>
        <div class="nav-links">
          <a routerLink="/tickets" routerLinkActive="active">Tickets</a>
        </div>
        <div class="nav-right">
          <span class="user-info">
            {{ auth.fullName() }}
            <span class="role-badge role-{{ auth.role()?.toLowerCase() }}">{{ auth.role() }}</span>
          </span>
          <button class="btn-logout" (click)="auth.logout()">Logout</button>
        </div>
      </nav>
    }
    <main [class.container]="auth.isLoggedIn()">
      <router-outlet />
    </main>
  `,
  styles: [`
    .navbar {
      background: #1e40af; color: #fff;
      padding: .75rem 2rem;
      display: flex; align-items: center; gap: 1.5rem;
      .brand { font-weight: 700; font-size: 1.1rem; }
      .nav-links { display: flex; gap: 1rem; flex: 1;
        a { color: rgba(255,255,255,.8); text-decoration: none; font-size: .95rem;
            &:hover, &.active { color: #fff; } } }
      .nav-right { display: flex; align-items: center; gap: 1rem; }
      .user-info { font-size: .85rem; color: rgba(255,255,255,.85); display: flex; align-items: center; gap: .5rem; }
    }
    .role-badge {
      padding: .15rem .5rem; border-radius: 999px; font-size: .7rem; font-weight: 700; text-transform: uppercase;
      &.role-admin  { background: #fbbf24; color: #78350f; }
      &.role-agent  { background: #34d399; color: #065f46; }
      &.role-user   { background: #93c5fd; color: #1e3a8a; }
    }
    .btn-logout {
      background: rgba(255,255,255,.15); color: #fff; border: 1px solid rgba(255,255,255,.3);
      padding: .3rem .75rem; border-radius: 6px; cursor: pointer; font-size: .85rem;
      &:hover { background: rgba(255,255,255,.25); }
    }
    .container { max-width: 1100px; margin: 0 auto; padding: 2rem 1.5rem; }
  `]
})
export class App {
  auth = inject(AuthService);
}
