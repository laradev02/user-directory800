import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users-list/users-list.component').then(m => m.UsersListComponent)
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./pages/user-detail/user-detail.component').then(m => m.UserDetailComponent)
  },
  {
    path: '**',
    redirectTo: '/users'
  }
];
