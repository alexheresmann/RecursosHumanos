// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class OficinasService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
// export class OficinasService {
//   private apiUrl = 'http://192.168.112.173:8000/api/oficinas';  // Cambia esto a tu URL real
//   constructor(private http: HttpClient) { }
//   getOficinas(searchTerm: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}?search=${searchTerm}`);
//   }
// }

export class OficinasService {
  private apiUrl = 'https://app.kovacs.cl/API_PORTAL_KOVACS/consumoApi.php/Oficinas';  // Cambia esto a tu URL real
  private token = 'A159bhuxe9('; // Token proporcionado
  constructor(private http: HttpClient) { }

  getOficinas(searchTerm: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`${this.apiUrl}?search=${searchTerm}`, { headers });
  }

  private apiUrl2 = 'https://app.kovacs.cl/API_PORTAL_KOVACS/consumoApi.php/OficiasRepuestos_all';
  getOficiasRepuestos_all(searchTerm: string ): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `${this.apiUrl2}?search=${searchTerm}`;
    return this.http.get<any>(url, { headers });
  }

}
