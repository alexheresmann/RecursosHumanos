import { TestBed } from '@angular/core/testing';

import { OficinasRepuestosService } from './oficinasRepuestos.service';

describe('OficinasService', () => {
  let service: OficinasRepuestosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OficinasRepuestosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
