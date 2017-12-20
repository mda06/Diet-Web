import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietSelectPatientComponent } from './diet-select-patient.component';

describe('DietSelectPatientComponent', () => {
  let component: DietSelectPatientComponent;
  let fixture: ComponentFixture<DietSelectPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietSelectPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietSelectPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
