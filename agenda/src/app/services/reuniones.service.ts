// reuniones.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reunion } from '../component/models/reunion.model';


@Injectable({
  providedIn: 'root'
})
export class ReunionesService {
  private apiUrl = 'http://localhost:3000/reuniones';

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getReuniones(dia: string): Observable<Reunion[]> {
    return this.http.get<Reunion[]>(`${this.apiUrl}?dia=${dia}`, { headers: this.getHeaders() });
  }

  createReunion(reunion: Reunion): Observable<Reunion> {
    return this.http.post<Reunion>(this.apiUrl, reunion, { headers: this.getHeaders() });
  }

  updateReunion(reunion: Reunion): Observable<Reunion> {
    return this.http.put<Reunion>(`${this.apiUrl}/${reunion.id}`, reunion, { headers: this.getHeaders() });
  }

  deleteReunion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
