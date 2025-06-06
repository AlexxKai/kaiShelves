import { Injectable, inject } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  private device = inject(DeviceDetectorService);

  isMobile(): boolean {
    return this.device.isMobile() && !this.device.isTablet();
  }
}
