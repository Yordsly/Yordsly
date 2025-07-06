import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/theme.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
  standalone: true
})
export class Header {
  title = 'Yordsly Designs';
  subtitle = 'A collection of designs by Yordsly';

  readonly themeService = inject(ThemeService);

  constructor() {
    // Initialization logic can go here if needed
  }
}
