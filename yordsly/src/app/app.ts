import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header.component/header.component';
import { SidenavComponent } from './components/sidenav.component/sidenav.component';
import { ThemeService } from './services/themes/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, SidenavComponent],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected title = 'yordsly';

}