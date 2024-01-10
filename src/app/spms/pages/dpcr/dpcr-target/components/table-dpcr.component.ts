import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
@Component({
  selector: 'app-table-dpcr',
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
      <div>
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
              <tr *ngFor="let item of dpcr.data">
                <td class="cursor-pointer" (click)="SetIsShowDpcrData(item)">
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
                            (click)="SetDpcrActive(item, 1)"
                            ><i class="bx bxs-flag-alt me-1 "></i> Open</a
                          >
                        </div>
                        <div *ngSwitchCase="'1'">
                          <a
                            class="dropdown-item cursor-pointer"
                            (click)="SetDpcrActive(item, 2)"
                            ><i class="bx bxs-flag-alt me-1 "></i> Final</a
                          >
                        </div>
                        <div *ngSwitchDefault><a
                            class="dropdown-item cursor-pointer"
                            (click)="SetDpcrActive(item, 1)"
                            ><i class="bx bxs-flag-alt me-1 "></i> Open</a
                          ></div>
                      </div>
                      <a
                        class="dropdown-item cursor-pointer"
                        (click)="SetDpcr(item); HandleDpcr()"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasDpcr"
                        ><i class="bx bx-edit-alt me-1"></i> Edit</a
                      >
                      <a
                        class="dropdown-item cursor-pointer"
                        (click)="DeleteDpcr(item.dpcrId)"
                        ><i class="bx bx-trash me-1"></i> Delete</a
                      >
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class TableDpcrComponent {
  dpcrService = inject(DpcrService);

  @Input() dpcr: any;

  @Output() isAddDpcr = new EventEmitter<boolean>();
  @Output() setDpcr = new EventEmitter<any>();
  @Output() getDpcrData = new EventEmitter<string>();
  @Output() setDpcrActive = new EventEmitter<any>();
  @Output() deleteDpcr = new EventEmitter<string>();

  prevYear = new Date().getFullYear() - 1;
  yearNow = new Date().getFullYear();
  listYear: any = [];

  ngOnInit(): void {
    for (let index = 3; index > 0; index--) {
      this.listYear.push(this.prevYear++);
    }
  }

  onChangeYear(event: any) {
    console.log(event.target.value);
    this.dpcrService.year.set(event.target.value);
    this.dpcrService.GetDpcr();
  }

  SetDpcr(item: any) {
    this.setDpcr.emit(item);
  }

  SetDpcrActive(item: any, status: number) {
    item.active = status;
    this.setDpcrActive.emit(item);
  }

  SetIsShowDpcrData(item: any) {
    this.dpcrService.storageDpcrId.set(item.dpcrId);
    localStorage.setItem('dpcrId', item.dpcrId);

    this.dpcrService.storageDpcrDetails.set(item.details);
    localStorage.setItem('dpcrDetails', item.details);

    this.dpcrService.storageIsShowDpcrData.set(1);
    localStorage.setItem('isShowDpcrData', '1');

    this.getDpcrData.emit('Get DPCR Data');
  }

  DeleteDpcr(dpcrId: string) {
    this.deleteDpcr.emit(dpcrId);
  }

  HandleDpcr() {
    this.isAddDpcr.emit(false);
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
}
