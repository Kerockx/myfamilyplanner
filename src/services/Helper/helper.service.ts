import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  generateRandom7DigitNumber(): number {
    const min = 1000000; // Smallest 7-digit number
    const max = 9999999; // Largest 7-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
