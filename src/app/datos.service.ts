import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DatosService {
  url: string = "http://localhost:80/kai/"
  private apiUrl = 'http://localhost:80/kai/';

  constructor(private http: HttpClient) { }

  obtenerLibros() {
    return this.http.get(`${this.url}obtenerLibros.php`);
  }

  obtenerLista() {
    return this.http.get(`${this.url}obtenerLista.php`);
  }

  login(usuario: string, passw: string) {
    let formData = new FormData();
    formData.append("usuario", usuario);
    formData.append("passw", passw);
    return this.http.post(`${this.url}login.php`, formData);
  }

  registro(usuario: string, email: string, passw: string) {
    let formData = new FormData();
    formData.append("usuario", usuario);
    formData.append("email", email);
    formData.append("passw", passw);
    return this.http.post(`${this.url}registro.php`, formData);
  }

  getBooksByGenre(genre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}books.php?genre=${encodeURIComponent(genre)}`);
  }

  searchBooks(genre: string, query: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}busqueda.php/search?genre=${encodeURIComponent(genre)}&q=${encodeURIComponent(query)}`
    );
  }
}

