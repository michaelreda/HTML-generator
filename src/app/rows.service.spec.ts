import { TestBed, inject } from '@angular/core/testing';

import { RowsService } from './rows.service';

describe('RowsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RowsService]
    });
  });

  it('should be created', inject([RowsService], (service: RowsService) => {
    expect(service).toBeTruthy();
  }));
});
