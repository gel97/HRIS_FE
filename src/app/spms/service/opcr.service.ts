import { Injectable, ViewChild, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpmsApiService } from './spms-api.service';
import { api } from 'src/app/connection';
import Swal from 'sweetalert2';
import { AlertService } from './alert.service';
@Injectable({
  providedIn: 'root',
})
export class OpcrService {
  constructor(
    private http: HttpClient,
    private url: SpmsApiService,
    private alertService: AlertService
  ) {}

  // @ViewChild('closebutton')
  // closebutton!: { nativeElement: { click: () => void } };

  storageIsShow = signal<any>(localStorage.getItem('isShow'));
  storageOpcrId = signal<any>(localStorage.getItem('opcrId'));
  storageOpcrDetails = signal<any>(localStorage.getItem('opcrDetails'));

  getId: string | any = localStorage.getItem('opcrId');

  getYear = '2023';
  officeId: string | null = localStorage.getItem('officeId');

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
        error: () => {
          this.alertService.error();
        },
        complete: () => {},
      });
  }

  GetOPCRDetails() {
    this.opcrDetails.mutate((a: any) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_opcrdetails(this.storageOpcrId()), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.opcrDetails.mutate((a: any) => (a.data = response));
          this.opcrDetails.mutate((a: any) => (a.isLoading = false));
        },
        error: () => {
          // this.alertService.error();
        },
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
        error: () => {
          this.alertService.error();
        },
        complete: () => {},
      });
  }

  PutMFOCategory(mfoId: string, categoryId: number) {
    this.http
      .put<any[]>(api + this.url.put_mfo_category(mfoId, categoryId), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {},
        error: () => {
          this.alertService.error();
        },
        complete: () => {
          this.alertService.update();
        },
      });
  }

  get_uncommited_division(year: any){
    return this.http.get<any[]>(api + this.url.get_uncommited_division(year, this.officeId ?? ''), {responseType: `json`});
  }

  // post_signatories(typeId:any){
  //   return this.http.post<any[]>(api + this.url.post_signatories(typeId), {responseType: `json`})
  // }

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
        error: () => {
          this.alertService.error();
        },
        complete: () => {},
      });
  }

  DeleteOPCRDetails(opcrDataId: string) {
    this.http
      .delete<any[]>(api + this.url.delete_opcrdata(opcrDataId))
      .subscribe({
        next: (response: any = {}) => {},
        error: () => {
          this.alertService.error();
        },
        complete: () => {
          this.StorageOPCRDetails(this.getId);
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
            title: 'Deleted successfully',
          });
        },
      });
  }

  DeleteOPCR(opcrId: string) {
    this.http.delete<any[]>(api + this.url.delete_opcr(opcrId)).subscribe({
      next: (response: any = {}) => {},
      error: () => {
        this.alertService.error();
      },
      complete: () => {
        // this.StorageOPCRDetails(this.getId);
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
          title: 'Deleted successfully',
        });
      },
    });
  }

  AddOPCR(data: any) {
    this.opcr.mutate((a) => (a.isLoading = true));
    this.http
      .post<any[]>(api + this.url.post_opcr(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.opcr.mutate((a) => (a.data = response));
          this.opcr.mutate((a) => (a.isLoading = false));
        },
        error: (error: any) => {
          this.alertService.error();
        },
        complete: () => {
          this.GetOPCRs(data.year, data.officeId);
          this.alertService.save();
        },
      });
  }

  AddOPCRData(data: any) {
    this.opcrData.mutate((a) => (a.isLoading = true));
    this.http
      .post<any[]>(api + this.url.post_opcrdata(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.opcrData.mutate((a) => (a.data = response));
          this.opcrData.mutate((a) => (a.isLoading = false));
        },
        error: (error: any) => {
          this.alertService.error();
          this.opcrData.mutate((a) => {
            a.isLoading = false;
            a.error = true;
          });
        },
        complete: () => {
          this.StorageOPCRDetails(data.opcrId);
          this.alertService.save();
        },
      });
  }

  EditOPCRData(opcrData: any) {
    this.opcrDetails.mutate((a) => (a.isLoading = true));

    this.http
      .put<any[]>(api + this.url.put_opcrdata(), opcrData, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.opcrDetails.mutate((a) => {
            a.isLoading = false;
            a.error = false;
          });
        },
        error: (error: any) => {
          this.alertService.error();
          this.opcrDetails.mutate((a) => {
            a.isLoading = false;
            a.error = true;
          });
        },
        complete: () => {
          // this.closebutton.nativeElement.click();
          this.alertService.update();
        },
      });
  }

  EditOPCR(opcr: any) {
    this.opcr.mutate((a) => (a.isLoading = true));
    this.http
      .put<any[]>(api + this.url.put_opcr(), opcr, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          console.log('edited', response);
          this.opcr.mutate((a) => {
            a.isLoading = true;
            a.error = false;
          });
        },
        error: (error: any) => {
          this.alertService.error();
          this.opcr.mutate((a) => {
            a.isLoading = false;
            a.error = true;
          });
        },
        complete: () => {
          // this.closebutton.nativeElement.click();
          this.alertService.update();
        },
      });
  }
}
