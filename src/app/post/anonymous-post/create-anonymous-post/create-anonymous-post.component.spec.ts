import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnonymousPostComponent } from './create-anonymous-post.component';

describe('CreateNewPostComponent', () => {
  let component: CreateAnonymousPostComponent;
  let fixture: ComponentFixture<CreateAnonymousPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAnonymousPostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAnonymousPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
