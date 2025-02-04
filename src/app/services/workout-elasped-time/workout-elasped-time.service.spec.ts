import { TestBed } from '@angular/core/testing';

import { WorkoutElaspedTimeService } from './workout-elasped-time.service';

describe('WorkoutElaspedTimeService', () => {
  let service: WorkoutElaspedTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutElaspedTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
