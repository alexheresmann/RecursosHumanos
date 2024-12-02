import { TestBed } from '@angular/core/testing';
import { IngenieriasService } from './ingenierias.service';

describe('IngenieriasService', () => {
  let service: IngenieriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngenieriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
