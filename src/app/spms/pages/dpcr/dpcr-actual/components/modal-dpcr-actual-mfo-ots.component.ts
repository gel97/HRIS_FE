import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  ViewChild,
} from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
@Component({
  selector: 'app-modal-dpcr-actual-mfo-ots',
  template: `
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalDpcrActualMfoOts"
      tabindex="-1"
      aria-hidden="true"
    >
      <div
        class="modal-dialog  modal-lg modal-dialog-scrollable"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalScrollableTitle">MFO OTS</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Small table -->
            <div class="card" *ngIf="mfoOts.isLoading; else Show">
              <div class="table-responsive text-nowrap">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th [width]="160">
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </th>
                      <th>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </th>
                      <th>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </th>
                      <th>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">
                    <tr>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                      <td>
                        <ngx-skeleton-loader
                          count="1"
                          animation="pulse"
                          appearance="line"
                        ></ngx-skeleton-loader>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <ng-template #Show>
            <div class="card" *ngIf="mfoOts.data.length > 0; else NoData">
              <div class="table-responsive text-nowrap">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th [width]="10">#</th>
                      <th [width]="160">Date</th>
                      <th>Quantity</th>
                      <th>Quality</th>
                      <th>Timeliness</th>
                      <th>Employee</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">
                    <ng-container *ngFor="let a of mfoOts.data; let i = index">
                      <tr (click)="setSIIndex(i)" class="cursor-pointer">
                        <td>{{i+1}}</td>
                        <td>{{ a.dateDone | date : 'MMM. dd, yyyy' }}</td>
                        <td class="text-center">{{ a.qtyR }}</td>
                        <td class="text-center">{{ a.qltyR }}</td>
                        <td class="text-center">{{ a.timelyR }}</td>
                        <td>
                          <ng-container *ngIf="a.details.length == 1">
                            {{a.details[0].fullNameFirst}}
                          </ng-container>
                        </td>

                      </tr>
                      <ng-container *ngIf="currentSIIndex === i">
                        <tr *ngFor="let b of a.details; let y = index">
                          <td>{{ b.fullNameFirst }}</td>
                          <td colspan="3">{{ b.description }}</td>
                        </tr>
                      </ng-container>
                    </ng-container>
                  </tbody>
                </table>
              </div>
            </div>
            </ng-template>
            <!--/ Small table -->
            <ng-template #NoData>
                <h3 class="text-center"><b>No Data . . .</b></h3>
            </ng-template>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              (click)="currentSIIndex = null"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModalDpcrActualMfoOtsComponent {
  dpcrService = inject(DpcrService);
  mfoOts: any = this.dpcrService.dpcrMfoOts();

  currentSIIndex: any = null;

  setSIIndex(i: number) {
    if (this.currentSIIndex === i) {
      this.currentSIIndex = null;
    } else {
      this.currentSIIndex = i;
    }
  }
}
