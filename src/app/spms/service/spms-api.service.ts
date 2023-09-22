import { Injectable } from '@angular/core';
import { api } from 'src/app/connection';
@Injectable({
  providedIn: 'root',
})
export class SpmsApiService {
  constructor() {}
  get_mfoes = (officeId: string) => `/tPMMFOes/${officeId}`;
  post_mfo_search_office = () => `/tPMMFOes/Search`;

  get_opcrs = (year: string) => `/t`;
}
