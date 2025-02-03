import { Injectable } from '@angular/core';
import { WorkoutData, WorkoutInterval, WorkoutProcessorService } from './workout-processor.service'

// @Injectable({
//   providedIn: 'root'
// })
export class ErgWorkoutProcessorService extends WorkoutProcessorService{

  constructor(rawContents: string) {
    super(rawContents);
  }
  
  override getWorkoutData(): WorkoutData {
    const contents = this.parseErgContent();

    let intervals: WorkoutInterval[] = []

    // Iterate over pairs, each interval has a start and end points.
    for (let i = 0; i < contents.data.length; i += 2) {
      const start = contents.data[i];
      const end = contents.data[i + 1];

      intervals.push(this.convertToWorkoutInterval(start, end));
    }    

    let workoutData: WorkoutData = {
      title: contents.header.get('FILE NAME')?.toString() || 'Workout',
      ftp: Number(contents.header.get('FTP') || 0),
      description: contents.header.get('DESCRIPTION')?.toString() || '',
      intervals: intervals,
    };

    return workoutData
  }

  convertToWorkoutInterval(
    start: { minutes: number; watts: number },
    end:  { minutes: number; watts: number }
  ): WorkoutInterval {
    // TODO: add validation on start and end
    let startSeconds = this.convertMinutesToSeconds(start.minutes)
    let endSeconds = this.convertMinutesToSeconds(end.minutes)
    let duration = endSeconds - startSeconds;
    
    let wi: WorkoutInterval = {
      startSeconds: startSeconds,
      durationSeconds: duration,
      isRamp: start.watts != end.watts,
      targetWatts: start.watts,
      targetRampWatts: end.watts,
    }

    return wi;
 }

 convertMinutesToSeconds(minutes: number): number {
  return Math.floor(minutes*60);
 }
  
  parseErgContent(): { header: Map<string, string | number>; data: { minutes: number; watts: number }[] } {
    const content = this.rawContents
    const lines = content.split('\n');
    const header: Map<string, string | number >  = new Map();
    const data: { minutes: number; watts: number }[] = [];
    let isDataSection = false;

    lines.forEach((line) => {
      line = line.trim();
      if (!line || line.startsWith('#')) return;

      if (line.startsWith('[COURSE HEADER]')) {
        return
      };
      if (line.startsWith('[END COURSE HEADER]')) {
        return
      };
      if (line.startsWith('[COURSE DATA]')) {
        isDataSection = true;
        return;
      }

      if (!isDataSection) {
        const [key, value] = line.split(' = ');
        if (key && value) {
          header.set(key.trim(), isNaN(Number(value)) ? value.trim() : Number(value));
        }
      } else {
        const parts = line.split('\t');
        if (parts.length === 2) {
          const minutes = parseFloat(parts[0]);
          const watts = parseInt(parts[1], 10);
          if (!isNaN(minutes) && !isNaN(watts)) {
            data.push({ minutes, watts });
          }
        }
      }
    });

    // TODO: add validation, curently ERG and MRC both require an equal number of intevals
    // This is required as each interval is martked with a start and end time.
    return { header, data };
  }
}
