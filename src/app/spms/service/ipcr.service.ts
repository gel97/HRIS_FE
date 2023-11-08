import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpmsApiService } from './spms-api.service';
import { api } from 'src/app/connection';
import Swal from 'sweetalert2';
import { AlertService } from './alert.service';
import { IpcrTargetComponent } from '../pages/ipcr/ipcr-target/ipcr-target.component';

@Injectable({
  providedIn: 'root',
})
export class IpcrService {
  constructor(
    private http: HttpClient,
    private url: SpmsApiService,
    private alertService: AlertService
  ) {}

  // ipcrTargetService = inject(IpcrTargetComponent);

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

  GetIPCRs(year: string, divisionId: string, userId: string) {
    this.ipcr.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_ipcrs(year, divisionId, userId), {
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

  // GetIPCRDetails() {
  //   this.ipcrDetails.mutate((a) => (a.isLoading = true));
  //   this.http
  //     .get<any[]>(api + this.url.get_ipcrdetails(this.storageIpcrId()), {
  //       responseType: `json`,
  //     })
  //     .subscribe({
  //       next: (response: any = {}) => {
  //         this.ipcrDetails.mutate((a) => (a.data = response));
  //         this.ipcrDetails.mutate((a) => (a.isLoading = false));
  //       },
  //       error: () => {
  //         this.alertService.error();
  //       },
  //       complete: () => {},
  //     });
  // }

  GetIPCRDetails() {
    this.ipcrDetails.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_ipcrdetails_wSub(this.storageIpcrId()), {
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

  AddIPCR(data: any) {
    // data.divisionId = this.divisionId;
    this.http
      .post<any[]>(api + this.url.post_ipcr(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.GetIPCRs(data.year, data.divisionId, data.userId);
        },
        error: (error: any) => {
          this.alertService.error();
        },
        complete: () => {
          this.alertService.save();
        },
      });
  }

  AddIPCRData(data: any) {
    this.http
      .post<any[]>(api + this.url.post_ipcrData(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.GetIPCRDetails();
          this.ViewGetDPCR_IPCR();
          this.sortExcist();
        },
        error: (error: any) => {
          this.alertService.error();
        },
        complete: () => {
          this.alertService.save();
        },
      });
  }

  counter: number = 0;
  sortExcist() {
    setTimeout(() => {
      for (let a of this.dpcr_ipcr().data) {
        for (let b_dpcr_ipcr of a.si) {
          for (let x of this.ipcrDetails().data) {
            for (let y_ipcrDetails of x.si) {
              if (b_dpcr_ipcr.indicatorId == y_ipcrDetails.indicatorId) {
                if (b_dpcr_ipcr.isSubTask == 0) {
                  this.counter += 1;
                } else {
                  for (let j of b_dpcr_ipcr.st) {
                    for (let k of y_ipcrDetails.st) {
                      if (j.subTaskId == k.subTaskId) {
                        this.counter += 1;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      while (this.counter != 0) {
        this.counter -= 1;
        for (let a of this.dpcr_ipcr().data) {
          for (let b_dpcr_ipcr of a.si) {
            for (let x of this.ipcrDetails().data) {
              for (let y_ipcrDetails of x.si) {
                if (b_dpcr_ipcr.indicatorId == y_ipcrDetails.indicatorId) {
                  if (b_dpcr_ipcr.isSubTask == 0) {
                    const indexToRemove = a.si.indexOf(b_dpcr_ipcr);
                    if (indexToRemove !== -1) {
                      a.si.splice(indexToRemove, 1);
                    }
                  } else {
                    for (let j of b_dpcr_ipcr.st) {
                      for (let k of y_ipcrDetails.st) {
                        if (j.subTaskId == k.subTaskId) {
                          const indexToRemove = b_dpcr_ipcr.st.indexOf(j);
                          if (indexToRemove !== -1) {
                            b_dpcr_ipcr.st.splice(indexToRemove, 1);
                          }
                        }
                      }
                    }
                    if (b_dpcr_ipcr.st.length == 0) {
                      const indexToRemove = a.si.indexOf(b_dpcr_ipcr);
                      if (indexToRemove !== -1) {
                        a.si.splice(indexToRemove, 1);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }, 1000);
  }

  AddIPCRSubData(data: any) {
    this.http
      .post<any[]>(api + this.url.post_ipcrSubData(), data, {
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

  DeleteIPCRDetails(ipcrDataId: string) {
    this.http
      .delete<any[]>(api + this.url.delete_ipcrdata(ipcrDataId))
      .subscribe({
        next: (response: any = {}) => {
          this.GetIPCRDetails();
          this.ViewGetDPCR_IPCR();
          this.sortExcist();
        },
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

  DeleteMFO(ipcrDataId: string) {
    this.http
      .delete<any[]>(api + this.url.delete_ipcrdata(ipcrDataId))
      .subscribe({
        next: (response: any = {}) => {},
        error: () => {
          this.alertService.error();
        },
        complete: () => {
          // this.StorageOPCRDetails(this.getId);
          this.GetIPCRDetails();
        },
      });
  }

  DeleteIPCRSTDetails(ipcrSubtaskId: string) {
    this.http
      .delete<any[]>(api + this.url.delete_ipcrdata_st(ipcrSubtaskId))
      .subscribe({
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
}
