import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAnonymousPostComponent } from './get-anonymous-post.component';

describe('GetAnonymousPostComponent', () => {
  let component: GetAnonymousPostComponent;
  let fixture: ComponentFixture<GetAnonymousPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAnonymousPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAnonymousPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
