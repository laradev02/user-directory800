import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState, selectAll, selectEntities } from './users.reducer';
import { User } from '../../core/models/user.model';

export const selectUsersState = createFeatureSelector<UsersState>('users');

// Entity selectors
export const selectAllUsers = createSelector(
  selectUsersState,
  selectAll
);

export const selectUserEntities = createSelector(
  selectUsersState,
  selectEntities
);

// Get users for current page
export const selectUsersForPage = (page: number) => createSelector(
  selectUsersState,
  (state: UsersState) => {
    const userIds = state.pages[page] || [];
    return userIds
      .map(id => state.entities[id])
      .filter((user): user is User => user !== undefined);
  }
);

// Get single user by ID
export const selectUserById = (id: number) => createSelector(
  selectUserEntities,
  (entities) => entities[id]
);

// Pagination selectors
export const selectCurrentPage = createSelector(
  selectUsersState,
  (state: UsersState) => state.currentPage
);

export const selectTotalPages = createSelector(
  selectUsersState,
  (state: UsersState) => state.totalPages
);

export const selectTotalUsers = createSelector(
  selectUsersState,
  (state: UsersState) => state.totalUsers
);

export const selectPerPage = createSelector(
  selectUsersState,
  (state: UsersState) => state.perPage
);

// Loading state
export const selectUsersLoading = createSelector(
  selectUsersState,
  (state: UsersState) => state.loading
);

// Error state
export const selectUsersError = createSelector(
  selectUsersState,
  (state: UsersState) => state.error
);

// Search result
export const selectSearchResult = createSelector(
  selectUsersState,
  (state: UsersState) => state.searchResult
);

// Selected user
export const selectSelectedUser = createSelector(
  selectUsersState,
  (state: UsersState) => state.selectedUserId ? state.entities[state.selectedUserId] : null
);

// Check if page is cached
export const isPageCached = (page: number) => createSelector(
  selectUsersState,
  (state: UsersState) => {
    const pageCache = state.pages[page];
    return pageCache && pageCache.length > 0;
  }
);
