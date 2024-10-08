import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallComponent } from './wall.component';

describe('WallComponent', () => {
  let component: WallComponent;
  let fixture: ComponentFixture<WallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
