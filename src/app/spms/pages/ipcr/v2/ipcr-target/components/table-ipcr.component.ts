import { Component, EventEmitter, Output, Input, inject, OnInit } from '@angular/core';
import { IpcrService } from 'src/app/spms/service/ipcr.service';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
import { UtlityService } from 'src/app/spms/service/utility.service';
import { SignatoriesService } from 'src/app/spms/service/signatories.service';

@Component({
  selector: 'app-table-ipcr',
  template: `
    <!-- <app-loading [loading]="ipcr.isLoading" /> -->
    <div class="card-body">
      <div>
        <select
          (change)="onChangeYear($event)"
          class="form-select"
          aria-label="Default select example"
        >
          <option
            *ngFor="let year of listYear"
            [selected]="year === yearNow"
            [value]="year"
          >
            {{ year }}
          </option>
        </select>
      </div>
      <br />
      <!-- Bordered Table -->
      <div class="table-responsive text-nowrap">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Details</th>
              <th>Sem</th>
              <th>Year</th>
              <th>Date Created</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of ipcr.data">
              <td class="cursor-pointer" (click)="SetIsShowIpcrData(item)">
                <a
                  ><strong>{{ item.details }}</strong></a
                >
              </td>
              <td>{{ Semester(item.semester) }}</td>
              <td>
                <span class="badge bg-label-primary me-1">{{ item.year }}</span>
              </td>
              <td>
                {{ item.transDT | date : 'MMM. dd, yyyy' }}
              </td>
              <td>
                <div [ngSwitch]="item.active">
                  <div *ngSwitchCase="'0'">
                    <span class="badge bg-label-danger me-1">Draft </span>
                  </div>
                  <div *ngSwitchCase="'1'">
                    <span class="badge bg-label-primary me-1">Open</span>
                  </div>
                  <div *ngSwitchCase="'2'">
                    <span class="badge bg-label-success me-1">Final</span>
                  </div>
                  <div *ngSwitchDefault>
                    <span class="badge bg-label-danger me-1">Draft </span>
                  </div>
                </div>
              </td>
              <td>
                <div class="dropdown position-static">
                  <button
                    type="button"
                    class="btn p-0 dropdown-toggle hide-arrow"
                    data-bs-toggle="dropdown"
                  >
                    <i class="bx bx-dots-vertical-rounded"></i>
                  </button>
                  <div class="dropdown-menu">
                    <div [ngSwitch]="item.active">
                      <div *ngSwitchCase="'0'">
                        <a
                          class="dropdown-item cursor-pointer"
                          (click)="SetIpcrActive(item, 1)"
                          ><i class="bx bx-paperclip me-1 "></i> Open</a
                        >
                      </div>
                      <div *ngSwitchCase="'1'">
                        <a
                          class="dropdown-item cursor-pointer"
                          (click)="SetIpcrActive(item, 2)"
                          ><i class="bx bxs-flag-alt me-1 "></i> Final</a
                        >
                      </div>
                      <div *ngSwitchDefault>
                        <a
                          class="dropdown-item cursor-pointer"
                          (click)="SetIpcrActive(item, 1)"
                          ><i class="bx bx-paperclip me-1 "></i> Open</a
                        >
                      </div>
                    </div>
                    <a
                          class="dropdown-item"
                          (click)="ipcrService.GetIpcrTargetReport(item.ipcrId)"
                          data-bs-target="#modalIpcrTargetReport"
                          data-bs-toggle="modal"
                          ><i class="bx bx-printer me-1"></i> Print IPCR</a
                    >
                    <!-- <a
                        class="dropdown-item cursor-pointer"
                        (click)="SetDpcr(item); HandleDpcr()"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasDpcr"
                        ><i class="bx bx-edit-alt me-1"></i> Edit</a
                      > -->
                    <a
                      class="dropdown-item cursor-pointer"
                      data-bs-toggle="modal"
                      data-bs-target="#modalSignatory"
                      (click)="GetSignatoryIpcr(item.ipcrId)"
                      ><i class="bx bx-edit me-1"></i> Signatory</a
                    >
                    <a
                      class="dropdown-item cursor-pointer"
                      (click)="DeleteIpcr(item.ipcrId)"
                      ><i class="bx bx-trash me-1"></i> Delete</a
                    >
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div *ngIf="ipcrService.ipcr().data.length <= 0">
        <img
          src="assets/img/document.png"
          alt=""
          width="200"
          height="200"
          style="display: block; margin: 0 auto"
        />
        <span
          style=" display: flex; flex-direction: column; justify-content: space-between; align-items: center;height: 100%;"
        >
          <div>
            <label style="margin-bottom: 10px;"
              ><strong>No Data Found!</strong></label
            >
          </div>
        </span>
      </div>
      <!--/ Bordered Table -->
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modalIpcrTargetReport"
      tabindex="-1"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-fullscreen"
        style="padding: 50px 100px 50px 100px;"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body row">
            <ng-container *ngIf="ipcrService.loadReportIpcrTgt(); else ShowReport">
              <app-loading-square-jelly-box
                [loading]="ipcrService.loadReportIpcrTgt()"
              />
            </ng-container>
            <ng-template #ShowReport>
              <iframe
                [src]="ipcrService.ipcrTargetReportUrl"
                width="100%"
                height="100%"
                frameborder="0"
              ></iframe>
            </ng-template>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modalSignatory"
      tabindex="-1"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-sm "
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            SIGNATORY
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <div class="form-floating">
                <input
                  [(ngModel)]="signatory.reviewedBy"
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder=""
                  aria-describedby="floatingInputHelp"
                  (ngModelChange)="handleOnChangeReviewedBy()"
                  (blur)="handleOnBlurReviewedBy()"

                />
                <label for="floatingInput">Reviewed by</label>
              </div>
              <div *ngIf="isShowReviewedBy" class="card shadow-lg" style="position: absolute; width: 90%; z-index: 2000">
                  <div class="card-body " style="max-height: 160px; overflow:auto">
                      <ul *ngFor="let item of search_employee_list">
                        <li class="menu-item cursor-pointer text-hover" (click)="setReviewedBy(item)">
                          {{item.fullNameFirst}}
                        </li>
                      </ul>
                      <p *ngIf="search_employee_list.length === 0"><b>no data . . .</b></p>
                  </div>
              </div>
            </div>
            <br>
            <div class="form-floating">
              <input
                [(ngModel)]="signatory.approvedBy"
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder=""
                aria-describedby="floatingInputHelp"
                (ngModelChange)="handleOnChangeApprovedBy()"
                (blur)="handleOnBlurApprovedBy()"

              />
              <label for="floatingInput">Approved by</label>
            </div>
            <div *ngIf="isShowApprovedBy" class="card shadow-lg" style="position: absolute; width: 90%;">
                <div class="card-body " style="max-height: 160px; overflow:auto">
                    <ul *ngFor="let item of search_employee_list_approved_by">
                      <li class="menu-item cursor-pointer text-hover" (click)="setApprovedBy(item)">
                        {{item.fullNameFirst}}
                      </li>
                    </ul>
                    <p *ngIf="search_employee_list_approved_by.length === 0"><b>no data . . .</b></p>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              (click)="SaveSignatory()"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class TableIpcrComponent implements OnInit {
  ipcrService      = inject(IpcrService);
  dpcrService      = inject(DpcrService);
  utilService      = inject(UtlityService);
  signatoryService = inject(SignatoriesService);

  get_ipcrDetails = this.ipcrService.ipcrDetails();

  prevYear = new Date().getFullYear() - 1;
  yearNow  = new Date().getFullYear();
  listYear : any = [];
  
  employee_list       : any = [];
  search_employee_list: any = [];
  search_employee_list_approved_by: any = []; 

  signatory: any = {};

  divisionId : string | null = localStorage.getItem('divisionId');
  userId     : string | null = localStorage.getItem('userId');

  ipcr = this.ipcrService.ipcr();

  isShowReviewedBy: boolean = false;
  isShowApprovedBy: boolean = false;

  ngOnInit(): void {
    for (let index = 3; index > 0; index--) {
      this.listYear.push(this.prevYear++);
    }
    this.ipcrService.GetIPCRs();
    this.GetEmployeeList();
  }

  @Output() isAddDpcr = new EventEmitter<boolean>();
  @Output() setDpcr = new EventEmitter<any>();

  GetEmployeeList(){
    this.utilService.get_employee_list().subscribe(
      (response: any) => {
        this.employee_list = response.filter(
          (employee: any) => employee.salaryGrade >= 18 && employee.salaryGrade <= 26
        );

        console.log(this.employee_list);
      },
      (err) => {
        alert('error');
      },
    );
  }

  GetSignatoryIpcr(ipcrId:any) {
    this.signatory.typeId = ipcrId;
    this.signatoryService.get_signatories_ipcr(ipcrId).subscribe(
      (request:any) => {
        this.signatory = request;
        console.log(request)
      },
      (err) => {
      }
    );
  }

  SaveSignatory(){
    this.signatoryService.put_signatories_ipcr(this.signatory);
  }

  handleOnChangeReviewedBy(){
    this.isShowReviewedBy = true;
    this.search_employee_list = this.employee_list.filter(
      (employee: any) => (employee.firstName + " " + employee.lastName).toLowerCase().includes(this.signatory.reviewedBy.toLowerCase()));
  }

  setReviewedBy(value:any){
    this.isShowReviewedBy       = false;
    this.signatory.reviewedBy   = value.fullNameFirst;
    this.signatory.reviewedById = value.eic;
  }

  handleOnBlurReviewedBy(){
    setTimeout(() => {
      if(this.signatory.reviewedById === null || this.signatory.reviewedById === undefined || this.signatory.reviewedBy === ""){
        this.isShowReviewedBy = false;
        this.signatory.reviewedBy = null;
        this.signatory.reviewedById = null;

      }
    }, 1000);
  }

  handleOnChangeApprovedBy(){
    this.isShowApprovedBy = true;
    this.search_employee_list_approved_by = this.employee_list.filter(
      (employee: any) => (employee.firstName + " " + employee.lastName).toLowerCase().includes(this.signatory.approvedBy.toLowerCase()));
  }

  setApprovedBy(value:any){
    this.isShowApprovedBy       = false;
    this.signatory.approvedBy   = value.fullNameFirst;
    this.signatory.approvedById = value.eic;
  }

  handleOnBlurApprovedBy(){
    setTimeout(() => {
      if(this.signatory.approvedById === null || this.signatory.approvedById === undefined || this.signatory.approvedBy === ""){
        this.isShowApprovedBy = false;
        this.signatory.approvedBy = null;
        this.signatory.approvedById = null;      }
    }, 1000);

  }

  SetDpcr(item: any) {
    this.setDpcr.emit(item);
  }

  DeleteIpcr(ipcrId: string) {
    this.ipcrService.DeleteIpcr(ipcrId);
  }

  HandleDpcr() {
    this.isAddDpcr.emit(false);
  }

  SetIpcrActive(item: any, status: number) {
    item.active = status;
    this.ipcrService.SetDpcrActive(item);
  }

  SetIsShowIpcrData(item: any) {
    this.ipcrService.storageIpcrId.set(item.ipcrId);
    localStorage.setItem('ipcrId', item.ipcrId);

    this.ipcrService.storageIpcrData.set(item.details);
    localStorage.setItem('ipcrData', item.details);

    this.ipcrService.storageIsShow.set(1);
    localStorage.setItem('isShow_ipcr', '1');
  }

  Semester(value: number) {
    let result = '';

    switch (value) {
      case 1:
        result = '1st';
        break;
      case 2:
        result = '2nd';
        break;
      default:
        break;
    }
    return result;
  }

  onChangeYear(event: any) {
    this.ipcrService.year.set(event.target.value);
    this.ipcrService.GetIPCRs();
  }
}
