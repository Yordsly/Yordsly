import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SidenavService {
  private sidenavToggle = new BehaviorSubject<boolean>(false);
  sidenavToggle$ = this.sidenavToggle.asObservable();

  toggleSidenav() {
    this.sidenavToggle.next(!this.sidenavToggle.value);
  }

  openSidenav() {
    this.sidenavToggle.next(true);
  }

  closeSidenav() {
    this.sidenavToggle.next(false);
  }
}