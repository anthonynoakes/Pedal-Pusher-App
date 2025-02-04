import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { ServerRoutes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FITNESS_MACHINE_SERVICE } from './services/fitness-machine/fitness-machine.service';
import { BluetoothFitnessMachineService } from './services/fitness-machine/bluetooth-fitness-machine.service'


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(), // required animations providers
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(ServerRoutes),
    provideClientHydration(withEventReplay()),
    provideToastr({
      timeOut: 3000,
      preventDuplicates: true,
      positionClass: 'inline'
    }),
    { provide: FITNESS_MACHINE_SERVICE, useClass: BluetoothFitnessMachineService },
  ]
};
