import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserStoreService } from 'src/app/service/user-store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  login: any = {};
  loading: boolean = false;

  constructor(
    private Auth: AuthService,
    private Router: Router,
    private UserStore: UserStoreService
  ) {}
  ngOnInit(): void {
    this.Router.navigate(['']);
  }

  eic: string = '';
  Login() {
    this.loading = true;
    this.Auth.login(this.login).subscribe({
      next: (data: any) => {
        (this.eic = data.eic), console.log('EIC', data.eic);
        this.Router.navigate(['']);
      },
      error: (error: any) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: 'Incorrect Username or Password',
        });
      },
      complete: () => {
        this.Auth.loginHRIS(this.eic).subscribe({
          next: (data: any) => {
            console.log(data);
            this.Auth.storeDetails(data);
            this.Auth.storeToken(data.token);
            let tokenPayload = this.Auth.decodedToken();
            console.log('tokenpayload', tokenPayload);
            this.UserStore.setOfficeIdFromStore(tokenPayload.officeId);
            this.UserStore.setDivisionIdFromStore(tokenPayload.divisionId);
            this.Router.navigate(['']);
          },
          error: (error: any) => {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: 'error',
              title: 'Incorrect Username or Password',
            });
          },
          complete: () => {
            this.loading = true;
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: 'success',
              title: 'Signed in successfully',
            });
          },
        });
      },
    });
  }
}
