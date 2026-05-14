import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlgorithmService } from '../../services/algorithm.service';
import { StepRecord } from '../../models/step.model';
import { ArrayVisualizerComponent } from '../../components/array-visualizer/array-visualizer.component';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ArrayVisualizerComponent],
  template: `
    <div class="demo-container">
      <header class="page-header">
        <h1>Mô phỏng Giải thuật QuickSelect</h1>
        <p>Tìm kiếm phần tử trung vị bằng phương pháp Chia để Trị</p>
      </header>

      <div class="main-layout">
        <!-- LEFT COLUMN: CONTROLS -->
        <aside class="control-panel card">
          <section class="input-section">
            <label>Nhập dãy số (cách nhau bởi dấu phẩy):</label>
            <textarea [(ngModel)]="rawInput" placeholder="Nhập các số cách nhau bởi dấu phẩy..."></textarea>
            
            <div class="input-actions">
              <button class="btn btn-outline" (click)="useExample()">Dùng ví dụ mẫu</button>
              <button class="btn btn-outline" (click)="generateRandom()">Dãy ngẫu nhiên</button>
            </div>
            
            <button class="btn btn-primary start-btn" (click)="startDemo()">Chạy mô phỏng</button>
          </section>

          <section class="playback-controls" *ngIf="steps().length > 0">
            <h3>Điều khiển</h3>
            <div class="control-buttons">
              <button (click)="goToStep(0)" [disabled]="currentIdx() === 0">⏮</button>
              <button (click)="prevStep()" [disabled]="currentIdx() === 0">◀</button>
              <button (click)="togglePlay()">{{ isPlaying() ? '⏸' : '▶' }}</button>
              <button (click)="nextStep()" [disabled]="currentIdx() >= steps().length - 1">▶</button>
              <button (click)="goToStep(steps().length - 1)" [disabled]="currentIdx() >= steps().length - 1">⏭</button>
            </div>
            
            <div class="slider-container">
              <span>Bước: {{ currentIdx() + 1 }} / {{ steps().length }}</span>
              <input type="range" [min]="0" [max]="steps().length - 1" [ngModel]="currentIdx()" (ngModelChange)="goToStep($event)">
            </div>
          </section>

          <section class="step-log" *ngIf="steps().length > 0">
            <h3>Lịch sử các bước</h3>
            <div class="log-list">
              <div *ngFor="let s of steps(); let i = index" 
                   class="log-item" 
                   [class.active]="i === currentIdx()"
                   (click)="goToStep(i)">
                <span class="step-num">{{ i + 1 }}</span>
                <span class="step-title">{{ s.title }}</span>
              </div>
            </div>
          </section>
        </aside>

        <!-- RIGHT COLUMN: VISUALIZER -->
        <main class="visualizer-area">
          <div class="step-card card" *ngIf="currentStep()">
            <div class="step-header">
              <span class="phase-badge">{{ currentStep()?.phase }}</span>
              <h2>{{ currentStep()?.title }}</h2>
            </div>
            <p class="description">{{ currentStep()?.description }}</p>
          </div>

          <div class="viz-wrapper card">
            <app-array-visualizer
              [array]="currentStep()?.array || []"
              [leftBound]="currentStep()?.left ?? -1"
              [rightBound]="currentStep()?.right ?? -1"
              [pivotIndex]="currentStep()?.pivotIndex ?? -1"
              [swapIndices]="currentStep()?.swapIndices || null"
              [foundIndex]="currentStep()?.isFound ? (currentStep()?.pivotIndex ?? -1) : -1"
              [phase]="currentStep()?.phase || ''"
            ></app-array-visualizer>
          </div>

          <div class="result-card card" *ngIf="currentStep()?.isFound">
            <div class="celebration">ĐÃ TÌM THẤY KẾT QUẢ</div>
            <div class="found-value">{{ currentStep()?.foundValue }}</div>
            <p>Phần tử giữa dãy được xác định là: {{ currentStep()?.foundValue }}</p>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .demo-container { max-width: 1200px; margin: 0 auto; padding: 20px; }
    .page-header { margin-bottom: 30px; text-align: center; }
    
    .main-layout { display: grid; grid-template-columns: 350px 1fr; gap: 24px; }
    
    .control-panel { display: flex; flex-direction: column; gap: 24px; position: sticky; top: 20px; height: fit-content; }
    textarea { width: 100%; height: 80px; padding: 12px; border: 1px solid #E2E8F0; border-radius: 8px; margin: 12px 0; font-family: inherit; }
    .input-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; }
    .start-btn { width: 100%; }

    .control-buttons { display: flex; justify-content: space-between; margin-top: 12px; }
    .control-buttons button { padding: 8px 16px; border-radius: 8px; border: 1px solid #E2E8F0; background: white; cursor: pointer; }
    
    .slider-container { margin-top: 20px; display: flex; flex-direction: column; gap: 8px; }
    input[type="range"] { width: 100%; }

    .step-log { max-height: 400px; display: flex; flex-direction: column; }
    .log-list { overflow-y: auto; display: flex; flex-direction: column; gap: 4px; padding-right: 8px; }
    .log-item { padding: 8px 12px; border-radius: 6px; cursor: pointer; display: flex; gap: 10px; font-size: 0.9rem; }
    .log-item:hover { background: var(--neutral-100); }
    .log-item.active { background: var(--primary-light); color: var(--primary); font-weight: 600; }
    .step-num { opacity: 0.5; width: 20px; }

    .visualizer-area { display: flex; flex-direction: column; gap: 24px; }
    .step-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .phase-badge { background: var(--accent); color: white; padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; text-transform: uppercase; font-weight: bold; }
    .description { font-size: 1.1rem; color: var(--text-secondary); }

    .result-card { text-align: center; border: 2px solid var(--success); }
    .celebration { color: var(--success); font-weight: bold; font-size: 1.2rem; }
    .found-value { font-size: 4rem; font-weight: 800; color: var(--success); margin: 10px 0; }

    @media (max-width: 900px) {
      .main-layout { grid-template-columns: 1fr; }
      .control-panel { position: relative; top: 0; }
    }
  `]
})
export class DemoPageComponent implements OnInit {
  rawInput = '2, 5, 1, 10, 6, 8, 9, 7, 3, 13, 15';
  steps = signal<StepRecord[]>([]);
  currentIdx = signal(0);
  isPlaying = signal(false);
  playInterval: any;

