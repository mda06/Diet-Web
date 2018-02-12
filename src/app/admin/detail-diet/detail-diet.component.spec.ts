import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDietComponent } from './detail-diet.component';

describe('DetailDietComponent', () => {
  let component: DetailDietComponent;
  let fixture: ComponentFixture<DetailDietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
