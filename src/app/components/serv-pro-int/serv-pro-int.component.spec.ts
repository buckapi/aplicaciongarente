import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServProIntComponent } from './serv-pro-int.component';

describe('ServProIntComponent', () => {
  let component: ServProIntComponent;
  let fixture: ComponentFixture<ServProIntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServProIntComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServProIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
