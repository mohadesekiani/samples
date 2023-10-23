import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public hourRange: [number, number] = [0, 24];
  public priceRange: [number, number] = [0, 1000];
  public selectedAirline: string = '';
  public selectedClass: string = '';
  public availableTickets: number = 0;

  constructor() { }
}
