import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../../core/models/user.model';
import * as UsersActions from './users.actions';

export interface UsersState extends EntityState<User> {
  pages: { [page: number]: number[] }; // Map page number to user IDs
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  perPage: number;
  selectedUserId: number | null;
  searchResult: User | null;
  loading: boolean;
  error: any;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UsersState = adapter.getInitialState({
  pages: {},
  currentPage: 1,
  totalPages: 0,
  totalUsers: 0,
  perPage: 6,
  selectedUserId: null,
  searchResult: null,
  loading: false,
  error: null
});

export const usersReducer = createReducer(
  initialState,
  
  // Load Users
  on(UsersActions.loadUsers, (state, { page }) => {
    return {
      ...state,
      currentPage: page,
      loading: true,
      error: null
    };
  }),
  
  on(UsersActions.loadUsersSuccess, (state, { response, page }) => {
    const userIds = response.data.map(user => user.id);
    return adapter.setMany(response.data, {
      ...state,
      pages: { ...state.pages, [page]: userIds },
      currentPage: page,
      totalPages: response.total_pages,
      totalUsers: response.total,
      perPage: response.per_page,
      loading: false,
      error: null
    });
  }),
  
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  on(UsersActions.loadUsersCached, (state, { page }) => ({
    ...state,
    currentPage: page,
    loading: false,
    error: null
  })),
  
  // Load Single User
  on(UsersActions.loadUser, (state, { id }) => {
    return {
      ...state,
      selectedUserId: id,
      loading: true,
      error: null
    };
  }),
  
  on(UsersActions.loadUserSuccess, (state, { user }) => 
    adapter.setOne(user, {
      ...state,
      loading: false,
      error: null
    })
  ),
  
  on(UsersActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  on(UsersActions.loadUserCached, (state, { id }) => ({
    ...state,
    selectedUserId: id,
    loading: false,
    error: null
  })),
  
  // Search User
  on(UsersActions.searchUser, (state) => ({
    ...state,
    searchResult: null,
    error: null
  })),
  
  on(UsersActions.searchUserSuccess, (state, { user }) => ({
    ...state,
    searchResult: user,
    error: null
  })),
  
  on(UsersActions.searchUserFailure, (state, { error }) => ({
    ...state,
    searchResult: null,
    error
  })),
  
  // Clear Cache
  on(UsersActions.clearUsersCache, () => initialState)
);

// Selectors
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
