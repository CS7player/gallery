import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }
  static GALLERY_URL = 'http://localhost:4444'
}
