import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-skeleton-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="skeleton-detail-card">
      <div class="skeleton-card-gradient"></div>
      <div class="skeleton-detail-content">
        <div class="skeleton-avatar-section">
          <div class="skeleton-avatar-glow"></div>
          <div class="skeleton-avatar-border">
            <div class="skeleton-avatar-inner">
              <div class="skeleton-avatar-large"></div>
            </div>
          </div>
          <div class="skeleton-status-badge"></div>
        </div>
        <div class="skeleton-info-section">
          <div class="skeleton-name-section">
            <div class="skeleton-full-name">
              <div class="skeleton-name-part"></div>
              <div class="skeleton-name-part accent"></div>
            </div>
            <div class="skeleton-role-badges">
              <div class="skeleton-role-badge">
                <div class="skeleton-icon-small"></div>
                <div class="skeleton-role-text"></div>
              </div>
              <div class="skeleton-role-badge">
                <div class="skeleton-icon-small"></div>
                <div class="skeleton-role-text"></div>
              </div>
            </div>
          </div>
          <div class="skeleton-info-grid">
            <div class="skeleton-info-item">
              <div class="skeleton-info-icon"></div>
              <div class="skeleton-info-content">
                <div class="skeleton-info-label"></div>
                <div class="skeleton-info-value"></div>
              </div>
            </div>
            <div class="skeleton-info-item">
              <div class="skeleton-info-icon"></div>
              <div class="skeleton-info-content">
                <div class="skeleton-info-label"></div>
                <div class="skeleton-info-value"></div>
              </div>
            </div>
          </div>
          <div class="skeleton-action-buttons">
            <div class="skeleton-button primary"></div>
            <div class="skeleton-button secondary"></div>
            <div class="skeleton-button danger"></div>
          </div>
        </div>
      </div>
    </mat-card>
  `,
  styles: [`
    .skeleton-detail-card {
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid rgba(16, 185, 129, 0.1);
      border-radius: 1.5rem;
      padding: 56px;
      min-height: 500px;
      position: relative;
      overflow: hidden;
      animation: cardFadeIn 0.6s ease-out forwards;
      opacity: 0;
    }

    .skeleton-card-gradient {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 200px;
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.02) 100%);
      border-radius: 1.5rem 1.5rem 0 0;
    }

    .skeleton-detail-content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 48px;

      @media (min-width: 768px) {
        flex-direction: row;
        align-items: flex-start;
      }
    }

    .skeleton-avatar-section {
      flex-shrink: 0;
      position: relative;
    }

    .skeleton-avatar-glow {
      position: absolute;
      inset: 0;
      background: rgba(16, 185, 129, 0.1);
      border-radius: 50%;
      filter: blur(32px);
      opacity: 0.4;
    }

    .skeleton-avatar-border {
      position: relative;
      width: 224px;
      height: 224px;
      border-radius: 50%;
      background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
      padding: 4px;
      box-shadow: 0 20px 60px rgba(16, 185, 129, 0.2);
    }

    .skeleton-avatar-inner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: white;
      padding: 4px;
      overflow: hidden;
    }

    .skeleton-avatar-large {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
    }

    .skeleton-status-badge {
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 28px;
      border-radius: 9999px;
      background: linear-gradient(90deg, #ecfdf5 25%, #d1fae5 50%, #ecfdf5 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
    }

    .skeleton-info-section {
      flex: 1;
      width: 100%;
    }

    .skeleton-name-section {
      margin-bottom: 32px;
    }

    .skeleton-full-name {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .skeleton-name-part {
      height: 48px;
      border-radius: 8px;
      background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;

      &:first-child {
        width: 120px;
      }

      &.accent {
        width: 140px;
        background: linear-gradient(90deg, #ecfdf5 25%, #d1fae5 50%, #ecfdf5 75%);
        background-size: 200% 100%;
      }
    }

    .skeleton-role-badges {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .skeleton-role-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 8px;
      background: linear-gradient(90deg, #f9fafb 25%, #f3f4f6 50%, #f9fafb 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
    }

    .skeleton-icon-small {
      width: 18px;
      height: 18px;
      border-radius: 4px;
      background: linear-gradient(90deg, #e5e7eb 25%, #d1d5db 50%, #e5e7eb 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
    }

    .skeleton-role-text {
      width: 160px;
      height: 16px;
      border-radius: 4px;
      background: linear-gradient(90deg, #e5e7eb 25%, #d1d5db 50%, #e5e7eb 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
    }

    .skeleton-info-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      margin-bottom: 40px;
    }

    .skeleton-info-item {
      display: flex;
      gap: 16px;
      padding: 20px;
      border-radius: 12px;
      background: linear-gradient(90deg, #f9fafb 25%, #f3f4f6 50%, #f9fafb 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
    }

    .skeleton-info-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: linear-gradient(90deg, #e5e7eb 25%, #d1d5db 50%, #e5e7eb 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
      flex-shrink: 0;
    }

    .skeleton-info-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .skeleton-info-label {
      width: 100px;
      height: 12px;
      border-radius: 4px;
      background: linear-gradient(90deg, #e5e7eb 25%, #d1d5db 50%, #e5e7eb 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
    }

    .skeleton-info-value {
      width: 140px;
      height: 16px;
      border-radius: 4px;
      background: linear-gradient(90deg, #d1d5db 25%, #9ca3af 50%, #d1d5db 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;
    }

    .skeleton-action-buttons {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
    }

    .skeleton-button {
      height: 48px;
      border-radius: 12px;
      background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s ease-in-out infinite;

      &.primary {
        width: 160px;
        background: linear-gradient(90deg, #d1fae5 25%, #a7f3d0 50%, #d1fae5 75%);
        background-size: 200% 100%;
      }

      &.secondary {
        width: 140px;
      }

      &.danger {
        width: 120px;
      }
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
export class SkeletonDetailComponent {}
