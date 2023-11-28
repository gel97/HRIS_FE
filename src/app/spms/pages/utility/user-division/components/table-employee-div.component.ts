import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { UserDivisionService } from 'src/app/spms/service/utility/user-division.service';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-table-employee-div',
  template: `
    <div class="card">
      <div class="row">
        <div class="col-10">
          <h5 class="card-header">
            <strong>LIST OF {{officeNameShort}} EMPLOYEE</strong>
          </h5>
        </div>
        <div class="col-2">
        </div>
      </div>
      <div class="row">
        <div class="col-8">
            <div class="input-group p-2">
              <span class="input-group-text">
                <div
                  class="spinner-border spinner-border-sm text-primary"
                  role="status"
                  *ngIf="isSearchLoading; else showIcon"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <ng-template #showIcon> 
                  <i class="tf-icons bx bx-search"></i>
                </ng-template>
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Search..."
                [(ngModel)]="search"
                (ngModelChange)="searchData()"
              />
            </div>
        </div>
        <div class="col-4">
          <div class="p-2">
            <select [(ngModel)]="division" (ngModelChange)="SelectDivision()" class="form-select" id="exampleFormControlSelect1" aria-label="Default select example">
              <option selected>Division</option>
              <ng-container *ngFor="let z of officeDivision.data; let y = index">
                  <option [value]="z.divisionId">{{z.divisionName}}</option>
              </ng-container>  
            </select>
          </div>
        </div>
      </div>
      <div class="table-responsive text-nowrap">
        <table class="table table-sm table-hover table-striped">
          <thead>
            <tr>
              <th [width]="10">#</th>
              <th>Name</th>
              <th>Division</th>
              <th [width]="10">Actions</th>
            </tr>
          </thead>
          <tbody class="table-border-bottom-0">
            <ng-container *ngFor="let a of employee.data; let i = index">
            <tr>
              <td><strong>{{(employee.metadata.pageNumber -1) * (employee.metadata.pageSize) + (i+1) }}</strong></td>
              <td>{{a.fullNameFirst}}</td>
              <td>{{a.divisionName}}</td>
              <td>
                 <div class="dropdown position-static" *ngIf="!a.isLoading; else LoadingActions">
                    <button
                      type="button"
                      class="btn p-0 dropdown-toggle hide-arrow"
                      data-bs-toggle="dropdown"
                    >
                      <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div class="dropdown-menu">
                      <p class="m-2"><strong>Assign to:</strong></p>
                      <ng-container *ngFor="let z of officeDivision.data; let y = index">
                          <a class="dropdown-item cursor-pointer" 
                            (click)="SelectedEmployee({EIC:a.eic , divisionId: z.divisionId})"
                          >
                            {{z.divisionName}}
                          </a>
                      </ng-container>   
                      <a class="dropdown-item cursor-pointer"
                        (click)="DeleteEmployeeDivision(a.eic)"
                      >
                        <i class="bx bx-trash me-1"></i> Remove
                      </a>             
                    </div>
                  </div>
                  <ng-template #LoadingActions>
                    <ngx-skeleton-loader
                      count="1"
                      animation="pulse"
                      appearance="circle"
                      [theme]="{ margin: '0px' }"
                    ></ngx-skeleton-loader>
                  </ng-template>
              </td>
            </tr>        
            </ng-container>
          </tbody>
          <tfoot class="table-border-bottom-0">
            <tr>
              <th colspan="3">
                  <mat-paginator #paginator
                    class="demo-paginator"
                    (page)="handlePageEvent($event)"
                    [length]="employee.metadata.totalItems"
                    [pageSize]="employee.metadata.pageSize"
                    [disabled]="disabled"
                    [showFirstLastButtons]="showFirstLastButtons"
                    [pageSizeOptions]="showPageSizeOptions ? pageSizeOptions : []"
                    [hidePageSize]="hidePageSize"
                    [pageIndex]="employee.metadata.pageNumber - 1"
                    aria-label="Select page">
                  </mat-paginator>                
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  `,
})
export class TableEmployeeDivComponent {
  officeNameShort:string | null = localStorage.getItem('officeName');
  userDivisionService = inject(UserDivisionService);
  isSearchLoading = this.userDivisionService.isSearchLoadingEmpNoDiv()

  division:any = "Division";
  @Input() employee: any;
  @Input() officeDivision: any;

  @Output() updateEmployeeDivision = new EventEmitter<any>();

 
  SelectedEmployee(data:any){
    this.updateEmployeeDivision.emit(data);
  }

  DeleteEmployeeDivision(EIC:string){
    this.userDivisionService.DeleteEmployeeDivision(EIC);
  }

  pageSizeOptions = [5, 10, 50, 100];


  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    console.log(e)
   
    this.userDivisionService.pageNumberEmpDiv.set(e.pageIndex + 1);
    this.userDivisionService.pageSizeEmpDiv.set(e.pageSize);
    this.userDivisionService.PostEmpDiv();

  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  search:string = "";
  searchData(){
    this.userDivisionService.searchEmpDiv.set(this.search);
    this.userDivisionService.pageNumberEmpDiv.set(1);
    this.userDivisionService.PostEmpDiv();

  }

  SelectDivision(){
    if(this.division=== "Division"){
      this.division = null;
    }

    this.userDivisionService.filterDiv.set(this.division);
    this.userDivisionService.pageNumberEmpDiv.set(1);
    this.userDivisionService.PostEmpDiv();
  }
}
