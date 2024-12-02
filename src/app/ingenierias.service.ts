import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class IngenieriasService {
  private apiUrl = 'https://app.kovacs.cl/API_PORTAL_KOVACS/consumoApi.php/Ingenierias';  // Cambia esto a tu URL real
  private token = 'A159bhuxe9('; // Token proporcionado

  constructor(private http: HttpClient) { }

  getIngenierias(searchTerm: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`${this.apiUrl}?search=${searchTerm}`, { headers });
  }
}
