import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SharedApiService {
  constructor() {}

  post_eSignature = () => `/eSig`;
  
}
