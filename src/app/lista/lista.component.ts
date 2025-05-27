import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

  libros: any[] = [];

  constructor(private datosService: DatosService) {}

  ngOnInit() {
    this.cargarLista();
  }

  cargarLista() {
    this.datosService.obtenerLista().subscribe((response: any) => {
      if (response.mensaje === 'ok') {
        this.libros = response.datos;
      } else {
        console.log(response.mensaje);
      }
    });
  }

}
