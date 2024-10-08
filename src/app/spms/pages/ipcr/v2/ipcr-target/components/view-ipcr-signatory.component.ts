import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import { IpcrService } from 'src/app/spms/service/ipcr.service';
import { SignatoriesService } from 'src/app/spms/service/signatories.service';
import { UtlityService } from 'src/app/spms/service/utility.service';
import { Router, ActivatedRoute  } from '@angular/router';
@Component({
  selector: 'app-view-ipcr-signatory',
  template: `
    <!--/ Role cards -->
    <div class="x-center">
      <div class="card col-lg-4 col-sm-12">
        <div class="card-header"><h3>{{ipcr.data.details}}</h3></div>
        <div class="card-body ">
          <div class="">
            <div class="">
              <div class="text-center mb-4">
                <h2 class="role-title">Signatory</h2>
              </div>
              <div class="col-lg-12">
                <mat-form-field style="width: 100%;" appearance="outline">
                  <mat-label>Approved by:</mat-label>
                  <mat-select [(ngModel)]="signatory.approvedById">
                    <mat-option>
                      <ngx-mat-select-search
                        [(ngModel)]="searchApprovedBy"
                        (ngModelChange)="handleOnChangeApprovedBy()"
                        placeholderLabel="Search..."
                        noEntriesFoundLabel="'no match found'"
                      ></ngx-mat-select-search>
                    </mat-option>
                    <mat-option
                      *ngFor="let i of search_employee_list_approved_by"
                      value="{{ i.eic }}"
                    >
                      {{ i.lastName }}, {{ i.firstName }}</mat-option
                    >
                  </mat-select>
                </mat-form-field>
                <label *ngIf="validateField.approvedById" class="text-danger">Approved by is required</label>
              </div>
              <div class="col-lg-12">
                <mat-form-field style="width: 100%;" appearance="outline">
                  <mat-label>Reviewed by:</mat-label>
                  <mat-select [(ngModel)]="signatory.reviewedById">
                    <mat-option>
                      <ngx-mat-select-search
                        [(ngModel)]="searchReviewedBy"
                        (ngModelChange)="handleOnChangeReviewedBy()"
                        placeholderLabel="Search..."
                        noEntriesFoundLabel="'no match found'"
                      ></ngx-mat-select-search>
                    </mat-option>
                    <mat-option
                      *ngFor="let i of search_employee_list_reviewed_by"
                      value="{{ i.eic }}"
                    >
                      {{ i.lastName }}, {{ i.firstName }}</mat-option
                    >
                  </mat-select>
                </mat-form-field>
                <label *ngIf="validateField.reviewedById" class="text-danger">Reviewed by is required</label>
              </div>
              <div class="col-lg-12">
                <mat-form-field style="width: 100%;" appearance="outline">
                  <mat-label>Assessed by:</mat-label>
                  <mat-select [(ngModel)]="signatory.assessedById">
                    <mat-option>
                      <ngx-mat-select-search
                        [(ngModel)]="searchAssessedBy"
                        (ngModelChange)="handleOnChangeAssessedBy()"
                        placeholderLabel="Search..."
                        noEntriesFoundLabel="'no match found'"
                      ></ngx-mat-select-search>
                    </mat-option>
                    <mat-option
                      *ngFor="let i of search_employee_list_assessed_by"
                      value="{{ i.eic }}"
                    >
                      {{ i.lastName }}, {{ i.firstName }}</mat-option
                    >
                  </mat-select>
                </mat-form-field>
                <label *ngIf="validateField.assessedById" class="text-danger">Assessed by is required</label>
              </div>
              <div class="col-lg-12">
                <mat-form-field style="width: 100%;" appearance="outline">
                  <mat-label>Final Rating by:</mat-label>
                  <mat-select [(ngModel)]="signatory.finalRatingById">
                    <mat-option>
                      <ngx-mat-select-search
                        [(ngModel)]="searchFinalRatingBy"
                        (ngModelChange)="handleOnChangeFinalRatingBy()"
                        placeholderLabel="Search..."
                        noEntriesFoundLabel="'no match found'"
                      ></ngx-mat-select-search>
                    </mat-option>
                    <mat-option
                      *ngFor="let i of search_employee_list_finalRating_by"
                      value="{{ i.eic }}"
                    >
                      {{ i.lastName }}, {{ i.firstName }}</mat-option
                    >
                  </mat-select>
                </mat-form-field>
                <label *ngIf="validateField.finalRatingById" class="text-danger">Final rating by is required</label>
              </div>
              <div class="text-center mb-4">
                <h2 class="role-title">MPOR AND SMPOR</h2>
              </div>
              <div class="col-lg-12">
                <mat-form-field style="width: 100%;" appearance="outline">
                  <mat-label>Confirmed by:</mat-label>
                  <mat-select [(ngModel)]="signatory.confirmedById">
                    <mat-option>
                      <ngx-mat-select-search
                        [(ngModel)]="searchConfirmedBy"
                        (ngModelChange)="handleOnChangeConfirmedBy()"
                        placeholderLabel="Search..."
                        noEntriesFoundLabel="'no match found'"
                      ></ngx-mat-select-search>
                    </mat-option>
                    <mat-option
                      *ngFor="let i of search_employee_list_confirmed_by"
                      value="{{ i.eic }}"
                    >
                      {{ i.lastName }}, {{ i.firstName }}</mat-option
                    >
                  </mat-select>
                </mat-form-field>
                <label *ngIf="validateField.confirmedById" class="text-danger">Confirmed by is required</label>
              </div>
              <div class="col-lg-12">
                <button class="btn btn-primary col-lg-12" (click)="SaveSignatory()">SUBMIT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ViewIpcrSignatoryComponent implements OnInit {
  ipcrService      = inject(IpcrService);
  signatoryService = inject(SignatoriesService);
  utilService      = inject(UtlityService);

  ipcr = this.ipcrService.ipcr_user();

  signatory : any = {};
  validateField: any = {};

  searchReviewedBy   : any = '';
  searchApprovedBy   : any = '';
  searchConfirmedBy  : any = '';
  searchAssessedBy   : any = '';
  searchFinalRatingBy: any = '';

  employee_list: any = [];

  search_employee_list_reviewed_by   : any = [];
  search_employee_list_approved_by   : any = [];
  search_employee_list_confirmed_by  : any = [];
  search_employee_list_assessed_by   : any = [];
  search_employee_list_finalRating_by: any = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const ipcrId = this.route.snapshot.paramMap.get('ipcrId');
    this.CheckIpcrIdParam(ipcrId??"");
    this.GetEmployeeList();
    this.GetSignatoryIpcr(ipcrId??"")
  }

  async CheckIpcrIdParam(ipcrId:string){
    try {
      let validate = await this.ipcrService.checkIfIpcrIdIsFromCurrentUser(ipcrId)
      console.log(validate);

      if (!validate) {
        this.navigateToIpcrTarget();
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  GetEmployeeList() {
    this.utilService.get_employee_list().subscribe(
      (response: any) => {
        this.employee_list = response.filter(
          (employee: any) =>
            employee.salaryGrade >= 18 && employee.salaryGrade <= 26
        ).sort((a: any, b: any) => b.salaryGrade - a.salaryGrade);

        this.search_employee_list_reviewed_by    = this.employee_list;
        this.search_employee_list_approved_by    = this.employee_list;
        this.search_employee_list_confirmed_by   = this.employee_list;
        this.search_employee_list_assessed_by    = this.employee_list;
        this.search_employee_list_finalRating_by = this.employee_list;

        console.log(this.employee_list);
      },
      (err) => {
        alert('error');
      }
    );
  }

  navigateToIpcrTarget() {
    this.router.navigate(['/spms/ipcr/target']);
  }

  GetSignatoryIpcr(ipcrId: any) {
    this.signatory.typeId = ipcrId;
    this.signatoryService.get_signatories_ipcr(ipcrId).subscribe(
      (request: any) => {
        if(request === null){
          this.signatory.reviewedById    = null;
          this.signatory.approvedById    = null;
          this.signatory.confirmedById   = null;
          this.signatory.assessedById    = null;
          this.signatory.finalRatingById = null;
        }else{
          this.signatory = request;
        }
      },
      (err) => {}
    );
  }

  async SaveSignatory() {
    try{
      let validated = await this.ValidateEmptyFields();

      if(validated){
        this.signatoryService.put_signatories_ipcr(this.signatory);
      }
    }catch{}
  }

  async ValidateEmptyFields() : Promise<boolean> {
    return new Promise<boolean>((resolve)=>{
      if(this.signatory!.reviewedById === null || this.signatory!.reviewedById === ""){
        this.validateField!.reviewedById = true;
      }else{
        this.validateField!.reviewedById = false;
      }
  
      if(this.signatory!.approvedById === null || this.signatory!.approvedById === ""){
        this.validateField!.approvedById = true;
      }else{
        this.validateField!.approvedById = false;
      }
  
      if(this.signatory!.confirmedById === null || this.signatory!.confirmedById === ""){
        this.validateField.confirmedById = true;
      }else{
        this.validateField.confirmedById = false;
      }

      if(this.signatory!.assessedById === null || this.signatory!.assessedById === ""){
        this.validateField.assessedById = true;
      }else{
        this.validateField.assessedById = false;
      }

      if(this.signatory!.finalRatingById === null || this.signatory!.finalRatingById === ""){
        this.validateField.finalRatingById = true;
      }else{
        this.validateField.finalRatingById = false;
      }
  
      if(this.validateField!.reviewedById || this.validateField!.approvedById || this.validateField!.confirmedById || this.validateField!.assessedById || this.validateField!.finalRatingById){
        resolve(false);
      }else{
        resolve(true);
      }
    })
   
  }

  handleOnChangeReviewedBy() {
    this.search_employee_list_reviewed_by = this.employee_list.filter(
      (employee: any) =>
        (employee.firstName + ' ' + employee.lastName)
          .toLowerCase()
          .includes(this.searchReviewedBy.toLowerCase())
    );
  }

  handleOnChangeApprovedBy() {
    this.search_employee_list_approved_by = this.employee_list.filter(
      (employee: any) =>
        (employee.firstName + ' ' + employee.lastName)
          .toLowerCase()
          .includes(this.searchApprovedBy.toLowerCase())
    );
  }

  handleOnChangeConfirmedBy() {
    this.search_employee_list_confirmed_by = this.employee_list.filter(
      (employee: any) =>
        (employee.firstName + ' ' + employee.lastName)
          .toLowerCase()
          .includes(this.searchConfirmedBy.toLowerCase())
    );
  }

  handleOnChangeAssessedBy() {
    this.search_employee_list_assessed_by = this.employee_list.filter(
      (employee: any) =>
        (employee.firstName + ' ' + employee.lastName)
          .toLowerCase()
          .includes(this.searchAssessedBy.toLowerCase())
    );
  }

  handleOnChangeFinalRatingBy() {
    this.search_employee_list_finalRating_by = this.employee_list.filter(
      (employee: any) =>
        (employee.firstName + ' ' + employee.lastName)
          .toLowerCase()
          .includes(this.searchFinalRatingBy.toLowerCase())
    );
  }
}
