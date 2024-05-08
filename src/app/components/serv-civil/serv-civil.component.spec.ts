import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServCivilComponent } from './serv-civil.component';

describe('ServCivilComponent', () => {
  let component: ServCivilComponent;
  let fixture: ComponentFixture<ServCivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServCivilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServCivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
