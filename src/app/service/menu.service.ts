import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { api } from 'src/app/connection';
import { ErrorService } from '../modules/spms/service/error.service';
import { SpmsApiService } from '../modules/spms/service/spms-api.service';
import { Console } from 'console';
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menu = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  userId: string | null = localStorage.getItem('userId');
  userMenu: any | null = localStorage.getItem('user_menu');

  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
    private url: SpmsApiService
  ) {}

  GetMenu() {
    if (this.userMenu !== null) {
      this.menu.mutate((a) => {
        a.data = JSON.parse(this.userMenu);
      });
    } else {
      this.menu.mutate((a) => (a.isLoading = true));
      this.http
        .get<any[]>(api + this.url.get_utility_user_role(this.userId ?? ''), {
          responseType: `json`,
        })
        .subscribe({
          next: (response: any = {}) => {
            setTimeout(() => {
              this.menu.mutate((a) => {
                (a.data = response),
                  (a.isLoading = false),
                  (a.error = false),
                  (a.errorStatus = null);
              });
              localStorage.setItem('user_menu', JSON.stringify(response));
            }, 500);

            this.errorService.error.mutate((a) => {
              (a.error = false), (a.errorStatus = null);
            });
          },
          error: (error: any) => {
            this.menu.mutate((a) => (a.isLoading = false));

            this.errorService.error.mutate((a) => {
              (a.error = true), (a.errorStatus = error.status);
            });
          },
          complete: () => {},
        });
    }
  }
}
