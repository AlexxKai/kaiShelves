import { Component, inject, OnInit, signal } from '@angular/core';
import { DatosService } from '../datos.service';
import { RouterOutlet, RouterLinkActive, RouterLink, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [RouterLink, RouterOutlet, DatePipe],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  public datosService = inject(DatosService);
  private router = inject(Router);

  libros = signal<any[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.cargarLista();
  }

  cargarLista() {
    this.datosService.obtenerLista().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.libros.set(response.libros);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading.set(false);
      }
    });
  }

  navegarALogin() {
    this.router.navigate(['/login']);
  }
}
