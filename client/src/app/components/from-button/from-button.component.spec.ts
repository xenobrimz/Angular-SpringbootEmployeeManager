import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromButtonComponent } from './from-button.component';

describe('FromButtonComponent', () => {
  let component: FromButtonComponent;
  let fixture: ComponentFixture<FromButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
