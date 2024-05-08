import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServInmoComponent } from './serv-inmo.component';

describe('ServInmoComponent', () => {
  let component: ServInmoComponent;
  let fixture: ComponentFixture<ServInmoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServInmoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServInmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
