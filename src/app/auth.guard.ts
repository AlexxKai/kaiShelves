import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DatosService } from './datos.service';

export const authGuard: CanActivateFn = (route, state) => {
  const datosService = inject(DatosService);
  const router = inject(Router);

  return datosService.isAuthenticated() ? true : router.parseUrl('/login');
};
