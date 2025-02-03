import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Add this import
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from './../services/local-storage/local-storage.service'
// import { fileTypeValidator } from './file-type.validator';
import { WorkoutData } from './../services/workout-processor/workout-processor.service'

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ErgWorkoutProcessorService } from '../services/workout-processor/erg-workout-processor.service';

@Component({
  selector: 'app-workout-catalog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './workout-catalog.component.html',
  styleUrl: './workout-catalog.component.css'
})
export class WorkoutCatalogComponent implements OnInit {
  uploadForm: FormGroup;
  
  // workouts: WorkoutData[] = [];
  workouts: Map<string, WorkoutData> = new Map();
  isLoading = true; // Controls the loading state
  showWorkoutList = false; // Controls the visibility of the workout list
  selectedWorkout: WorkoutData | null = null;

  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ls: LocalStorageService,
    ) {
    this.uploadForm = this.fb.group({
      file: [null, [Validators.required, fileTypeValidator(['zwo', 'erg'])]],
    });
  }

  ngOnInit(): void {
    this.loadWorkouts();
  }

  loadWorkouts() {
    // TODO wrap in get workouts
    let workoutKeys = this.ls.getAllKeys().filter( k => k.startsWith('workout_'));
    for (const key of workoutKeys) {
      const workoutJson = localStorage.getItem(key);
      if (workoutJson) {
        const workout = JSON.parse(workoutJson) as WorkoutData;
        this.workouts.set(key, workout);
      }
    }
    this.isLoading = false;
    this.showWorkoutList = this.workouts.size > 0;
  }

  getWorkoutTitles(): string[] {
    return Array.from(this.workouts.keys());
  }

  getWorkoutByTitle(title: string): WorkoutData | undefined {
    return this.workouts.get(title);
  }


  onWorkoutClick(title: string) {
    let workout = this.workouts.get(title) || null

    if (this.selectedWorkout == null || this.selectedWorkout.title != workout?.title) {
      this.selectedWorkout = workout;
    } else {
      this.selectedWorkout = null;
    }
    console.log('Selected workout:', this.selectedWorkout);
    // Add your logic here for handling the click event
  }


  navigateHome() {
    this.router.navigate(['/']);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.patchValue({
        file: file,
      });
    }
  }

  onSubmit() {
    if (this.uploadForm.valid) {
      const formData = new FormData();
      formData.append('file', this.uploadForm.get('file')?.value);

      // Perform file upload (e.g., send to a backend API)
      console.log('File to upload:', formData.get('file'));

      const file = this.uploadForm.get('file')?.value;

      if (file) {
        formData.append('file', file);

        // Read the file contents
        this.readFileContents(file);
      }

    }
  }

  readFileContents(file: File) {
    const reader = new FileReader();

    // Read the file as text
    reader.readAsText(file);

    // Handle the file load event
    reader.onload = () => {
      // TODO add loading prompt

      const fileContents = reader.result as string; // File contents as a string
      console.log('File contents:', fileContents);

      // You can now process the file contents (e.g., send to a backend API)
      const ergwps = new ErgWorkoutProcessorService(fileContents)
      let workoutData = ergwps.getWorkoutData()

      console.log("Workout data:", workoutData)

      // TODO:
      // check if there is conflicts, can we do a comparison?
      const key = `workout_${workoutData.title}`; // Use a unique key based on the title
      this.ls.storeItem(key, JSON.stringify(workoutData))
    };

    // Handle errors
    reader.onerror = () => {
      console.error('Error reading file:', reader.error);
    };
  }

}

export function fileTypeValidator(allowedTypes: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value;
    if (file) {
      const extension = file.split('.').pop().toLowerCase();
      if (!allowedTypes.includes(extension)) {
        return { invalidFileType: true };
      }
    }
    return null;
  };
}