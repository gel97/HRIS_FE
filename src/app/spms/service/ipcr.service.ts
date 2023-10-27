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

  storageIsShow = signal<any>(localStorage.getItem('isShow_ipcr'));
  storageIpcrId = signal<any>(localStorage.getItem('ipcrId'));
  storageIpcrData = signal<any>(localStorage.getItem('ipcrData'));
  isCommon = signal<number>(0);
  divisionId = 'DIVADMIJAI162';

  ipcr = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  ipcrDetails = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  dpcr_ipcr = signal<any>({
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

  GetIPCRDetails() {
    this.ipcrDetails.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_ipcrdetails(this.storageIpcrId()), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.ipcrDetails.mutate((a) => (a.data = response));
          this.ipcrDetails.mutate((a) => (a.isLoading = false));
        },
        error: () => {
          this.alertService.error();
        },
        complete: () => {},
      });
  }

  ViewGetDPCR_IPCR() {
    this.dpcr_ipcr.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(
        api + this.url.view_get_dpcr_ipcr(this.divisionId, this.isCommon()),
        {
          responseType: `json`,
        }
      )
      .subscribe({
        next: (response: any = {}) => {
          this.dpcr_ipcr.mutate((a) => (a.data = response));
          this.dpcr_ipcr.mutate((a) => (a.isLoading = false));
        },
        error: () => {
          this.alertService.error();
        },
        complete: () => {},
      });
  }

  AddIPCRData(data: any) {
    this.http
      .post<any[]>(api + this.url.post_ipcrData(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {},
        error: (error: any) => {
          this.alertService.error();
        },
        complete: () => {
          this.alertService.save();
        },
      });
  }
}
