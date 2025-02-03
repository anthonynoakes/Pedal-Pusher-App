import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public storeItem(key: string, rawJson: string) {

    if (!key) {
      throw new TypeError('Key cannot be empty, null, or undefined.');
    }

    // const key = `workout_${workout.title}`; // Use a unique key based on the title
    // localStorage.setItem(key, JSON.stringify(workout));
    localStorage.setItem(key, rawJson);
    console.log(`LocalStorage "${key}" saved successfully - "${rawJson.length}" bytes.`);
  }

  public retrieveItem(key: string): string | null {

    if (!key) {
      throw new TypeError('Key cannot be empty, null, or undefined.');
    }
  
    let rawJson = localStorage.getItem(key);
    console.log(`LocalStorage "${key}" retrieve successfully - "${rawJson?.length}" bytes.`);
    return rawJson
  }

  public removeItem(key: string) {
    if (!key) {
      throw new TypeError('Key cannot be empty, null, or undefined.');
    }
  
    localStorage.removeItem(key);
  }

  public getAllKeys(): string[] {
    return Object.keys(localStorage);
  }
}
