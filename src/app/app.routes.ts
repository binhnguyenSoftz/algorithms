import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  { 
    path: 'intro', 
    loadComponent: () => import('./pages/intro/intro.component').then(m => m.IntroPageComponent) 
  },
  { 
    path: 'demo', 
    loadComponent: () => import('./pages/demo/demo.component').then(m => m.DemoPageComponent) 
  },
  {
    path: 'theory',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutPageComponent)
  }
];
