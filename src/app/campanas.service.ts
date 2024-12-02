import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

// export class CampanasService {
//   //private apiUrl = 'http://127.0.0.1:8000/api/clientes';  // Cambia esto a tu URL real

//   private apiUrl = 'https://app.kovacs.cl/API_PORTAL_KOVACS/consumoApi.php/Clientes?token=A159bhuxe9(';
//   constructor(private http: HttpClient) { }
//   getCampanas(searchTerm: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}?search=${searchTerm}`);
//   }


  

// }

export class CampanasService {
  private apiUrl = 'https://app.kovacs.cl/API_PORTAL_KOVACS/consumoApi.php/Clientes';  // Cambia esto a tu URL real
  private token = 'A159bhuxe9('; // Token proporcionado

  constructor(private http: HttpClient) { }

  getCampanas(searchTerm: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`${this.apiUrl}?search=${searchTerm}`, { headers });
  }
}