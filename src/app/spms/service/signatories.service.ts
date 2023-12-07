import { Injectable, ViewChild, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpmsApiService } from './spms-api.service';
import { api } from 'src/app/connection';
import Swal from 'sweetalert2';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root',
  })

export class SignatoriesService {
    constructor(
        private http: HttpClient,
        private url: SpmsApiService,
        private alertService: AlertService
      ) {}

      officeId: string | null = localStorage.getItem('officeId');
      divisionId: string | null = localStorage.getItem('divisionId');

      post_signatories(typeId:any){
        return this.http.post<any[]>(api + this.url.post_signatories(typeId), {responseType: `json`})
      }

      get_signatories(typeId:any){
        return this.http.get<any[]>(api + this.url.get_signatories(typeId, this.officeId?? '', this.divisionId?? ''), {responseType: `json`});
      }
}  