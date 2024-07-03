import { Injectable, signal } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  isShowSidebar = signal<boolean>(false);

  constructor(
  ) {}

}
