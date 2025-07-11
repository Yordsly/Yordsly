import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

interface Reel {
  symbols: string[];
  position: number;
  targetPosition: number;
}

interface SpinResult {
  isWin: boolean;
  message: string;
  winningSymbols?: string[];
}

@Component({
  selector: 'app-yordi-slots',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './yordi-slots.component.html',
  styleUrls: ['./yordi-slots.component.sass']
})
export class YordiSlotsComponent implements OnInit {
  
  // Available symbols for the slot machine
  private symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '⭐', '💎', '7️⃣'];
  
  // Three reels for the slot machine
  reels: Reel[] = [];
  
  // Game state
  isSpinning = false;
  lastResult: SpinResult | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initializeReels();
  }

  private initializeReels() {
    // Create 3 reels with extended symbol arrays for smooth spinning
    for (let i = 0; i < 3; i++) {
      const extendedSymbols = this.createExtendedSymbolArray();
      this.reels.push({
        symbols: extendedSymbols,
        position: 0,
        targetPosition: 0
      });
    }
  }

  private createExtendedSymbolArray(): string[] {
    // Create a longer array of symbols for smooth spinning effect
    const extended = [];
    for (let i = 0; i < 20; i++) {
      extended.push(...this.symbols);
    }
    return extended;
  }

  spin() {
    if (this.isSpinning) return;
    
    this.isSpinning = true;
    this.lastResult = null;
    this.cdr.detectChanges();
    
    // Reset positions first
    this.reels.forEach(reel => {
      reel.position = 0;
    });
    this.cdr.detectChanges();
    
    // Use setTimeout to ensure the reset happens before the spin
    setTimeout(() => {
      this.reels.forEach((reel, index) => {
        const randomSpins = 5 + Math.random() * 5; // 5-10 full rotations
        const randomOffset = Math.floor(Math.random() * this.symbols.length);
        const symbolHeight = 80; // Height of each symbol in pixels
        
        // Calculate final position (negative because we're moving up)
        reel.targetPosition = -(randomSpins * this.symbols.length + randomOffset) * symbolHeight;
        reel.position = reel.targetPosition;
      });
      this.cdr.detectChanges();
    }, 50);
    
    // Check results after spinning is complete
    setTimeout(() => {
      this.isSpinning = false;
      this.checkWin();
      this.cdr.detectChanges();
    }, 3000);
  }

  private checkWin() {
    // Get the visible symbols (the ones in the window)
    const visibleSymbols = this.reels.map(reel => this.getVisibleSymbol(reel));
    
    // Check for winning combinations
    const allSame = visibleSymbols.every(symbol => symbol === visibleSymbols[0]);
    const twoSame = visibleSymbols.filter(symbol => symbol === visibleSymbols[0]).length === 2;
    
    if (allSame) {
      this.lastResult = {
        isWin: true,
        message: `🎉 JACKPOT! Three ${visibleSymbols[0]}s! 🎉`,
        winningSymbols: visibleSymbols
      };
    } else if (twoSame) {
      this.lastResult = {
        isWin: true,
        message: `🎊 Nice! Two ${visibleSymbols[0]}s! 🎊`,
        winningSymbols: visibleSymbols
      };
    } else {
      this.lastResult = {
        isWin: false,
        message: `Try again! ${visibleSymbols.join(' - ')}`,
        winningSymbols: visibleSymbols
      };
    }
  }

  private getVisibleSymbol(reel: Reel): string {
    // Calculate which symbol is currently visible in the window
    const symbolHeight = 80;
    const windowOffset = 20; // Top offset of the window
    const position = Math.abs(reel.position);
    const symbolIndex = Math.floor((position + windowOffset) / symbolHeight) % this.symbols.length;
    return this.symbols[symbolIndex];
  }
}