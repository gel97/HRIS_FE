import { Component, OnInit, inject } from '@angular/core';
import { IpcrService } from 'src/app/modules/spms/service/ipcr.service';
import { ReportMporService } from 'src/app/modules/spms/service/report-mpor.service';
import { DatePipe } from '@angular/common';
import { ReportSmporService } from 'src/app/modules/spms/service/report-smpor.service';
import { ReportIpcrService } from 'src/app/modules/spms/service/report-ipcr.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-view-ipcr',
  styleUrls: ['../ipcr-actual.component.css'],
  template: `
    <!-- <app-loading [loading]="ipcr.isLoading" /> -->
    <div class="card">
      <div class="row">
        <div class="card-body">
          <div>
            <select
              class="form-select"
              aria-label="Default select example"
              [(ngModel)]="currentYear"
              (ngModelChange)="onChangeYear($event)"
            >
              <option *ngFor="let year of years" [value]="year">
                {{ year }}
              </option>
            </select>
          </div>
          <br />
          <!-- Bordered Table -->
          <div
            *ngIf="ipcrService.ipcr().data.length > 0"
            class="table-responsive text-nowrap"
          >
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Details</th>
                  <th>Sem</th>
                  <th>Year</th>
                  <th>Date Created</th>
                  <th>Date Submitted</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody *ngFor="let data of ipcr.data; let i = index">
                <tr>
                  <td class="pointer">
                    <a (click)="setIpcrDetails(data)" class="cursor-pointer"
                      ><strong>{{ data.details }}</strong></a
                    >
                  </td>
                  <td>
                    <span
                      class="badge"
                      [ngClass]="
                        data.semester == '0'
                          ? 'bg-label-success'
                          : data.semester == '1'
                          ? 'bg-label-primary'
                          : data.semester == '2'
                          ? 'bg-label-info'
                          : ''
                      "
                      >{{ semester(data.semester) }}</span
                    >
                  </td>
                  <td>
                    <span class="badge bg-label-primary me-1">{{
                      data.year
                    }}</span>
                  </td>
                  <td>
                    {{ data.transDT | date : 'MMM. dd, yyyy' }}
                  </td>
                  <td>
                    {{ data.actualSubmitAt | date : 'MMM. dd, yyyy' }}
                  </td>
                  <td>
                    <span
                      [ngClass]="
                        data.active == '1'
                          ? 'badge rounded-pill bg-label-success'
                          : data.active == '2'
                          ? 'badge rounded-pill bg-label-primary'
                          : data.active == '0'
                          ? 'badge rounded-pill bg-label-danger'
                          : ''
                      "
                    >
                      {{ displayStatus(data.active) }}</span
                    >
                  </td>
                  <td>
                    <div class="dropdown position-static pointer">
                      <button
                        type="button"
                        class="btn p-0 dropdown-toggle hide-arrow"
                        data-bs-toggle="dropdown"
                      >
                        <i class="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div class="dropdown-menu">
                        <a
                          class="dropdown-item"
                          (click)="ipcrService.GetIpcrActualReport(data.ipcrId)"
                          data-bs-target="#modalIpcrActualReport"
                          data-bs-toggle="modal"
                          ><i class="bx bx-printer me-1"></i> IPCR</a
                        >
                        <a
                          class="dropdown-item"
                          (click)="ipcrService.GetIpcrTargetReport(data.ipcrId)"
                          data-bs-target="#modalIpcrTargetReportActual"
                          data-bs-toggle="modal"
                          ><i class="bx bx-printer me-1"></i> IPCR Target</a
                        >
                        <a
                          class="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#modalStandard"
                          (click)="ReportStandard(data)"
                          ><i class="bx bx-printer me-1"></i> Standard</a
                        >
                        <a
                          class="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#printMPOR"
                          (click)="
                            sem = data.semester;
                            reportMPOR = data;
                            months = [];
                            getMonths()
                          "
                          ><i class="bx bx-printer me-1"></i> MPOR</a
                        >
                        <a
                          class="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#modalSMPORReport"
                          (click)="ReportSMPOR(data)"
                          ><i class="bx bx-printer me-1"></i> SMPOR</a
                        >
                        <a
                          class="dropdown-item cursor-pointer"
                          data-bs-target="#submitActual"
                          data-bs-toggle="modal"
                          (click)="actualSubmit.index = i; actualSubmit.ipcrId = data.ipcrId; actualSubmit.currentActualSubmitted = data.actualSubmitAt"
                        ><i class="bx bx-send"></i> Submit Actual</a
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
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                height: 100%;
                "
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
      </div>
    </div>

    <!-- Small Modal -->
    <div class="modal fade" id="submitActual" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content" style="z-index: 1;">
          <div class="modal-header">
            <h3 class="modal-title" id="exampleModalLabel2">SELECT DATE</h3>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col mb-3">
                <input
                  class="form-control"
                  type="date"
                  [(ngModel)]="actualSubmit.actualSubmitAt"
                  id="html5-datetime-local-input"
                  min="2023-11-1T08:00 | date:'yyyy-MM-ddTHH:mm'"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" [disabled]="actualSubmit.actualSubmitAt === undefined"
            (click)="SubmitActual()">Submit Actual</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Small Modal -->
    <div class="modal fade" id="printMPOR" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel2">MPOR</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col mb-3">
                <label for="exampleFormControlSelect1" class="form-label"
                  >Select Month</label
                >
                <select
                  class="form-select"
                  id="exampleFormControlSelect1"
                  aria-label="Default select example"
                  [ngModel]="mporMonths.selectedMonth"
                  (ngModelChange)="selectMonth($event)"
                >
                  <option *ngFor="let i of mporMonths.data" [value]="i.monthNum">
                    {{ i.month }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              (click)="ReportMPOR()"
              data-bs-toggle="modal"
              data-bs-target="#modalMPORReport"
              type="button"
              class="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modalIpcrActualReport"
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
          <ng-container
              *ngIf="ipcrActualReport.isLoadingReport; else ShowReportIpcrActual"
            >
              <app-loading-square-jelly-box
                [loading]="ipcrActualReport.isLoadingReport"
              />
            </ng-container>
            <ng-template #ShowReportIpcrActual>
              <iframe
                [src]="ipcrActualReport.data"
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
      id="modalSMPORReport"
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
            <ng-container
              *ngIf="ipcrSmporReport.isLoadingReport; else ShowReportSmpor"
            >
              <app-loading-square-jelly-box
                [loading]="ipcrSmporReport.isLoadingReport"
              />
            </ng-container>
            <ng-template #ShowReportSmpor>
              <iframe
                [src]="ipcrSmporReport.data"
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
      id="modalStandard"
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
            <ng-container
              *ngIf="ipcrStandardReport.isLoadingReport; else ShowReportStandard"
            >
              <app-loading-square-jelly-box
                [loading]="ipcrStandardReport.isLoadingReport"
              />
            </ng-container>
            <ng-template #ShowReportStandard>
              <iframe
                [src]="ipcrStandardReport.data"
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
      id="modalIpcrTargetReportActual"
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
            <ng-container *ngIf="ipcrService.loadReportIpcrTgt(); else ShowReportTargetActual">
              <app-loading-square-jelly-box
                [loading]="ipcrService.loadReportIpcrTgt()"
              />
            </ng-container>
            <ng-template #ShowReportTargetActual>
              <iframe
                [src]="ipcrService.ipcrTargetReportUrl
                "
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
  `,
})
export class ViewIpcrComponent implements OnInit {
  constructor(private datePipe: DatePipe) {}

