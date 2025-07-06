import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YordicoinGamesComponent } from './yordicoin-games.component';

describe('YordicoinGamesComponent', () => {
  let component: YordicoinGamesComponent;
  let fixture: ComponentFixture<YordicoinGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YordicoinGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YordicoinGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
