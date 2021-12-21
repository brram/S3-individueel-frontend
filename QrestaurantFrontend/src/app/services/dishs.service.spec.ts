import { TestBed } from '@angular/core/testing';

import { DishsService } from './dishs.service';

describe('DishsService', () => {
  let service: DishsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishsService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
