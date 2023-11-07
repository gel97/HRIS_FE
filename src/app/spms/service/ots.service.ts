import { Injectable, ViewChild, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpmsApiService } from './spms-api.service';
import { api } from 'src/app/connection';
import Swal from 'sweetalert2';
import { AlertService } from './alert.service';
import DataSource from 'devextreme/data/data_source';
import { ErrorService } from './error.service';
@Injectable({
  providedIn: 'root',
})



export class OtsService {
  constructor(
    private http: HttpClient,
    private url: SpmsApiService,
    private alertService: AlertService,
    private errorService: ErrorService
  ) {}

  ots = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  otsMfoes = signal<any>({
    data: [],
    error: false,
    isLoading: false,
    startDate: '',
    endDate: ''
  });

  otsData:any=[];
  dataSource: DataSource | any;

   GetOts() {
    this.ots.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_ots(), {
        responseType: `json`,
      })
      .subscribe({
        next: async(response) => {
          this.otsData = [];
         response.map((item:any)=>{
          this.otsData.push({
              recNo: item.recNo,
              otsId: item.otsId,
              ipcrDataId: item.ipcrDataId,
              userId: item.userId,
              qty: item.qty,
              qlty: item.qlty,
              timely: item.timely,
              text: item.text,
              description: item.description,
              startDate: item.startDate,
              endDate: item.endDate,
              year: item.year,
              tag: item.tag
            });
          })

          this.dataSource = new DataSource({
            store: this.otsData,
         
          });
          
          this.ots.mutate((a) => (a.data = response));
          this.ots.mutate((a) => (a.isLoading = false));
        },
        error: () => {
          this.alertService.error();
        },
        complete: () => {},
      });
  }

  AddOts(data: any) {
    this.ots.mutate((a) => (a.isLoading = true));
    this.http
      .post<any[]>(api + this.url.post_ots(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.ots.mutate((a) => (a.data = response));
          this.ots.mutate((a) => (a.isLoading = false));
        },
        error: (error: any) => {
          this.alertService.error();
        },
        complete: () => {
          this.GetOts();
          this.alertService.save();
        },
      });
  }

    
  GetOtsMfoe() {
    this.otsMfoes.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_ipcr_data(), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.otsMfoes.mutate((a) => {
            (a.data = response),
              (a.isLoading = false),
              (a.error = false),
              (a.errorStatus = null);
          });

          this.errorService.error.mutate((a) => {
            (a.error = false), (a.errorStatus = null);
          });
        },
        error: (error: any) => {
          this.otsMfoes.mutate((a) => (a.isLoading = false));

          this.errorService.error.mutate((a) => {
            (a.error = true), (a.errorStatus = error.status);
          });
        },
        complete: () => {
          console.log("otsMfoes: ", this.otsMfoes());
        },
      });
  }

}
