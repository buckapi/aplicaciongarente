import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServAduExtComponent } from './serv-adu-ext.component';

describe('ServAduExtComponent', () => {
  let component: ServAduExtComponent;
  let fixture: ComponentFixture<ServAduExtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServAduExtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServAduExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
