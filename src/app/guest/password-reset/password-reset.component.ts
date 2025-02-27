import { Component, OnInit, ViewChildren, QueryList, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserStoreService } from 'src/app/service/user-store.service';
import Swal from 'sweetalert2';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  login: any = {};
  loading: boolean = false;

  pwRequest: any = {};
  vCode: any = {};
  pwData: any = {};

  otpArray: string[] = new Array(6).fill('');
  otpValues: string[] = new Array(6).fill('');

  timeLeft: number = 5 * 60; // 5 minutes in seconds
  minutes: number = 5;
  seconds: number = 0;
  private interval: any;
  isTimeOut: boolean = false; 
  isPwNotMatch: boolean = false; 
  isPwNot6length: boolean = false; 

  passwordVisible: boolean = false;
  passwordConfirmVisible: boolean = false;

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(
    private Auth: AuthService,
    private Router: Router,
    private UserStore: UserStoreService,
    private _accountService: AccountService
  ) {
    this.pwRequest = _accountService.pwRequest();
    this.vCode = _accountService.vCode();
    this.pwData = _accountService.pwData();

  }
  
  ngOnInit(): void {
  }

  startCountdown() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.minutes = Math.floor(this.timeLeft / 60);
        this.seconds = this.timeLeft % 60;
      } else {
        clearInterval(this.interval);
        this.isTimeOut = true;
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPassword() {
    this.passwordConfirmVisible = !this.passwordConfirmVisible;
  }

  async passwordResetRequest() {
    console.log(this.pwRequest);
    let _isSuccess = await this._accountService.PostPasswordRequest(this.pwRequest);
    if(_isSuccess){
      this.startCountdown();
    }
  }

  resendOtp(){
    this.timeLeft = 5 * 60; // Reset to 5 minutes
    this.minutes = 5;
    this.seconds = 0;
    this.isTimeOut = false;
    this._accountService.vCode.mutate((a) => (a.isOtpFailed = false));
    this.passwordResetRequest();
    this.startCountdown();

  }

  onOtpInput(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    this.otpValues[index] = input.value;

    if (input.value && index < this.otpArray.length - 1) {
      this.otpInputs.get(index + 1)?.nativeElement.focus();
    }

  } 

  onKeyDown(event: KeyboardEvent, index: number) {
    this._accountService.vCode.mutate((a) => (a.isOtpFailed = false));

    setTimeout(() => {
      if (event.key === 'Backspace' && !this.otpArray[index] && index > 0) {
        this.otpInputs.get(index - 1)?.nativeElement.focus();
      }
    }, 200);
  
    if (event.key === 'Backspace'){
      this.otpValues[index] = '';
    }
  }

  verifyOtp() {
    this._accountService.vCode.mutate((a) => (a.verificationCode = this.otpValues.join('')));
    this._accountService.PostSendVCode(this.vCode);
  }

  submitNewPw() {
    console.log(this.vCode);
    if(this.invalidPasswordFields() || this.isPwNot6length){
      return;
    }

    this._accountService.pwData.mutate((a) => (a.eic = this.vCode.EIC));
    this._accountService.PostChangePW(this.pwData);
  }

  invalidPasswordFields(): boolean {
    if(this.pwData.passWord === undefined || this.pwData.confirmpassWord === undefined
      || this.pwData.passWord === "" || this.pwData.confirmpassWord === ""
    ){
      return true;
    }
    return false;
  }

  onCheckMatchPW(){
    console.log(this.pwData);
    setTimeout(() => {  
      if(this.pwData.passWord !== this.pwData.confirmpassWord){
        this.isPwNotMatch = true;
      }else{
        this.isPwNotMatch = false;
      }
    }, 500);
  }

  checkPasswordLength(){
    setTimeout(() => {
      if(this.pwData.passWord.length < 6){
        this.isPwNot6length = true;
      }else{
        this.isPwNot6length = false;
      }
    },500)
    
  }

  maskContactNumber(contactNo: string): string {
    if (!contactNo || contactNo.length < 6) return contactNo; // Handle invalid cases
  
    const firstTwo = contactNo.slice(0, 2); // Get first two digits
    const lastFour = contactNo.slice(-4);  // Get last four digits
    const maskedPart = '*'.repeat(contactNo.length - 6); // Mask the middle part
  
    return `${firstTwo}${maskedPart}${lastFour}`;
  }

  backFromOtp(){
    this._accountService.pwRequest.mutate((a) => (a.isSuccess = false));
  }

  signout() {
    localStorage.clear();
    location.reload();
    this.Router.navigate(['login']);
  }

  eic: string = '';
  

}
