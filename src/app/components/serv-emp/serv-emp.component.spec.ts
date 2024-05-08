import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServEmpComponent } from './serv-emp.component';

describe('ServEmpComponent', () => {
  let component: ServEmpComponent;
  let fixture: ComponentFixture<ServEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServEmpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
