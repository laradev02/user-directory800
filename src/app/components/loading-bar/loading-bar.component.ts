import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from '../../core/services/loading.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import * as fromUsers from '../../store/users/users.selectors';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  template: `
    <div class="loading-bar-container" *ngIf="loading$ | async">
      <mat-progress-bar
        mode="indeterminate"
        color="primary"
        class="loading-progress-bar">
      </mat-progress-bar>
    </div>
  `,
  styles: [`
    .loading-bar-container {
      position: sticky;
      top: 75px;
      left: 0;
      right: 0;
      z-index: 999;
      height: 4px;
      margin: 0;
      padding: 0;
    }

    .loading-progress-bar {
      height: 100%;
      width: 100%;

      ::ng-deep {
        .mdc-linear-progress__buffer {
          background-color: rgba(16, 185, 129, 0.1) !important;
        }

        .mdc-linear-progress__bar-inner {
          background-color: #10b981 !important;
          border-color: #10b981 !important;
        }

        .mat-mdc-progress-bar .mdc-linear-progress__buffer {
          background-color: rgba(16, 185, 129, 0.1) !important;
        }

        .mat-mdc-progress-bar .mdc-linear-progress__bar-inner {
          background-color: #10b981 !important;
        }
      }
    }
  `]
})
export class LoadingBarComponent {
  loading$: Observable<boolean>;

  constructor(
    private loadingService: LoadingService,
    private store: Store
  ) {
    // Combine HTTP loading and users store loading
    const httpLoading$ = this.loadingService.loading$;
    const usersLoading$ = this.store.select(fromUsers.selectUsersLoading);
    
    this.loading$ = combineLatest([httpLoading$, usersLoading$]).pipe(
      map(([httpLoading, usersLoading]) => httpLoading || usersLoading)
    );
  }
}
