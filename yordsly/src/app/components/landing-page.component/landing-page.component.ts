import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-landing-page',
  imports: [MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, MatMenuModule, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.sass',
  standalone: true
})
export class LandingPageComponent {
  readonly userService = inject(UserService);
  isLoggedIn: boolean = false;

  constructor() { }

  ngOnInit() {
    // Subscribe to user service to check login status
    this.userService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user; // Set isLoggedIn based on user presence
    });
  }

}
