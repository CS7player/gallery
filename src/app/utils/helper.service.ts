import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getData(key: string): any {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeData(key: string): void {
    localStorage.removeItem(key);
  } 

  clearAll(){
    localStorage.clear();
  }
}