  ipcrService        = inject(IpcrService);
  reportService      = inject(ReportMporService);
  reportServiceSMPOR = inject(ReportSmporService);
  reportServiceIPCR  = inject(ReportIpcrService);

  years       : number[] = [];
  divisionId  : string | null = localStorage.getItem('divisionId');
  userId      : string | null = localStorage.getItem('userId');
  isShow      : number | any = this.ipcrService.storageIsShow;
  ipcrData    : string | any = this.ipcrService.storageIpcrData;
  currentDate : Date = new Date();
  currentYear : number = this.currentDate.getFullYear();
  months      : { month: string; monthNum: number }[] = [];

  selectedMonth : number | any; // Initialize with a default value
  sem           : number | any;

  reportMPOR   : any = {};
  reportMPOR_officeHead : any = {};
  get_MPOR_data         : any = [];
  strategic_functions   : any = [];
  core_functions        : any = [];
  support_functions     : any = [];

  ipcr : any = this.ipcrService.ipcr();

  reportSMPOR    : any = {};
  get_SPMOR_data : any = [];

  reportIPCR     : any = {};
  get_IPCR_data  : any = [];

  mporMonths     : any = this.ipcrService.mporMonths();

  ipcrActualReport : any = this.ipcrService.ipcrActualReport();
  ipcrMporReport : any = this.ipcrService.ipcrMPOR();
  ipcrSmporReport: any = this.ipcrService.ipcrSMPOR();
  ipcrStandardReport: any = this.ipcrService.ipcrStandard();

