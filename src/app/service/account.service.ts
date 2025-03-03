import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/app/connection';
import { ErrorService } from '../modules/spms/service/error.service';
import { SharedApiService } from './shared-api.service';
import { AlertService } from '../modules/spms/service/alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  _errorMsg:string  = "Something went wrong.";

  eSig = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  pwRequest = signal<any>({
    error: false,
    isSuccess: false,
    isLoading: false,
    contactNo: "",
    message: this._errorMsg,
  });

  vCode = signal<any>({
    EIC:"",
    error: false,
    isSuccess: false,
    isLoading: false,
    isOtpFailed: false,
    message: this._errorMsg,
  });

  pwData = signal<any>({
    error: false,
    isSuccess: false,
    isLoading: false,
    message: this._errorMsg,
  });

  userId: string | null = localStorage.getItem('userId');
  userMenu: any | null = localStorage.getItem('user_menu');

  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
    private url: SharedApiService,
    private alertService: AlertService,
    private Router: Router
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
          this.eSig.mutate((a) => (a.isSuccess = true));
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

  async PostPasswordRequest(data: any) : Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (!this.IsInvalidRequest(data)) {
        resolve(false); 
        return;
      }
  
      this.pwRequest.mutate((a) => (a.isLoading = true));
  
      this.http
        .post<any[]>(api + this.url.post_account_forgotpass_request(), data, {
          responseType: `json`,
        })
        .subscribe({
          next: (response: any) => {
            this.pwRequest.mutate((a) => (a.isSuccess = true));
            this.vCode.mutate((a) => (a.EIC = response.eic));
            resolve(true); 
          },
          error: (error: any) => {
            console.log(error.error.message);
            this.pwRequest.mutate((a) => (a.isSuccess = false));
            this.pwRequest.mutate((a) => (a.isLoading = false));
            this.alertService.customError(error.error.message);
  
            this.errorService.error.mutate((a) => {
              (a.error = true), (a.errorStatus = error.status);
            });
            resolve(false); 

          },
          complete: () => {
            setTimeout(() => {
              this.pwRequest.mutate((a) => (a.isLoading = false));
            }, 1000);       
          },
        });
    });
   
  }

  IsInvalidRequest(data: any): boolean {
    // if (data.email === undefined) {
    //   return false;
    // }

    if (data.username === undefined) {
      return false;
    }

    if (data.contactNo === undefined) {
      return false;
    }

    return true;
  }

  PostSendVCode(data: any) {
    this.vCode.mutate((a) => (a.isLoading = true));

    this.http
      .post<any[]>(api + this.url.post_account_verify_code(data.EIC, data.verificationCode), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any) => {
          console.log(response);
          if (response === 0) {
            this.vCode.mutate((a) => (a.isOtpFailed = true));
            this.vCode.mutate(
              (a) =>
                (a.message =
                  'You have entered an invalid OTP. Please try again.')
            );
          } else {
            this.vCode.mutate((a) => (a.isOtpFailed = false));
            this.vCode.mutate((a) => (a.isSuccess = true));
          }
        },
        error: (error: any) => {
          this.vCode.mutate((a) => (a.isSuccess = false));
          this.vCode.mutate((a) => (a.isOtpFailed = true));
          setTimeout(() => {
            this.vCode.mutate((a) => (a.isLoading = false));
          }, 500);
          this.errorService.error.mutate((a) => {
            (a.error = true), (a.errorStatus = error.status);
          });
        },
        complete: () => {
          setTimeout(() => {
            this.vCode.mutate((a) => (a.isLoading = false));
          }, 1000);
        },
      });
  }

  PostChangePW(data: any) {
    this.pwData.mutate((a) => (a.isLoading = true));

    this.http
      .post<any[]>(api + this.url.post_account_change_password(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any) => {
          this.Router.navigate(['login']);
          this.alertService.customUpdateWmessage("Password has been successfully changed.");
          this.pwData.mutate((a) => (a.isSuccess = true));
        },
        error: (error: any) => {
          this.pwData.mutate((a) => (a.isSuccess = false));
          setTimeout(() => {
            this.pwData.mutate((a) => (a.isLoading = false));
          }, 500);
          this.errorService.error.mutate((a) => {
            (a.error = true), (a.errorStatus = error.status);
          });
        },
        complete: () => {
          setTimeout(() => {
            this.pwData.mutate((a) => (a.isLoading = false));
          }, 1000);

          if (!this.pwData().isSuccess) {
            this.alertService.customError(this.pwData().message);
          }
        },
      });
  }
}
