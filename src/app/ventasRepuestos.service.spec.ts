import { TestBed } from '@angular/core/testing';

import { VentasRepuestosService } from './ventasRepuestos.service';

describe('VentasRepuestosService', () => {
  let service: VentasRepuestosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentasRepuestosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
