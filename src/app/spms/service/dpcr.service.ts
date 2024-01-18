import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { api } from 'src/app/connection';
import { MfoService } from './mfo.service';
import { ErrorService } from './error.service';
import { AlertService } from './alert.service';
import { SpmsApiService } from './spms-api.service';
@Injectable({
  providedIn: 'root',
})
export class DpcrService {
  dpcr = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });
  dpcrData = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });
  dpcrDataMfoes = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });
  dpcrDataSubtask = signal<any>({
    data: {},
    error: false,
    isLoading: false,
  });

  officeId: string | null = localStorage.getItem('officeId');
  divisionId: string | null = localStorage.getItem('divisionId');
  divisionName: string | null = localStorage.getItem('divisionName');
  isCommonDivision = signal<number>(0);
  searchDivisionMfo = signal<any>('');
  year = signal<number>(0);

  storageIsShowDpcrData = signal<any>(localStorage.getItem('isShowDpcrData'));
  storageDpcrId = signal<any>(localStorage.getItem('dpcrId'));
  storageDpcrDetails = signal<any>(localStorage.getItem('dpcrDetails'));
  isShowDpcrDataActual = signal<number>(0);

  constructor(
    private mfoService: MfoService,
    private errorService: ErrorService,
    private alertService: AlertService,
    private http: HttpClient,
    private url: SpmsApiService
  ) {}

  GetDpcr() {
    this.dpcr.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_dpcr(this.year(), this.divisionId ?? ''), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.dpcr.mutate((a) => {
            (a.data = response),
              (a.isLoading = false),
              (a.error = false),
              (a.errorStatus = null);
          });

          this.errorService.error.mutate((a) => {
            (a.error = false), (a.errorStatus = null);
          });
        },
        error: (error: any) => {
          this.dpcr.mutate((a) => (a.isLoading = false));

          this.errorService.error.mutate((a) => {
            (a.error = true), (a.errorStatus = error.status);
          });
        },
        complete: () => {
        },
      });
  }

  AddDpcr(dpcr: any) {
    this.dpcr.mutate((a) => (a.isLoadingSave = true));

    dpcr.divisionId = this.divisionId;

    this.http
      .post<any[]>(api + this.url.post_dpcr(), dpcr, { responseType: `json` })
      .subscribe({
        next: (response: any = {}) => {
          this.GetDpcr();

          this.dpcr.mutate((a) => {
            a.isLoadingSave = false;
            a.error = false;
          });

          this.alertService.save();
        },
        error: (error: any) => {
          this.alertService.error();
          this.dpcr.mutate((a) => {
            a.isLoadingSave = false;
            a.error = true;
          });
        },
        complete: () => {},
      });
  }

  EditDpcr(dpcr: any) {
    this.http
      .put<any[]>(api + this.url.put_dpcr(), dpcr, { responseType: `json` })
      .subscribe({
        next: (response: any = {}) => {
          this.GetDpcr();
          this.alertService.save();
        },
        error: (error: any) => {
          this.alertService.error();
          this.dpcrData.mutate((a) => {
            a.error = true;
          });
        },
        complete: () => {},
      });
  }

  async SetDpcrActive(dpcr: any) {
    try {
      switch (dpcr.active) {
        case 1:
          dpcr.success = 'This dpcr has been set to open';
          dpcr.message = 'You want to set this dpcr to open';

          break;
        case 2:
          dpcr.success = 'This dpcr has been set to final';
          dpcr.message = 'You want to set this dpcr to final';

          break;
        default:
          break;
      }
      dpcr.url = this.url.put_dpcr_setactive(dpcr.dpcrId, dpcr.active);
      let setData = await this.alertService.customUpdate(dpcr);

      // if (setData) {
      //   this.GetDpcr();
      // } else {
      // }
      this.GetDpcr();

    } catch (error) {
      console.error('Error:', error);
    }
  }

  AddDpcrData(dpcrData: any) {
    this.dpcr.mutate((a) => (a.isLoadingSave = true));
    dpcrData.dpcrId = this.storageDpcrId();

    this.http
      .post<any[]>(api + this.url.post_dpcr_data(), dpcrData, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.GetDpcrData();
          this.dpcrData.mutate((a) => {
            a.isLoadingSave = false;
            a.error = false;
          });

          this.alertService.save();
        },
        error: (error: any) => {
          if (error.status == 409) {
            this.alertService.customError(
              `Quantity ${dpcrData.qty} must not be greater than ${error.error.qtyRemainingCurrent}`
            );
            this.dpcrDataMfoes().data[dpcrData.indexMfo].si[
              dpcrData.indexSI
            ].qtyOpcr = error.error.qtyOpcrCurrent;
            this.dpcrDataMfoes().data[dpcrData.indexMfo].si[
              dpcrData.indexSI
            ].qtyRemaining = error.error.qtyRemainingCurrent;
            this.dpcrDataMfoes().data[dpcrData.indexMfo].si[
              dpcrData.indexSI
            ].qtyCommitted = error.error.qtyCommittedCurrent;
          } else {
            this.alertService.error();
          }
          this.dpcrData.mutate((a) => {
            a.isLoadingSave = false;
            a.error = true;
          });
        },
        complete: () => {},
      });
  }

  GetDpcrData() {
    this.dpcrData.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_dpcr_data(this.storageDpcrId()), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.dpcrData.mutate((a) => {
            (a.data = response),
              (a.isLoading = false),
              (a.error = false),
              (a.errorStatus = null);
          });
          this.errorService.error.mutate((a) => {
            (a.error = false), (a.errorStatus = null);
          });
        },
        error: (error: any) => {
          this.dpcrData.mutate((a) => (a.isLoading = false));

          this.errorService.error.mutate((a) => {
            (a.error = true), (a.errorStatus = error.status);
          });
        },
        complete: () => {
          if(this.isCommonDivision() >= 0){
            this.GetDpcrDataMfoes();
          }else{
            this.GetDpcrDataMfoesDivision(null)
          }
        },
      });
  }

  EditDpcrData(dpcrData: any) {
    this.http
      .put<any[]>(api + this.url.put_dpcr_data(), dpcrData, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.dpcrData().data[dpcrData.indexMfo].si[dpcrData.indexSI].qtyOpcr =
            response.qtyOpcr;
          this.dpcrData().data[dpcrData.indexMfo].si[
            dpcrData.indexSI
          ].qtyCommitted = response.qtyCommitted;
          this.dpcrData().data[dpcrData.indexMfo].si[
            dpcrData.indexSI
          ].qtyRemaining = response.qtyRemaining;
          this.alertService.save();
        },
        error: (error: any) => {
          if (error.status == 409) {
            this.alertService.customError(
              `Quantity ${dpcrData.qty} must not be greater than ${error.error.qtyRemaining}`
            );
            this.dpcrData().data[dpcrData.indexMfo].si[
              dpcrData.indexSI
            ].qtyOpcr = error.error.qtyOpcr;
            this.dpcrData().data[dpcrData.indexMfo].si[
              dpcrData.indexSI
            ].qtyCommitted = error.error.qtyCommitted;
            this.dpcrData().data[dpcrData.indexMfo].si[
              dpcrData.indexSI
            ].qtyRemaining = error.error.qtyRemaining;
          } else {
            this.alertService.error();
          }
          this.dpcrData.mutate((a) => {
            a.error = true;
          });
        },
        complete: () => {},
      });
  }

  GetDpcrDataMfoes() {
    this.dpcrDataMfoes.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(
        api +
          this.url.get_dpcr_data_mfoes(
            this.officeId??"",
            this.storageDpcrId(),
            this.divisionName ?? '',
            this.isCommonDivision()
          ),
        {
          responseType: `json`,
        }
      )
      .subscribe({
        next: (response: any = {}) => {
          this.dpcrDataMfoes.mutate((a) => {
            (a.data = response),
              (a.isLoading = false),
              (a.error = false),
              (a.errorStatus = null);
          });

          this.errorService.error.mutate((a) => {
            (a.error = false), (a.errorStatus = null);
          });
        },
        error: (error: any) => {
          this.dpcrDataMfoes.mutate((a) => (a.isLoading = false));
          this.dpcrDataMfoes.mutate((a) => (a.data = []));

          this.errorService.error.mutate((a) => {
            (a.error = true), (a.errorStatus = error.status);
          });
        },
        complete: () => {
        },
      });
  }

  GetDpcrDataMfoesDivision(searchDivisionMfo:any) {
    this.dpcrDataMfoes.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(
        api +
          this.url.get_dpcr_data_mfoes_division(
            this.officeId??"",
            this.divisionId ?? "",
            this.storageDpcrId(),
            this.divisionName ?? '',
            searchDivisionMfo
          ),
        {
          responseType: `json`,
        }
      )
      .subscribe({
        next: (response: any = {}) => {
          this.dpcrDataMfoes.mutate((a) => {
            (a.data = response),
              (a.isLoading = false),
              (a.error = false),
              (a.errorStatus = null);
          });

          this.errorService.error.mutate((a) => {
            (a.error = false), (a.errorStatus = null);
          });
        },
        error: (error: any) => {
          this.dpcrDataMfoes.mutate((a) => (a.isLoading = false));
          this.dpcrDataMfoes.mutate((a) => (a.data = []));

          this.errorService.error.mutate((a) => {
            (a.error = true), (a.errorStatus = error.status);
          });
        },
        complete: () => {
        },
      });
  }


  GetDpcrDataDivisionMfoes() {
    this.dpcrDataMfoes.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(
        api + this.url.get_division_mfoes(this.divisionId ?? ''),
        {
          responseType: `json`,
        }
      )
      .subscribe({
        next: (response: any = {}) => {
          this.dpcrDataMfoes.mutate((a) => {
              (a.data = response),
              (a.isLoading = false),
              (a.error = false),
              (a.errorStatus = null);
          });

          this.errorService.error.mutate((a) => {
            (a.error = false), (a.errorStatus = null);
          });
        },
        error: (error: any) => {
          this.dpcrDataMfoes.mutate((a) => (a.isLoading = false));

          this.errorService.error.mutate((a) => {
            (a.error = true), (a.errorStatus = error.status);
          });
        },
        complete: () => {
        },
      });
  }

  AddSubTaskCommonMfo(data: any) {
    this.dpcr.mutate((a) => (a.isLoadingSave = true));

    this.http
      .post<any[]>(api + this.url.post_subtask_add_common_mfo(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.GetDpcrData();
          this.GetDpcrDataSubtask(data.mfoId);

          this.dpcrData.mutate((a) => {
            a.isLoadingSave = false;
            a.error = false;
          });

          this.alertService.save();
        },
        error: (error: any) => {
          this.alertService.error();
          this.dpcrData.mutate((a) => {
            a.isLoadingSave = false;
            a.error = true;
          });
        },
        complete: () => {},
      });
  }

  AddSubTask(data: any) {
    this.dpcr.mutate((a) => (a.isLoadingSave = true));

    this.http
      .post<any[]>(api + this.url.post_subtask(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.GetDpcrData();
          this.GetDpcrDataSubtask(data.mfoId);

          this.dpcrData.mutate((a) => {
            a.isLoadingSave = false;
            a.error = false;
          });

          this.alertService.save();
        },
        error: (error: any) => {
          this.alertService.error();
          this.dpcrData.mutate((a) => {
            a.isLoadingSave = false;
            a.error = true;
          });
        },
        complete: () => {},
      });
  }

  EditSubTask(data: any) {
    this.http
      .put<any[]>(api + this.url.put_subtask(), data, { responseType: `json` })
      .subscribe({
        next: (response: any = {}) => {
          this.alertService.save();
        },
        error: (error: any) => {
          this.alertService.error();
          this.dpcrData.mutate((a) => {
            a.error = true;
          });
        },
        complete: () => {},
      });
  }

  GetDpcrDataSubtask(mfoId: string) {
    this.dpcrDataSubtask.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(
        api + this.url.get_dpcr_data_subtask(this.storageDpcrId(), mfoId),
        {
          responseType: `json`,
        }
      )
      .subscribe({
        next: (response: any = {}) => {
          setTimeout(() => {
            this.dpcrDataSubtask.mutate((a) => {
              (a.data = response),
                (a.isLoading = false),
                (a.error = false),
                (a.errorStatus = null);
            });
          }, 500);

          this.errorService.error.mutate((a) => {
            (a.error = false), (a.errorStatus = null);
          });
        },
        error: (error: any) => {
          this.dpcrDataSubtask.mutate((a) => (a.isLoading = false));

          this.errorService.error.mutate((a) => {
            (a.error = true), (a.errorStatus = error.status);
          });
        },
        complete: () => {
        },
      });
  }

  GetDpcrDataSearchMfoes(mfo: string) {
    this.dpcrDataMfoes.mutate((a) => (a.isSearchLoading = true));
    this.http
      .get<any[]>(
        api +
          this.url.get_dpcr_data_search_mfoes(
            this.officeId ?? "",
            this.storageDpcrId(),
            this.divisionName ?? '',
            this.isCommonDivision(),
            mfo
          ),
        {
          responseType: `json`,
        }
      )
      .subscribe({
        next: (response: any = {}) => {
          setTimeout(() => {
            this.dpcrDataMfoes.mutate((a) => {
              (a.data = response),
                (a.isSearchLoading = false),
                (a.error = false),
                (a.errorStatus = null);
            });
          }, 500);

          this.errorService.error.mutate((a) => {
            (a.error = false), (a.errorStatus = null);
          });
        },
        error: (error: any) => {
          this.dpcrDataMfoes.mutate((a) => (a.isSearchLoading = false));

          this.errorService.error.mutate((a) => {
            (a.error = true), (a.errorStatus = error.status);
          });
        },
        complete: () => {
        },
      });
  }

  async DeleteDpcr(dpcrId: string) {
    try {
      let deleteData = await this.alertService.delete(
        this.url.delete_dpcr(dpcrId)
      );

      if (deleteData) {
        this.GetDpcr();
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async DeleteDPCRData(dpcrDataId: string) {
    try {
      let deleteData = await this.alertService.delete(
        this.url.delete_dpcr_data(dpcrDataId)
      );

      if (deleteData) {
         this.GetDpcrData();
         this.GetDpcrDataMfoesDivision(null);
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async DeleteSubtask(subTaskId: string) {
    try {
      let deleteData = await this.alertService.delete(
        this.url.delete_subtask(subTaskId)
      );

      if (deleteData) {
        this.GetDpcrData();
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