  currentStep = computed(() => this.steps()[this.currentIdx()]);

  constructor(private algoService: AlgorithmService) {}

  ngOnInit() {
    this.startDemo();
  }

  useExample() {
    this.rawInput = '2, 5, 1, 10, 6, 8, 9, 7, 3, 13, 15';
  }

  generateRandom() {
    const arr = Array.from({length: 11}, () => Math.floor(Math.random() * 50));
    this.rawInput = arr.join(', ');
  }

  startDemo() {
    const arr = this.rawInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    if (arr.length < 3) return;
    
    this.steps.set(this.algoService.findMedianElement(arr));
    this.currentIdx.set(0);
    this.isPlaying.set(false);
    clearInterval(this.playInterval);
  }

  goToStep(idx: number) {
    this.currentIdx.set(idx);
    if (idx >= this.steps().length - 1) this.isPlaying.set(false);
  }

  nextStep() {
    if (this.currentIdx() < this.steps().length - 1) {
      this.currentIdx.update(i => i + 1);
    } else {
      this.isPlaying.set(false);
    }
  }

  prevStep() {
    if (this.currentIdx() > 0) {
      this.currentIdx.update(i => i - 1);
    }
  }

  togglePlay() {
    this.isPlaying.update(p => !p);
    if (this.isPlaying()) {
      this.playInterval = setInterval(() => {
        if (this.currentIdx() < this.steps().length - 1) {
          this.nextStep();
        } else {
          this.isPlaying.set(false);
          clearInterval(this.playInterval);
        }
      }, 1500);
    } else {
      clearInterval(this.playInterval);
    }
  }
}
