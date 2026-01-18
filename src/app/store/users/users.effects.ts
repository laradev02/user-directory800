import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, timer } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom, filter, delay } from 'rxjs/operators';
import { UsersService } from '../../core/services/users.service';
import * as UsersActions from './users.actions';
import * as fromUsers from './users.selectors';

@Injectable()
export class UsersEffects {
  
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      withLatestFrom(this.store.select(fromUsers.selectUsersState)),
      switchMap(([action, state]) => {
        const pageCache = state.pages[action.page];
        const isCached = pageCache && pageCache.length > 0;
        
        if (isCached) {
          return timer(300).pipe(
            map(() => UsersActions.loadUsersCached({ page: action.page }))
          );
        }
        
        return this.usersService.getUsers(action.page).pipe(
          map(response => UsersActions.loadUsersSuccess({ response, page: action.page })),
          catchError(error => of(UsersActions.loadUsersFailure({ error })))
        );
      })
    )
  );

  prefetchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.prefetchUsers),
      withLatestFrom(this.store.select(fromUsers.selectUsersState)),
      filter(([action, state]) => {
        const pageCache = state.pages[action.page];
        return !pageCache || pageCache.length === 0;
      }),
      switchMap(([action]) =>
        this.usersService.getUsers(action.page).pipe(
          map(response => UsersActions.loadUsersSuccess({ response, page: action.page })),
          catchError(() => of(UsersActions.loadUsersFailure({ error: null })))
        )
      )
    )
  );
  
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUser),
      withLatestFrom(this.store.select(fromUsers.selectUserEntities)),
      switchMap(([action, entities]) => {
        const isCached = !!entities[action.id];
        
        if (isCached) {
          return timer(300).pipe(
            map(() => UsersActions.loadUserCached({ id: action.id }))
          );
        }
        
        return this.usersService.getUserById(action.id).pipe(
          map(user => UsersActions.loadUserSuccess({ user })),
          catchError(error => of(UsersActions.loadUserFailure({ error })))
        );
      })
    )
  );
  
  searchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.searchUser),
      switchMap(action =>
        this.usersService.searchUserById(action.id).pipe(
          map(user => UsersActions.searchUserSuccess({ user })),
          catchError(error => of(UsersActions.searchUserFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private store: Store
  ) {}
}
