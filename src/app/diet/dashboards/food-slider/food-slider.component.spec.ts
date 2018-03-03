import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodSliderComponent } from './food-slider.component';

describe('FoodSliderComponent', () => {
  let component: FoodSliderComponent;
  let fixture: ComponentFixture<FoodSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
