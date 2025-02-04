import { TestBed } from '@angular/core/testing';

import { WorkoutProcessorService } from './workout-processor.service';

describe('WorkoutProcessorService', () => {
  let service: WorkoutProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
