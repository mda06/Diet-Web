import { TestBed, inject } from '@angular/core/testing';

import { DietGuardServiceService } from './diet-guard-service.service';

describe('DietGuardServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DietGuardServiceService]
    });
  });

  it('should be created', inject([DietGuardServiceService], (service: DietGuardServiceService) => {
    expect(service).toBeTruthy();
  }));
});
