export interface Libro {
  isbn: string;
  titulo: string;
  autor: string;
  editorial: string;
  genero: string;
  fecha_publicacion: number;
  paginas: number;
  imagen?: string; // Opcional, si se desea incluir una imagen del libro
  pdf?: string; // Opcional, si se desea incluir una sinopsis del libro
}