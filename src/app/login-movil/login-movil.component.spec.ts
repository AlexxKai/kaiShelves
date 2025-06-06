import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMovilComponent } from './login-movil.component';

describe('LoginMovilComponent', () => {
  let component: LoginMovilComponent;
  let fixture: ComponentFixture<LoginMovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginMovilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
