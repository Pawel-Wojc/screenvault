import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallItemComponent } from './wall-item.component';

describe('WallItemComponent', () => {
  let component: WallItemComponent;
  let fixture: ComponentFixture<WallItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WallItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WallItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
