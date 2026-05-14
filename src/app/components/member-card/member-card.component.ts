import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="member-card" [style.border-left-color]="color">
      <div class="avatar" [style.background-color]="color">
        {{ initials }}
      </div>
      <div class="info">
        <h3>{{ name }}</h3>
        <p class="msv">MSSV: {{ msv }}</p>
        <p class="dob" *ngIf="dob">Ngày sinh: {{ dob }}</p>
      </div>
    </div>
  `,
  styles: [`
    .member-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
      border-left: 5px solid var(--primary);
      transition: all 0.3s ease;
      width: 100%;
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0,0,0,0.1);
      }
    }
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 1.2rem;
    }
    .info h3 { font-size: 1.1rem; margin-bottom: 4px; }
    .msv { font-size: 0.9rem; color: var(--text-secondary); }
    .dob { font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px; }
  `]
})
export class MemberCardComponent {
  @Input() name: string = '';
  @Input() msv: string = '';
  @Input() initials: string = '';
  @Input() dob: string = '';
  @Input() color: string = 'var(--primary)';
}

import { Input } from '@angular/core';
