import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../core/models/user.model';
import { SkeletonCardComponent } from '../../components/skeleton-card/skeleton-card.component';
import { LazyImageDirective } from '../../core/directives/lazy-image.directive';
import { SearchService } from '../../core/services/search.service';
import { UsersService } from '../../core/services/users.service';
import * as UsersActions from '../../store/users/users.actions';
import * as fromUsers from '../../store/users/users.selectors';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    SkeletonCardComponent,
    LazyImageDirective
  ],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]>;
  displayedUsers$: Observable<User[]>;
  isFilterActive$: Observable<boolean>;
  totalUsers$: Observable<number>;
  pageSize$: Observable<number>;
  loading$: Observable<boolean>;
  shouldShowEmptyState$: Observable<boolean>;
  currentPage = 0;
  private page$ = new BehaviorSubject<number>(1);

  constructor(
    private store: Store,
    private router: Router,
    private searchService: SearchService,
    private usersService: UsersService
  ) {
    this.users$ = this.page$.pipe(
      switchMap(page => this.store.select(fromUsers.selectUsersForPage(page)))
    );
    this.totalUsers$ = this.store.select(fromUsers.selectTotalUsers);
    this.pageSize$ = this.store.select(fromUsers.selectPerPage);
    this.loading$ = this.store.select(fromUsers.selectUsersLoading);
    this.isFilterActive$ = this.searchService.query$.pipe(
      map(query => query.trim().length > 0)
    );
    this.displayedUsers$ = this.searchService.query$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        const trimmed = query.trim();
        if (!trimmed) {
          return this.users$;
        }

        if (!/^\d+$/.test(trimmed)) {
          return of([]);
        }

        const id = Number(trimmed);
        return this.store.select(fromUsers.selectUserById(id)).pipe(
          take(1),
          switchMap(user => {
            if (user) {
              return of([user]);
            }

            return this.usersService.searchUserById(id).pipe(
              map(foundUser => (foundUser ? [foundUser] : []))
            );
          })
        );
      })
    );

    // Only show empty state if not loading, no displayed users, and truly no data
    this.shouldShowEmptyState$ = this.loading$.pipe(
      switchMap(loading => {
        if (loading) return of(false);
        
        return this.displayedUsers$.pipe(
          switchMap(displayedUsers => {
            if (displayedUsers && displayedUsers.length > 0) {
              return of(false);
            }
            
            // Check if it's a search query
            return this.isFilterActive$.pipe(
              switchMap(isSearch => {
                if (isSearch) {
                  // For search, show empty if no results
                  return of(true);
                }
                
                // For non-search, check if store has any data
                return this.store.select(fromUsers.selectAllUsers).pipe(
                  map(allUsers => allUsers.length === 0)
                );
              })
            );
          })
        );
      })
    );
  }

  ngOnInit(): void {
    this.loadUsers(1);
    this.prefetchNextPage(1);
  }

  private prefetchNextPage(currentPage: number): void {
    const nextPage = currentPage + 1;
    setTimeout(() => {
      this.store.dispatch(UsersActions.prefetchUsers({ page: nextPage }));
    }, 500);
  }

  loadUsers(page: number): void {
    this.store.dispatch(UsersActions.loadUsers({ page }));
    this.page$.next(page);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    const page = event.pageIndex + 1;
    this.loadUsers(page);
    this.prefetchNextPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  viewUserDetail(userId: number): void {
    this.router.navigate(['/users', userId]);
  }

  getCardDelay(index: number): string {
    return `${index * 0.1}s`;
  }

  getFallbackAvatar(name: string, size: number = 256): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff&size=${size}&bold=true`;
  }

  onImageError(event: any): void {
    event.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(event.target.alt)}&background=10b981&color=fff&size=800&bold=true`;
  }
}
