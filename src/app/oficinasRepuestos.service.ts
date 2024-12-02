
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class OficinasRepuestosService {
  private apiUrl = 'https://app.kovacs.cl/API_PORTAL_KOVACS/consumoApi.php/oficinasRepuesto';
  private token = 'A159bhuxe9('; // Token proporcionado

  constructor(private http: HttpClient) {}

  getOficinasRepuesto(searchTerm: string, usuario: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `${this.apiUrl}?search=${searchTerm}&usuario=${usuario}`;
    return this.http.get<any>(url, { headers });
  }


  // private apiUrl2 = 'https://app.kovacs.cl/API_PORTAL_KOVACS/consumoApi.php/OficiasRepuestos_all';
  // getOficiasRepuestos_all(searchTerm: string, usuario: string): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  //   const url = `${this.apiUrl2}?search=${searchTerm}&usuario=${usuario}`;
  //   return this.http.get<any>(url, { headers });
  // }

  




}