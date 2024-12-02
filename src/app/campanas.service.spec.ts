// import { TestBed } from '@angular/core/testing';

// import { CampanasService } from './campanas.service';

// describe('CampanasService', () => {
//   let service: CampanasService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(CampanasService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });



// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })

// export class CampanasService {
//   private apiUrl = 'http://127.0.0.1:8000/api/Campanas';  // Cambia esto a tu URL real
//   constructor(private http: HttpClient) { }
//   getCampanas(searchTerm: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}?search=${searchTerm}`);
//   }

// }


import { TestBed } from '@angular/core/testing';

import { CampanasService } from './campanas.service';
import { ModelosService } from './modelos.service';

describe('CampanasService', () => {
  let service: CampanasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampanasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


describe('ModelosService', () => {
  let service: ModelosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
