import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutElaspedTimeService {

  private startTime: number | null = null; // Timestamp when the stopwatch starts
  private elapsedTime = 0; // Total elapsed time in milliseconds
  private timerInterval: any; // Interval reference for updating the timer
  private isRunning = false; // Whether the stopwatch is running

  // BehaviorSubject to emit the elapsed time
  private elapsedTimeSubject = new BehaviorSubject<number>(0);
  public elapsedTime$ = this.elapsedTimeSubject.asObservable();

  constructor() {}

  // Start the stopwatch
  start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      this.startTime = Date.now() - this.elapsedTime; // Adjust start time based on elapsed time
      this.timerInterval = setInterval(() => {
        this.elapsedTime = Date.now() - this.startTime!;
        this.elapsedTimeSubject.next(this.elapsedTime); // Emit the updated elapsed time
      }, 10); // Update every 10ms for smooth display
    }
  }

  // Pause the stopwatch
  pause(): void {
    if (this.isRunning) {
      this.isRunning = false;
      clearInterval(this.timerInterval);
    }
  }

  // Reset the stopwatch
  reset(): void {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    this.elapsedTime = 0;
    this.startTime = null;
    this.elapsedTimeSubject.next(this.elapsedTime); // Emit the reset elapsed time
  }

  // Format the elapsed time into a readable string (HH:MM:SS)
  formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  // Helper function to pad numbers with leading zeros
  private pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