  actualSubmit:any = {};

  ngOnInit(): void {
    this.ipcrYear();
    this.GetIpcr();

  }
  

  SubmitActual(){
    if(this.actualSubmit.actualSubmitAt !== undefined){
      if(this.actualSubmit.currentActualSubmitted !== null){

        let _currentActualSubmitted = this.formatDate(this.actualSubmit.currentActualSubmitted);
        let _actualSubmitAt = this.formatDate(this.actualSubmit.actualSubmitAt);

        let _text ="Your actual IPCR was already submitted on '" + _currentActualSubmitted +"'. Continuing will overwrite it with '" +_actualSubmitAt+  "'";

        if(_currentActualSubmitted  === _actualSubmitAt){
           _text ="You selected '" + _currentActualSubmitted +"', the same date that was already submitted. Please choose a different date.";
        }
        Swal.fire({
          title: 'Are you sure?',
          text: _text,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, submit it!',
          showClass: {
            popup: 'z-5'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.ipcr.data[this.actualSubmit.index].actualSubmitAt = this.actualSubmit.actualSubmitAt;
            this.ipcrService.PutSubmitActual(this.actualSubmit);
          } 
        });
      }else{
        this.ipcrService.PutSubmitActual(this.actualSubmit);
      }
    }
  }

  formatDate = (date: Date): string => {
    const validDate = new Date(date);
    if (isNaN(validDate.getTime())) {
      throw new Error('Invalid date');
    }
  
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    };
  
