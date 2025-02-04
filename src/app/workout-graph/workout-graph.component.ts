import { Component, Input } from '@angular/core';
import { WorkoutData } from '../services/workout-processor/workout-processor.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-workout-graph',
  imports: [
    CommonModule
  ],
  templateUrl: './workout-graph.component.html',
  styleUrl: './workout-graph.component.css'
})
export class WorkoutGraphComponent {
  @Input() workout: WorkoutData | null = null // Input for workout intervals

  // Constants for SVG dimensions
  private readonly svgWidth = 500;
  private readonly svgHeight = 200;
  private readonly maxPower = 500; // Adjust based on your data
  
  // Calculate the X position of a bar
  getBarX(index: number): number {
    return this.workout?.intervals.slice(0, index).reduce((sum, interval) => sum + this.getBarWidth(interval.durationSeconds), 0) || 0;
  }

  // Calculate the width of a bar based on duration
  getBarWidth(duration: number): number {
    const totalDuration = this.workout?.intervals.reduce((sum, interval) => sum + interval.durationSeconds, 0) || 0;
    return (duration / totalDuration) * this.svgWidth;
  }

  // Calculate the Y position of a bar
  getBarY(power: number): number {
    return this.svgHeight - (power / this.maxPower) * this.svgHeight;
  }

  // Calculate the height of a bar
  getBarHeight(power: number): number {
    return (power / this.maxPower) * this.svgHeight;
  }

  // Generate grid ticks for the Y-axis
  getGridTicks(count: number): number[] {
    const ticks = [];
    for (let i = 0; i <= count; i++) {
      ticks.push((i / count) * this.svgHeight);
    }
    return ticks;
  }

  // Get power value for a grid tick
  getPowerForTick(index: number): string {
    return ((this.maxPower * (10 - index)) / 10).toFixed(0);
  }

}
