import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-content">
        <div class="logo" routerLink="/">
          <span class="symbol">∑</span>
          <span class="text">AlgoDemo</span>
        </div>
        <div class="nav-links">
          <a routerLink="/intro" routerLinkActive="active">Giới Thiệu</a>
          <a routerLink="/demo" routerLinkActive="active">Demo Giải Thuật</a>
        </div>
      </div>
    </nav>

    <main class="content-area">
      <router-outlet></router-outlet>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <p>COS705 · Phân tích Thiết kế Giải thuật Nâng cao · 2024–2025</p>
        <p class="members">Nhóm: Nguyễn Thái Bình · Huỳnh Sang · Vũ Thị Cẩm Tú</p>
      </div>
    </footer>
  `,
  styles: [`
    .navbar {
      height: 70px;
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      position: sticky;
      top: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      backdrop-filter: blur(10px);
      background: rgba(255, 255, 255, 0.8);
    }
    .nav-content {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      .symbol {
        font-size: 1.8rem;
        font-weight: 800;
        background: linear-gradient(135deg, var(--primary), #7C3AED);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .text {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--neutral-800);
      }
    }
    .nav-links {
      display: flex;
      gap: 30px;
      a {
        text-decoration: none;
        color: var(--text-secondary);
        font-weight: 500;
        padding: 8px 0;
        transition: var(--transition);
        border-bottom: 2px solid transparent;
        &:hover { color: var(--primary); }
        &.active { color: var(--primary); border-bottom-color: var(--primary); }
      }
    }
    .content-area { min-height: calc(100vh - 70px - 150px); }
    .footer {
      background: var(--neutral-800);
      color: white;
      padding: 40px 20px;
      text-align: center;
    }
    .footer-content p { margin: 4px 0; opacity: 0.8; font-size: 0.9rem; }
    .members { font-weight: 500; opacity: 1 !important; margin-top: 8px !important; }
  `]
})
export class AppComponent {}
