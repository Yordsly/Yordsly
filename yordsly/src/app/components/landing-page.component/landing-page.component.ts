import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-landing-page',
  imports: [MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, MatMenuModule, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.sass',
  standalone: true
})
export class LandingPageComponent {

}
