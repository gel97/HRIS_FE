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

  opcrData = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  opcrDetails = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  officeDivision = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

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

  GetOPCRDetails(opcrid: string, opcrdetails: string, isShow: number) {
    localStorage.setItem('isShow', isShow.toString());
    localStorage.setItem('opcrId', opcrid);
    localStorage.setItem('opcrDetails', opcrdetails);
    this.opcrDetails.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_opcrdetails(opcrid), {
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

  StorageOPCRDetails(opcrid: string) {
    this.opcrDetails.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_opcrdetails(opcrid), {
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

  GetOfficeDivision(officeId: string) {
    this.officeDivision.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_officedivision(officeId), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.officeDivision.mutate((a) => (a.data = response));
          this.officeDivision.mutate((a) => (a.isLoading = false));
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

  AddOPCRData(data: any) {
    this.opcrData.mutate((a) => (a.isLoadingSave = true));
    this.http
      .post<any[]>(api + this.url.post_opcrdata(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.opcrData.mutate((a) => (a.data = response));
          this.opcrData.mutate((a) => (a.isLoadingSave = false));
        },
        error: (error: any) => {},
        complete: () => {
          // this.GetOPCRDetails(data.opcrId);
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
