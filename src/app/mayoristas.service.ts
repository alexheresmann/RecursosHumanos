import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


// export class ClientesService {
  
//   //private apiUrl = 'http://192.168.112.173:8000/api/clientes';  // Cambia esto a tu URL real
  
//   private apiUrl = 'https://app.kovacs.cl/API_PORTAL_KOVACS/consumoApi.php/Clientes?token=A159bhuxe9(';  // Cambia esto a tu URL real
  
//   constructor(private http: HttpClient) { }
//   getClientes(searchTerm: string): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}?search=${searchTerm}`);
//   }
// }

export class MayoristasService {  
  private token = 'A159bhuxe9('; // Token proporcionado 

  constructor(private http: HttpClient) { }

  // private apiUrl = 'https://app.kovacs.cl/API_PORTAL_KOVACS/consumoApi.php/Mayoristas';  // Cambia esto a tu URL real
  // getMayoristas(searchTerm: string, codigoOficina?: string): Observable<any> { 
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    
  //   // Agregar el parámetro de oficina en la URL
  //   return this.http.get<any>(`${this.apiUrl}?search=${searchTerm}&oficina=${codigoOficina}`, { headers });
  // }

  private apiUrl2 = 'https://app.kovacs.cl/API_PORTAL_KOVACS/consumoApi.php/MayoristasFiltro';  // Cambia esto a tu URL real

  getMayoristasFiltro(searchTerm: string, codigoOficina?: string, grupo?: string, ingenieria?: string): Observable<any> { 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    
    // Agregar el parámetro de oficina en la URL
    return this.http.get<any>(`${this.apiUrl2}?search=${searchTerm}&oficina=${codigoOficina}&grupo=${grupo}&ingenieria=${ingenieria}`, { headers });     
  }
}