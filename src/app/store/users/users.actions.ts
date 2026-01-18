import { createAction, props } from '@ngrx/store';
import { User, UsersResponse } from '../../core/models/user.model';

// Load Users List Actions
export const loadUsers = createAction(
  '[Users List] Load Users',
  props<{ page: number }>()
);

export const prefetchUsers = createAction(
  '[Users List] Prefetch Users',
  props<{ page: number }>()
);

export const loadUsersSuccess = createAction(
  '[Users API] Load Users Success',
  props<{ response: UsersResponse; page: number }>()
);

export const loadUsersFailure = createAction(
  '[Users API] Load Users Failure',
  props<{ error: any }>()
);

export const loadUsersCached = createAction(
  '[Users] Load Users Cached',
  props<{ page: number }>()
);

// Load Single User Actions
export const loadUser = createAction(
  '[User Detail] Load User',
  props<{ id: number }>()
);

export const loadUserSuccess = createAction(
  '[Users API] Load User Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[Users API] Load User Failure',
  props<{ error: any }>()
);

export const loadUserCached = createAction(
  '[Users] Load User Cached',
  props<{ id: number }>()
);

// Search User Actions
export const searchUser = createAction(
  '[Header] Search User',
  props<{ id: number }>()
);

export const searchUserSuccess = createAction(
  '[Users API] Search User Success',
  props<{ user: User | null }>()
);

export const searchUserFailure = createAction(
  '[Users API] Search User Failure',
  props<{ error: any }>()
);

// Clear Cache
export const clearUsersCache = createAction(
  '[Users] Clear Cache'
);
