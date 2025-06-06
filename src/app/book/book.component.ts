import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink, Router } from '@angular/router';
import { DatosService } from '../datos.service';
import { Libro } from '../libro';

@Component({
  selector: 'app-book',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{
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
    this.ruta.navigate(['bookDetails', 
      { 
        isbn: libro.isbn,
        titulo: libro.titulo,
        autor: libro.autor,
        editorial: libro.editorial,
        genero: libro.genero,
        fecha_publicacion: libro.fecha_publicacion,
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