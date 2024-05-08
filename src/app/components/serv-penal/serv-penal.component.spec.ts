import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServPenalComponent } from './serv-penal.component';

describe('ServPenalComponent', () => {
  let component: ServPenalComponent;
  let fixture: ComponentFixture<ServPenalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServPenalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServPenalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
