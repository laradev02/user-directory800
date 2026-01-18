import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { User } from '../../core/models/user.model';
import { SkeletonDetailComponent } from '../../components/skeleton-detail/skeleton-detail.component';
import { LazyImageDirective } from '../../core/directives/lazy-image.directive';
import * as UsersActions from '../../store/users/users.actions';
import * as fromUsers from '../../store/users/users.selectors';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule,
    SkeletonDetailComponent,
    LazyImageDirective
  ],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user$: Observable<User | undefined>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.loading$ = this.store.select(fromUsers.selectUsersLoading);
    this.error$ = this.store.select(fromUsers.selectUsersError);
    this.user$ = this.store.select(fromUsers.selectSelectedUser).pipe(
      filter(user => user !== null),
      map(user => user as User)
    );
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userId = parseInt(userId, 10);
      this.store.dispatch(UsersActions.loadUser({ id: this.userId }));
      this.user$ = this.store.select(fromUsers.selectUserById(this.userId)).pipe(
        filter(user => user !== undefined),
        map(user => user as User)
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }

  sendEmail(email: string): void {
    window.location.href = `mailto:${email}`;
  }

  getFallbackAvatar(name: string, size: number = 2048): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff&size=${size}&bold=true`;
  }

  onImageError(event: any): void {
    event.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(event.target.alt)}&background=10b981&color=fff&size=2048&bold=true`;
  }
}
