import { TestBed } from '@angular/core/testing';

import { SellerAuthenticationService } from './seller-authentication.service';

describe('SellerAuthenticationService', () => {
  let service: SellerAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
