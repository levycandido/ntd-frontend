import { ComponentFixture, TestBed } from '@angular/core/testing';

import { signupComponent } from './signup.component';

describe('RegisterComponent', () => {
  let component: signupComponent;
  let fixture: ComponentFixture<signupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [signupComponent]
    });
    fixture = TestBed.createComponent(signupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
