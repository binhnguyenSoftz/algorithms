import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MemberCardComponent } from '../../components/member-card/member-card.component';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [CommonModule, RouterLink, MemberCardComponent],
  template: `
    <div class="intro-container">
      <!-- HERO SECTION -->
      <section class="hero">
        <div class="badge">Báo Cáo Bài Tập Nhóm</div>
        <h1>Phần Tử Giữa Dãy</h1>
        <p class="subtitle">Giải thuật Chia để Trị (Divide & Conquer)</p>
        <div class="divider"></div>
        
        <div class="course-card">
          <p><strong>Môn học:</strong> Phân tích Thiết kế Giải thuật Nâng cao</p>
          <p><strong>Mã HP:</strong> COS705</p>
          <p><strong>Chương trình:</strong> Cao học Khoa học Máy tính</p>
        </div>
        
        <button class="btn btn-primary" routerLink="/demo">Bắt đầu Demo Giải Thuật</button>
      </section>

      <!-- MEMBERS SECTION -->
      <section class="members">
        <h2 class="section-title">Thành Viên Nhóm</h2>
        <div class="members-grid">
          <app-member-card 
            name="Nguyễn Thái Bình" msv="CH259456" initials="NTB" 
            dob="27/03/1999" color="#2563EB">
          </app-member-card>
          <app-member-card 
            name="Huỳnh Sang" msv="CH259461" initials="HS" 
            color="#7C3AED">
          </app-member-card>
          <app-member-card 
            name="Vũ Thị Cẩm Tú" msv="CH259463" initials="VCT" 
            dob="20/06/1999" color="#059669">
          </app-member-card>
        </div>
      </section>

      <!-- PROBLEM SECTION -->
      <section class="problem">
        <h2 class="section-title">Nội Dung Đề Bài</h2>
        <div class="blockquote">
          <p><strong>Định nghĩa:</strong> Phần tử giữa của một dãy số là phần tử có vị trí ⌊n/2⌋ trong dãy đã sắp xếp (0-indexed).</p>
          <p><strong>Ví dụ:</strong> Cho dãy 2, 5, 1, 10, 6, 8, 9, 7, 3, 13, 15. Kết quả phần tử giữa là 7.</p>
          <p><strong>Yêu cầu:</strong> Đề xuất giải thuật Chia để Trị để tìm phần tử này mà không cần sắp xếp toàn bộ dãy.</p>
        </div>
      </section>
      
      <!-- NAV CARDS -->
      <section class="nav-cards">
        <div class="nav-card" routerLink="/demo">
          <h3>Trực quan hóa</h3>
          <p>Xem từng bước QuickSelect thực hiện trên dãy số</p>
        </div>
        <div class="nav-card" routerLink="/theory">
          <h3>Cơ sở lý thuyết</h3>
          <p>Phân tích chi tiết độ phức tạp và thuật toán</p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .intro-container { max-width: 1100px; margin: 0 auto; padding: 40px 20px; }
    
    .hero {
      text-align: center;
      padding: 80px 0;
      background: linear-gradient(to bottom, var(--primary-light), white);
      border-radius: 32px;
      margin-bottom: 60px;
    }
    .badge {
      display: inline-block;
      padding: 6px 16px;
      background: white;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--primary);
      margin-bottom: 24px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }
    h1 { font-size: 3.2rem; font-weight: 800; color: var(--text-primary); margin-bottom: 8px; }
    .subtitle { font-size: 1.25rem; color: var(--text-secondary); margin-bottom: 32px; }
    .divider { width: 80px; height: 5px; background: var(--primary); border-radius: 10px; margin: 0 auto 40px; }
    
    .course-card {
      background: white;
      padding: 24px 40px;
      border-radius: 20px;
      display: inline-block;
      text-align: left;
      margin-bottom: 40px;
      box-shadow: var(--card-shadow);
      p { margin: 8px 0; font-size: 1.05rem; }
    }

    .section-title { font-size: 1.8rem; font-weight: 700; margin-bottom: 32px; text-align: center; }
    .members-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 80px;
    }

    .problem { margin-bottom: 80px; }
    .blockquote {
      background: var(--primary-light);
      border-left: 6px solid var(--primary);
      padding: 32px;
      border-radius: 0 20px 20px 0;
      p { margin-bottom: 12px; font-size: 1.1rem; }
    }

    .nav-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-top: 60px;
    }
    .nav-card {
      background: white;
      padding: 32px;
      border-radius: 20px;
      text-align: center;
      cursor: pointer;
      box-shadow: var(--card-shadow);
      transition: var(--transition);
      &:hover { transform: translateY(-8px); border-bottom: 4px solid var(--primary); }
      .icon { font-size: 2.5rem; display: block; margin-bottom: 16px; }
      h3 { margin-bottom: 8px; }
      p { color: var(--text-secondary); font-size: 0.95rem; }
    }
  `]
})
export class IntroPageComponent {}
