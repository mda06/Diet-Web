import { TestBed, inject } from '@angular/core/testing';

import { DietService } from './diet.service';

describe('DietService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DietService]
    });
  });

  it('should be created', inject([DietService], (service: DietService) => {
    expect(service).toBeTruthy();
  }));
});
