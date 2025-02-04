import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WorkoutCatalogComponent } from './workout-catalog/workout-catalog.component';
import { WorkoutComponent } from './workout/workout.component';
import { ElaspedTimeComponent } from './elasped-time/elasped-time.component';
import { WorkoutSessionComponent } from './workout-session/workout-session.component';

export const ServerRoutes: Routes = [
  { path: '', component: HomeComponent }, // Home page
  { path: 'workout-catalog', component: WorkoutCatalogComponent }, // Workout Catalog page
  { path: 'workout', component: WorkoutComponent }, // Start Workout page
  { path: 'timer', component: ElaspedTimeComponent }, // Start Workout page
  { path: 'workout-session', component: WorkoutSessionComponent }, // Start Workout page
  { path: '**', redirectTo: '' } // Redirect to home for unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(ServerRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
