import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="skeleton-card">
      <div class="skeleton-top-action"></div>
      <div class="skeleton-avatar-wrapper">
        <div class="skeleton-avatar-ring">
          <div class="skeleton-avatar"></div>
        </div>
        <div class="skeleton-status-dot"></div>
      </div>
      <div class="skeleton-content">
        <div class="skeleton-name"></div>
        <div class="skeleton-role"></div>
        <div class="skeleton-pill"></div>
      </div>
      <div class="skeleton-footer">
        <div class="skeleton-footer-item">
          <div class="skeleton-footer-icon"></div>
          <div class="skeleton-footer-text"></div>
        </div>
        <div class="skeleton-footer-item">
          <div class="skeleton-footer-icon"></div>
          <div class="skeleton-footer-text"></div>
        </div>
        <div class="skeleton-footer-item">
          <div class="skeleton-footer-icon"></div>
          <div class="skeleton-footer-text"></div>
        </div>
      </div>
    </mat-card>
  `,
  styles: [`
    .skeleton-card {
      background: white;
      border: 1px solid rgba(0, 0, 0, 0.05);
      border-radius: 1rem;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
      min-height: 320px;
      animation: cardFadeIn 0.6s ease-out forwards;
      opacity: 0;
    }

    .skeleton-top-action {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
    }

    .skeleton-avatar-wrapper {
      position: relative;
      margin-bottom: 20px;
    }

    .skeleton-avatar-ring {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      border: 2px solid #f3f4f6;
      padding: 4px;
      overflow: hidden;
    }

    .skeleton-avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
    }

    .skeleton-status-dot {
      position: absolute;
      bottom: 4px;
      right: 4px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid white;
      background: linear-gradient(90deg, #d1fae5 25%, #a7f3d0 50%, #d1fae5 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
    }

    .skeleton-content {
      width: 100%;
      margin-bottom: 32px;
    }

    .skeleton-name {
      width: 70%;
      height: 20px;
      border-radius: 8px;
      background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
      margin: 0 auto 8px;
    }

    .skeleton-role {
      width: 50%;
      height: 14px;
      border-radius: 6px;
      background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
      margin: 0 auto 16px;
    }

    .skeleton-pill {
      width: 40%;
      height: 28px;
      border-radius: 9999px;
      background: linear-gradient(90deg, #ecfdf5 25%, #d1fae5 50%, #ecfdf5 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
      margin: 0 auto;
    }

    .skeleton-footer {
      width: 100%;
      padding-top: 20px;
      margin-top: 32px;
      border-top: 1px solid #f3f4f6;
      display: flex;
      justify-content: space-around;
    }

    .skeleton-footer-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .skeleton-footer-icon {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
    }

    .skeleton-footer-text {
      width: 20px;
      height: 8px;
      border-radius: 4px;
      background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
    }

    @keyframes skeleton-shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    @keyframes cardFadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class SkeletonCardComponent {}
