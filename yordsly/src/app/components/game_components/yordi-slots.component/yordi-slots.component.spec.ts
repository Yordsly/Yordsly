import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YordiSlotsComponent } from './yordi-slots.component';

describe('YordiSlotsComponent', () => {
  let component: YordiSlotsComponent;
  let fixture: ComponentFixture<YordiSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YordiSlotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YordiSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
