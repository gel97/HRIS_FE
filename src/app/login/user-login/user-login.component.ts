import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  login: any = {};

  constructor(private Auth: AuthService, private Router: Router) {}
  ngOnInit(): void {}

  Login() {
    this.Auth.login(this.login).subscribe({
      next: (data: any) => {
        console.log('EIC', data.eic);
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
  }
}
