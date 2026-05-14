import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theory-container">
      <header class="theory-header">
        <h1>Lý Thuyết Giải Thuật</h1>
        <p>Phân tích thuật toán QuickSelect (Hoare's Selection Algorithm)</p>
      </header>

      <div class="theory-content">
        <section class="theory-section card">
          <h2>1. Ý tưởng chính</h2>
          <p>QuickSelect là một biến thể của QuickSort. Thay vì sắp xếp cả hai phía của pivot, QuickSelect chỉ đi sâu vào một phía chứa vị trí k cần tìm.</p>
          <div class="formula">
            k = ⌊n/2⌋ (Vị trí trung vị)
          </div>
        </section>

        <section class="theory-section card">
          <h2>2. Mã giả (Pseudocode)</h2>
          <pre class="code-block">
QUICKSELECT(A, left, right, k):
  IF left == right THEN return A[left]
  pivotPos ← PARTITION(A, left, right)
  IF pivotPos == k THEN return A[pivotPos]
  ELSE IF pivotPos > k THEN
    return QUICKSELECT(A, left, pivotPos-1, k)
  ELSE
    return QUICKSELECT(A, pivotPos+1, right, k)
          </pre>
        </section>

        <section class="theory-section card">
          <h2>3. Độ phức tạp</h2>
          <table class="theory-table">
            <tr>
              <th>Trường hợp</th>
              <th>Độ phức tạp</th>
            </tr>
            <tr>
              <td>Tốt nhất</td>
              <td>O(n)</td>
            </tr>
            <tr>
              <td>Trung bình</td>
              <td>O(n)</td>
            </tr>
            <tr>
              <td>Xấu nhất</td>
              <td>O(n²)</td>
            </tr>
          </table>
          <p class="explanation">Trung bình mỗi bước loại bỏ một nửa dãy → tổng công việc: n + n/2 + n/4 + ... = 2n = O(n).</p>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .theory-container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
    .theory-header { text-align: center; margin-bottom: 40px; }
    .theory-content { display: flex; flex-direction: column; gap: 30px; }
    h2 { color: var(--primary); margin-bottom: 16px; font-size: 1.4rem; }
    .formula { 
      background: var(--primary-light); 
      padding: 15px; 
      border-radius: 8px; 
      text-align: center; 
      font-family: 'JetBrains Mono', monospace; 
      font-weight: bold;
      font-size: 1.2rem;
      margin: 15px 0;
    }
    .code-block {
      background: var(--neutral-800);
      color: #E2E8F0;
      padding: 20px;
      border-radius: 12px;
      overflow-x: auto;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.95rem;
      line-height: 1.5;
    }
    .theory-table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      th, td { border: 1px solid #E2E8F0; padding: 12px; text-align: left; }
      th { background: var(--neutral-100); }
    }
    .explanation { font-size: 0.95rem; color: var(--text-secondary); font-style: italic; }
  `]
})
export class AboutPageComponent {}
