import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:5000/api/auth';

  // Signals — reactive state
  private _token  = signal<string | null>(localStorage.getItem('token'));
  private _role   = signal<string | null>(localStorage.getItem('role'));
  private _name   = signal<string | null>(localStorage.getItem('name'));

  // Public read-only
  token    = this._token.asReadonly();
  role     = this._role.asReadonly();
  fullName = this._name.asReadonly();
  isLoggedIn = computed(() => !!this._token());
  isAdmin    = computed(() => this._role() === 'Admin');
  isAgent    = computed(() => this._role() === 'Agent' || this._role() === 'Admin');

  constructor(private http: HttpClient, private router: Router) {}

  login(req: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, req).pipe(
      tap(res => this.saveSession(res))
    );
  }

  register(req: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, req).pipe(
      tap(res => this.saveSession(res))
    );
  }

  logout() {
    localStorage.clear();
    this._token.set(null);
    this._role.set(null);
    this._name.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this._token();
  }

  private saveSession(res: AuthResponse) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);
    localStorage.setItem('name', res.fullName);
    this._token.set(res.token);
    this._role.set(res.role);
    this._name.set(res.fullName);
  }
}
