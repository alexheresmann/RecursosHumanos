import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
// export class ModelosService {
//   private apiUrl = 'http://192.168.112.173:8000/api/modelos';  // Cambia esto a tu URL real
//   constructor(private http: HttpClient) { }
//   getModelos(searchTerm: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}?search=${searchTerm}`);
//   }
// }


export class ModelosService {
  private apiUrl = 'https://app.kovacs.cl/API_PORTAL_KOVACS/consumoApi.php/Modelos';  // Cambia esto a tu URL real
  private token = 'A159bhuxe9('; // Token proporcionado

  constructor(private http: HttpClient) { }

  getModelos(searchTerm: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`${this.apiUrl}?search=${searchTerm}`, { headers });
  }
}


