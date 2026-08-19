import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { TicketListComponent } from './tickets/ticket-list/ticket-list';
import { TicketFormComponent } from './tickets/ticket-form/ticket-form';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '',                 redirectTo: 'tickets', pathMatch: 'full' },
  { path: 'login',            component: LoginComponent },
  { path: 'register',         component: RegisterComponent },
  { path: 'tickets',          component: TicketListComponent,  canActivate: [authGuard] },
  { path: 'tickets/new',      component: TicketFormComponent,  canActivate: [authGuard] },
  { path: 'tickets/:id/edit', component: TicketFormComponent,  canActivate: [authGuard] },
];
