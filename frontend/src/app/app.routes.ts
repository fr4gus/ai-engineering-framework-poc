import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./authentication/pages/login/login.component').then((component) => component.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./authentication/pages/register/register.component').then((component) => component.RegisterComponent)
  },
  {
    path: 'password-reset',
    loadComponent: () =>
      import('./authentication/pages/password-reset/password-reset.component').then(
        (component) => component.PasswordResetComponent
      )
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/pages/dashboard/dashboard.component').then((component) => component.DashboardComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
