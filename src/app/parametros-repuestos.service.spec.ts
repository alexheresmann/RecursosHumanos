import { TestBed } from '@angular/core/testing';
import { ParametrosRepuestosService } from './parametros-repuestos.service';

describe('ParametrosRepuestosService', () => {
  let service: ParametrosRepuestosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParametrosRepuestosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
