import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { OtsService } from 'src/app/spms/service/ots.service';
@Component({
  selector: 'app-table-ots',
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
      <div class="table-responsive text-nowrap">
        <table class="table table-sm table-hover table-striped">
          <thead>
            <tr>
              <th [width]="10">#</th>
              <th [width]="2">Date Accomplished</th>
              <th>MFO</th>
              <th>Description</th>
              <th [width]="2">Quantity</th>
              <th [width]="2">Quality</th>
              <th [width]="2">Timeliness</th>
              <th [width]="2">Actions</th>
            </tr>
          </thead>
          <tbody class="table-border-bottom-0">
            <ng-container>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
             
            </ng-container>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class TableOtsComponent {
  otsService = inject(OtsService);

  SetCurrentDate(){
    const currentDate = new Date();
    currentDate.setHours(16, 0, 0, 0);
    const formattedDate = currentDate.toISOString().slice(0, 16);

    this.otsService.otsMfoes.mutate((a) => (a.startDate = formattedDate));
    this.otsService.otsMfoes.mutate((a) => (a.endDate = formattedDate));
  }

}
