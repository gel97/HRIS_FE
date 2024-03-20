import { Component, OnInit, inject } from '@angular/core';
import { IpcrService } from 'src/app/spms/service/ipcr.service';
import { ReportMporService } from 'src/app/spms/service/report-mpor.service';
import { DatePipe } from '@angular/common';
import { ReportSmporService } from 'src/app/spms/service/report-smpor.service';
import { ReportIpcrService } from 'src/app/spms/service/report-ipcr.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-view-ipcr',
  styleUrls: ['../ipcr-actual.component.css'],
  template: `
    <app-loading [loading]="ipcr.isLoading" />
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
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody *ngFor="let data of ipcr.data">
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
                          data-bs-toggle="modal"
                          data-bs-target="#printMPOR"
                          (click)="
                            sem = data.semester;
                            reportMPOR = data;
                            months = [];
                            getMonths()
                          "
                          ><i class="bx bx-printer me-1"></i> Print MPOR</a
                        >
                        <a
                          class="dropdown-item"
                          (click)="reportSMPOR = data; printSMPOR()"
                          ><i class="bx bx-printer me-1"></i> Print SMPOR</a
                        >
                        <a
                          class="dropdown-item"
                          (click)="ipcrService.GetIpcrActualReport(data.ipcrId)"
                          data-bs-target="#modalIpcrActualReport"
                          data-bs-toggle="modal"
                          ><i class="bx bx-printer me-1"></i> Print IPCR</a
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
    <div class="modal fade" id="printMPOR" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel2">Print MPOR</h5>
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
                  [ngModel]="selectedMonth"
                  (ngModelChange)="selectMonth($event)"
                >
                  <option *ngFor="let i of months" [value]="i.monthNum">
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
              type="button"
              class="btn btn-primary"
            >
              Print MPOR
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
              class="btn btn-outline-secondary"
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

  ipcrService = inject(IpcrService);
  reportService = inject(ReportMporService);
  reportServiceSMPOR = inject(ReportSmporService);
  reportServiceIPCR = inject(ReportIpcrService);
  years: number[] = [];
  divisionId: string | null = localStorage.getItem('divisionId');
  userId: string | null = localStorage.getItem('userId');
  isShow: number | any = this.ipcrService.storageIsShow;
  ipcrData: string | any = this.ipcrService.storageIpcrData;
  currentDate: Date = new Date();
  currentYear: number = this.currentDate.getFullYear();
  months: { month: string; monthNum: number }[] = [];
  selectedMonth: number | any; // Initialize with a default value
  sem: number | any;
  reportMPOR: any = {};
  reportMPOR_officeHead: any = {};
  get_MPOR_data: any = [];
  strategic_functions: any = [];
  core_functions: any = [];
  support_functions: any = [];

  ipcr: any = this.ipcrService.ipcr();

  reportSMPOR: any = {};
  get_SPMOR_data: any = [];

  reportIPCR: any = {};
  get_IPCR_data: any = [];

  ngOnInit(): void {
    this.ipcrYear();
    this.GetIpcr();
  }

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
    console.log(this.strategic_functions);
    console.log(this.core_functions);
    console.log(this.support_functions);

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
      let dum_jan_julySum = 0;
      let dum_feb_augSum = 0;
      let dum_march_septSum = 0;
      let dum_april_octSum = 0;
      let dum_may_novSum = 0;
      let dum_june_decSum = 0;
      let dum_totalSum = 0;
      let dum_jan_julyProdqlty = 0;
      let dum_feb_augProdqlty = 0;
      let dum_march_septProdqlty = 0;
      let dum_april_octProdqlty = 0;
      let dum_may_novProdqlty = 0;
      let dum_june_decProdqlty = 0;
      let dum_totalProdqlty = 0;
      let dum_jan_julyProdtmly = 0;
      let dum_feb_augProdtmly = 0;
      let dum_march_septProdtmly = 0;
      let dum_april_octProdtmly = 0;
      let dum_may_novProdtmly = 0;
      let dum_june_decProdtmly = 0;
      let dum_totalProdtmly = 0;
      let dum_ave = 0;
      if (a.ipcrDataId.length != 0) {
        a.ipcrDataId.map((z: any) => {
          data2.map((b: any) => {
            if (z.ipcrDataId == b.ipcrDataId) {
              a.jan_julySum = b.jan_julySum + dum_jan_julySum;
              dum_jan_julySum = a.jan_julySum;

              a.feb_augSum = b.feb_augSum + dum_feb_augSum;
              dum_feb_augSum = a.feb_augSum;

              a.march_septSum = b.march_septSum + dum_march_septSum;
              dum_march_septSum = a.march_septSum;

              a.april_octSum = b.april_octSum + dum_april_octSum;
              dum_april_octSum = a.april_octSum;

              a.may_novSum = b.may_novSum + dum_may_novSum;
              dum_may_novSum = a.may_novSum;

              a.june_decSum = b.june_decSum + dum_june_decSum;
              dum_june_decSum = a.june_decSum;

              a.totalSum = b.totalSum + dum_totalSum;
              dum_totalSum = a.totalSum;

              a.jan_julyProdqlty = b.jan_julyProdqlty + dum_jan_julyProdqlty;
              dum_jan_julyProdqlty = a.jan_julyProdqlty;

              a.feb_augProdqlty = b.feb_augProdqlty + dum_feb_augProdqlty;
              dum_feb_augProdqlty = a.feb_augProdqlty;

              a.march_septProdqlty =
                b.march_septProdqlty + dum_march_septProdqlty;
              dum_march_septProdqlty = a.march_septProdqlty;

              a.april_octProdqlty = b.april_octProdqlty + dum_april_octProdqlty;
              dum_april_octProdqlty = a.april_octProdqlty;

              a.may_novProdqlty = b.may_novProdqlty + dum_may_novProdqlty;
              dum_may_novProdqlty = a.may_novProdqlty;

              a.june_decProdqlty = b.june_decProdqlty + dum_june_decProdqlty;
              dum_june_decProdqlty = a.june_decProdqlty;

              a.totalProdqlty = b.totalProdqlty + dum_totalProdqlty;
              dum_totalProdqlty = a.totalProdqlty;

              a.jan_julyProdtmly = b.jan_julyProdtmly + dum_jan_julyProdtmly;
              dum_jan_julyProdtmly = a.jan_julyProdtmly;

              a.feb_augProdtmly = b.feb_augProdtmly + dum_feb_augProdtmly;
              dum_feb_augProdtmly = a.feb_augProdtmly;

              a.march_septProdtmly =
                b.march_septProdtmly + dum_march_septProdtmly;
              dum_march_septProdtmly = a.march_septProdtmly;

              a.april_octProdtmly = b.april_octProdtmly + dum_april_octProdtmly;
              dum_april_octProdtmly = a.april_octProdtmly;

              a.may_novProdtmly = b.may_novProdtmly + dum_may_novProdtmly;
              dum_may_novProdtmly = a.may_novProdtmly;

              a.june_decProdtmly = b.june_decProdtmly + dum_june_decProdtmly;
              dum_june_decProdtmly = a.june_decProdtmly;

              a.totalProdtmly = b.totalProdtmly + dum_totalProdtmly;
              dum_totalProdtmly = a.totalProdtmly;

              a.ave_qlty = (dum_totalProdqlty / dum_totalSum).toFixed(2);
              a.ave_tmly = (dum_totalProdtmly / dum_totalSum).toFixed(2);
              if (z.qty5 <= dum_totalSum) {
                a.ave = 5.0;
              } else if (z.qty4 <= b.totalSum) {
                a.ave = 4.0;
              } else if (z.qty3 <= b.totalSum) {
                a.ave = 3.0;
              } else if (z.qty2 <= b.totalSum) {
                a.ave = 2.0;
              } else if (z.qty1 <= b.totalSum) {
                a.ave = 1.0;
              }
              a.ave = a.ave + dum_ave;
              dum_ave = a.ave;
            }
          });
        });
        console.log('dum_ave', dum_ave);
        console.log('a.ipcrDataId.length', a.ipcrDataId.length);
        let final_ave = (dum_ave / a.ipcrDataId.length).toFixed(2);
        a.ave = final_ave;
        console.log('finalave', final_ave);
      } else {
        a.data = {};
      }
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
    // smporSubtask = this.calculateRatingSMPOR(smporSubtask, smporData);

    this.sortFunctionMPORorSMPOR(smporList);
    // this.sortFunctionMPORorSMPOR(smporSubtask);

    console.log(smporList);

    this.reportServiceSMPOR.ReportSMPOR(
      this.strategic_functions,
      this.core_functions,
      this.support_functions
    );
  }

  selectMonth(month: number) {
    this.reportMPOR.monthNum = month;
    this.reportMPOR.monthNum = parseInt(this.reportMPOR.monthNum, 10);
  }

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

  ReportMPOR() {
    if (this.reportMPOR.monthNum == null) {
      this.reportMPOR.monthNum = 1;
    }
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

    this.reportService.post_print_mpor(this.reportMPOR).subscribe({
      next: (response: any) => {
        this.get_MPOR_data = response;
        this.PdfMPOR(this.get_MPOR_data);
      },
      error: () => {},
      complete: () => {},
    });
  }

  calculateRatingMPOR(data: any, data2: any) {
    data.map((a: any, index: number) => {
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
      a.ipcrDataId.map((z: any) => {
        data2.map((b: any) => {
          if (z.ipcrDataId == b.ipcrDataId) {
            b.data.map((c: any) => {
              if (c.qtyWk1 != null) {
                a.qtyWk1 = c.qtyWk1 + dumQtyWk1;
                dumQtyWk1 = a.qtyWk1;
                a.qltyWk1 = c.qtyWk1 * c.qltyR + dumQltyWk1;
                dumQltyWk1 = a.qltyWk1;
                a.qltyWk1Percentage = (a.qltyWk1 / a.qtyWk1).toFixed(2); // Convert to fixed decimal
                a.timelyWk1 = c.qtyWk1 * c.timelyR + dumTimelyWk1;
                dumTimelyWk1 = a.timelyWk1;
                a.timelyWk1Percentage = (a.timelyWk1 / a.qtyWk1).toFixed(2); // Convert to fixed decimal
              }
              if (c.qtyWk2 != null) {
                a.qtyWk2 = c.qtyWk2 + dumQtyWk2;
                dumQtyWk2 = a.qtyWk2;
                a.qltyWk2 = c.qtyWk2 * c.qltyR + dumQltyWk2;
                dumQltyWk2 = a.qltyWk2;
                a.qltyWk2Percentage = (a.qltyWk2 / a.qtyWk2).toFixed(2); // Convert to fixed decimal
                a.timelyWk2 = c.qtyWk2 * c.timelyR + dumTimelyWk2;
                dumTimelyWk2 = a.timelyWk2;
                a.timelyWk2Percentage = (a.timelyWk2 / a.qtyWk2).toFixed(2); // Convert to fixed decimal
              }
              if (c.qtyWk3 != null) {
                a.qtyWk3 = c.qtyWk3 + dumQtyWk3;
                dumQtyWk3 = a.qtyWk3;
                a.qltyWk3 = c.qtyWk3 * c.qltyR + dumQltyWk3;
                dumQltyWk3 = a.qltyWk3;
                a.qltyWk3Percentage = (a.qltyWk3 / a.qtyWk3).toFixed(2); // Convert to fixed decimal
                a.timelyWk3 = c.qtyWk3 * c.timelyR + dumTimelyWk3;
                dumTimelyWk3 = a.timelyWk3;
                a.timelyWk3Percentage = (a.timelyWk3 / a.qtyWk3).toFixed(2); // Convert to fixed decimal
              }
              if (c.qtyWk4 != null) {
                a.qtyWk4 = c.qtyWk4 + dumQtyWk4;
                dumQtyWk4 = a.qtyWk4;
                a.qltyWk4 = c.qtyWk4 * c.qltyR + dumQltyWk4;
                dumQltyWk4 = a.qltyWk4;
                a.qltyWk4Percentage = (a.qltyWk4 / a.qtyWk4).toFixed(2); // Convert to fixed decimal
                a.timelyWk4 = c.qtyWk4 * c.timelyR + dumTimelyWk4;
                dumTimelyWk4 = a.timelyWk4;
                a.timelyWk4Percentage = (a.timelyWk4 / a.qtyWk4).toFixed(2); // Convert to fixed decimal
              }
              a.total = dumQtyWk1 + dumQtyWk2 + dumQtyWk3 + dumQtyWk4;
              a.totalQlty = dumQltyWk1 + dumQltyWk2 + dumQltyWk3 + dumQltyWk4;
              a.totalTimely =
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
    console.log(mporList);
    var mporData = data.mporData;
    var mporSubtask = data.mporSubtask;

    mporList = this.calculateRatingMPOR(mporList, mporData);
    // mporSubtask = this.calculateRatingMPOR(mporSubtask, mporData);

    this.sortFunctionMPORorSMPOR(mporList);
    // this.sortFunctionMPORorSMPOR(mporSubtask);

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
    this.ipcrService.GetIPCRs(
      this.currentYear.toString(),
      localStorage.getItem('divisionId') ?? '',
      localStorage.getItem('userId') ?? ''
    );
  }

  setIpcrDetails(data: any) {
    this.ipcrService.isShowIpcrDataActual.set(1);
    localStorage.setItem('ipcrIdActual', data.ipcrId);
    localStorage.setItem('ipcrDetailsActual', data.details);

    this.ipcrService.GetIPCRDataActual(data.ipcrId);
  }

  ipcrYear() {
    for (let i = new Date().getFullYear() + 1; i >= 2020; i--) {
      this.years.push(i);
    }
  }

  onChangeYear(year: any) {
    this.ipcrService.GetIPCRs(year, this.divisionId ?? '', this.userId ?? '');
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
