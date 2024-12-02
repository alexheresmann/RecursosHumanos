import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


// export class ClientesService {
  
//   //private apiUrl = 'http://192.168.112.173:8000/api/clientes';  // Cambia esto a tu URL 
  
//   private apiUrl = 'https://app.kovacs.cl/API_PORTAL_KOVACS/consumoApi.php/Clientes?token=A159bhuxe9(';  // Cambia esto a tu URL 
  
//   constructor(private http: HttpClient) { }
//   getClientes(searchTerm: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}?search=${searchTerm}`);
//   }
// }


export class ClientesService {
  private apiUrl = 'https://app.kovacs.cl/API_PORTAL_KOVACS/consumoApi.php/Clientes';  // Cambia esto a tu URL 
  private token = 'A159bhuxe9('; // Token proporcionado

  constructor(private http: HttpClient) { }

  getClientes(searchTerm: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`${this.apiUrl}?search=${searchTerm}`, { headers });
  }
}