import { Component, EventEmitter, Output, Input, inject, OnInit } from '@angular/core';
import { IpcrService } from 'src/app/spms/service/ipcr.service';
import { DpcrService } from 'src/app/spms/service/dpcr.service';

@Component({
  selector: 'app-table-ipcr',
  template: `
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
                  <span class="badge bg-label-primary me-1">{{
                    item.year
                  }}</span>
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
                    <div *ngSwitchDefault><span class="badge bg-label-danger me-1">Draft </span></div>
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
                        <div *ngSwitchDefault><a
                            class="dropdown-item cursor-pointer"
                            (click)="SetIpcrActive(item, 1)"
                            ><i class="bx bx-paperclip me-1 "></i> Open</a
                          ></div>
                      </div>
                      <!-- <a
                          class="dropdown-item"
                          (click)="dpcrService.GetIpcrTargetReport(item.ipcrId)"
                          data-bs-target="#modalDpcrTargetReport"
                          data-bs-toggle="modal"
                          ><i class="bx bx-printer me-1"></i> Print IPCR</a
                        > -->
                      <!-- <a
                        class="dropdown-item cursor-pointer"
                        (click)="SetDpcr(item); HandleDpcr()"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasDpcr"
                        ><i class="bx bx-edit-alt me-1"></i> Edit</a
                      > -->
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
  `,
})
export class TableIpcrComponent implements OnInit{
  ipcrService = inject(IpcrService);
  dpcrService = inject(DpcrService);

  get_ipcrDetails = this.ipcrService.ipcrDetails();


  prevYear = new Date().getFullYear() - 1;
  yearNow = new Date().getFullYear();
  listYear: any = [];

  divisionId: string | null = localStorage.getItem('divisionId');
  userId: string | null = localStorage.getItem('userId');

  ipcr = this.ipcrService.ipcr();

  ngOnInit(): void {
    for (let index = 3; index > 0; index--) {
      this.listYear.push(this.prevYear++);
    }
    this.ipcrService.GetIPCRs();
  }

  @Output() isAddDpcr = new EventEmitter<boolean>();
  @Output() setDpcr = new EventEmitter<any>();

  SetDpcr(item: any) {
    this.setDpcr.emit(item);
  }

  DeleteIpcr(ipcrId: string) {
    this.ipcrService.DeleteIpcr(ipcrId)
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
