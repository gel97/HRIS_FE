import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { api } from 'src/app/connection';
import { MfoService } from './mfo.service';
import { ErrorService } from './error.service';
import { AlertService } from './alert.service';
import { SpmsApiService } from './spms-api.service';
@Injectable({
  providedIn: 'root'
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

  officeId = this.mfoService.officeId;
  divisionId = signal<any>("DIVADMIJAI162");
  divisionName = signal<any>("ADMIN");
  isCommonDivision = signal<number>(0);
  searchDivisionMfo = signal<any>("");

  storageIsShowDpcrData = signal<any>(localStorage.getItem('isShowDpcrData'));
  storageDpcrId = signal<any>(localStorage.getItem('dpcrId'));
  storageDpcrDetails = signal<any>(localStorage.getItem('dpcrDetails'));


  constructor(private mfoService: MfoService, private errorService:ErrorService, private alertService: AlertService, private http: HttpClient, private url: SpmsApiService) { }

  GetDpcr() {
    this.dpcr.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_dpcr(this.divisionId()), {
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
          console.log("dpcr: ", this.dpcr());
        },
      });
  }

  AddDpcr(dpcr: any) {
    this.dpcr.mutate((a) => (a.isLoadingSave = true));

    dpcr.divisionId = this.divisionId();
    
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

  AddDpcrData(dpcrData: any) {
    this.dpcr.mutate((a) => (a.isLoadingSave = true));

    dpcrData.dpcrId = this.storageDpcrId();
    
    this.http
      .post<any[]>(api + this.url.post_dpcr_data(), dpcrData, { responseType: `json` })
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
          this.alertService.error();
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
          console.log("dpcrData: ", this.dpcrData());
          this.GetDpcrDataMfoes();
        },
      });
  }

  GetDpcrDataMfoes() {
    this.dpcrDataMfoes.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_dpcr_data_mfoes(this.storageDpcrId(), this.divisionName(), this.isCommonDivision()), {
        responseType: `json`,
      })
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
          console.log("dpcrDataMfoes: ", this.dpcrData());
        },
      });
  }

  GetDpcrDataSearchMfoes(mfo:string) {
    this.dpcrDataMfoes.mutate((a) => (a.isSearchLoading = true));
    this.http
      .get<any[]>(api + this.url.get_dpcr_data_search_mfoes(this.storageDpcrId(), this.divisionName(), this.isCommonDivision(), mfo), {
        responseType: `json`,
      })
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
          console.log("dpcrDataSearchMfoes: ", this.dpcrData());
        },
      });
  }

  DeleteDPCRData(dpcrDataId:string){
    this.http
      .delete<any[]>(api + this.url.delete_dpcr_data(dpcrDataId), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          
          this.GetDpcrData();

          this.errorService.error.mutate((a) => {
            (a.error = false), (a.errorStatus = null);
          });
        },
        error: (error: any) => {
          this.errorService.error.mutate((a) => {
            (a.error = true), (a.errorStatus = error.status);
          });

        },
        complete: () => {
        },
      });
  }
}
