import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { api } from 'src/app/connection';
import { SpmsApiService } from './spms-api.service';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private http: HttpClient,
  ) {}
  save(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Saved successfully'
    })
  }

  update(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Updated successfully'
    })
  }

  delete(url:any, getFun:any) {
    let data:any;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      console.log(result)
      if (result.isConfirmed) {
         this.http
      .delete<any[]>(api + url, { responseType: `json` })
      .subscribe({
        next: (response: any = {}) => {
          getFun;
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        },
        error: (error: any) => { 
          Swal.fire(
            'Oops!',
            'Error.',
            'error'
          )
        },
        complete: () => {},
      });
       
      }
     data = result.isConfirmed;
    })

    return data;
  }

  error(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: 'Error! Something went wrong.'
    })
  }
}
