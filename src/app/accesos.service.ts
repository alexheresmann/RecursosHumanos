
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class AccesosService {
  // https://app.kovacs.cl/API_PORTALCORPORATIVO/ConsultaPermisos.php/Permisos?token=XBTR3K7P&usuario=AHERESMANN
  private token = 'XBTR3K7P'; // Token proporcionado 
  private apiUrl = 'https://app.kovacs.cl/API_PORTALCORPORATIVO/ConsultaPermisos.php/Permisos';
  //private apiUrl = 'https://app.kovacs.cl/API_PORTALCORPORATIVO/ConsultaPermisos.php/Permisos';

  constructor(private http: HttpClient) {}
  // getAccesosRepuestos(searchTerm: string, usuario?: string): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  //   return this.http.get<any>(`${this.apiUrl}?search=${searchTerm}&usuario=${usuario}`, { headers });        
  // }


  
  getAccesos(searchTerm: string, usuario: string, idsistema: string):Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`${this.apiUrl}?search=${searchTerm}&usuario=${usuario}&idsistema=${idsistema}&token=${this.token}`, { headers });        
  }

}