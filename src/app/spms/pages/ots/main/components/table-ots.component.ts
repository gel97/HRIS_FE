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
              <th [width]="2">Status</th>
              <th [width]="2">Actions</th>
            </tr>
          </thead>
          <tbody class="table-border-bottom-0">
            <ng-container *ngFor="let data of ots.data; let i = index">
              <tr>
                <td><strong>{{i+1}}</strong></td>
                <td>{{data.dateDone | date:'MMM. dd, yyyy' }}</td>
                <td></td>
                <td>{{data.description}}</td>
                <td class="text-center">{{data.qtyR}}</td>
                <td class="text-center">{{data.qltyR}}</td>
                <td class="text-center">{{data.timelyR}}</td>
                <td class="text-center"></td>
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
                        <a
                          
                          class="dropdown-item cursor-pointer"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDpcrDataEditQuantity"
                          ><i class="bx bx-edit-alt me-1"></i> Edit</a
                        >             
                        <a
                          class="dropdown-item cursor-pointer"
                          
                          ><i class="bx bx-trash me-1"></i> Delete</a
                        >
                      </div>
                    </div>
                </td>
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

  @Input() ots: any;

  SetCurrentDate(){
    const currentDate = new Date();
    currentDate.setHours(16, 0, 0, 0);
    const formattedDate = currentDate.toISOString().slice(0, 16);

    this.otsService.otsMfoes.mutate((a) => (a.startDate = formattedDate));
    this.otsService.otsMfoes.mutate((a) => (a.endDate = formattedDate));
  }

}
