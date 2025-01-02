import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/app/connection';
import { ErrorService } from '../modules/spms/service/error.service';
import { SharedApiService } from './shared-api.service';

@Injectable({
  providedIn: 'root',
})
export class eSigService {
  eSig = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  userId: string | null = localStorage.getItem('userId');
  userMenu: any | null = localStorage.getItem('user_menu');

  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
    private url: SharedApiService
  ) {}

  PosteSig(fileData: string) {
    const payload = { File: fileData };

    this.eSig.mutate((a) => (a.isLoading = true));
      this.http
        .post<any[]>(api + this.url.post_eSignature(), payload, {
          responseType: `json`,
        })
        .subscribe({
          next: (response: any = {}) => {
           
          },
          error: (error: any) => {
            this.eSig.mutate((a) => (a.isLoading = false));

            this.errorService.error.mutate((a) => {
              (a.error = true), (a.errorStatus = error.status);
            });
          },
          complete: () => {},
        });
  }
}
