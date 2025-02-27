import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class SharedApiService {
  constructor() {}

  post_eSignature = () => `/eSig`;

  post_account_change_password    = () => `/Account/ChangePassword`;
  post_account_verify_code        = (EIC:string, verificationCode:string) => `/Account/VerifyCode?EIC=${EIC}&verificationCode=${verificationCode}`; 
  post_account_forgotpass_request = () => `/Account/ForgotPassRequest`;
  
}
