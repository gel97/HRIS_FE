import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly APIUrl_login = 'https://davnorsystems.gov.ph/hrisAPI/api/Auth';
  constructor(private http: HttpClient, private Router: Router) {}

  login(login: any = {}): Observable<any> {
    return this.http.post<any[]>(this.APIUrl_login + '/Login', login);
  }
}
