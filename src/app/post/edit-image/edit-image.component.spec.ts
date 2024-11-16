import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPostComponent } from './edit-image.component';

describe('CreateNewPostComponent', () => {
  let component: CreateNewPostComponent;
  let fixture: ComponentFixture<CreateNewPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
