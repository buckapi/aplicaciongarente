import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServDetailComponent } from './serv-detail.component';

describe('ServDetailComponent', () => {
  let component: ServDetailComponent;
  let fixture: ComponentFixture<ServDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
