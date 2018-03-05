import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginsInfoComponent } from './logins-info.component';

describe('LoginsInfoComponent', () => {
  let component: LoginsInfoComponent;
  let fixture: ComponentFixture<LoginsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
