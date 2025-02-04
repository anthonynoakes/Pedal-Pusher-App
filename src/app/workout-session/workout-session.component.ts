import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ElaspedTimeComponent } from '../elasped-time/elasped-time.component';
import { WorkoutComponent } from '../workout/workout.component';
import { WorkoutData } from '../services/workout-processor/workout-processor.service';
import { WorkoutGraphComponent } from '../workout-graph/workout-graph.component';

@Component({
  selector: 'app-workout-session',
  imports: [
    ElaspedTimeComponent,
    WorkoutComponent,
    WorkoutGraphComponent
  ],
  templateUrl: './workout-session.component.html',
  styleUrl: './workout-session.component.css'
})
export class WorkoutSessionComponent {
  selectedWorkout: WorkoutData | null;


  constructor(private router: Router) {
    let w = this.router.getCurrentNavigation()?.extras.state;
    this.selectedWorkout = w as WorkoutData
  }
}

