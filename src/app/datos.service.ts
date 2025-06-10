import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class DatosService {
  url: string = "http://localhost:80/kai/"
  private apiUrl = 'http://localhost:80/kai/';
  private http = inject(HttpClient);
  private router = inject(Router);


  obtenerLibros() {
    return this.http.get(`${this.url}obtenerLibros.php`);
  }

  obtenerLista(): Observable<any> {
    return this.http.get(`${this.url}obtenerLista.php`, { withCredentials: true });
  }

  login(usuario: string, passw: string) {
    let formData = new FormData();
    formData.append("usuario", usuario);
    formData.append("passw", passw);
    return this.http.post(`${this.url}login.php`, formData).pipe(
      tap((res: any) => {
        if (res.success) {
          localStorage.setItem('usuario', JSON.stringify(res.datos));
          this.isAuthenticated.set(true);
          this.currentUser.set(res.datos);
        }
      })
    );
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

  // Señales reactivas
  isAuthenticated = signal(false);
  currentUser = signal<any>(null);

  constructor() {
    const user = localStorage.getItem('usuario');
    if (user) {
      this.isAuthenticated.set(true);
      this.currentUser.set(JSON.parse(user));
    }
  }

  logout() {
    localStorage.removeItem('usuario');
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }
}

