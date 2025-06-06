import { Component, OnInit } from '@angular/core';
import { Libro } from '../libro';
import { RouterOutlet, RouterLinkActive, RouterLink, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit{
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
    this.router.navigate(['/books']);
  }
}