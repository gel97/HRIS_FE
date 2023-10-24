import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpmsApiService } from './spms-api.service';
import { api } from 'src/app/connection';
import Swal from 'sweetalert2';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class IpcrService {
  constructor(
    private http: HttpClient,
    private url: SpmsApiService,
    private alertService: AlertService
  ) {}

  ipcr = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  GetIPCRs(year: string, divisionId: string, ipcrId: string) {
    this.ipcr.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_ipcrs(year, divisionId, ipcrId), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.ipcr.mutate((a) => (a.data = response));
          this.ipcr.mutate((a) => (a.isLoading = false));
        },
        error: () => {
          this.alertService.error();
        },
        complete: () => {},
      });
  }
}
