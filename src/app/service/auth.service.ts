import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly APIUrl_login = 'https://davnorsystems.gov.ph/hrisAPI/api/Auth';
  readonly APIUrl_HRIS = 'https://localhost:44395/api/auth/login';
  private userPayload: any;
  constructor(private http: HttpClient, private Router: Router) {
    this.userPayload = this.decodedToken();
  }

  login(login: any = {}): Observable<any> {
    return this.http.post<any[]>(this.APIUrl_login + '/Login', login);
  }

  loginHRIS(eic: string): Observable<any> {
    return this.http.post<any[]>(this.APIUrl_HRIS + `/${eic}`, {});
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  storeDetails(data: any = {}) {
    console.log('autservice', data);
    localStorage.setItem('fullName', data.fullNameFirst);
    localStorage.setItem('officeName', data.officeNameShort);
    localStorage.setItem('divisionName', data.divisionName);
    localStorage.setItem('officeNameLong', data.officeName);
    localStorage.setItem('userId', data.eic);
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLogin(): boolean {
    return !!localStorage.getItem('token');
  }

  signout() {
    localStorage.clear();
    this.Router.navigate(['user-login']);
  }

  getOfficeIdFromToken() {
    if (this.userPayload) {
      return this.userPayload.officeId;
    }
  }

  getDivisionIdFromToken() {
    if (this.userPayload) {
      return this.userPayload.divisionId;
    }
  }
}
