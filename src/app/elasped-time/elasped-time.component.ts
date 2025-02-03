import { Component, OnInit } from '@angular/core';
import { WorkoutElaspedTimeService } from './../services/workout-elasped-time/workout-elasped-time.service'

@Component({
  selector: 'app-elasped-time',
  imports: [],
  templateUrl: './elasped-time.component.html',
  styleUrl: './elasped-time.component.css'
})

export class ElaspedTimeComponent implements OnInit {
  elapsedTime = 0; // Total elapsed time in milliseconds
  isRunning = false; // Whether the stopwatch is running

  constructor(private stopwatchService: WorkoutElaspedTimeService) {}

  ngOnInit(): void {
    // Subscribe to the elapsedTime$ observable to get updates
    this.stopwatchService.elapsedTime$.subscribe((time: number) => {
      this.elapsedTime = time;
    });
  }

  // Start the stopwatch
  start(): void {
    this.stopwatchService.start();
    this.isRunning = true;
  }

  // Pause the stopwatch
  pause(): void {
    this.stopwatchService.pause();
    this.isRunning = false;
  }

  // Reset the stopwatch
  reset(): void {
    this.stopwatchService.reset();
    this.isRunning = false;
  }

  // Format the elapsed time into a readable string (HH:MM:SS)
  formatTime(ms: number): string {
    return this.stopwatchService.formatTime(ms);
  }
}

