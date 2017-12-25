import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietDashboardComponent } from './diet-dashboard.component';

describe('DietDashboardComponent', () => {
  let component: DietDashboardComponent;
  let fixture: ComponentFixture<DietDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
