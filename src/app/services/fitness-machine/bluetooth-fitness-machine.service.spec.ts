import { TestBed } from '@angular/core/testing';

import { BluetoothFitnessMachineService } from './bluetooth-fitness-machine.service';

describe('BluetoothFitnessMachineService', () => {
  let service: BluetoothFitnessMachineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BluetoothFitnessMachineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
