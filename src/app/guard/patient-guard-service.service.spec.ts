import { TestBed, inject } from '@angular/core/testing';

import { PatientGuardServiceService } from './patient-guard-service.service';

describe('PatientGuardServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientGuardServiceService]
    });
  });

  it('should be created', inject([PatientGuardServiceService], (service: PatientGuardServiceService) => {
    expect(service).toBeTruthy();
  }));
});
