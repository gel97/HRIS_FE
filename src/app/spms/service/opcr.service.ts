import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpmsApiService } from './spms-api.service';
import { api } from 'src/app/connection';
@Injectable({
  providedIn: 'root',
})
export class OpcrService {
  constructor(private http: HttpClient, private url: SpmsApiService) {}

  opcr = signal<any>({});

  opcrDetails = signal<any>({});

  GetOPCRs(year: string, officeId: string) {
    this.opcr.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_opcrs(year, officeId), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.opcr.mutate((a) => (a.data = response));
          this.opcr.mutate((a) => (a.isLoading = false));
        },
        error: () => {},
        complete: () => {},
      });
  }

  GetOPCRDetails(opcrId: string) {
    this.opcrDetails.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_opcrdetails(opcrId), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.opcrDetails.mutate((a) => (a.data = response));
          this.opcrDetails.mutate((a) => (a.isLoading = false));
        },
        error: () => {},
        complete: () => {},
      });
  }
}
