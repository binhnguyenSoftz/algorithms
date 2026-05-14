import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-array-visualizer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="visualizer-container">
      <div class="array-wrapper" [@partitionSplit]="phase === 'partition'">
        <div *ngFor="let val of array; let idx = index; trackBy: trackByFn"
             class="element-node"
             [ngClass]="getElementClass(idx)"
             [@elementState]="getState(idx)">
          <span class="value">{{ val }}</span>
          <span class="index" *ngIf="showIndices">{{ idx }}</span>
          
          <div class="pointer-label left" *ngIf="idx === leftBound">L</div>
          <div class="pointer-label right" *ngIf="idx === rightBound">R</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .visualizer-container {
      width: 100%;
      overflow-x: auto;
      padding: 40px 20px;
      display: flex;
      justify-content: center;
    }
    .array-wrapper {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .element-node {
      width: var(--element-size);
      height: var(--element-size);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      background: white;
      border: 2px solid #E2E8F0;
      transition: all 0.3s ease;
      font-family: 'JetBrains Mono', monospace;
      font-weight: bold;
    }
    .value { font-size: 1.1rem; }
    .index {
      position: absolute;
      bottom: -22px;
      font-size: 0.75rem;
      color: var(--text-secondary);
    }
    .pointer-label {
      position: absolute;
      top: -25px;
      font-size: 0.8rem;
      font-weight: bold;
      color: var(--primary);
    }
    
    /* State Classes */
    .el-normal { background: white; color: var(--neutral-800); }
    .el-out { opacity: 0.3; filter: grayscale(1); }
    .el-active { background: var(--primary-light); border-color: var(--primary); }
    .el-pivot { 
      background: var(--accent); 
      border-color: #D97706; 
      color: white;
      animation: elementHighlight 2s infinite;
    }
    .el-found { 
      background: var(--success); 
      border-color: #059669; 
      color: white;
      animation: elementFound 0.6s ease-out;
    }
    .el-swapping { 
      background: #FEE2E2; 
      border-color: var(--danger); 
      animation: swapElements 0.3s ease;
    }
  `],
  animations: [
    trigger('elementState', [
      state('normal', style({ transform: 'scale(1)' })),
      state('pivot', style({ transform: 'scale(1.1)' })),
      state('found', style({ transform: 'scale(1.15)' })),
      transition('* <=> *', animate('200ms ease-out'))
    ]),
    trigger('partitionSplit', [
      state('partition', style({ gap: '16px' })),
      transition('* <=> partition', animate('300ms ease-in-out'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrayVisualizerComponent {
  @Input() array: number[] = [];
  @Input() highlightIndices: number[] = [];
  @Input() pivotIndex: number = -1;
  @Input() leftBound: number = -1;
  @Input() rightBound: number = -1;
  @Input() swapIndices: [number, number] | null = null;
  @Input() foundIndex: number = -1;
  @Input() showIndices: boolean = true;
  @Input() phase: string = '';

  getElementClass(idx: number) {
    if (idx === this.foundIndex) return 'el-found';
    if (idx === this.pivotIndex) return 'el-pivot';
    if (this.swapIndices && (idx === this.swapIndices[0] || idx === this.swapIndices[1])) return 'el-swapping';
    if (this.highlightIndices.includes(idx)) return 'el-active';
    if (this.leftBound !== -1 && this.rightBound !== -1 && (idx < this.leftBound || idx > this.rightBound)) return 'el-out';
    return 'el-normal';
  }

  getState(idx: number) {
    if (idx === this.foundIndex) return 'found';
    if (idx === this.pivotIndex) return 'pivot';
    return 'normal';
  }

  trackByFn(index: number, item: any) {
    return index;
  }
}
