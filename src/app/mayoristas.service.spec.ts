import { TestBed } from '@angular/core/testing';
import { MayoristasService } from './mayoristas.service';

describe('MayoristasService', () => {
  let service: MayoristasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MayoristasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
