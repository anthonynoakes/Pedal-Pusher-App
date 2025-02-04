import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class WorkoutProcessorService {
  public rawContents: string;

  constructor(rawContents: string) {
    this.rawContents = rawContents
  }

  abstract getWorkoutData(): WorkoutData;
}

export interface WorkoutData {
  title: string;
  description: string;
  ftp: number;

  intervals: WorkoutInterval[];
}

export interface WorkoutInterval {
  startSeconds: number;
  durationSeconds: number;

  isRamp: boolean 
  
  // Workouts are either Watts | FTP based, we will normalize at some point
  targetWatts: number  
  // If ramp is enabled, what should we ramp up|down throughout interval
  targetRampWatts: number

  // isFreeride: boolean -- set to true/false and will allow freeride
}
