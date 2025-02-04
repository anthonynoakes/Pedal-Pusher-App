import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  constructor(private router: Router) {}

  navigateToWorkoutCatalog() {
    this.router.navigate(['/workout-catalog']);
  }

  navigateToWorkout() {
    this.router.navigate(['/workout']);
  }

  navigateTimer() {
    this.router.navigate(['/timer']);
  }
}
