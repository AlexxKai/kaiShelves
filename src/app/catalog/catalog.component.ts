import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosService } from '../datos.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  public datosService = inject(DatosService);
  catalogo = signal<any[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.datosService.obtenerLibros().subscribe({
      next: (response: any) => {
        console.log('Respuesta del servidor:', response); 
        
        if (response.mensaje === "ok" && response.datos) {
          this.catalogo.set(response.datos);
        } else if (response.datos && Array.isArray(response.datos)) {
          this.catalogo.set(response.datos);
        } else {
          console.log('No se encontraron libros o estructura inesperada');
          this.catalogo.set([]);
        }
        
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error al obtener libros:', error);
        this.loading.set(false);
      }
    });
  }
}