import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/themes/theme.service';
import { inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Authentication } from '../../services/authentication/authentication.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, MatMenuModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.sass',
  standalone: true
})
export class Header {
  title = 'Yordsly Designs';
  subtitle = 'A collection of designs by Yordsly';

  readonly themeService = inject(ThemeService);
  readonly userService = inject(UserService);
  readonly authenticationService = inject(Authentication);

  constructor() {
    // Initialization logic can go here if needed
  }
}