    return validDate.toLocaleDateString('en-US', options).replace(',', '');
  };

  printIPCR() {
    this.reportServiceIPCR.post_print_ipcr(this.reportIPCR).subscribe({
      next: (response: any) => {
        this.get_IPCR_data = response;
      },
      error: () => {},
      complete: () => {
        this.pdfIPCR(this.get_IPCR_data);
        // this.reportServiceIPCR.ReportIPCR();
      },
    });
  }

  pdfIPCR(data: any) {
    this.get_IPCR_data = [];
    this.strategic_functions = [];
    this.core_functions = [];
    this.support_functions = [];
    var ipcrList = data.ipcrList;
    var ipcrSubtask = data.ipcrSubtask;
    var ipcrData = data.ipcrData;
    this.sortFunctionMPORorSMPOR(ipcrList);
    this.sortFunctionMPORorSMPOR(ipcrSubtask);

    this.reportServiceIPCR.ReportIPCR(
      this.strategic_functions,
      this.core_functions,
      this.support_functions
    );
  }

  printSMPOR() {
    this.reportMPOR_officeHead.officeId = localStorage.getItem('officeId');
    this.reportMPOR_officeHead.divisionId = localStorage.getItem('divisionId');
    this.reportMPOR_officeHead.officeRoleId = '1';

    this.reportService
      .post_print_mpor_officeHead(this.reportMPOR_officeHead)
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('officeHeadName', response.officeHead);
        },
        error: () => {},
        complete: () => {},
      });

    this.reportServiceSMPOR.post_print_smpor(this.reportSMPOR).subscribe({
      next: (response: any) => {
        this.get_SPMOR_data = response;
      },
      error: () => {},
      complete: () => {
        this.PdfSMPOR(this.get_SPMOR_data);
      },
    });
  }

  calculateRatingSMPOR(data: any, data2: any) {
    data.map((a: any) => {
      a.ipcrDataId.map((b: any) => {
        data2.map((c: any) => {
          if (b.ipcrDataId == c.ipcrDataId) {
            b.jan_julySum = c.jan_julySum;
            b.feb_augSum = c.feb_augSum;
            b.march_septSum = c.march_septSum;
            b.april_octSum = c.april_octSum;
            b.may_novSum = c.may_novSum;
            b.june_decSum = c.june_decSum;
            b.totalSum = c.totalSum;

            b.jan_julyProdqlty = c.jan_julyProdqlty;
            b.feb_augProdqlty = c.feb_augProdqlty;
            b.march_septProdqlty = c.march_septProdqlty;
            b.april_octProdqlty = c.april_octProdqlty;
            b.may_novProdqlty = c.may_novProdqlty;
            b.june_decProdqlty = c.june_decProdqlty;
            b.totalProdqlty = c.totalProdqlty;

            b.jan_julyProdtmly = c.jan_julyProdtmly;
            b.feb_augProdtmly = c.feb_augProdtmly;
            b.march_septProdtmly = c.march_septProdtmly;
            b.april_octProdtmly = c.april_octProdtmly;
            b.may_novProdtmly = c.may_novProdtmly;
            b.june_decProdtmly = c.june_decProdtmly;
            b.totalProdtmly = c.totalProdtmly;

            b.ave_qlty = (b.totalProdqlty / b.totalSum).toFixed(2);
            b.ave_tmly = (b.totalProdtmly / b.totalSum).toFixed(2);

            if (a.isSubTask == 0) {
              if (b.qty5 <= b.totalSum) {
                b.ave = '5.00';
              } else if (b.qty4 <= b.totalSum) {
                b.ave = '4.00';
              } else if (b.qty3 <= b.totalSum) {
                b.ave = '3.00';
              } else if (b.qty2 <= b.totalSum) {
                b.ave = '2.00';
              } else if (b.qty1 <= b.totalSum) {
                b.ave = '1.00';
              }
            } else {
              if (b.data.qty5 <= b.totalSum) {
                b.ave = '5.00';
              } else if (b.data.qty4 <= b.totalSum) {
                b.ave = '4.00';
              } else if (b.data.qty3 <= b.totalSum) {
                b.ave = '3.00';
              } else if (b.data.qty2 <= b.totalSum) {
                b.ave = '2.00';
              } else if (b.data.qty1 <= b.totalSum) {
                b.ave = '1.00';
              }
            }
          }
        });
      });
    });
    return data;
  }

  PdfSMPOR(data: any) {
    this.get_SPMOR_data = [];
    this.strategic_functions = [];
    this.core_functions = [];
    this.support_functions = [];
    var smporList = data.smporList;
    var smporSubtask = data.smporSubtask;
    var smporData = data.smporData;

    smporList = this.calculateRatingSMPOR(smporList, smporData);
    smporSubtask = this.calculateRatingSMPOR(smporSubtask, smporData);

    this.sortFunctionMPORorSMPOR(smporList);
    this.sortFunctionMPORorSMPOR(smporSubtask);

    this.reportServiceSMPOR.ReportSMPOR(
      this.strategic_functions,
      this.core_functions,
      this.support_functions
    );
  }

  selectMonth(month: number) {

    this.reportMPOR.monthNum = month;
    this.reportMPOR.monthNum = parseInt(this.reportMPOR.monthNum, 10);
    this.ipcrService.GetMPORMonths(this.reportMPOR.monthNum);

  }

  selectMonthOnChange(month: number) {
    this.reportMPOR.monthNum = month;
    this.reportMPOR.monthNum = parseInt(this.reportMPOR.monthNum, 10);
    this.ReportMPOR();
  }

  getMonths() {
    if (this.sem == 1) {
     this.ipcrService.GetMPORMonths(1);
    } else{
      this.ipcrService.GetMPORMonths(7);
    }
    
  }

  ReportSMPOR(data:any){
    this.ipcrService.GetIpcrSMPOReport(data.ipcrId, data.year, data.semester)

  }

  ReportStandard(data:any){
    this.ipcrService.GetIpcrStandardReport(data.ipcrId, data.year, data.semester)

  }

  ReportMPOR(){
    localStorage.setItem('ipcrIdActual', this.reportMPOR.ipcrId);
    this.ipcrService.storageIpcrIdActual.set(this.reportMPOR.ipcrId);

    console.log("this.reportMPOR.monthNum: ", this.reportMPOR.monthNum)

    if(this.reportMPOR.monthNum === undefined){
      if(this.sem === 1){
        this.ipcrService.GetMPORMonths(1);

      }else{
        this.ipcrService.GetMPORMonths(7);

      }

    }else{
      this.ipcrService.GetMPORMonths(this.reportMPOR.monthNum);

    }
    this.ipcrService.GetIpcrMPOReport(this.reportMPOR.ipcrId, this.reportMPOR.year, this.reportMPOR.monthNum)

  }
  // ReportMPOR() { //DAVE
  //   if (this.reportMPOR.monthNum == null) {
  //     this.reportMPOR.monthNum = 1;
  //   }
  //   this.reportMPOR_officeHead.officeId = localStorage.getItem('officeId');
  //   this.reportMPOR_officeHead.divisionId = localStorage.getItem('divisionId');
  //   this.reportMPOR_officeHead.officeRoleId = '1';

  //   this.reportService
  //     .post_print_mpor_officeHead(this.reportMPOR_officeHead)
  //     .subscribe({
  //       next: (response: any) => {
  //         localStorage.setItem('officeHeadName', response.officeHead);
  //       },
  //       error: () => {},
  //       complete: () => {},
  //     });

  //   this.reportService.post_print_mpor(this.reportMPOR).subscribe({
  //     next: (response: any) => {
  //       this.get_MPOR_data = response;
  //       this.PdfMPOR(this.get_MPOR_data);
  //     },
  //     error: () => {},
  //     complete: () => {},
  //   });
  // }



  calculateRatingMPOR(data: any, data2: any) {
    data.map((a: any, index: number) => {
      a.ipcrDataId.map((b: any) => {
        let dumQtyWk1 = 0;
        let dumQtyWk2 = 0;
        let dumQtyWk3 = 0;
        let dumQtyWk4 = 0;
        let dumQltyWk1 = 0;
        let dumQltyWk2 = 0;
        let dumQltyWk3 = 0;
        let dumQltyWk4 = 0;
        let dumTimelyWk1 = 0;
        let dumTimelyWk2 = 0;
        let dumTimelyWk3 = 0;
        let dumTimelyWk4 = 0;
        data2.map((c: any) => {
          if (b.ipcrDataId == c.ipcrDataId) {
            c.data.map((d: any) => {
              if (d.qtyWk1 != null) {
                b.qtyWk1 = d.qtyWk1 + dumQtyWk1;
                dumQtyWk1 = b.qtyWk1;
                b.qltyWk1 = d.qtyWk1 * d.qltyR + dumQltyWk1;
                dumQltyWk1 = b.qltyWk1;
                b.qltyWk1Percentage = (b.qltyWk1 / b.qtyWk1).toFixed(2); // Convert to fixed decimal
                b.timelyWk1 = d.qtyWk1 * d.timelyR + dumTimelyWk1;
                dumTimelyWk1 = b.timelyWk1;
                b.timelyWk1Percentage = (b.timelyWk1 / b.qtyWk1).toFixed(2); // Convert to fixed decimal
              }
              if (d.qtyWk2 != null) {
                b.qtyWk2 = d.qtyWk2 + dumQtyWk2;
                dumQtyWk2 = b.qtyWk2;
                b.qltyWk2 = d.qtyWk2 * d.qltyR + dumQltyWk2;
                dumQltyWk2 = b.qltyWk2;
                b.qltyWk2Percentage = (b.qltyWk2 / b.qtyWk2).toFixed(2); // Convert to fixed decimal
                b.timelyWk2 = d.qtyWk2 * d.timelyR + dumTimelyWk2;
                dumTimelyWk2 = b.timelyWk2;
                b.timelyWk2Percentage = (b.timelyWk2 / b.qtyWk2).toFixed(2); // Convert to fixed decimal
              }
              if (d.qtyWk3 != null) {
                b.qtyWk3 = d.qtyWk3 + dumQtyWk3;
                dumQtyWk3 = b.qtyWk3;
                b.qltyWk3 = d.qtyWk3 * d.qltyR + dumQltyWk3;
                dumQltyWk3 = b.qltyWk3;
                b.qltyWk3Percentage = (b.qltyWk3 / b.qtyWk3).toFixed(2); // Convert to fixed decimal
                b.timelyWk3 = d.qtyWk3 * d.timelyR + dumTimelyWk3;
                dumTimelyWk3 = b.timelyWk3;
                b.timelyWk3Percentage = (b.timelyWk3 / b.qtyWk3).toFixed(2); // Convert to fixed decimal
              }
              if (d.qtyWk4 != null) {
                b.qtyWk4 = d.qtyWk4 + dumQtyWk4;
                dumQtyWk4 = b.qtyWk4;
                b.qltyWk4 = d.qtyWk4 * d.qltyR + dumQltyWk4;
                dumQltyWk4 = b.qltyWk4;
                b.qltyWk4Percentage = (b.qltyWk4 / b.qtyWk4).toFixed(2); // Convert to fixed decimal
                b.timelyWk4 = d.qtyWk4 * d.timelyR + dumTimelyWk4;
                dumTimelyWk4 = b.timelyWk4;
                b.timelyWk4Percentage = (b.timelyWk4 / b.qtyWk4).toFixed(2); // Convert to fixed decimal
              }
              b.total = dumQtyWk1 + dumQtyWk2 + dumQtyWk3 + dumQtyWk4;
              b.totalQlty = dumQltyWk1 + dumQltyWk2 + dumQltyWk3 + dumQltyWk4;
              b.totalTimely =
                dumTimelyWk1 + dumTimelyWk2 + dumTimelyWk3 + dumTimelyWk4;
            });
          }
        });
      });
    });
    return data;
  }

  sortFunctionMPORorSMPOR(data: any) {
    data.map((z: any) => {
      if (z.categoryId == 1) {
        this.strategic_functions.push(z);
      }
      if (z.categoryId == 2) {
        this.core_functions.push(z);
      }
      if (z.categoryId == 3) {
        this.support_functions.push(z);
      }
    });
  }

  PdfMPOR(data: any) {
    this.get_MPOR_data = [];
    this.strategic_functions = [];
    this.core_functions = [];
    this.support_functions = [];
    var mporList = data.mporList;
    var mporData = data.mporData;
    var mporSubtask = data.mporSubtask;

    mporList = this.calculateRatingMPOR(mporList, mporData);
    mporSubtask = this.calculateRatingMPOR(mporSubtask, mporData);

    this.sortFunctionMPORorSMPOR(mporList);
    this.sortFunctionMPORorSMPOR(mporSubtask);

    let month: string | any = '';
    for (let i = 1; i <= 12; i++) {
      const monthName = this.datePipe.transform(
        new Date(2000, i - 1, 1),
        'MMMM'
      );
      if (i == this.reportMPOR.monthNum) {
        month = monthName;
      }
    }

    this.reportService.ReportMPOR(
      this.strategic_functions,
      this.core_functions,
      this.support_functions,
      month,
      this.reportMPOR.year
    );
  }

  GetIpcr() {
    this.ipcrService.GetIPCRs();
  }

  setIpcrDetails(data: any) {
    this.ipcrService.isShowIpcrDataActual.set(1);
    this.ipcrService.storageIpcrDetailsActual.set(data.details);
    this.ipcrService.storageIpcrIdActual.set(data.ipcrId);
    this.ipcrService.storageIpcrActualYear.set(data.year);
    this.ipcrService.storageIpcrActualSem.set(data.semester);

    localStorage.setItem('ipcrIdActual', data.ipcrId);
    localStorage.setItem('ipcrDetailsActual', data.details);
    localStorage.setItem('ipcrDetailsActualYear', data.year);
    localStorage.setItem('isShow_ipcrActual', '1');
    localStorage.setItem('ipcrDetailsActualSem', data.semester);

    this.ipcrService.GetIPCRDataActual(data.ipcrId);
  }

  ipcrYear() {
    for (let i = new Date().getFullYear() + 1; i >= 2020; i--) {
      this.years.push(i);
    }
  }

  onChangeYear(year: any) {
    this.ipcrService.year.set(year);
    this.ipcrService.GetIPCRs();
  }

  semester(year: number) {
    let Year = '';
    switch (year) {
      case 0:
        Year = 'Full Year';
        break;

      case 1:
        Year = '1st Sem';
        break;

      case 2:
        Year = '2nd Sem';
        break;

      default:
        break;
    }
    return Year;
  }

  displayStatus(cat: any) {
    let catName = '';
    switch (cat) {
      case 1:
        catName = 'Open';
        break;
      case 2:
        catName = 'Final';

        break;
      case 0:
        catName = 'Draft';
        break;
      default:
        break;
    }

    if (cat == null) {
      catName = 'No Function';
    }
    return catName;
  }
}
