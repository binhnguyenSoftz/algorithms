export interface StepRecord {
  stepNumber: number;
  title: string;             // Tên bước ngắn gọn
  description: string;       // Mô tả chi tiết bằng tiếng Việt
  array: number[];           // Trạng thái dãy tại bước này
  left: number;              // Chỉ số left hiện tại
  right: number;             // Chỉ số right hiện tại
  pivotIndex: number;        // Vị trí pivot được chọn
  pivotValue: number;        // Giá trị pivot
  partitionResult?: number;  // Vị trí sau khi partition xong
  leftPartition?: number[];  // Dãy con bên trái
  rightPartition?: number[]; // Dãy con bên phải
  isFound?: boolean;         // Đã tìm được kết quả chưa
  foundValue?: number;       // Giá trị phần tử giữa
  highlightIndices?: number[];// Các index cần highlight
  swapIndices?: [number, number]; // Cặp index đang được swap
  phase: 'select-pivot' | 'partition' | 'recurse' | 'found';
}
