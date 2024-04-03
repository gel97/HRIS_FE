import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { api } from 'src/app/connection';
import { ErrorService } from './error.service';
import { AlertService } from './alert.service';
import { SpmsApiService } from './spms-api.service';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  mfoesTgt = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });
 
  constructor(
    private errorService: ErrorService,
    private alertService: AlertService,
    private http: HttpClient,
    private url: SpmsApiService,

  ) {}

  GetDashboardMfoTargetOffices() {
    this.mfoesTgt.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_dashboard_mfo_target_offices(), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.mfoesTgt.mutate((a) => {
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
          this.mfoesTgt.mutate((a) => (a.isLoading = false));

          this.errorService.error.mutate((a) => {
            (a.error = true), (a.errorStatus = error.status);
          });
        },
        complete: () => {
          console.log("mfoesTgt: ", this.mfoesTgt().data)
        },
      });
  }

}
