import {
    Component,
    EventEmitter,
    Output,
    Input,
    inject,
    OnInit,
  } from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
import { IpcrService } from 'src/app/spms/service/ipcr.service'; 
import { ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header-ipcr-actual',
  template: `
    <div class="row">
      <div class="col-9">
        <div class="card-header p-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb breadcrumb-style1 m-0">
              <li class="breadcrumb-item">
                <a><i class="bx bx-data"></i>&nbsp;IPCR</a>
              </li>
              <li class="breadcrumb-item">
                <i class="bx bx-carousel"></i>&nbsp;{{
                  dpcrService.divisionName
                }}
              </li>
              <li
                class="breadcrumb-item"
                [ngClass]="!ipcrService.isShowIpcrDataActual() ? 'active' : ''"
              >
                <a (click)="SetIsShowDpcrData()" class="cursor-pointer"
                  ><i class="bx bxs-right-top-arrow-circle"></i>&nbsp;Actual</a
                >
              </li>
              <li
                *ngIf="ipcrService.isShowIpcrDataActual()"
                class="breadcrumb-item"
                [ngClass]="ipcrService.isShowIpcrDataActual() ? 'active' : ''"
              >
                <a>&nbsp;{{ ipcrService.storageIpcrDetailsActual() }}</a>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="col-3">
        <br />
        <div *ngIf="ipcrService.isShowIpcrDataActual()" class="float-end" style="display: flex;">
            <div class="dropdown position-static pointer">
                <button
                    type="button"
                    class="btn p-0 dropdown-toggle hide-arrow px-4"
                    data-bs-toggle="dropdown"
                >
                    <i class="bx bx-printer me-1"></i>
                </button>
                <div class="dropdown-menu">
                    <a
                        class="dropdown-item cursor-pointer"
                        data-bs-target="#modalIpcrActualReport"
                        data-bs-toggle="modal"
                        (click)="ipcrService.GetIpcrActualReport(ipcrId ??'')"
                    ><i class="bx bx-printer me-1"></i> IPCR</a
                    >
                    <a
                        class="dropdown-item cursor-pointer"
                        data-bs-target="#modalIpcrTargetReportActual"
                        data-bs-toggle="modal"
                        (click)="ipcrService.GetIpcrTargetReport(ipcrId ??'')"
                    ><i class="bx bx-printer me-1"></i> IPCR Target</a
                    >
                    <a
                        class="dropdown-item cursor-pointer"
                        data-bs-toggle="modal"
                        data-bs-target="#modalStandard"
                        (click)="ipcrService.GetIpcrStandardReport(ipcrId ??'', year, sem)"
                    ><i class="bx bx-printer me-1"></i> Standard</a
                    >
                    <a
                        class="dropdown-item cursor-pointer"
                        data-bs-toggle="modal"
                        data-bs-target="#modalMPORReport"
                        (click)="ReportMPOR()"

                    ><i class="bx bx-printer me-1"></i> MPOR</a
                    >
                    <a
                        class="dropdown-item cursor-pointer"
                        data-bs-toggle="modal"
                        data-bs-target="#modalSMPORReport"
                        (click)="ipcrService.GetIpcrSMPOReport(ipcrId ?? '', year, sem)"
                    ><i class="bx bx-printer me-1"></i> SMPOR</a
                    >
                </div>
            </div>
            <i (click)="SetIsShowDpcrData()" class="bx bx-arrow-back cursor-pointer mt-1"></i>     
        </div>   
      </div>
    </div>

    <!-- Modal IPCR-->
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
            <iframe
              [src]="ipcrService.ipcrActualReportUrl"
              width="100%"
              height="100%"
              frameborder="0"
            ></iframe>
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

    <!-- Modal Target-->
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
              <p class="d-flex justify-content-center">Loading . . . </p>
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

    <!-- Modal  Standard-->
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
                <p class="d-flex justify-content-center">Loading . . . </p>
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

    <!-- Modal MPOR -->
    <div
      class="modal fade"
      id="modalMPORReport"
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
            <h4><b>MPOR</b></h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body row">
            <div class="mb-2" style="display: flex;">
              <div style="margin-top: 10px; ">
                <label for="exampleFormControlSelect1" class="form-label"
                  >Month:</label
                >
              </div>
              <div style="margin-left: 10px">
                <select
                  class="form-select col-2"
                  id="exampleFormControlSelect1"
                  aria-label="Default select example"
                  [ngModel]="selectedMonth"
                  (ngModelChange)="selectMonthOnChange($event)"
                >
                  <option *ngFor="let i of months" [value]="i.monthNum">
                    {{ i.month }}
                  </option>
                </select>
              </div>         
            </div>
            <ng-container
              *ngIf="ipcrMporReport.isLoadingReport; else ShowReport"
            >
                <p class="d-flex justify-content-center">Loading . . . </p>
            </ng-container>
            <ng-template #ShowReport>
              <iframe
                [src]="ipcrMporReport.data"
                width="95%"
                height="90%"
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

    <!-- Modal SMPO-->
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
                <p class="d-flex justify-content-center">Loading . . . </p>
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
  `,
})
export class HeaderIpcrActualComponent implements OnInit{
  dpcrService = inject(DpcrService);
  ipcrService = inject(IpcrService);

