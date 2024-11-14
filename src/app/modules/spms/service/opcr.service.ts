import { Injectable, ViewChild, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpmsApiService } from './spms-api.service';
import { api } from 'src/app/connection';
import Swal from 'sweetalert2';
import { AlertService } from './alert.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class OpcrService {
  constructor(
    private http: HttpClient,
    private url: SpmsApiService,
    private alertService: AlertService,
    public sanitizer: DomSanitizer
  ) {}

  // @ViewChild('closebutton')
  // closebutton!: { nativeElement: { click: () => void } };

  storageIsShow = signal<any>(localStorage.getItem('isShow'));
  storageOpcrId = signal<any>(localStorage.getItem('opcrId'));
  storageOpcrDetails = signal<any>(localStorage.getItem('opcrDetails'));

  storageIsShowDpcrData = signal<any>(localStorage.getItem('isShowOpcrData'));
  storageOpcrIdActual = signal<any>(localStorage.getItem('opcrIdActual'));
  storageOpcrDetailsActual = signal<any>(
    localStorage.getItem('opcrDetailsActual')
  );
  isShowOpcrDataActual = signal<number>(0);
  officeName = localStorage.getItem('officeName');
  year = signal<number>(0);

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

  opcrDataActual = signal<any>({
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

  opcr_years_submitted = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  opcrTargetReportUrl:SafeResourceUrl = "";
  opcrReport = signal<any>({
    data: null,
    error: false,
    isLoadingReport: false,
  });

  opcrFinalReportUrl:SafeResourceUrl = "";
  opcrFinalReport = signal<any>({
    data: null,
    error: false,
    isLoadingReport: false,
  });

  opcrStandardReportUrl:SafeResourceUrl = "";
  opcrStandardReport = signal<any>({
    data: null,
    error: false,
    isLoadingReport: false,
  });

  PutOPCRSPrcntActualQty(data: any) {
    this.http
      .put<any[]>(api + this.url.put_opcr_data_actual_qty(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
        },
        error: (error: any) => {},
        complete: () => {
          this.alertService.update();
          this.GetOPCRDataActual(this.storageOpcrId())
        },
      });
  }

  GetOPCRYearsSubmitted() {
    this.opcr_years_submitted.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(
        api + this.url.get_opcrs_years_submitted(this.officeId ?? ''),
        {
          responseType: `json`,
        }
      )
      .subscribe({
        next: (response: any = {}) => {
          this.opcr_years_submitted.mutate((a) => (a.data = response));
          this.opcr_years_submitted.mutate((a) => (a.isLoading = false));
        },
        error: () => {
          this.alertService.error();
        },
        complete: () => {
          console.log(this.opcr_years_submitted().data);
        },
      });
  }

  importLoading = signal<boolean>(false);
  PostOpcrImport(isOverwrite: number, year_from: number, year_to: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to import OPCR?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.importLoading.set(true);
        this.http
          .post<any[]>(
            api +
              this.url.post_opcr_import(
                isOverwrite,
                this.officeId ?? '',
                year_from,
                year_to
              ),
            {
              responseType: `json`,
            }
          )
          .subscribe({
            next: (response: any = {}) => {
              this.alertService.customUpdateWmessage('Imported Successfully');
              this.GetOPCRs(year_to.toString(), this.officeId ?? '');
            },
            error: (error: any) => {
              this.alertService.error();
            },
            complete: () => {
              this.importLoading.set(false);
            },
          });
      }
    });
  }

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

  GetOPCRDataActual(opcrId: string) {
    this.opcrDataActual.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_opcr_data_actual(opcrId), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.opcrDataActual.mutate((a) => (a.data = response.data));
          this.opcrDataActual.mutate((a) => (a.rating = response.rating));
          this.opcrDataActual.mutate(
            (a) => (a.finalRating = response.finalRating)
          );
          this.opcrDataActual.mutate((a) => (a.isLoading = false));
        },
        error: () => {
          this.alertService.error();
        },
        complete: () => {
          console.log('OPCR Actual: ', this.opcrDataActual());
        },
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
        complete: () => {
          this.opcrDetails.mutate((a: any) => (a.isLoading = false));
        },
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

  PutOpcrSubmit(opcrId: string, year:string, officeId:string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to submit this OPCR?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .put<any[]>(api + this.url.put_opcr_submit(opcrId), {
            responseType: `json`,
          })
          .subscribe({
            next: (response: any = {}) => {
              this.GetOPCRs(year,officeId);

            },
            error: () => {
              this.alertService.error();
            },
            complete: () => {
              this.alertService.update();
            },
          });
      }
    });
  }

  PutOpcrDataSortByMfo(data: any) {
    this.http
      .put<any[]>(
        api + this.url.put_opcrdata_sortby_mfo(this.storageOpcrId()),
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

  get_uncommited_division(year: any) {
    return this.http.get<any[]>(
      api + this.url.get_uncommited_division(year, this.officeId ?? ''),
      { responseType: `json` }
    );
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

  GetOpcrFinalReport(opcrId: string) {

    this.opcrFinalReport.mutate((a) => (a.isLoadingReport = true));
    this.http
      .get<any[]>(api + this.url.get_opcr_final_report(opcrId), {
        responseType: 'blob' as 'json',
      })
      .subscribe({
        next: (response: any) => {
          this.opcrFinalReportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(response));

          this.opcrFinalReport.mutate((a) => (a.data = this.opcrFinalReportUrl));
          this.opcrFinalReport.mutate((a) => (a.isLoadingReport = false));
        },
        error: () => {
          this.alertService.error();
          this.opcrFinalReport.mutate((a) => (a.isLoadingReport = false));
        },
        complete: () => {
          console.log(this.opcrFinalReport())
          this.opcrFinalReport.mutate((a) => (a.isLoadingReport = false));

        },
      });
  }

  GetOpcrStandardReport(opcrId: string) {

    this.opcrStandardReport.mutate((a) => (a.isLoadingReport = true));
    this.http
      .get<any[]>(api + this.url.get_opcr_standard_report(opcrId), {
        responseType: 'blob' as 'json',
      })
      .subscribe({
        next: (response: any) => {
          this.opcrStandardReportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(response));

          this.opcrStandardReport.mutate((a) => (a.data = this.opcrStandardReportUrl));
          this.opcrStandardReport.mutate((a) => (a.isLoadingReport = false));
        },
        error: () => {
          this.alertService.error();
          this.opcrStandardReport.mutate((a) => (a.isLoadingReport = false));
        },
        complete: () => {
          console.log(this.opcrStandardReport())
          this.opcrStandardReport.mutate((a) => (a.isLoadingReport = false));

        },
      });
  }

  GetOpcrTargetReport(opcrId: string) {

    this.opcrReport.mutate((a) => (a.isLoadingReport = true));
    this.http
      .get<any[]>(api + this.url.get_opcr_target_report(opcrId), {
        responseType: 'blob' as 'json',
      })
      .subscribe({
        next: (response: any) => {
          this.opcrTargetReportUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(response));

          this.opcrReport.mutate((a) => (a.data = this.opcrTargetReportUrl));
          this.opcrReport.mutate((a) => (a.isLoadingReport = false));
        },
        error: () => {
          this.alertService.error();
          this.opcrReport.mutate((a) => (a.isLoadingReport = false));
        },
        complete: () => {
          console.log(this.opcrReport())
          this.opcrReport.mutate((a) => (a.isLoadingReport = false));

        },
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
          this.opcr.mutate((a) => (a.isLoading = false));
        },
      });
  }

  AddOPCRData(data: any) {
    this.AddAllotedBudget(data.alloted,data.indicatorId);
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
          this.opcrData.mutate((a) => (a.isLoading = false));
        },
      });
  }

  AddAllotedBudget(alloted:number, indicatorId:string){
    var year = localStorage.getItem('currentYear');
    this.http
      .post<any[]>(api + this.url.post_alloted_budget(), {alloted: alloted, indicatorId: indicatorId, year:year}, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
        },
        error: (error: any) => {
        },
        complete: () => {
        },
      });
  }

  EditOPCRData(opcrData: any) {
    this.AddAllotedBudget(opcrData.alloted,opcrData.indicatorId);

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
          this.opcrDetails.mutate((a) => (a.isLoading = false));
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
          this.opcr.mutate((a) => (a.isLoading = false));
        },
      });
  }

  EditOPCR_Details(opcr: any) {
    this.opcr.mutate((a) => (a.isLoading = true));
    this.http
      .put<any[]>(api + this.url.edit_opcr_details(), opcr, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
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
          this.opcr.mutate((a) => (a.isLoading = false));
        },
      });
  }
}
