// yordicoin-games.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../services/themes/theme.service';
import { inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService, UserGameData } from '../../services/user/user.service';
import { Authentication } from '../../services/authentication/authentication.service';
import { MatMenuModule } from '@angular/material/menu';
import { SidenavService } from '../../services/sidenav/sidenav.service';
import { from, of, Subject, switchMap, takeUntil, Observable } from 'rxjs';

@Component({
  selector: 'app-yordicoin-games',
  imports: [MatCardModule, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, MatMenuModule, CommonModule],
  templateUrl: './yordicoin-games.component.html',
  styleUrl: './yordicoin-games.component.sass'
})
export class YordicoinGamesComponent implements OnInit, OnDestroy {

  readonly userService = inject(UserService);
  private destroy$ = new Subject<void>();

  // Create an observable for game data
  gameData$: Observable<UserGameData | null> = of(null);
  
  username: string = '';
  discordUserID: string = '';
  coinBalance: number = 0;

  ngOnInit() {
    // Create observable for template to use
    this.gameData$ = this.userService.currentUser$.pipe(
      switchMap(user => {
        if (user) {
          return from(this.userService.getUserGameData(user));
        }
        return of(null);
      }),
      takeUntil(this.destroy$)
    );

    // Also subscribe to update component properties
    this.gameData$.subscribe(gameData => {
      if (gameData) {
        this.username = gameData.username || '';
        this.coinBalance = gameData.coinBalance || 0;
      } else {
        this.username = '';
        this.coinBalance = 0;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}