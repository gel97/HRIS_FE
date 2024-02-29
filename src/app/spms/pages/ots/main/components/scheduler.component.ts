import {
  Component,
  enableProdMode,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import {
  Service,
  PriorityData,
  TypeData,
} from 'src/app/spms/service/scheduler.service';
import notify from 'devextreme/ui/notify';
import { OtsService } from 'src/app/spms/service/ots.service';
if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}
@Component({
  selector: 'app-scheduler',
  template: `
    <button
      #modalOtsState
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#modalOts"
    >
      OTS
    </button>
    <dx-scheduler
      [dataSource]="otsService.dataSource"
      [views]="views"
      [currentView]="currentView"
      [currentDate]="currentDate"
      [firstDayOfWeek]="0"
      [startDayHour]="9"
      [endDayHour]="19"
      [showAllDayPanel]="false"
      [height]="600"
      dataCellTemplate="dataCellTemplate"
      dateCellTemplate="dateCellTemplate"
      timeCellTemplate="timeCellTemplate"
      (onCellClick)="viewOtsModal($event)"
      (onAppointmentClick)="openOtsModal($event)"
      (onAppointmentFormOpening)="disableForm($event)"
      (onAppointmentDblClick)="openOtsModal($event)"
      (onAppointmentAdding)="onAppointmentAdding($event)"
      (onAppointmentUpdating)="onAppointmentUpdating($event)"
      (onOptionChanged)="onOptionChanged($event)"
    >
      <div
        *dxTemplate="let dataCell of 'dataCellTemplate'"
        [ngClass]="{
          'disable-date': isDisableDate(dataCell.startDate),
          dinner:
            !isDisableDate(dataCell.startDate) && isDinner(dataCell.startDate),
          'dx-scheduler-date-table-cell-text': isMonthView()
        }"
      >
        {{ isMonthView() ? dataCell.startDate.getDate() : '' }}
      </div>

      <div
        *dxTemplate="let dateCell of 'dateCellTemplate'"
        [ngClass]="{ 'disable-date': isDisabledDateCell(dateCell.date) }"
      >
        {{ dateCell.text }}
      </div>

      <div
        *dxTemplate="let timeCell of 'timeCellTemplate'"
        [ngClass]="{ dinner: isDinner(timeCell.date) }"
      >
        {{ timeCell.text }}
        <div *ngIf="hasCoffeeCupIcon(timeCell.date)" class="cafe"></div>
      </div>
    </dx-scheduler>
    <!-- Modal -->
    <div class="modal fade" id="modalOts" tabindex="-1" aria-hidden="true">
      <div
        class="modal-dialog modal-dialog-scrollable  modal-xl"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalScrollableTitle">OTS</h5>
            <button
              #closeModal
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body row">
            <div class="col-8">
            <div class="demo-inline-spacing mt-3">
                <div class="list-group list-group-flush">
                  <ng-container *ngFor="let item of ots.data">
                    <a
                      href="javascript:void(0);"
                      class="list-group-item list-group-item-action"
                      >{{ item.text }}</a
                    >
                  </ng-container>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="demo-inline-spacing mt-3">
                  <div class="list-group">
                    <a
                      href="javascript:void(0);"
                      class="list-group-item list-group-item-action active"
                      >MFO</a
                    >
                    <a
                      href="javascript:void(0);"
                      class="list-group-item list-group-item-action"
                      >Soufflé pastry pie ice</a
                    >
                    <a
                      href="javascript:void(0);"
                      class="list-group-item list-group-item-action disabled"
                      >Tart tiramisu cake</a
                    >
                    <a
                      href="javascript:void(0);"
                      class="list-group-item list-group-item-action"
                      >Bonbon toffee muffin</a
                    >
                    <a
                      href="javascript:void(0);"
                      class="list-group-item list-group-item-action"
                      >Dragée tootsie roll</a
                    >
                  </div>
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
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./scheduler.component.css'],
  providers: [Service],
})
export class SchedulerComponent implements OnInit {
  @ViewChild('modalOtsState')
  modalOtsState!: { nativeElement: { click: () => void } };

  otsService = inject(OtsService);
  ots = this.otsService.ots();

  currentDate: Date = new Date();
  views = ['day', 'week', 'workWeek', 'month'];

  currentView = this.views[3];

  constructor(public dataService: Service) {}

  ngOnInit(): void {
  }

  onOptionChanged(e: any) {
    if (e.name === 'currentView') {
      this.currentView = e.value;
    }
  }

  viewOtsModal(e: any) {
    const startDate = e.cellData.startDate;
    if (!this.isValidAppointmentDate(startDate)) {
      this.notifyDisableDate();
    } else {
      this.modalOtsState.nativeElement.click();
    }
  }

  openOtsModal(e: any) {
    this.modalOtsState.nativeElement.click();
  }
  disableForm(e: any) {
    e.cancel = true;
  }
  onAppointmentFormOpening(e: any) {
    //  this.modalOtsState.nativeElement.click();
    // const startDate = e.appointmentData.startDate;
    // if (!this.isValidAppointmentDate(startDate)) {
    //   e.cancel = true;
    //   this.notifyDisableDate();
    // }
    // this.applyDisableDatesToDateEditors(e.form);
  }

  onAppointmentAdding(e: any) {
    const isValidAppointment = this.isValidAppointment(
      e.component,
      e.appointmentData
    );
    // if (!isValidAppointment) {
    //   e.cancel = true;
    //   this.notifyDisableDate();
    // }
  }

  onAppointmentUpdating(e: any) {
    const isValidAppointment = this.isValidAppointment(e.component, e.newData);
    // if (!isValidAppointment) {
    //   e.cancel = true;
    //   this.notifyDisableDate();
    // }
  }

  notifyDisableDate() {
    notify('Cannot create OTS.', 'warning', 1000);
  }

  isHoliday(date: Date) {
    const localeDate = date.toLocaleDateString();
    const holidays = this.dataService.getHolidays();
    return (
      holidays.filter((holiday) => holiday.toLocaleDateString() === localeDate)
        .length > 0
    );
  }

  isWeekend(date: Date) {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  isDisableDate(date: Date) {
    return this.isHoliday(date) || this.isWeekend(date);
  }

  isDisabledDateCell(date: Date) {
    return this.isMonthView() ? this.isWeekend(date) : this.isDisableDate(date);
  }

  isDinner(date: Date) {
    const hours = date.getHours();
    const dinnerTime = this.dataService.getDinnerTime();
    return hours >= dinnerTime.from && hours < dinnerTime.to;
  }

  hasCoffeeCupIcon(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dinnerTime = this.dataService.getDinnerTime();

    return hours === dinnerTime.from && minutes === 0;
  }

  isMonthView() {
    return this.currentView === 'month';
  }

  isValidAppointment(component: any, appointmentData: any) {
    const startDate = new Date(appointmentData.startDate);
    const endDate = new Date(appointmentData.endDate);
    const cellDuration = component.option('cellDuration');
    return this.isValidAppointmentInterval(startDate, endDate, cellDuration);
  }

  isValidAppointmentInterval(
    startDate: Date,
    endDate: Date,
    cellDuration: number
  ) {
    const edgeEndDate = new Date(endDate.getTime() - 1);

    if (!this.isValidAppointmentDate(edgeEndDate)) {
      return false;
    }

    const durationInMs = cellDuration * 60 * 1000;
    const date = startDate;
    while (date <= endDate) {
      if (!this.isValidAppointmentDate(date)) {
        return false;
      }
      const newDateTime = date.getTime() + durationInMs - 1;
      date.setTime(newDateTime);
    }

    return true;
  }

  isValidAppointmentDate(date: Date) {
    return (
      !this.isHoliday(date) && !this.isDinner(date) && !this.isWeekend(date)
    );
  }

  applyDisableDatesToDateEditors(form: any) {
    const holidays = this.dataService.getHolidays();
    const startDateEditor = form.getEditor('startDate');
    startDateEditor.option('disabledDates', holidays);

    const endDateEditor = form.getEditor('endDate');
    endDateEditor.option('disabledDates', holidays);
  }
}