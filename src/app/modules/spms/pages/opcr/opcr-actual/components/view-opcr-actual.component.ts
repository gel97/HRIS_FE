import { Component, OnInit, inject } from '@angular/core';
import { OpcrService } from 'src/app/modules/spms/service/opcr.service';
@Component({
  selector: 'app-view-opcr-actual',
  template: `
    <app-loading [loading]="opcr.isLoading" />
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
            *ngIf="opcrService.opcr().data.length > 0"
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
              <tbody *ngFor="let data of opcr.data">
                <tr>
                  <td class="pointer">
                    <a (click)="setOpcrDetails(data)" class="cursor-pointer"
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
                          (click)="ReportOPCRFinal(data.opcrId)"
                          class="dropdown-item"
                          data-bs-target="#modalOpcrFinalReport"
                          data-bs-toggle="modal"
                          ><i class="bx bx-printer me-1"></i> Print OPCR</a
                        >
                        <a
                          (click)="ReportOPCRTarget(data.opcrId)"
                          class="dropdown-item"
                          data-bs-target="#modalOpcrTargetReport"
                          data-bs-toggle="modal"
                          ><i class="bx bx-printer me-1"></i> Print OPCR Target</a
                        >
                        <a
                          (click)="ReportOPCRStandard(data.opcrId)"
                          class="dropdown-item"
                          data-bs-target="#modalOpcrStandardReport"
                          data-bs-toggle="modal"
                          ><i class="bx bx-printer me-1"></i> Print OPCR Standard</a
                        >
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div *ngIf="opcrService.opcr().data.length <= 0">
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

    <app-modal-opcr-final-report />
    <app-modal-opcr-target-report />
    <app-modal-opcr-standard-report />
  `,
})
export class ViewOpcrActualComponent implements OnInit {
  opcrService = inject(OpcrService);
  years: number[] = [];
  divisionId: string | null = localStorage.getItem('divisionId');
  userId: string | null = localStorage.getItem('userId');
  currentDate: Date = new Date();
  currentYear: number = this.currentDate.getFullYear();
  officeId: string | null = localStorage.getItem('officeId');

  opcr: any = this.opcrService.opcr();

  ngOnInit(): void {
    this.ipcrYear();
    this.GetOpcr();
  }

  GetOpcr() {
    this.opcrService.year.set(this.currentYear);
    this.opcrService.GetOPCRs(this.currentYear.toString(), this.officeId ?? '');
    // this.ipcrService.GetIPCRs(
    //     this.currentYear.toString(),
    //     localStorage.getItem('divisionId') ?? '',
    //     localStorage.getItem('userId') ?? ''
    // );
  }

  ReportOPCRFinal(opcrId: string) {
    this.opcrService.GetOpcrFinalReport(opcrId);
  }

  ReportOPCRTarget(opcrId: string) {
    this.opcrService.GetOpcrTargetReport(opcrId);
  }

  ReportOPCRStandard(opcrId: string) {
    this.opcrService.GetOpcrStandardReport(opcrId);
  }

  setOpcrDetails(data: any) {
    this.opcrService.isShowOpcrDataActual.set(1);
    localStorage.setItem('opcrIdActual', data.opcrId);
    localStorage.setItem('opcrDetailsActual', data.details);
    this.opcrService.GetOPCRDataActual(data.opcrId);
  }

  ipcrYear() {
    for (let i = new Date().getFullYear() + 1; i >= 2020; i--) {
      this.years.push(i);
    }
  }

  onChangeYear(year: any) {
    this.opcrService.year.set(year);
    this.opcrService.GetOPCRs(year.toString(), this.officeId ?? '');
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
