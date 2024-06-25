import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SpmsApiService } from './spms-api.service';
import { api } from 'src/app/connection';
import Swal from 'sweetalert2';
import { AlertService } from './alert.service';
import { IpcrTargetComponent } from '../pages/ipcr/ipcr-target/ipcr-target.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IpcrService {
  constructor(
    private http: HttpClient,
    private url: SpmsApiService,
    private alertService: AlertService,
    private sanitizer: DomSanitizer,
  ) {}

  storageIsShow = signal<any>(localStorage.getItem('isShow_ipcr'));
  storageIpcrId = signal<any>(localStorage.getItem('ipcrId'));
  storageIpcrData = signal<any>(localStorage.getItem('ipcrData'));
  isShowIpcrDataActual = signal<number>(0);

  isCommon = signal<number>(0);
  divisionId: string | null = localStorage.getItem('divisionId');
  userId: string | null = localStorage.getItem('userId');
  year = signal<string>(new Date().getFullYear().toString());

  isLoadingIpcr: boolean = false;

  ipcr = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  ipcrDataActual = signal<any>({
    data: [],
    rating: [],
    finalRating: {},
    error: false,
    isLoading: false,
  });

  ipcrActualReportUrl:SafeResourceUrl = "";

  ipcr_rem = signal<number>(0);
  ipcrST_rem = signal<number>(0);

  ipcrDetails = signal<any>({
    data: [],
    error: false,
    isLoading: false,
    completeLoading: false,
  });

  dpcr_ipcr = signal<any>({
    data: [],
    error: false,
    isLoading: false,
    isLoadingSave: false,
    isNoData: false,
  });

  ipcr_mfoes_fixed = signal<any>({
    data: [],
    error: false,
    isLoading: false,
    isLoadingSave: false,
    isNoData: false,
  });

  loading: boolean = false;

  ipcrTargetReportUrl:SafeResourceUrl = "";
  loadReportIpcrTgt = signal<boolean>(false);

  ipcrSmporReportUrl:SafeResourceUrl = "";
  ipcrSMPOR = signal<any>({
    data: null,
    error: false,
    isLoadingReport: false,
  });

  ipcrStandardReportUrl:SafeResourceUrl = "";
  ipcrStandard = signal<any>({
    data: null,
    error: false,
    isLoadingReport: false,
  });

  ipcrMporReportUrl:SafeResourceUrl = "";
  ipcrMPOR = signal<any>({
    data: null,
    error: false,
    isLoadingMPORReport: false,
  });

  GetIpcrMPOReport(ipcrId: string, year:number, monthNo:number) {
    this.ipcrMPOR.mutate((a) => (a.isLoadingReport = true));
    this.http
      .get<any[]>(api + this.url.get_ipcr_mpor_report(ipcrId,  year, monthNo === undefined? 1: monthNo), {
        responseType: 'blob' as 'json',
      })
      .subscribe({
        next: (response: any) => {
          this.ipcrMporReportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(response));

          this.ipcrMPOR.mutate((a) => (a.data = this.ipcrMporReportUrl));
          this.ipcrMPOR.mutate((a) => (a.isLoadingReport = false));
        },
        error: () => {
          this.alertService.error();
          this.ipcrMPOR.mutate((a) => (a.isLoadingReport = false));
        },
        complete: () => {
          console.log(this.ipcrMPOR())
          this.ipcrMPOR.mutate((a) => (a.isLoadingReport = false));

        },
      });
  }

  GetIpcrSMPOReport(ipcrId: string, year:number, monthNo:number) {
    this.ipcrSMPOR.mutate((a) => (a.isLoadingReport = true));
    this.http
      .get<any[]>(api + this.url.get_ipcr_smpor_report(ipcrId,  year, monthNo === undefined? 1: monthNo), {
        responseType: 'blob' as 'json',
      })
      .subscribe({
        next: (response: any) => {
          this.ipcrSmporReportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(response));

          this.ipcrSMPOR.mutate((a) => (a.data = this.ipcrSmporReportUrl));
          this.ipcrSMPOR.mutate((a) => (a.isLoadingReport = false));
        },
        error: () => {
          this.alertService.error();
          this.ipcrSMPOR.mutate((a) => (a.isLoadingReport = false));
        },
        complete: () => {
          console.log(this.ipcrSMPOR())
          this.ipcrSMPOR.mutate((a) => (a.isLoadingReport = false));

        },
      });
  }

  GetIpcrStandardReport(ipcrId: string, year:number, monthNo:number) {
    this.ipcrStandard.mutate((a) => (a.isLoadingReport = true));
    this.http
      .get<any[]>(api + this.url.get_ipcr_standard_report(ipcrId,  year, monthNo === undefined? 1: monthNo), {
        responseType: 'blob' as 'json',
      })
      .subscribe({
        next: (response: any) => {
          this.ipcrStandardReportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(response));

          this.ipcrStandard.mutate((a) => (a.data = this.ipcrStandardReportUrl));
          this.ipcrStandard.mutate((a) => (a.isLoadingReport = false));
        },
        error: () => {
          this.alertService.error();
          this.ipcrStandard.mutate((a) => (a.isLoadingReport = false));
        },
        complete: () => {
          console.log(this.ipcrStandard())
          this.ipcrStandard.mutate((a) => (a.isLoadingReport = false));

        },
      });
  }


  GetIpcrActualReport(ipcrId: string) {
    this.ipcrActualReportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(api + this.url.get_ipcr_actual_report(ipcrId));
  }

  GetIpcrTargetReport(ipcrId: string) {
    this.ipcrTargetReportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(api + this.url.get_ipcr_target_report(ipcrId));
    this.loadReportIpcrTgt.set(true);
    setTimeout(() => {
      this.loadReportIpcrTgt.set(false);
    }, 1000);
    
  }

  GetIPCRMfoesFixed() {
    this.ipcr_mfoes_fixed.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_mfoes_ipcr(), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.ipcr_mfoes_fixed.mutate((a) => (a.data = response));
          this.ipcr_mfoes_fixed.mutate((a) => (a.isLoading = false));
        },
        error: () => {
          this.alertService.error();
        },
        complete: () => {},
      });
  }

  GetIPCRs() {
    this.ipcr.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_ipcrs(this.year().toString(), this.divisionId ?? "", this.userId ?? ""), {
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

  GetIPCRDataActual(ipcrId: string) {
    this.ipcrDataActual.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_ipcr_data_actual(ipcrId), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.ipcrDataActual.mutate((a) => (a.data = response.data));
          this.ipcrDataActual.mutate((a) => (a.rating = response.rating));
          this.ipcrDataActual.mutate(
            (a) => (a.finalRating = response.finalRating)
          );
          this.ipcrDataActual.mutate((a) => (a.isLoading = false));
        },
        error: () => {
          this.alertService.error();
        },
        complete: () => {},
      });
  }

  GetIPCRDetails() {
    this.ipcrDetails.mutate((a) => (a.isLoading = true));
    this.ipcrDetails.mutate((a) => (a.completeLoading = true));
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
          this.ipcrDetails.mutate((a) => (a.completeLoading = false));
        },
        complete: () => {
          // this.ViewGetDPCR_IPCR();
          // this.sortExcist();
          this.ipcrDetails.mutate((a) => (a.completeLoading = false));
        },
      });
  }

  // rem
  GetIPCRDetailsRemaining(data: any) {
    this.http
      .get<any[]>(api + this.url.get_ipcrdetails_remaining(data), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any) => {
          this.ipcr_rem.set(response);
        },
        error: () => {
          this.alertService.error();
        },
        complete: () => {},
      });
  }

  //remST
  GetIPCRDetailsRemainingST(data: any) {
    this.http
      .get<any[]>(api + this.url.get_ipcrdetails_remainingST(data), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any) => {
          this.ipcrST_rem.set(response);
        },
        error: () => {
          this.alertService.error();
        },
        complete: () => {},
      });
  }

  ViewGetDPCR_IPCR() {
    this.dpcr_ipcr.mutate((a) => (a.isLoading = true));
    this.dpcr_ipcr.mutate((a) => (a.isLoadingSave = true));
    this.http
      .get<any[]>(
        api +
          this.url.view_get_dpcr_ipcr(this.storageIpcrId() ?? '', this.divisionId ?? '', this.isCommon()),
        {
          responseType: `json`,
        }
      )
      .subscribe({
        next: (response: any = {}) => {
          this.dpcr_ipcr.mutate((a) => (a.data = response));
        },
        error: () => {
          this.alertService.error();
        },
        complete: () => {
          this.dpcr_ipcr.mutate((a) => (a.isLoading = false));
          this.dpcr_ipcr.mutate((a) => (a.isLoadingSave = false));
          console.log(this.dpcr_ipcr().data)
        },
      });
  }

  AddIPCR() {
    this.http
      .post<any[]>(api + this.url.post_ipcr(), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.GetIPCRs();
        },
        error: (error: any) => {
          if (error.status == 409) {
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
              icon: 'warning',
              title: 'IPCR already exist for this semester',
            });
          } else if (error.status == 500) {
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
              icon: 'warning',
              title: 'Not yet open',
            });
          }
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
        },
        error: (error: any) => {
          this.alertService.error();
        },
        complete: () => {
          this.alertService.save();
        },
      });
  }

  EditIpcrDataMfoCategory(ipcrId: string, MFOId: string, categoryId: number) {
    this.http
      .put<any[]>(api + this.url.put_ipcr_data_update_mfo_category(ipcrId, MFOId, categoryId), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.alertService.update();
        },
        error: (error: any) => {
          this.alertService.error();
        },
        complete: () => {},
      });
  }

  PutIPCRStatus(data: any) {
    this.http
      .put<any[]>(api + this.url.put_ipcr_status(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {},
        error: (error: any) => {},
        complete: () => {
          this.alertService.update();
        },
      });
  }

  PutIPCRSPrcntActualQty(data: any) {
    this.http
      .put<any[]>(api + this.url.put_ipcrdata_actual_qty(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {},
        error: (error: any) => {},
        complete: () => {
          this.alertService.update();
        },
      });
  }

  PutIPCRSubtaskPrcntActualQty(data: any) {
    this.http
      .put<any[]>(api + this.url.put_ipcrSubData_actual_qty(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {},
        error: (error: any) => {},
        complete: () => {
          this.alertService.update();
        },
      });
  }

  async SetDpcrActive(ipcr: any) {
    try {
      switch (ipcr.active) {
        case 1:
          ipcr.success = 'This ipcr has been set to open';
          ipcr.message = 'You want to set this ipcr to open';

          break;
        case 2:
          ipcr.success = 'This ipcr has been set to final';
          ipcr.message = 'You want to set this ipcr to final';

          break;
        default:
          break;
      }
      ipcr.url = this.url.put_ipcr_setactive(ipcr.ipcrId, ipcr.active);
      let setData = await this.alertService.customUpdate(ipcr);

      // if (setData) {
      //   this.GetDpcr();
      // } else {
      // }
      this.GetIPCRs();

    } catch (error) {
      console.error('Error:', error);
    }
  }

  PutIPCRData(data: any) {
    this.http
      .put<any[]>(api + this.url.put_ipcrData(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {},
        error: (error: any) => {
          this.ipcrDetails.mutate((a) => (a.completeLoading = false));
        },
        complete: () => {
          this.alertService.update();
        },
      });
  }

  PutIPCRSubData(data: any) {
    this.http
      .put<any[]>(api + this.url.put_ipcrSubData(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {},
        error: (error: any) => {
          this.ipcrDetails.mutate((a) => (a.completeLoading = false));
        },
        complete: () => {
          this.alertService.update();
        },
      });
  }

  PutIpcrDataSortByMfo(data: any) {
    this.http
      .put<any[]>(
        api + this.url.put_ipcrdata_sortby_mfo(this.storageIpcrId()),
        data,
        {}
      )
      .subscribe({
        next: (response: any = {}) => {},
        error: () => {
          this.alertService.customError('Error: Something went wrong!');
        },
        complete: () => {
          this.alertService.customUpdateWmessage('Sorted Successfully');
        },
      });
  }

  counter: number = 0;
  sortExcist() {
    this.loading = true;
    this.dpcr_ipcr.mutate((a) => (a.isLoadingSave = true));
    setTimeout(() => {
      this.loading = true;
      for (let a of this.dpcr_ipcr().data) {
        for (let b_dpcr_ipcr of a?.si) {
          for (let x of this.ipcrDetails().data) {
            for (let y_ipcrDetails of x?.si) {
              if (b_dpcr_ipcr.indicatorId == y_ipcrDetails.indicatorId) {
                if (b_dpcr_ipcr.isSubTask == 0) {
                  this.counter += 1;
                } else {
                  for (let j of b_dpcr_ipcr?.st) {
                    for (let k of y_ipcrDetails?.st) {
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
          for (let b_dpcr_ipcr of a?.si) {
            for (let x of this.ipcrDetails().data) {
              for (let y_ipcrDetails of x?.si) {
                if (b_dpcr_ipcr.indicatorId == y_ipcrDetails.indicatorId) {
                  if (b_dpcr_ipcr.isSubTask == 0) {
                    const indexToRemove = a.si.indexOf(b_dpcr_ipcr);
                    if (indexToRemove !== -1) {
                      a.si.splice(indexToRemove, 1);
                    }
                  } else {
                    for (let j of b_dpcr_ipcr?.st) {
                      for (let k of y_ipcrDetails?.st) {
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
      if (this.counter == 0) {
        this.loading = false;
        this.dpcr_ipcr.mutate((a) => (a.isLoadingSave = false));
        this.siChecker();
        this.removeMFO();
      }
    }, 1000);
  }

  siChecker() {
    setTimeout(() => {
      this.dpcr_ipcr.mutate((a) => (a.isNoData = false));
      for (let a of this.dpcr_ipcr().data) {
        if (a.si.length > 0) {
          this.dpcr_ipcr.mutate((a) => (a.isNoData = true));
        }
      }
    }, 0);
  }

  tagRemove: boolean = false;
  removeMFO() {
    setTimeout(() => {
      for (let a of this.ipcrDetails().data) {
        for (let a_si of a.si) {
          this.ipcrDetails.mutate((a) => (a.completeLoading = true));
          if (a_si.isSubTask == 1 && a_si.st.length == 0) {
            this.DeleteMFO(a_si.ipcrDataId);
          }
        }
      }
      this.ipcrDetails.mutate((a) => (a.completeLoading = false));
    }, 0);
  }

  AddIPCRSubData(data: any) {
    this.http
      .post<any[]>(api + this.url.post_ipcrSubData(), data, {
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

  async DeleteIpcr(dpcrId: string) {
    try {
      let deleteData = await this.alertService.delete(
        this.url.delete_ipcr(dpcrId)
      );

      if (deleteData) {
        this.GetIPCRs();
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // DeleteIPCR(data: any = {}) {
  //   this.http.delete<any[]>(api + this.url.delete_ipcr(data.ipcrId)).subscribe({
  //     next: (response: any = {}) => {
  //       this.GetIPCRs(data.year);
  //     },
  //     error: () => {
  //       this.alertService.error();
  //     },
  //     complete: () => {
  //       const Toast = Swal.mixin({
  //         toast: true,
  //         position: 'top-start',
  //         showConfirmButton: false,
  //         timer: 3000,
  //         timerProgressBar: true,
  //         didOpen: (toast) => {
  //           toast.addEventListener('mouseenter', Swal.stopTimer);
  //           toast.addEventListener('mouseleave', Swal.resumeTimer);
  //         },
  //       });

  //       Toast.fire({
  //         icon: 'success',
  //         title: 'Deleted successfully',
  //       });
  //     },
  //   });
  // }


  async DeleteIPCRDetails(ipcrDataId: string) {
    try {
      let deleteData = await this.alertService.delete(
        this.url.delete_ipcrdata(ipcrDataId)
      );

      if (deleteData) {
        this.GetIPCRDetails();
        this.ViewGetDPCR_IPCR();
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // DeleteIPCRDetails(ipcrDataId: string) {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.http
  //         .delete<any[]>(api + this.url.delete_ipcrdata(ipcrDataId))
  //         .subscribe({
  //           next: (response: any = {}) => {
  //             this.GetIPCRDetails();
  //             this.ViewGetDPCR_IPCR();
  //             this.sortExcist();
  //           },
  //           error: () => {
  //             this.alertService.error();
  //           },
  //           complete: () => {
  //             this.ipcr_rem.set(0);
  //             const Toast = Swal.mixin({
  //               toast: true,
  //               position: 'top-start',
  //               showConfirmButton: false,
  //               timer: 3000,
  //               timerProgressBar: true,
  //               didOpen: (toast) => {
  //                 toast.addEventListener('mouseenter', Swal.stopTimer);
  //                 toast.addEventListener('mouseleave', Swal.resumeTimer);
  //               },
  //             });

  //             Toast.fire({
  //               icon: 'success',
  //               title: 'Deleted successfully',
  //             });
  //           },
  //         });
  //     }
  //   });
  // }

  DeleteMFO(ipcrDataId: string) {
    this.ipcrDetails.mutate((a) => (a.completeLoading = true));
    this.http
      .delete<any[]>(api + this.url.delete_ipcrdata(ipcrDataId))
      .subscribe({
        next: (response: any = {}) => {
          this.tagRemove = true;
        },
        error: () => {
          this.alertService.error();
        },
        complete: () => {
          this.GetIPCRDetails();
        },
      });
  }

  async DeleteIPCRSTDetails(ipcrSubtaskId: string) {
    try {
      let deleteData = await this.alertService.delete(
        this.url.delete_ipcrdata_st(ipcrSubtaskId)
      );

      if (deleteData) {
        this.GetIPCRDetails();
        this.ViewGetDPCR_IPCR();
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

}
