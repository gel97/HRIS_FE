import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { api } from 'src/app/connection';
import { AlertService } from '../alert.service';
import { SpmsApiService } from '../spms-api.service';
import { ErrorService } from '../error.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class UserDivisionService {
  empNoDiv = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  empDiv = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  officeDivision = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  officeRole = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  isSearchLoadingEmpNoDiv = signal<boolean>(false);
  searchEmpNoDiv = signal<any>("");
  pageNumberEmpNoDiv = signal<number>(1);
  pageSizeEmpNoDiv = signal<number>(10);

  isSearchLoadingEmpDiv = signal<boolean>(false);
  searchEmpDiv = signal<any>("");
  pageNumberEmpDiv = signal<number>(1);
  pageSizeEmpDiv = signal<number>(10);
  filterDiv = signal<any>("");

  officeId: string | null = localStorage.getItem('officeId');

  constructor(
    private errorService: ErrorService,
    private alertService: AlertService,
    private http: HttpClient,
    private url: SpmsApiService
  ) {}

  PostEmpNoDiv() {
    this.empNoDiv.mutate((a) => (a.isLoading = true));
    this.http
      .post<any[]>(
        api + this.url.post_employee_no_division(), 
        {
          search: this.searchEmpNoDiv(),
          pageNumber: this.pageNumberEmpNoDiv(),
          pageSize: this.pageSizeEmpNoDiv()
        },
      )
      .subscribe({
        next: (response: any = {}) => {
          this.empNoDiv.mutate((a) => {
            (a.data = response.items),
            (a.metadata = response.metadata),
            (a.isLoading = false),
            (a.error = false),
            (a.errorStatus = null);
          });

          this.errorService.error.mutate((a) => {
            (a.error = false), (a.errorStatus = null);
          });
        },
        error: (error: any) => {
          this.empNoDiv.mutate((a) => (a.isLoading = false));

          this.errorService.error.mutate((a) => {
            (a.error = true), (a.errorStatus = error.status);
          });

          console.log(this.empNoDiv());
        },
        complete: () => {},
      });
  }

  PostEmpDiv() {
    this.empDiv.mutate((a) => (a.isLoading = true));
    this.http
      .post<any[]>(
        api + this.url.post_employee_division(),
          {
            officeId: this.officeId,
            divisionId: this.filterDiv(),
            search: this.searchEmpDiv(),
            pageNumber: this.pageNumberEmpDiv(),
            pageSize: this.pageSizeEmpDiv()   
          }
      )
      .subscribe({
        next: (response: any = {}) => {
          this.empDiv.mutate((a) => {
              (a.data = response.items),
              (a.metadata = response.metadata),
              (a.isLoading = false),
              (a.error = false),
              (a.errorStatus = null);
          });

          this.errorService.error.mutate((a) => {
            (a.error = false), (a.errorStatus = null);
          });
        },
        error: (error: any) => {
          this.empDiv.mutate((a) => (a.isLoading = false));

          this.errorService.error.mutate((a) => {
            (a.error = true), (a.errorStatus = error.status);
          });

          console.log(this.empDiv());
        },
        complete: () => {},
      });
  }

  GetOfficeDivision() {
    this.officeDivision.mutate((a) => (a.isLoading = true));
    
    this.http
      .get<any[]>(api + this.url.get_officedivision(this.officeId), {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.officeDivision.mutate((a) => (a.data = response));
          this.officeDivision.mutate((a) => (a.isLoading = false));
        },
        error: () => {
          this.alertService.error();
        },
        complete: () => {},
      });
  }

  GetOfficeRole() {
    this.officeRole.mutate((a) => (a.isLoading = true));
    
    this.http
      .get<any[]>(api + this.url.get_employee_office_role())
      .subscribe({
        next: (response: any = {}) => {
          this.officeRole.mutate((a) => (a.data = response));
          this.officeRole.mutate((a) => (a.isLoading = false));
        },
        error: () => {
          this.alertService.error();
        },
        complete: () => {},
      });
  }

  UpdateOfficeRole(data:any){
    this.officeRole.mutate((a) => (a.isLoadingSave = true));
    data.officeId = this.officeId;
    this.http
      .put<any[]>(api + this.url.put_employee_office_role(), data, { responseType: `json` })
      .subscribe({
        next: (response: any = {}) => {
          this.PostEmpDiv();

          this.officeRole.mutate((a) => {
            a.isLoadingSave = false;
            a.error = false;
          });

          this.alertService.update();
        },
        error: (error: any) => {
          this.alertService.error();
          this.officeRole.mutate((a) => {
            a.isLoadingSave = false;
            a.error = true;
          });
        },
        complete: () => {},
      });
  }

  async DeleteEmployeeOfficeRole(EIC: string) {
    try {
      let deleteData = await this.alertService.delete(
        this.url.delete_employee_office_role(EIC)
      );

      if (deleteData) {
        this.PostEmpDiv();
      } else {
        //console.log("cancel")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  PostOfficeDivision(data:any) {
    this.officeDivision.mutate((a) => (a.isLoading = true));
    data.officeId = this.officeId;
    this.http
      .post<any[]>(api + this.url.post_officedivision(), data, {
        responseType: `json`,
      })
      .subscribe({
        next: (response: any = {}) => {
          this.GetOfficeDivision();
          this.alertService.save();
        },
        error: (error) => {
          console.log(error)
          if(error.status === 409){
            this.alertService.customError("Data already exist");
          }
          else{
            this.alertService.error();
          }
        },
        complete: () => {},
      });
  }

  UpdateOfficeDivision(data:any){
    this.officeDivision.mutate((a) => (a.isLoadingSave = true));
    this.http
      .put<any[]>(api + this.url.put_officedivision(), data, { responseType: `json` })
      .subscribe({
        next: (response: any = {}) => {
          this.PostEmpDiv();

          this.officeDivision.mutate((a) => {
            a.isLoadingSave = false;
            a.error = false;
          });

          this.alertService.update();
        },
        error: (error: any) => {
          this.alertService.error();
          this.officeDivision.mutate((a) => {
            a.isLoadingSave = false;
            a.error = true;
          });
        },
        complete: () => {},
      });
  }

  async DeleteOfficeDivision(divisionId: string) {
    try {
      let deleteData = await this.alertService.delete(
        this.url.delete_officedivision(divisionId)
      );

      if (deleteData) {
        this.GetOfficeDivision();
      } else {
        //console.log("cancel")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  AddUserDivision(user:any){
    this.empNoDiv.mutate((a) => (a.isLoadingSave = true));

    this.http
      .post<any[]>(api + this.url.post_employee_add_division(), user, { responseType: `json` })
      .subscribe({
        next: (response: any = {}) => {
          this.PostEmpDiv();
          this.PostEmpNoDiv();

          this.empNoDiv.mutate((a) => {
            a.isLoadingSave = false;
            a.error = false;
          });

          this.alertService.save();
        },
        error: (error: any) => {
          this.alertService.error();
          this.empNoDiv.mutate((a) => {
            a.isLoadingSave = false;
            a.error = true;
          });
        },
        complete: () => {},
      });
  }

  UpdateUserDivision(user:any){
    this.empDiv.mutate((a) => (a.isLoadingSave = true));

    this.http
      .put<any[]>(api + this.url.put_employee_update_division(), user, { responseType: `json` })
      .subscribe({
        next: (response: any = {}) => {
          this.PostEmpDiv();

          this.empDiv.mutate((a) => {
            a.isLoadingSave = false;
            a.error = false;
          });

          this.alertService.update();
        },
        error: (error: any) => {
          this.alertService.error();
          this.empDiv.mutate((a) => {
            a.isLoadingSave = false;
            a.error = true;
          });
        },
        complete: () => {},
      });
  }

  async DeleteEmployeeDivision(EIC: string) {
    try {
      let deleteData = await this.alertService.delete(
        this.url.delete_employee_division(EIC)
      );

      if (deleteData) {
        this.PostEmpDiv();
      } else {
        //console.log("cancel")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

}
