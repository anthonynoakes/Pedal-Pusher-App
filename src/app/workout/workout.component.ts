import { Router } from '@angular/router';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FITNESS_MACHINE_SERVICE, FitnessMachineService } from './../services/fitness-machine/fitness-machine.service'
import { ToastContainerDirective, ToastrModule, ToastrService } from 'ngx-toastr';
import { WorkoutData } from '../services/workout-processor/workout-processor.service';

@Component({
  selector: 'app-workout',
  imports: [
    ToastrModule,
    CommonModule,
    // ToastContainerDirective
  ],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css',
})
export class WorkoutComponent implements AfterViewInit, OnInit {
  connecting: boolean = false
  toastContainer: ToastContainerDirective | undefined;
  @Input() selectedWorkout: WorkoutData | null = null;


  constructor(
    private router: Router,
    private toastService: ToastrService,
    @Inject(FITNESS_MACHINE_SERVICE) private fitnessMachineService: FitnessMachineService
    ) {
      // let w = this.router.getCurrentNavigation()?.extras.state;
      // this.selectedWorkout = w as WorkoutData
      this.selectedWorkout = null;
    }


  ngOnInit(): void {
    this.toastService.overlayContainer = this.toastContainer;

    this.fitnessMachineService.indoorBikeData$.subscribe(indoorBikeData => {
      // Update marker on track
      // this.handlePositionChangeEvent(indoorBikeData.calculatedTotalDistance)
    });
  }

  // Callback invoked immediately after Angular has completed
  // initialization of a component's view
  ngAfterViewInit(): void {

  }

  navigateHome() {
    this.router.navigate(['/']);
  }

  navigateSelectWorkout() {
    this.router.navigate(['/workout-catalog']);
  }

  connect() {
    if (!this.connecting) {
      this.connecting = true
      
      this.fitnessMachineService.connect()
        .then(() => {
          this.fitnessMachineService.startNotifications()
        })
        .then(() => {
          console.log("Info: Connected")
          // this.toastrService.info("Info", "Connected")
        })
        .catch((error) => {
          console.error("Error", error)
          // this.toastrService.error("Error", error)
        })
        .finally(() => {
          this.connecting = false
        })
    }
  }
}