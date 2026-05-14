import { Injectable } from '@angular/core';
import { StepRecord } from '../models/step.model';

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  findMedianElement(arr: number[]): StepRecord[] {
    const steps: StepRecord[] = [];
    const n = arr.length;
    const k = Math.floor(n / 2);
    const workingArr = [...arr];

    this.quickSelect(workingArr, 0, n - 1, k, steps);
    return steps;
  }

  private quickSelect(arr: number[], left: number, right: number, k: number, steps: StepRecord[]): void {
    if (left >= right) {
      if (left === k) {
        steps.push({
          stepNumber: steps.length + 1,
          title: 'Tìm thấy phần tử giữa',
          description: `Đã tìm thấy phần tử tại vị trí ${k}. Giá trị là ${arr[left]}.`,
          array: [...arr],
          left,
          right,
          pivotIndex: left,
          pivotValue: arr[left],
          isFound: true,
          foundValue: arr[left],
          phase: 'found'
        });
      }
      return;
    }

    // Step 1: Select Pivot
    const pivotIndex = right;
    const pivotValue = arr[right];
    steps.push({
      stepNumber: steps.length + 1,
      title: 'Chọn Pivot',
      description: `Chọn phần tử cuối dãy làm pivot: giá trị ${pivotValue} tại vị trí ${pivotIndex}.`,
      array: [...arr],
      left,
      right,
      pivotIndex,
      pivotValue,
      phase: 'select-pivot'
    });

    // Step 2: Partition
    const pivotPos = this.partition(arr, left, right, steps);

    // Step 3: Recurse
    if (pivotPos === k) {
      steps.push({
        stepNumber: steps.length + 1,
        title: 'Tìm thấy phần tử giữa',
        description: `Vị trí pivot (${pivotPos}) trùng với vị trí cần tìm (k=${k}).`,
        array: [...arr],
        left,
        right,
        pivotIndex: pivotPos,
        pivotValue: arr[pivotPos],
        isFound: true,
        foundValue: arr[pivotPos],
        phase: 'found'
      });
    } else if (pivotPos > k) {
      steps.push({
        stepNumber: steps.length + 1,
        title: 'Đệ quy bên trái',
        description: `Vị trí pivot (${pivotPos}) lớn hơn k (${k}). Tiếp tục tìm trong nửa bên trái [${left}, ${pivotPos - 1}].`,
        array: [...arr],
        left,
        right,
        pivotIndex: pivotPos,
        pivotValue: arr[pivotPos],
        phase: 'recurse'
      });
      this.quickSelect(arr, left, pivotPos - 1, k, steps);
    } else {
      steps.push({
        stepNumber: steps.length + 1,
        title: 'Đệ quy bên phải',
        description: `Vị trí pivot (${pivotPos}) nhỏ hơn k (${k}). Tiếp tục tìm trong nửa bên phải [${pivotPos + 1}, ${right}].`,
        array: [...arr],
        left,
        right,
        pivotIndex: pivotPos,
        pivotValue: arr[pivotPos],
        phase: 'recurse'
      });
      this.quickSelect(arr, pivotPos + 1, right, k, steps);
    }
  }

  private partition(arr: number[], left: number, right: number, steps: StepRecord[]): number {
    const pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          stepNumber: steps.length + 1,
          title: 'Phân hoạch',
          description: `So sánh ${arr[j]} <= ${pivot}. Hoán đổi vị trí ${i} và ${j}.`,
          array: [...arr],
          left,
          right,
          pivotIndex: right,
          pivotValue: pivot,
          swapIndices: [i, j],
          phase: 'partition'
        });
      }
    }

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    const pivotPos = i + 1;
    steps.push({
      stepNumber: steps.length + 1,
      title: 'Hoàn tất phân hoạch',
      description: `Đưa pivot về vị trí chính xác: ${pivotPos}.`,
      array: [...arr],
      left,
      right,
      pivotIndex: pivotPos,
      pivotValue: pivot,
      partitionResult: pivotPos,
      leftPartition: arr.slice(left, pivotPos),
      rightPartition: arr.slice(pivotPos + 1, right + 1),
      phase: 'partition'
    });

    return pivotPos;
  }

  getDefaultExample(): { array: number[], steps: StepRecord[] } {
    const array = [2, 5, 1, 10, 6, 8, 9, 7, 3, 13, 15];
    const steps = this.findMedianElement(array);
    return { array, steps };
  }
}
