import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpmsApiService } from './spms-api.service';
import { api } from 'src/app/connection';
import Swal from 'sweetalert2';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  constructor(
    private http: HttpClient,
    private url: SpmsApiService,
    private alertService: AlertService
  ) {}

  get_logs(){
    return this.http.get<any[]>(api + this.url.get_logs(),{responseType: `json`})
  }

  post_all_logs(data:any){
    return this.http.post<any[]>(api + this.url.post_all_logs(), data,{responseType: `json`})
  }

  get_office(){
    return this.http.get<any[]>(api + this.url.get_office(),{responseType: `json`})
  }
}
