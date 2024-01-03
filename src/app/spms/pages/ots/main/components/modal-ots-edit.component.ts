import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
import { OtsService } from 'src/app/spms/service/ots.service';
@Component({
  selector: 'app-modal-ots-edit',
  template: `
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalUpdateOts"
      tabindex="-1"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-xl"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalScrollableTitle">
              <strong>UPDATE OUTPUT TRACKING SHEET</strong>
            </h5>
            <button
              #closeModal
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body row">
            <div class="card mb-4">
              <div class="card-body">
                <div class="card bg-primary text-white mb-2">
                  <div class="card-body p-3">
                    <h5 class="card-title text-white">MFO</h5>
                    <ng-container *ngIf="otsData?.st === null; else stMfo">
                        <p class="card-text">{{otsData?.mfo}}</p>
                    </ng-container>
                    <ng-template #stMfo>
                        <p class="card-text">{{otsData?.st?.stMfo}}</p>
                    </ng-template>
                    <!--  -->
                  </div>
                </div>
                <div class="card bg-success text-white mb-2">
                  <div class="card-body p-3">
                    <h5 class="card-title text-white">SUCCESS INDICATOR</h5>
                    <p class="card-text">
                      <strong class="text-white"
                        ><u>{{  otsData.qty }}</u>
                      </strong>
                      <ng-container *ngIf="otsData?.st === null; else stIndicator">
                        <p class="card-text">{{otsData?.indicator}}</p>
                    </ng-container>
                    <ng-template #stIndicator>
                        <p class="card-text">{{otsData?.st?.stIndicator}}</p>
                    </ng-template>
                      <!-- {{ otsData.st === null? otsData.indicator : otsData.st.stIndicator }} -->
                    </p>
                  </div>
                </div>
                <div class="form-floating">
                  <textarea
                    class="form-control mb-4"
                    id="description"
                    placeholder="Description"
                    ria-describedby="description"
                    [(ngModel)]="otsData.description"
                  ></textarea>
                  <label for="description">Description</label>
                </div>
                <div class="form-floating">
                  <input
                    type="number"
                    class="form-control mb-2"
                    id="quantity"
                    [min]="0"
                    placeholder="Quantity"
                    aria-describedby="quantity"
                    [(ngModel)]="otsData.qtyR"
                  />
                  <label for="quantity">Quantity</label>
                </div>
                <label class="col-form-label">Quality</label>
                <div class="row mb-2">
                  <div class="col-2">
                    <button
                      (click)="setQuality(5)"
                      type="button"
                      class="btn rounded-pill btn-icon btn-outline-primary"
                      [ngClass]="otsData.qltyR == 5 ? 'active' : ''"
                      [disabled]="!otsData.qlty5"
                    >
                      5
                    </button>
                  </div>
                  <div class="col-2">
                    <button
                      (click)="setQuality(4)"
                      type="button"
                      class="btn rounded-pill btn-icon btn-outline-primary"
                      [ngClass]="otsData.qltyR == 4 ? 'active' : ''"
                      [disabled]="!otsData.qlty4"
                    >
                      4
                    </button>
                  </div>
                  <div class="col-2">
                    <button
                      (click)="setQuality(3)"
                      type="button"
                      class="btn rounded-pill btn-icon btn-outline-primary"
                      [ngClass]="otsData.qltyR == 3 ? 'active' : ''"
                      [disabled]="!otsData.qlty3"
                    >
                      3
                    </button>
                  </div>
                  <div class="col-2">
                    <button
                      (click)="setQuality(2)"
                      type="button"
                      class="btn rounded-pill btn-icon btn-outline-primary"
                      [ngClass]="otsData.qltyR == 2 ? 'active' : ''"
                      [disabled]="!otsData.qlty2"
                    >
                      2
                    </button>
                  </div>
                  <div class="col-2">
                    <button
                      (click)="setQuality(1)"
                      type="button"
                      class="btn rounded-pill btn-icon btn-outline-primary"
                      [ngClass]="otsData.qltyR == 1 ? 'active' : ''"
                      [disabled]="!otsData.qlty1"
                    >
                      1
                    </button>
                  </div>
                </div>
                <label class="col-form-label">Timeliness</label>
                <div class="row mb-4">
                  <div class="col-2">
                    <button
                      (click)="setTimeliness(5)"
                      type="button"
                      class="btn rounded-pill btn-icon btn-outline-primary"
                      [ngClass]="otsData.timelyR == 5 ? 'active' : ''"
                      [disabled]="!otsData.timely5"
                    >
                      5
                    </button>
                  </div>
                  <div class="col-2">
                    <button
                      (click)="setTimeliness(4)"
                      type="button"
                      class="btn rounded-pill btn-icon btn-outline-primary"
                      [ngClass]="otsData.timelyR == 4 ? 'active' : ''"
                      [disabled]="!otsData.timely4"
                    >
                      4
                    </button>
                  </div>
                  <div class="col-2">
                    <button
                      (click)="setTimeliness(3)"
                      type="button"
                      class="btn rounded-pill btn-icon btn-outline-primary"
                      [ngClass]="otsData.timelyR == 3 ? 'active' : ''"
                      [disabled]="!otsData.timely3"
                    >
                      3
                    </button>
                  </div>
                  <div class="col-2">
                    <button
                      (click)="setTimeliness(2)"
                      type="button"
                      class="btn rounded-pill btn-icon btn-outline-primary"
                      [ngClass]="otsData.timelyR == 2 ? 'active' : ''"
                      [disabled]="!otsData.timely2"
                    >
                      2
                    </button>
                  </div>
                  <div class="col-2">
                    <button
                      (click)="setTimeliness(1)"
                      type="button"
                      class="btn rounded-pill btn-icon btn-outline-primary"
                      [ngClass]="otsData.timelyR == 1 ? 'active' : ''"
                      [disabled]="!otsData.timely1"
                    >
                      1
                    </button>
                  </div>
                </div>

                <div class="mb-2">
                  <label
                    for="html5-datetime-local-input"
                    class="col-md-4 col-form-label"
                    >Date Accomplished</label
                  >
                  <input
                    class="form-control"
                    type="datetime-local"
                    [(ngModel)]="otsData.dateDone"
                    id="html5-datetime-local-input"
                    min="2023-11-1T08:00 | date:'yyyy-MM-ddTHH:mm'"
                  />
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
            <button type="button" (click)="Submit()" class="btn btn-primary" data-bs-dismiss="modal">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModalOtsEditComponent {
  @ViewChild('closeModal')
  closeModal!: { nativeElement: { click: () => void } };

  dpcrService = inject(DpcrService);
  otsService = inject(OtsService);

  ots: any = {};

  quantity: any = {};

  @Input() otsData: any;
  @Input() error: any;

  @Output() submit = new EventEmitter<any>();

  setQuality(rating: number) {
    this.otsData.qltyR = rating;
  }

  setTimeliness(rating: number) {
    this.otsData.timelyR = rating;
  }

  Submit() {
    this.otsService.EditOts(this.otsData);
    console.log(this.otsData);
  }

  handleStatus() {
    setTimeout(() => {
      if (!this.error) {
        this.closeModal.nativeElement.click();
      }
    }, 500);
  }
}
