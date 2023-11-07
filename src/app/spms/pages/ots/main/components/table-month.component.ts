import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  OnInit,
} from '@angular/core';
import { OtsService } from 'src/app/spms/service/ots.service';
@Component({
  selector: 'app-table-month',
  template: `
    <div class="card">
      <div class="row">
        <div class="col-10">
          <h5 class="card-header">
            <strong>LIST OF OUTPUT TRACKING SHEET</strong>
          </h5>
        </div>
        <div class="col-2">
          <button
            (click)="SetCurrentDate()"
            data-bs-toggle="modal"
            data-bs-target="#modalOts"
            class="btn btn-primary m-2 float-end"
          >
            CREATE OTS
          </button>
        </div>
      </div>
      <span
        class="badge bg-label-info"
      >
      {{ currentMonthData[0].month }}
      </span>
      <div class="table-responsive text-nowrap">
        <table class="table table-bordered">
          <thead>
            <tr class="sticky-top">
              <th [width]="10">Day</th>
              <th>MFO</th>
              <th [width]="2">Quantity</th>
              <th [width]="2">Quality</th>
              <th [width]="2">Timeliness</th>
              <th [width]="2">Start Date</th>
              <th [width]="2">End Date</th>
              <th [width]="2" colspan="2">Actions</th>
            </tr>
          </thead>
          <tbody class="table-border-bottom-0">
            <ng-container *ngFor="let item of currentMonthData">
              <tr>
                <td rowspan="3">
                  {{ item.day }}
                  <span
                    [ngClass]="
                      item.dayOfWeek === 'Sun' || item.dayOfWeek === 'Sat'
                        ? 'text-danger'
                        : 'text-primary'
                    "
                    >{{ item.dayOfWeek }}</span
                  >
                </td>
              </tr>
              <tr>
                <td>Sample task #2</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td [width]="10"><i class="bx bxs-edit cursor-pointer"></i>&nbsp;&nbsp;<i class='bx bx-trash text-danger cursor-pointer'></i></td>
                <td [width]="10" rowspan="3">
                  <button
                    (click)="SetDate(item)"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#modalOts"
                  >
                  <i class='bx bx-plus'></i>
                  </button>
                </td>
              </tr>
              <tr>
                <td>Sample task #1</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><i class="bx bxs-edit cursor-pointer"></i>&nbsp;&nbsp;<i class='bx bx-trash text-danger cursor-pointer'></i></td>
              </tr>
            </ng-container>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class TableMonthComponent implements OnInit {
  currentMonthData: {
    day: number;
    month: string;
    dayOfWeek: string;
    date: any;
  }[] = [];

  otsService = inject(OtsService);

  @Output() date = new EventEmitter<any>();

  ngOnInit() {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' });
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const dayOfWeek = this.getDayOfWeek(date);
      date.setHours(16, 0, 0, 0);
      const formattedDate = date.toISOString().slice(0, 16);

      console.log('date ', formattedDate);
      this.currentMonthData.push({
        day,
        month: currentMonth,
        dayOfWeek,
        date: formattedDate,
      });
    }
  }

  getDayOfWeek(date: Date): string {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[date.getDay()];
  }

  SetCurrentDate(){
    const currentDate = new Date();
    currentDate.setHours(16, 0, 0, 0);
    const formattedDate = currentDate.toISOString().slice(0, 16);

    this.otsService.otsMfoes.mutate((a) => (a.startDate = formattedDate));
    this.otsService.otsMfoes.mutate((a) => (a.endDate = formattedDate));
  }
  SetDate(item: any) {
    this.otsService.otsMfoes.mutate((a) => (a.startDate = item.date));
    this.otsService.otsMfoes.mutate((a) => (a.endDate = item.date));
    console.log(this.otsService.otsMfoes());
  }
}
