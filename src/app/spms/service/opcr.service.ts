import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpmsApiService } from './spms-api.service';
import { api } from 'src/app/connection';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class OpcrService {
  constructor(private http: HttpClient, private url: SpmsApiService) {}

  getYear = '2023';
  officeId = 'OFFPHRMONZ3WT7D';

  opcr = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  opcrDetails = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  GetOPCRs(year: string, officeId: string) {
    this.opcr.set({});
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
    this.opcrDetails.set({});
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

  AddOPCR(data: any) {
    this.opcr.mutate((a) => (a.isLoadingSave = true));
    this.http
      .post<any[]>(api + this.url.post_opcr(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.opcr.mutate((a) => (a.data = response));
          this.opcr.mutate((a) => (a.isLoadingSave = false));
        },
        error: (error: any) => {},
        complete: () => {
          this.GetOPCRs(this.getYear, this.officeId);
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'Data added successfully',
          });
        },
      });
  }
}
