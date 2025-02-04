import { Router } from '@angular/router';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, Inject, OnInit, ViewChild } from '@angular/core';

import { FITNESS_MACHINE_SERVICE, FitnessMachineService } from './../services/fitness-machine/fitness-machine.service'
import { ToastContainerDirective, ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-workout',
  imports: [
    ToastrModule,
    // ToastContainerDirective
  ],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css',
})
export class WorkoutComponent implements AfterViewInit, OnInit {
  connecting: boolean = false
  toastContainer: ToastContainerDirective | undefined;

  constructor(
    private router: Router,
    private toastService: ToastrService,
    @Inject(FITNESS_MACHINE_SERVICE) private fitnessMachineService: FitnessMachineService
    ) {}


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