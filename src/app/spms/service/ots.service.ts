import { Injectable, ViewChild, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpmsApiService } from './spms-api.service';
import { api } from 'src/app/connection';
import Swal from 'sweetalert2';
import { AlertService } from './alert.service';
import DataSource from 'devextreme/data/data_source';
import { ErrorService } from './error.service';
import { IpcrService } from './ipcr.service';
@Injectable({
  providedIn: 'root',
})

export class OtsService {
  constructor(
    private http        : HttpClient,
    private url         : SpmsApiService,
    private alertService: AlertService,
    private errorService: ErrorService,
    private ipcrService : IpcrService

  ) {}

  ots = signal<any>({
    data     : [],
    error    : false,
    isLoading: false,
  });

  otsMfo = signal<any>({
    data     : [],
    error    : false,
    isLoading: false,
  });

  otsMfoes = signal<any>({
    data     : [],
    error    : false,
    isLoading: false,
    startDate: '',
    endDate  : ''
  });

  otsGetListUserMfo = signal<any>({
    data     : [],
    error    : false,
    isLoading: false,
  });

  otsGetMfoGroup = signal<any>({
    data     : [],
    error    : false,
    isLoading: false,
  });

  otsData    :any=[];
  dataSource : DataSource | any;

  storageIpcrId   = signal<any>(localStorage.getItem('ipcrId'));
  storageIpcrYear = signal<any>(localStorage.getItem('ipcrDetailsActualYear'));

   GetCheckUserOpenIpcr(){
    this.otsMfoes.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_check_user_open_ipcr(), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.GetIPCRMfoes(response.ipcrId);
          this.otsMfoes.mutate((a) => (a.errorMessage = null));
        },
        error: (error:any) => {
          if(error.status === 409){
            this.otsMfoes.mutate((a) => (a.errorMessage = "No open IPCR yet. Please check your IPCR, then try again."));
          } else {
            this.alertService.error();
          }
        },
        complete: () => {
          this.otsMfoes.mutate((a) => (a.isLoading = false));
        },
      });
      
   }

   GetIPCRMfoes(ipcrId:string) {
    this.otsMfoes.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_ipcrdetails_wSub(ipcrId), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.otsMfoes.mutate((a) => (a.data = response));
        },
        error: (error) => {
          this.alertService.error();

        },
        complete: () => {
          this.otsMfoes.mutate((a) => (a.isLoading = false));
        },
      });
  }

  GetOtsMfoGroup(data:any) {
    this.otsGetMfoGroup.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_ots_mfo_group(data.opcrDataId, data.dpcrDataId, data.subtaskId), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.otsGetMfoGroup.mutate((a) => (a.data = response));
        },
        error: (error) => {
          this.alertService.error();

        },
        complete: () => {
          this.otsGetMfoGroup.mutate((a) => (a.isLoading = false));
        },
      });
  }

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

  AddOtsToGroup(otsGroupId: string) {
    this.http
    .post<any[]>(api + this.url.post_ots_add_to_group(), {otsGroupId: otsGroupId})
    .subscribe({
      next: (response: any = {}) => {
        this.GetOts();
      },
      error: () => {
        this.alertService.error();
      },
      complete: () => {
        this.alertService.save();
      },
    });
  }

  AddGroupOts(data: any) {
    this.ots.mutate((a) => (a.isLoading = true));
    this.http
      .post<any[]>(api + this.url.post_ots_group(), data, {
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

  EditOts(data: any) {
    this.http
      .put<any[]>(api + this.url.put_ots(), data)
      .subscribe({
        next: (response: any = {}) => {
          this.alertService.update();
        },
        error: (error: any) => {
          this.alertService.error()
        },
        complete: () => {},
      });
  }
   
  GetOtsMfoe() {
    this.otsMfoes.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_ipcr_data(this.storageIpcrId()), {
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

        },
      });
  }

  PostOtsGetListUserMfo(data:any){
    this.otsGetListUserMfo.mutate((a) => (a.isLoading = true));
    this.http
      .post<any[]>(api + this.url.post_ots_get_list_user_mfo(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.otsGetListUserMfo.mutate((a) => {
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
          this.otsGetListUserMfo.mutate((a) => (a.isLoading = false));
          this.otsGetListUserMfo.mutate((a) => (a.data = []));

          this.errorService.error.mutate((a) => {
            (a.error = true), (a.errorStatus = error.status);
          });
        },
        complete: () => {

        },
      });
  }

  GetMfoOts(ipcrDataId:string) {
    this.otsMfo.mutate((a) => (a.isLoading = true));
    this.http
      .get<any[]>(api + this.url.get_mfo_ots(ipcrDataId), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.otsMfo.mutate((a) => (a.data = response));
        },
        error: (error) => {
          this.alertService.error();
        },
        complete: () => {
          this.otsMfo.mutate((a) => (a.isLoading = false));
        },
      });
  }

  GetMfoOtsPaginated(data:any) {
    data.year = this.storageIpcrYear();
    this.otsMfo.mutate((a) => (a.isLoading = true));
    this.http
      .post<any[]>(api + this.url.post_ots_mfo_paginate(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.otsMfo.mutate((a) => {
            ( a.data = response),
              (a.isLoading = false),
              (a.error = false),
              (a.errorStatus = null);
          });

          this.errorService.error.mutate((a) => {
            (a.error = false), (a.errorStatus = null);
          });
        },
        error: (error: any) => {
          this.otsMfo.mutate((a) => (a.isLoading = false));
          this.otsMfo.mutate((a) => (a.data = []));

          this.errorService.error.mutate((a) => {
            (a.error = true), (a.errorStatus = error.status);
          });
        },
        complete: () => {
          this.otsMfo.mutate((a) => (a.isLoading = false));
        },
      });
  }

  async DeleteOts(otsId: string) {
    try {
      let deleteData = await this.alertService.delete(
        this.url.delete_ots(otsId)
      );

      if (deleteData) {
        this.GetOts();
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  clearOtsGetMfo(){
    this.otsGetMfoGroup.mutate((a) => (a.data = []));
  }

  post_ots_request(page:any){
    return this.http.post<any[]>(api + this.url.
      post_ots_request(),page,{responseType: `json`})
  }

  get_ots_request_summary(){
    return this.http.get<any[]>(api + this.url.get_ots_request_summary(),{responseType: `json`})
  }

  put_ots_request_overRide(data:any){
    return this.http.put<any[]>(api + this.url.put_ots_request_overRide(),data,{responseType: `json`})
  }

  put_ots_request_approve(data:any){
    return this.http.put<any[]>(api + this.url.put_ots_request_approve(),data,{responseType: `json`})
  }
}
