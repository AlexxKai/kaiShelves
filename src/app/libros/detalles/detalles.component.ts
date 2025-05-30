import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro } from '../../libro';

@Component({
  selector: 'app-detalles',
  standalone: true,
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent implements OnInit {
  libro: Libro | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.libro = {
        isbn: params.get('isbn') || '',
        titulo: params.get('titulo') || '',
        autor: params.get('autor') || '',
        editorial: params.get('editorial') || '',
        genero: params.get('genero') || '',
        fecha_publicacion: Number(params.get('fecha_publicacion')),
        paginas: Number(params.get('paginas'))
      };

      console.log("Libro recibido en detalles:", this.libro);
    });
  }

  volver() {
    this.router.navigate(['/libros']);
  }
}
