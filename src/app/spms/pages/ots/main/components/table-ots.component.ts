import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { OtsService } from 'src/app/spms/service/ots.service';
@Component({
  selector: 'app-table-ots',
  template: `
    <ng-container *ngIf="ots.data.length === 0 && !ots.data.isLoading; else HasData">
      <div style="display: flex;justify-content: center;align-items: center;">
        <button
            (click)="SetCurrentDate()"
            data-bs-toggle="modal"
            data-bs-target="#modalOts"
            class="btn btn-primary m-2"
            >
              CREATE OTS
        </button>
      </div>  
    </ng-container>
    <ng-template #HasData>
      <div class="card" >
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
                <th [width]="10">MFO</th>
                <th [width]="10">Success Indicator</th>
                <th [width]="10">Description</th>
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
                  <td>
                    <span *ngIf="data.st === null; else showStMfo">
                      {{data.mfo | truncate: 20}}
                    </span>
                    <ng-template #showStMfo>
                      {{data.st.stMfo  | truncate: 20}}
                    </ng-template>
                  </td>
                  <td>
                    <span *ngIf="data.st === null; else showSt">
                      {{data.indicator | truncate: 20}}
                    </span>
                    <ng-template #showSt>
                      {{data.st.stIndicator  | truncate: 20}}
                    </ng-template>
                  </td>
                  <td>{{data.description}}</td>
                  <td>{{data.qtyR}}</td>
                  <td>{{data.qltyR}}</td>
                  <td>{{data.timelyR}}</td>
                  <td> 
                    <div [ngSwitch]="data.status">
                      <strong *ngSwitchCase="2" class="badge rounded-pill bg-label-danger">Return</strong>
                      <strong *ngSwitchCase="1" class="badge rounded-pill bg-label-success">Approved</strong>
                      <strong *ngSwitchCase="0" class="badge rounded-pill bg-label-warning">Pending</strong>
                    </div>
                  </td>
                  <td>
                    <div *ngIf="data.approvedDate === null" class="dropdown position-static">
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
                          data-bs-target="#modalUpdateOts"
                          (click)="SetOtsData(data)"
                          ><i class="bx bx-edit-alt me-1"></i> Edit</a
                        >             
                        <a
                          class="dropdown-item cursor-pointer"
                          (click)="DeleteOts(data.otsId)"
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
    </ng-template>

  `,
})
export class TableOtsComponent {
  otsService = inject(OtsService);

  @Input() ots: any;
  @Output() setOtsData = new EventEmitter<any>();

  SetOtsData(data: any) {
    if(data.st !== null){
      data.qty = data.st.qty;
      
      data.qlty5 = data.st.qlty5;
      data.qlty4 = data.st.qlty4;
      data.qlty3 = data.st.qlty3;
      data.qlty2 = data.st.qlty2;
      data.qlty1 = data.st.qlty1;

      data.timely5 = data.st.timely5;
      data.timely4 = data.st.timely4;
      data.timely3 = data.st.timely3;
      data.timely2 = data.st.timely2;
      data.timely1 = data.st.timely1;

    }
    this.setOtsData.emit(data);
  }

  SetCurrentDate(){
    const currentDate = new Date();
    currentDate.setHours(16, 0, 0, 0);
    const formattedDate = currentDate.toISOString().slice(0, 16);

    this.otsService.otsMfoes.mutate((a) => (a.startDate = formattedDate));
    this.otsService.otsMfoes.mutate((a) => (a.endDate = formattedDate));

    this.otsService.clearOtsGetMfo(); // Clear Group OTS
  }

  DeleteOts(otsId:string){
    this.otsService.DeleteOts(otsId);
  }

}
