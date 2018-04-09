import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPictureComponent } from './meal-picture.component';

describe('MealPictureComponent', () => {
  let component: MealPictureComponent;
  let fixture: ComponentFixture<MealPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
