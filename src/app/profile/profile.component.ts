import { Component, inject } from '@angular/core';
import { DatosService } from '../datos.service';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  datosService = inject(DatosService);
  router = inject(Router);

  logout() {
    this.datosService.logout();
  }
}
