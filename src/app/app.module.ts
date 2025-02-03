import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Add this import
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { WorkoutCatalogComponent } from './workout-catalog/workout-catalog.component';
import { WorkoutComponent } from './workout/workout.component';
import { ServerRoutes } from './app.routes'
import { ElaspedTimeComponent } from './elasped-time/elasped-time.component';

@NgModule({
  declarations: [
    CommonModule,
    AppComponent,
    HomeComponent,
    WorkoutCatalogComponent,
    WorkoutComponent,
    ElaspedTimeComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ServerRoutes) // Configure routes here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
