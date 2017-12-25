import { TestBed, inject } from '@angular/core/testing';

import { AdminGuardServiceService } from './admin-guard-service.service';

describe('AdminGuardServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuardServiceService]
    });
  });

  it('should be created', inject([AdminGuardServiceService], (service: AdminGuardServiceService) => {
    expect(service).toBeTruthy();
  }));
});
