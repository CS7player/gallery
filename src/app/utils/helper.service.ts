import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  // Set data in localStorage
  setData(key: string, data: any): void {
    // Store the data directly as a JSON string
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Get data from localStorage
  getData(key: string): any {
    // Retrieve and parse the data; if not found, return null or undefined
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  // Remove data from localStorage
  removeData(key: string): void {
    localStorage.removeItem(key);
  }
}
