import { Component, OnInit, inject } from '@angular/core';
import { IpcrService } from 'src/app/spms/service/ipcr.service';
import { ReportMporService } from 'src/app/spms/service/report-mpor.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-view-ipcr',
  styleUrls: ['../ipcr-actual.component.css'],
  template: `
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
              Save changes
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
  get_MPOR_data: any = [];
  strategic_functions: any = [];
  core_functions: any = [];
  support_functions: any = [];

  ipcr: any = this.ipcrService.ipcr();

  ngOnInit(): void {
    this.ipcrYear();
    this.GetIpcr();
  }

  selectMonth(month: number) {
    this.reportMPOR.monthNum = month;
    this.reportMPOR.monthNum = parseInt(this.reportMPOR.monthNum, 10);
    console.log('month', month);
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
    console.log('months', this.months);
  }

  ReportMPOR() {
    console.log('reportmpor', this.reportMPOR);
    if (this.reportMPOR.monthNum == null) {
      this.reportMPOR.monthNum = 1;
    }
    this.reportService.post_print_mpor(this.reportMPOR).subscribe({
      next: (response: any) => {
        this.get_MPOR_data = response;
        console.log('mpor report', this.get_MPOR_data);
        this.Categorize(this.get_MPOR_data);
      },
      error: () => {},
      complete: () => {},
    });
  }

  Categorize(data: any) {
    this.get_MPOR_data = [];
    this.strategic_functions = [];
    this.core_functions = [];
    this.support_functions = [];
    let dumQtyWk1 = 0;
    let dumQtyWk2 = 0;
    let dumQtyWk3 = 0;
    let dumQtyWk4 = 0;
    data.mporList.map((a: any) => {
      data.mporData.map((b: any) => {
        if (a.ipcrDataId == b.ipcrDataId) {
          b.data.map((c: any) => {
            if (c.qtyWk1 != null) {
              a.qtyWk1 = c.qtyWk1 + dumQtyWk1;
              dumQtyWk1 = a.qtyWk1;
            }
            if (c.qtyWk2 != null) {
              a.qtyWk2 = c.qtyWk2 + dumQtyWk2;
              dumQtyWk2 = a.qtyWk2;
            }
            if (c.qtyWk3 != null) {
              a.qtyWk3 = c.qtyWk3 + dumQtyWk3;
              dumQtyWk3 = a.qtyWk3;
            }
            if (c.qtyWk4 != null) {
              a.qtyWk4 = c.qtyWk4 + dumQtyWk4;
              dumQtyWk4 = a.qtyWk4;
            }
            a.total = dumQtyWk1 + dumQtyWk2 + dumQtyWk3 + dumQtyWk4;
          });
        } else {
          dumQtyWk1 = 0;
          dumQtyWk2 = 0;
          dumQtyWk3 = 0;
          dumQtyWk4 = 0;
        }
      });
    });
    data.mporList.map((z: any) => {
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
    console.log('merged', data.mporList);
    console.log('sorted stra', this.strategic_functions);
    console.log('sorted core', this.core_functions);
    console.log('sorted sup', this.support_functions);
    // this.ExtractMonth(this.strategic_functions);
    // this.ExtractMonth(this.core_functions);
    // this.ExtractMonth(this.support_functions);
    this.reportService.ReportMPOR(
      this.strategic_functions,
      this.core_functions,
      this.support_functions
    );
  }

  // ExtractMonth(data: any = []) {
  //   data.map((a: any) => {
  //     console.log('data length', a.data.length);
  //     if (a.data.length) {
  //       console.log('here here here');
  //       a.data.map((b:any)=>{

  //       })
  //     }
  //   });
  // }

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
