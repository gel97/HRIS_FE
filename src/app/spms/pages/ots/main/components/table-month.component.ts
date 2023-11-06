import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  OnInit,
} from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
@Component({
  selector: 'app-table-month',
  template: `
    <div class="card">
      <div class="row">
        <div class="col-10">
          <h5 class="card-header"><strong>OUTPUT TRACKING SHEET</strong></h5>
        </div>
        <div class="col-2"></div>
      </div>
      <div class="table-responsive text-nowrap">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th [width]="10">Day</th>
              <th ></th>
              <th [width]="10" colspan="2">Actions</th>
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
                <td>a</td>
                <td [width]="10">b</td>
                <td [width]="10" rowspan="3"><button class="btn btn-primary">ots</button></td>
              </tr>
              <tr>
                <td>c</td>
                <td>d</td>
              </tr>
            </ng-container>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class TableMonthComponent implements OnInit {
  currentMonthData: { day: number; month: string; dayOfWeek: string }[] = [];

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
      this.currentMonthData.push({ day, month: currentMonth, dayOfWeek });
    }
  }

  getDayOfWeek(date: Date): string {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[date.getDay()];
  }
}
