
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class VentasRepuestosService {
  private apiUrl = 'https://app.kovacs.cl/API_PORTAL_KOVACS/consumoApi.php/ventasRepuesto';
  private token = 'A159bhuxe9('; // Token proporcionado

  constructor(private http: HttpClient) {}

  getVentasRepuestos(searchTerm: string, codigoOficina?: string, desde?: string, hasta?: string,): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`${this.apiUrl}?search=${searchTerm}&oficina=${codigoOficina}&desde=${desde}&hasta=${hasta}`, { headers });        
  }
}