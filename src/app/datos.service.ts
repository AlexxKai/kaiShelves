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
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      return new Observable(observer => {
        observer.next({
          success: false,
          mensaje: "Usuario no autenticado",
          libros: []
        });
        observer.complete();
      });
    }

    return this.http.post<any>(`${this.url}obtenerLista.php`, { usuario }, { withCredentials: true });
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

  isAuthenticated = signal(false);
  currentUser = signal<any>(null);

  constructor() {
    const user = localStorage.getItem('usuario');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        this.isAuthenticated.set(true);
        this.currentUser.set(parsedUser);
      } catch (e) {
        console.error('Error parsing localStorage user:', user);
        localStorage.removeItem('usuario');
      }
    }
  }

  logout() {
    localStorage.removeItem('usuario');
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }

  debugSession(): Observable<any> {
    return this.http.get(`${this.url}debug_session.php`, { withCredentials: true });
  }

  marcarLibroComoLeido(data: any): Observable<any> {
    return this.http.post(`${this.url}marcarLeido.php`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  actualizarPuntuacion(isbn: string, puntuacion: number) {
    const body = { isbn: isbn, puntuacion: puntuacion };
    return this.http.post(`${this.url}actualizarPuntuacion.php`, body);
  }

  eliminarLibroLeido(isbn: string) {
    return this.http.post(`${this.url}eliminarLeido.php`, { isbn });
  }

}