  constructor(private cdr: ChangeDetectorRef, private datePipe: DatePipe) {}

  @Input() search: any;
  @Input() isShowIpcrData: any;

  @Output() onSearchMFO = new EventEmitter<any>();
  @Output() isAddDpcr = new EventEmitter<boolean>();
  @Output() handleShowDpcrData = new EventEmitter<boolean>();

  ngOnInit(): void {
      this.getMonths();
  }

  ipcrId = localStorage.getItem('ipcrIdActual');

  storedYear = localStorage.getItem('ipcrDetailsActualYear');
  storedSem  = localStorage.getItem('ipcrDetailsActualSem');

  year: number = this.storedYear !== null ? parseInt(this.storedYear, 10) : 0;
  sem: number  = this.storedSem  !== null ? parseInt(this.storedSem) : 0;

  ipcrMporReport : any = this.ipcrService.ipcrMPOR();
  ipcrSmporReport: any = this.ipcrService.ipcrSMPOR();
  ipcrStandardReport: any = this.ipcrService.ipcrStandard();

  selectedMonth : number | any; // Initialize with a default value
  months        : { month: string; monthNum: number }[] = [];
  reportMPOR    : any = {monthNum:1};

  getMonths() {
    let initial: number | any;
    let condition: number | any;
    if (this.sem == 1) {
      initial = 1;
      condition = 6;
      this.selectedMonth = initial;
    } else if (this.sem == 2) {
      initial = 6;
      condition = 12;
      this.selectedMonth = initial;
    }
    for (let i = initial; i <= condition; i++) {
      const monthName = this.datePipe.transform(
        new Date(2000, i - 1, 1),
        'MMMM'
      );
      if (monthName) {
        const combinedData = { month: monthName, monthNum: i };
        this.months.push(combinedData);
      }
    }
  }

  selectMonthOnChange(month: number) {
    this.reportMPOR.monthNum = month;
    this.reportMPOR.monthNum = parseInt(this.reportMPOR.monthNum, 10);
    this.ReportMPOR();
  }

  ReportMPOR(){
    this.ipcrService.GetIpcrMPOReport(this.ipcrId ?? '', this.year, this.reportMPOR.monthNum)
  }

  SearchMFO() {
    this.onSearchMFO.emit('Search MFO');
  }

  SetIsShowDpcrData() {
    this.ipcrService.isShowIpcrDataActual.set(0);
    this.ipcrService.storageIpcrDetailsActual.set(null);
    localStorage.setItem('isShow_ipcrActual', '0');
    localStorage.removeItem('ipcrIdActual');
    localStorage.removeItem('ipcrDetailsActual');

    this.cdr.detectChanges();
  }

  HandleDpcr() {
    this.isAddDpcr.emit(true);
  }
}
  