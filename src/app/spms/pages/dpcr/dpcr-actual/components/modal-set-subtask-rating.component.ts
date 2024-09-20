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
  selector: 'app-modal-set-subtask-rating',
  template: `
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalSetSubtaskRating"
      tabindex="-1"
      aria-hidden="true"
    >
      <div
        class="modal-dialog  modal-sm modal-dialog-scrollable"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalScrollableTitle">
              SET SUBTASK RATING
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-floating">
              <input
                type="number"
                class="form-control mb-2"
                id="quantity"
                [min]="0"
                placeholder="Quantity"
                aria-describedby="quantity"
                [(ngModel)]="stRating.data.totalQty"
                (keyup)="isEmptyQtyR = false"
              />
              <label for="quantity">Quantity</label>
            </div>
            <p *ngIf="isEmptyQtyR" class="text-danger">Quantity is required.</p>
            <label class="col-form-label">Quality</label>
            <div class="row mb-2">
              <div class="col-2">
                <button
                  (click)="setQuality(5)"
                  type="button"
                  class="btn rounded-pill btn-icon btn-outline-primary"
                  [ngClass]="stRating.data.totalQlty == 5 ? 'active' : ''"
                >
                  5
                </button>
              </div>
              <div class="col-2">
                <button
                  (click)="setQuality(4)"
                  type="button"
                  class="btn rounded-pill btn-icon btn-outline-primary"
                  [ngClass]="stRating.data.totalQlty == 4 ? 'active' : ''"
                >
                  4
                </button>
              </div>
              <div class="col-2">
                <button
                  (click)="setQuality(3)"
                  type="button"
                  class="btn rounded-pill btn-icon btn-outline-primary"
                  [ngClass]="stRating.data.totalQlty == 3 ? 'active' : ''"
                >
                  3
                </button>
              </div>
              <div class="col-2">
                <button
                  (click)="setQuality(2)"
                  type="button"
                  class="btn rounded-pill btn-icon btn-outline-primary"
                  [ngClass]="stRating.data.totalQlty == 2 ? 'active' : ''"
                >
                  2
                </button>
              </div>
              <div class="col-2">
                <button
                  (click)="setQuality(1)"
                  type="button"
                  class="btn rounded-pill btn-icon btn-outline-primary"
                  [ngClass]="stRating.data.totalQlty == 1 ? 'active' : ''"
                >
                  1
                </button>
              </div>
            </div>
            <p *ngIf="isEmptyQltyR" class="text-danger">Quality is required.</p>
            <label class="col-form-label">Timeliness</label>
            <div class="row mb-4">
              <div class="col-2">
                <button
                  (click)="setTimeliness(5)"
                  type="button"
                  class="btn rounded-pill btn-icon btn-outline-primary"
                  [ngClass]="stRating.data.totalTimely == 5 ? 'active' : ''"
                >
                  5
                </button>
              </div>
              <div class="col-2">
                <button
                  (click)="setTimeliness(4)"
                  type="button"
                  class="btn rounded-pill btn-icon btn-outline-primary"
                  [ngClass]="stRating.data.totalTimely == 4 ? 'active' : ''"
                >
                  4
                </button>
              </div>
              <div class="col-2">
                <button
                  (click)="setTimeliness(3)"
                  type="button"
                  class="btn rounded-pill btn-icon btn-outline-primary"
                  [ngClass]="stRating.data.totalTimely == 3 ? 'active' : ''"
                >
                  3
                </button>
              </div>
              <div class="col-2">
                <button
                  (click)="setTimeliness(2)"
                  type="button"
                  class="btn rounded-pill btn-icon btn-outline-primary"
                  [ngClass]="stRating.data.totalTimely == 2 ? 'active' : ''"
                >
                  2
                </button>
              </div>
              <div class="col-2">
                <button
                  (click)="setTimeliness(1)"
                  type="button"
                  class="btn rounded-pill btn-icon btn-outline-primary"
                  [ngClass]="stRating.data.totalTimely == 1 ? 'active' : ''"
                >
                  1
                </button>
              </div>
            </div>
            <p *ngIf="isEmptyTimelyR" class="text-danger">
              Timeliness is required.
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              (click)="saveRating()"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModalSetSubtaskRatingComponent {
  dpcrService = inject(DpcrService);
  mfoOts: any = this.dpcrService.dpcrMfoOts();

  stRating: any = this.dpcrService.dpcrSubtaskRating();

  //data: any = this.dpcrService.dpcrSubtaskRating().data;

  isEmptyQtyR: boolean = false;
  isEmptyQltyR: boolean = false;
  isEmptyTimelyR: boolean = false;

  saveRating() {
    // this.stRating.data.recNo = this.stRating.stRating.data.recNo;
    // this.stRating.data.dpcrDataId = this.stRating.stRating.data.dpcrDataId;

    this.dpcrService.AddDpcrSubtaskRating(this.stRating.data);
  }

  setQuantity(rating: number) {
    this.stRating.data.qtyR = rating;
  }

  setQuality(rating: number) {
    this.stRating.data.totalQlty = rating;
  }

  setTimeliness(rating: number) {
    this.stRating.data.totalTimely = rating;
  }
}
