import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistasService {
  private apiUrl = 'http://localhost:3000'; // URL de tu API
  private apiArtistasUrl = `${this.apiUrl}/artistas`;
  private apiPaisesUrl = `${this.apiUrl}/paises`;
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  login(): Observable<any> {
    const credentials = {
      username: 'admin',
      password: 'admin123',
    };
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  getArtistas(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    console.log('Token:', this.token); // Verifica el token aquí
    return this.http.get(this.apiArtistasUrl, { headers });
  }

  getPaises(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    console.log('Token:', this.token); // Verifica el token aquí
    return this.http.get(this.apiPaisesUrl, { headers });
  }

  getArtistaById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get(`${this.apiArtistasUrl}/${id}`, { headers });
  }

  createArtista(artista: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.post(this.apiArtistasUrl, artista, { headers });
  }

  updateArtista(id: number, artista: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.put(`${this.apiArtistasUrl}/${id}`, artista, { headers });
  }

  deleteArtista(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.delete(`${this.apiArtistasUrl}/${id}`, { headers });
  }

  setToken(token: string): void {
    this.token = token;
  }
}