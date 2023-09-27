import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SpmsApiService } from './spms-api.service';
import { api } from 'src/app/connection';
@Injectable({
  providedIn: 'root',
})
export class OpcrService {
  constructor(private http: HttpClient, private url: SpmsApiService) {}

  GetOPCRs(year: string) {
    return this.http.get<any[]>(api + this.url.get_opcrs(year), {
      responseType: 'json',
    });
  }
}
