import { Component, OnInit } from '@angular/core';
import { DatosService } from '../datos.service';
import { RouterOutlet, RouterLinkActive, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
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
