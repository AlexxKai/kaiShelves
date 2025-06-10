import { Component, inject, OnInit, signal } from '@angular/core';
import { DatosService } from '../datos.service';
import { RouterOutlet, RouterLinkActive, RouterLink, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [RouterLink, RouterOutlet, DatePipe, FormsModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {
  public datosService = inject(DatosService);
  private router = inject(Router);
  libros = signal<any[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  libroEditando = signal<string | null>(null);

  ngOnInit() {
    this.datosService.debugSession().subscribe({
      next: (response) => {
        console.log('Debug de sesión:', response);
        this.cargarLista();
      },
      error: (error) => {
        console.error('Error en debug:', error);
      }
    });
  }

  showCatalog() {
    console.log(this.datosService.obtenerLibros());
  }

  cargarLista() {
    this.loading.set(true);
    this.error.set(null);

    this.datosService.obtenerLista().subscribe({
      next: (response: any) => {
        if (response.success) {
          const librosConPuntuacion = response.libros.map((libro: any) => ({
            ...libro,
            puntuacion: Number(libro.puntuacion) || 0
          }));
          this.libros.set(librosConPuntuacion);
        } else {
          this.error.set(response.mensaje || 'Error desconocido');
        }
        this.loading.set(false);
        console.log(response.libros);

      },
      error: (error) => {
        console.error('Error completo:', error);

        if (error.status === 0) {
          this.error.set('No se pudo conectar con el servidor. Verifica que el servidor esté funcionando.');
        } else if (error.status === 404) {
          this.error.set('El archivo obtenerLista.php no fue encontrado.');
        } else if (error.status === 500) {
          this.error.set('Error interno del servidor. Revisa el código PHP.');
        } else {
          this.error.set(`Error: ${error.status} - ${error.statusText}`);
        }

        this.loading.set(false);
      }
    });
  }

  navegarALogin() {
    this.router.navigate(['/login']);
  }

  guardarPuntuacion(libro: any) {
    this.datosService.actualizarPuntuacion(libro.isbn, libro.puntuacion).subscribe({
      next: (response) => {
        console.log('Puntuación actualizada:', response);
      },
      error: (error) => {
        console.error('Error al actualizar la puntuación:', error);
      }
    });
  }

  eliminarDeLeidos(libro: any) {
    if (confirm(`¿Seguro que quieres eliminar "${libro.titulo}" de leídos?`)) {
      this.datosService.eliminarLibroLeido(libro.isbn).subscribe({
        next: (response: any) => {
          if (response.success) {
            // Elimina el libro de la señal local para refrescar la vista
            this.libros.set(this.libros().filter(l => l.isbn !== libro.isbn));
          } else {
            alert(response.mensaje || 'No se pudo eliminar el libro.');
          }
        },
        error: (error) => {
          alert('Error al eliminar el libro.');
          console.error(error);
        }
      });
    }
  }

}