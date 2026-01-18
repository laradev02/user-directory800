import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../core/services/loading.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loading-bar',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  template: `
    <div class="loading-bar-container" *ngIf="loading$ | async">
      <div class="loading-bar">
        <div class="loading-shimmer"></div>
      </div>
    </div>
  `,
  styles: [`
    .loading-bar-container {
      position: sticky;
      top: 80px;
      left: 0;
      right: 0;
      z-index: 999;
      height: 3px;
      background: #f0fdf4;
      margin-bottom: 0;
    }

    .loading-bar {
      height: 100%;
      width: 65%;
      position: relative;
      overflow: hidden;
    }

    .loading-shimmer {
      height: 100%;
      width: 100%;
      background: linear-gradient(90deg, #10b981 0%, #34d399 50%, #10b981 100%);
      background-size: 200% 100%;
      animation: shimmer 2s infinite linear;
      border-radius: 0 9999px 9999px 0;
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
  `]
})
export class LoadingBarComponent implements OnInit {
  loading$ = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {}
}
