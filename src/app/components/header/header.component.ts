import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, debounceTime, distinctUntilChanged, of, Observable } from 'rxjs';
import { takeUntil, switchMap, map, filter } from 'rxjs/operators';
import { User } from '../../core/models/user.model';
import { LazyImageDirective } from '../../core/directives/lazy-image.directive';
import { UsersService } from '../../core/services/users.service';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    LazyImageDirective
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchQuery = '';
  filteredUsers$: Observable<User[]>;
  searchError = false;
  isSearching = false;
  showSearchResults = false;
  isUserDetailPage = false;
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private usersService: UsersService,
    private searchService: SearchService,
    public router: Router
  ) {
    this.filteredUsers$ = of([]);
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe((event: any) => {
      this.isUserDetailPage = event.url.startsWith('/users/') && event.url !== '/users';
    });

    this.isUserDetailPage = this.router.url.startsWith('/users/') && this.router.url !== '/users';

    this.filteredUsers$ = this.searchSubject.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(query => {
        if (!query || query.trim() === '') {
          this.showSearchResults = false;
          this.isSearching = false;
          this.searchError = false;
          return of([]);
        }

        this.isSearching = true;
        this.showSearchResults = true;
        this.searchError = false;

        const trimmed = query.trim();
        if (!/^\d+$/.test(trimmed)) {
          this.isSearching = false;
          this.searchError = true;
          return of([]);
        }

        const id = Number(trimmed);
        return this.usersService.searchUserById(id).pipe(
          map(user => {
            this.isSearching = false;
            this.searchError = !user;
            return user ? [user] : [];
          })
        );
      }),
      takeUntil(this.destroy$)
    );
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchQuery);
    this.searchService.setQuery(this.searchQuery);
  }

  onSearchFocus(): void {
    if (this.searchQuery.trim() !== '') {
      this.showSearchResults = true;
    }
  }

  onSearchBlur(): void {
    setTimeout(() => {
      this.showSearchResults = false;
    }, 200);
  }

  navigateToUser(user: User): void {
    if (user) {
      this.router.navigate(['/users', user.id]);
      this.clearSearch();
      this.showSearchResults = false;
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchError = false;
    this.showSearchResults = false;
    this.isSearching = false;
    this.searchService.clear();
  }

  getFallbackAvatar(name: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff&size=300&bold=true`;
  }

  onImageError(event: any): void {
    event.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(event.target.alt)}&background=10b981&color=fff&size=300&bold=true`;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      const searchInput = document.querySelector('.search-field input') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
