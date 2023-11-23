import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private officeId$ = new BehaviorSubject<string>('');
  private divisionId$ = new BehaviorSubject<string>('');

  constructor() {}

  public getOfficeIdFromStore() {
    return this.officeId$.asObservable();
  }
  public setOfficeIdFromStore(officeId: string) {
    this.officeId$.next(officeId);
  }
  public getDivisionIdFromStore() {
    return this.divisionId$.asObservable();
  }
  public setDivisionIdFromStore(divisionId: string) {
    this.divisionId$.next(divisionId);
  }
}
