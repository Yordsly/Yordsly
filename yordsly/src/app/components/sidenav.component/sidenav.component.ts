import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SidenavService } from '../../services/sidenav/sidenav.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule, RouterLink, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.sass'
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    this.sidenavService.sidenavToggle$.subscribe(isOpen => {
      if (isOpen) {
        this.sidenav.open();
      } else {
        this.sidenav.close();
      }
    });
  }
}