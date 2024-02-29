import { Component, signal, inject, OnInit } from '@angular/core';
import { PdfService } from 'src/app/spms/service/pdf.service';
import { OpcrService } from 'src/app/spms/service/opcr.service';
import { ReportStandardService } from 'src/app/spms/service/report-standard.service';
import { ReportActualService } from 'src/app/spms/service/report-actual.service';
import { MonthRangeService } from 'src/app/spms/service/month-range.service';

@Component({
  selector: 'app-opcr-actual-mfoes',
  template: `
    <ng-template #showSkeleton>
      <app-opcr-actual-skeleton *ngIf="isLoading; else EmptyData" />
    </ng-template>

    <ng-template #EmptyData>
      <div class="justify-content-center text-center pt-5">
        <h1>No data found.</h1>
      </div>
    </ng-template>

    <!-- Bordered Table -->
    <div *ngIf="!isLoading && notEmpty; else showSkeleton" class="card">
      <div class="row">
        <div class="col-11">
          <h1 class="card-header p-3"></h1>
          <nav
            aria-label="breadcrumb"
            style="padding: 25px; margin-top: -50px;"
          >
            <ol class="breadcrumb breadcrumb-style1 m-0">
              <li class="breadcrumb-item">
                <a href="javascript:void(0);"
                  ><i class="bx bx-data"></i>&nbsp;OPCR</a
                >
              </li>
              <li class="breadcrumb-item">
                <a href="javascript:void(0);"
                  ><i class="bx bxs-right-top-arrow-circle"></i>&nbsp;Actual</a
                >
              </li>
              <li class="breadcrumb-item active">
                <a href="javascript:void(0);">{{
                  opcrService.storageOpcrDetails()
                }}</a>
              </li>
            </ol>
          </nav>
        </div>
        <div class="col-1">
          <div class="dropdown float-end" style="margin-right: 30px">
            <br />
            <button
              type="button"
              class="btn p-0 dropdown-toggle hide-arrow"
              data-bs-toggle="dropdown"
            >
              <i class="bx bx-dots-vertical-rounded"></i>
            </button>
            <div class="dropdown-menu pointer">
              <a class="dropdown-item" (click)="ReportOPCR()">
                <i class="bx bx-printer"></i> OPCR</a
              >
              <a class="dropdown-item" (click)="ReportStandard()">
                <i class="bx bx-printer"></i> Standard</a
              >
            </div>
          </div>
        </div>
      </div>
      <div class="card-body ">
        <div class="table-responsive text-wrap">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th [width]="10">#</th>
                <th>MFO</th>
                <th>STATUS</th>
                <th [width]="10">Actions</th>
              </tr>
            </thead>
            <tbody>
              <ng-container *ngFor="let item of opcrMfoesData | keyvalue">
                <tr
                  [ngClass]="
                    item.key == '1'
                      ? 'bg-label-success'
                      : item.key == '2'
                      ? 'bg-label-primary'
                      : item.key == '3'
                      ? 'bg-label-warning'
                      : 'bg-label-secondary'
                  "
                >
                  <td colspan="4">{{ categoryName(item.key) }}</td>
                </tr>
                <ng-container *ngFor="let a of item.value; let x = index">
                  <tr>
                    <td>
                      <strong>{{ x + 1 }}</strong>
                    </td>
                    <td colspan="3">
                      {{ a.mfo }}
                    </td>
                  </tr>
                  <ng-container *ngFor="let b of a.si; let y = index">
                    <tr>
                      <td></td>
                      <td>
                        <i class="bx bx-chevron-right cursor-pointer"></i>
                        <strong class="text-primary">{{ b.qty }} </strong>
                        {{ b.indicator }}
                      </td>
                      <td>
                        <div class="progress">
                          <div
                            class="progress-bar"
                            role="progressbar"
                            [style.width.%]="y + 4 * 7"
                            aria-valuenow="100"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {{ y + 4 * 7 }}%
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="dropdown">
                          <button
                            type="button"
                            class="btn p-0 dropdown-toggle hide-arrow"
                            data-bs-toggle="dropdown"
                          >
                            <i class="bx bx-dots-vertical-rounded"></i>
                          </button>
                          <div class="dropdown-menu">
                            <a class="dropdown-item" href="javascript:void(0);"
                              ><i class="bx bx-edit-alt me-1"></i> Edit</a
                            >
                            <a class="dropdown-item" href="javascript:void(0);"
                              ><i class="bx bx-trash me-1"></i> Delete</a
                            >
                          </div>
                        </div>
                      </td>
                    </tr>
                  </ng-container>
                </ng-container>
              </ng-container>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!--/ Bordered Table -->
  `,
})
export class OpcrActualMfoesComponent {
    reportService = inject(PdfService);
  opcrService = inject(OpcrService);
  reportStandardService = inject(ReportStandardService);
  reportActualService = inject(ReportActualService);
  monthRangeService = inject(MonthRangeService);

  count = signal(0);

  changeCount() {
    this.count.set(5);
  }

  opcrMfoes: any = this.opcrService.opcrDetails;
  isLoading: boolean = false;
  notEmpty: boolean = false;

  ngOnInit(): void {
    this.opcrService.GetOPCRDetails();

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.notEmpty = this.opcrMfoes().data.length > 0;
    }, 1000);
  }

  get opcrMfoesData(): { [key: number]: any[] } {
    const groupedData: { [key: number]: any[] } = this.opcrMfoes().data.reduce(
      (acc: any, data: any) => {
        const { categoryId } = data;
        if (acc[categoryId]) {
          acc[categoryId].push(data);
        } else {
          acc[categoryId] = [data];
        }
        return acc;
      },
      {}
    );
    return groupedData;
  }

  categoryName(cat: string) {
    let catName = '';
    switch (cat) {
      case '1':
        catName = 'STRATEGIC';
        break;
      case '2':
        catName = 'CORE';
        break;
      case '3':
        catName = 'SUPPORT';
        break;
      default:
        break;
    }

    return catName ? catName + ' FUNCTION' : 'NO FUNCTION';
  }

  ReportStandard() {
    this.reportStandardService.ReportStandard(this.opcrMfoes().data);
  }

  ReportOPCR() {
    this.monthRangeService.setSemesterActual();
    this.reportActualService.triggerSwitch(2);
    this.reportActualService.ReportActual(this.opcrMfoes().data);
  }
}
