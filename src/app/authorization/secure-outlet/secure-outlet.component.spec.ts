import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureOutletComponent } from './secure-outlet.component';

describe('SecureOutletComponent', () => {
  let component: SecureOutletComponent;
  let fixture: ComponentFixture<SecureOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecureOutletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecureOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
