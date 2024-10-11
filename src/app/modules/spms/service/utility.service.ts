import { HttpClient } from '@angular/common/http';
import { Injectable, signal,effect, OnDestroy } from '@angular/core';
import { SpmsApiService } from './spms-api.service';
import { api } from 'src/app/connection';
import { Observable, Subject, take, takeUntil, takeWhile } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UtlityService  {
  constructor(
    private http: HttpClient,
    private url: SpmsApiService
  ) {}
  gettPMRole(): Observable<any[]> {
    return this.http.get<any[]>(api+this.url.get_utility_role(),{ responseType: `json`});
  }
  get_employee_list(){
    return this.http.get<any[]>(api+this.url.get_employee_list(),{ responseType: `json`});
  }
  get_employee_role(officeId:any){
    return this.http.post<any[]>(api+this.url.post_utility_employee_role(officeId),{ responseType: `json`});
  }
  get_user_role(EIC:string):Observable<any[]>{
    return this.http.get<any[]>(api+this.url.get_utility_user_role(EIC),{ responseType: `json`});
  }
  add_user_menu(menu:any={},EIC:string){
    return this.http.post(api+this.url.post_utility_user_role(EIC),menu,{ responseType: `json`});
  }
  delete_user_role(transId:any){
    return this.http.delete(api+this.url.delete_utility_user_role(transId),{ responseType: `json`});
  }
  get_profile_picture(EIC:any){
    return this.http.get(api+this.url.get_user_profile_picture(EIC),{ responseType: `json`});
  }
  get_office(){
    return this.http.get<any[]>(api+this.url.get_office(),{ responseType: `json`});
  }
  assign_office_focal(data:any){
    return this.http.post(api+this.url.post_employee_assign_office_focal(),data,{ responseType: `json`});
  }
  
  // ngOnDestroy() {
  //   this.destroy.next(true);
  //   this.destroy.unsubscribe();
  // }
}
