import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink, Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { Libro } from '../libro';

@Component({
  selector: 'app-libros',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent implements OnInit {
  libros: Libro[] = [];
  mostrar = true;
  imagen=["open"]

  constructor(private ruta: Router, private datosLibro: DatosService) {}

  ngOnInit() {
    this.obtenerLibros();
  }

  obtenerLibros() {
    this.datosLibro.obtenerLibros().subscribe(
      (response: any) => {
        if (response.mensaje === 'ok') {
          this.libros = response.datos;
        } else {
          console.warn('No hay libros disponibles');
          this.libros = [];
        }
      },
      (error) => {
        console.error('Error al obtener los libros:', error);
      }
    );
  }

  cambioDetalles(libro: Libro) {
    this.ruta.navigate(['/libros/detalles', 
      { 
        titulo: libro.titulo,
        autor: libro.autor,
        fecha_publicacion: libro.fecha_publicacion,
        editorial: libro.editorial,
        paginas: libro.paginas,      }
    ]);
  }
  

  // mostrar_boton() {
  //   this.mostrar = true;
  // }

  // ocultar_boton() {
  //   this.mostrar = false;
  // }
}
