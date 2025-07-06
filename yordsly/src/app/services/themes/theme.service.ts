import { DOCUMENT, inject, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly currentTheme = signal<Theme>('light');

  constructor() {
    const theme = this.getThemeFromLocalStorage();
    this.setTheme(theme);
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);
    if (theme === 'dark') {
      this.document.documentElement.classList.add('dark-theme');
    }

    else {
      this.document.documentElement.classList.remove('dark-theme');
    }

    this.setThemeInLocalStorage(theme);
  }

  toggleTheme() {
    if (this.currentTheme() === 'dark') {
      this.setTheme('light');
    }
    else {
      this.setTheme('dark');
    }
  }

  setThemeInLocalStorage(theme: Theme) {
    localStorage.setItem('preferred-app-theme', theme);
  }

  getThemeFromLocalStorage() {
    return localStorage.getItem('preferred-app-theme') as Theme ?? 'light';
  }

  getCurrentTheme() {
    return this.currentTheme();
  }

}
