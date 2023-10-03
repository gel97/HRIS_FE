import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { SpmsApiService } from './spms-api.service';
import { ErrorService } from './error.service';
import { api } from 'src/app/connection';
import { AlertService } from './alert.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MfoService {
  // mfo:Observable<any[]> = of( [
  //   {
  //     MFOId: "MFO1234",
  //     MFO: "Sample MFO 1",
  //     category: 1,
  //     si: [{ indicatorId: "IND1234", indicator: "Sample IND 1", target: 10 },{ indicatorId: "IND121314", indicator: "Sample IND 4", target: 50} ],
  //   },
  //   {
  //     MFOId: "MFO5678",
  //     MFO: "Sample MFO 2",
  //     category: 2,
  //     si: [{ indicatorId: "IND5678", indicator: "Sample IND 2", target: 20 }],
  //   },
  //   {
  //     MFOId: "MFO91011",
  //     MFO: "Sample MFO 3",
  //     category: 3,
  //     si: [{ indicatorId: "IND91011", indicator: "Sample IND 3", target: 30 }],
  //   }
  // ]);

  mfo = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  isCommon = signal<number>(0);
  officeId = signal<string>('OFFPHRMONZ3WT7D');

  isSearchLoading = signal<boolean>(false);

  constructor(
    private errorService: ErrorService,
    private alertService: AlertService,
    private http: HttpClient,
    private url: SpmsApiService
  ) {}

  GetMFOes() {
    this.mfo.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_mfoes(this.officeId(), this.isCommon()), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.mfo.mutate((a) => {
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
          this.mfo.mutate((a) => (a.isLoading = false));

          this.errorService.error.mutate((a) => {
            (a.error = true), (a.errorStatus = error.status);
          });

          console.log(this.mfo());
        },
        complete: () => {},
      });
  }

  AddMfo(mfo: any) {
    this.mfo.mutate((a) => (a.isLoadingSave = true));

    mfo.isCommon = this.isCommon();
    mfo.officeId = this.officeId();

    this.http
      .post<any[]>(api + this.url.post_mfo(), mfo, { responseType: `json` })
      .subscribe({
        next: (response: any = {}) => {
          this.GetMFOes();

          this.mfo.mutate((a) => {
            a.isLoadingSave = false;
          });

          this.alertService.save();
        },
        error: (error: any) => {
          this.alertService.error();
          this.mfo.mutate((a) => {
            a.isLoadingSave = false;
          });
        },
        complete: () => {},
      });
  }

  EditMfo(mfo: any) {
    this.mfo.mutate((a) => (a.isLoadingSave = true));

    this.http
      .put<any[]>(api + this.url.put_mfo(), mfo, { responseType: `json` })
      .subscribe({
        next: (response: any = {}) => {
          this.mfo.mutate((a) => {
            a.isLoadingSave = false;
          });

          this.alertService.update();
        },
        error: (error: any) => {
          this.alertService.error();
          this.mfo.mutate((a) => {
            a.isLoadingSave = false;
          });
        },
        complete: () => {},
      });
  }

  DeleteMfo(mfoId: string) {
    this.alertService.delete(this.url.delete_mfo(mfoId), this.GetMFOes());
  }

  AddSI(si: any, standard: any) {
    this.mfo.mutate((a) => (a.isLoadingSave = true));
    si.officeId = this.officeId();

    this.http
      .post<any[]>(api + this.url.post_success_indicator(), si, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          standard.indicatorId = response.indicatorId;
          standard.recNo = response.recNo;

          this.AddStandard(standard);

          this.alertService.save();
        },
        error: (error: any) => {
          this.alertService.error();
          this.mfo.mutate((a) => {
            a.isLoadingSave = false;
          });
        },
        complete: () => {},
      });
  }

  AddStandard(standard: any) {
    this.http
      .post<any[]>(api + this.url.post_standard(), standard, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.mfo.mutate((a) => {
            a.isLoadingSave = false;
          });
          this.GetMFOes();

          this.alertService.save();
        },
        error: (error: any) => {
          this.alertService.error();
          this.mfo.mutate((a) => {
            a.isLoadingSave = false;
          });
        },
        complete: () => {},
      });
  }

  EditSI(si: any) {
    this.mfo.mutate((a) => (a.isLoadingSave = true));

    si.officeId = this.officeId();

    this.http
      .put<any[]>(api + this.url.put_success_indicator(), si, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.mfo.mutate((a) => {
            a.isLoadingSave = false;
          });

          this.alertService.update();
        },
        error: (error: any) => {
          this.alertService.error();
          this.mfo.mutate((a) => {
            a.isLoadingSave = false;
          });
        },
        complete: () => {},
      });
  }

  EditStandard(standard: any) {
    this.mfo.mutate((a) => (a.isLoadingSave = true));

    this.http
      .put<any[]>(api + this.url.put_standard(), standard, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.mfo.mutate((a) => {
            a.isLoadingSave = false;
          });

          this.alertService.update();
        },
        error: (error: any) => {
          this.alertService.error();
          this.mfo.mutate((a) => {
            a.isLoadingSave = false;
          });
        },
        complete: () => {},
      });
  }

  CheckMfoIfExist(payload: any): Observable<boolean> {
    return this.http
      .post<any[]>(api + this.url.post_mfo_search_office(), payload, {
        responseType: 'json',
      })
      .pipe(
        map((response: any) => {
          return response.length > 0;
        })
      );
  }

  SearchMfoOffice(payload: any) {
    this.isSearchLoading.set(true);

    payload.isCommon = this.isCommon();
    payload.officeId = this.officeId();

    return this.http
      .post<any[]>(api + this.url.post_mfo_search_office(), payload, {
        responseType: 'json',
      })
      .subscribe({
        next: (response: any = {}) => {
          this.mfo.mutate((a) => (a.data = response));
          this.mfo.mutate((a) => (a.isLoading = false));
        },
        error: (error: any) => {},
        complete: () => {
          this.isSearchLoading.set(false);
        },
      });
  }

  // GetMFOes(officeId: string) {
  //   return this.http.get<any[]>(api + this.url.get_mfoes(officeId), {
  //     responseType: "json",
  //   });
  // }

  // SearchMfoOffice(payload: any) {
  //   return this.http.post<any[]>(api + this.url.post_mfo_search_office(), payload , {
  //     responseType: "json",
  //   });
  // }

  // AddMFO() {}
}
