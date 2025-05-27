import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DatosService {
  url: string = "http://localhost:80/kai/"

  constructor(private http: HttpClient) { }

  obtenerLibros() {
    return this.http.get(`${this.url}obtenerLibros.php`);
  }  

  obtenerLista() {
    return this.http.get(`${this.url}obtenerLista.php`);
  }  

  login(identifier: string, password: string) {
    let formData = new FormData();
    formData.append("identifier", identifier); 
    formData.append("password", password); 
    return this.http.post(`${this.url}login.php`, formData);
  }
 
  
  registro(nombre: string, mail: string, contraseña:string) {
    let formData = new FormData();
    formData.append("nombre", nombre); 
    formData.append("email", mail); 
    formData.append("contraseña", contraseña); 
    return this.http.post(`${this.url}registro.php`, formData);
  }
}

