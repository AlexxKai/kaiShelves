import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DeviceService } from './device.service';

export const deviceGuard: CanActivateFn = (route, state) => {
  const device = inject(DeviceService);
  const router = inject(Router);

  if (device.isMobile()) {
    return router.createUrlTree(['/books']);
  }
  return router.createUrlTree(['/library']);
};
