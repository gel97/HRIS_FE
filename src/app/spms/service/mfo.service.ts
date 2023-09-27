import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SpmsApiService } from './spms-api.service';
import { ErrorService } from './error.service';
import { api } from 'src/app/connection';
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

  isSearchLoading = signal<boolean>(false);

  _error = this.errorService.error();

  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
    private url: SpmsApiService
  ) {}

  GetMFOes(officeId: string) {
    this.mfo.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_mfoes(officeId), { responseType: `json` })
      .subscribe({
        next: (response: any = {}) => {
          this.mfo.mutate((a) => {
            (a.data = response),
              (a.isLoading = false),
              (a.error = false),
              (a.errorStatus = null);
          });

          this.errorService.error.mutate(a => {
            a.error = false,
            a.errorStatus = null
          });
        },
        error: (error: any) => {
          this.mfo.mutate((a) => 
            a.isLoading = false
          );

          this.errorService.error.mutate(a => {
            a.error = true,
            a.errorStatus = error.status
          });

          console.log(this.mfo());
        },
        complete: () => {},
      });
  }

  AddMfo(mfo: any) {
    this.mfo.mutate((a) => (a.isLoadingSave = true));
    this.http
      .post<any[]>(api + this.url.post_mfo(), mfo, { responseType: `json` })
      .subscribe({
        next: (response: any = {}) => {
          this.mfo.mutate((a) => (a.data = response));
          this.mfo.mutate((a) => (a.isLoadingSave = false));
        },
        error: (error: any) => {},
        complete: () => {},
      });
  }

  SearchMfoOffice(payload: any) {
    this.isSearchLoading.set(true);

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
