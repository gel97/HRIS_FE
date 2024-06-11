import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { MfoService } from 'src/app/spms/service/mfo.service';
@Component({
  selector: 'app-canvas-si',
  template: `
    <div class="col-lg-4 col-md-6">
      <div class="mt-3">
        <div
          class="offcanvas offcanvas-end"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabindex="-1"
          id="offcanvasSI"
          aria-labelledby="offcanvasSI"
        >
          <div class="offcanvas-header">
            <h5 id="offcanvasSI" class="offcanvas-title">
              {{ isAdd ? 'CREATE' : 'UPDATE' }} SUCCESS INDICATOR
            </h5>
            <button
              #closebuttonSI
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body my-auto mx-0 flex-grow-0">
            <label for="nameWithTitle" class="form-label">MFO</label>
            <input
              [(ngModel)]="mfoData.mfo"
              type="text"
              id="nameWithTitle"
              class="form-control"
              disabled
            />
            <br />
            <label for="nameWithTitle" class="form-label"
              >Success Indicator</label
            >
            <textarea
              [(ngModel)]="siData.indicator"
              type="text"
              id="nameWithTitle"
              class="form-control"
              placeholder="Enter Success Indicator"
            ></textarea>
            <div class="form-check mt-3">
              <input
                class="form-check-input"
                type="checkbox"
                id="defaultCheck1"
                [checked]="siData.isFiveStndrd"
                (change)="handleIsFiveStandard($event)"
              />
              <label class="form-check-label" for="defaultCheck1">
                Set standard to five rating
              </label>
            </div>
            <br />

            <div *ngIf="mfoService.isCommon()" class=" my-1">
              <div class="form-check">
                <input
                  name="default-radio-1"
                  class="form-check-input"
                  type="radio"
                  value="0"
                  id="defaultRadio1"
                  [(ngModel)]="siData.qtyUnit"
                />
                <label class="form-check-label" for="defaultRadio1">
                  Numeric
                </label>
              </div>
              <div class="form-check">
                <input
                  name="default-radio-1"
                  class="form-check-input"
                  type="radio"
                  value="1"
                  id="defaultRadio2"
                  [(ngModel)]="siData.qtyUnit"
                />
                <label class="form-check-label" for="defaultRadio2">
                  Percentage
                </label>
              </div>
            </div>
            <label for="nameWithTitle" class="form-label">QUALITY</label>
            <input
              [(ngModel)]="standard.qlty5"
              type="text"
              id="qlty5"
              class="form-control mb-2"
              placeholder="Rating 5"
            />
            <input
              [(ngModel)]="standard.qlty4"
              type="text"
              id="qlty4"
              class="form-control mb-2"
              placeholder="Rating 4"
            />
            <input
              [(ngModel)]="standard.qlty3"
              type="text"
              id="qlty3"
              class="form-control mb-2"
              placeholder="Rating 3"
            />
            <input
              [(ngModel)]="standard.qlty2"
              type="text"
              id="qlty2"
              class="form-control mb-2"
              placeholder="Rating 2"
            />
            <input
              [(ngModel)]="standard.qlty1"
              type="text"
              id="qlty1"
              class="form-control mb-2"
              placeholder="Rating 1"
            />
            <label for="nameWithTitle" class="form-label">TIMELINESS</label>
            <input
              [(ngModel)]="standard.timely5"
              type="text"
              id="timely5"
              class="form-control mb-2"
              placeholder="Rating 5"
            />
            <input
              [(ngModel)]="standard.timely4"
              type="text"
              id="timely4"
              class="form-control mb-2"
              placeholder="Rating 4"
            />
            <input
              [(ngModel)]="standard.timely3"
              type="text"
              id="timely3"
              class="form-control mb-2"
              placeholder="Rating 3"
            />
            <input
              [(ngModel)]="standard.timely2"
              type="text"
              id="timely2"
              class="form-control mb-2"
              placeholder="Rating 2"
            />
            <input
              [(ngModel)]="standard.timely1"
              type="text"
              id="timely1"
              class="form-control mb-2"
              placeholder="Rating 1"
            />

            <div
              style="background-color: #f8f9fa; position: sticky;
        bottom: 0;"
            >
              <button
                [disabled]="isLoading"
                type="button"
                class="btn btn-primary mb-2 d-grid w-100 justify-content-center"
                (click)="Submit()"
              >
                <div
                  class="spinner-border spinner-border-sm text-white"
                  role="status"
                  *ngIf="isLoading; else showSubmitLabel"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <ng-template #showSubmitLabel>
                  {{ isAdd ? 'Submit' : 'Save changes' }}
                </ng-template>
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary d-grid w-100"
                data-bs-dismiss="offcanvas"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CanvasSIComponent {
  mfoService = inject(MfoService);
  @ViewChild('closebuttonSI')
  closebuttonSI!: { nativeElement: { click: () => void } };

  @Input() isLoading: any;
  @Input() mfoData: any;
  @Input() siData: any;
  @Input() standard: any;
  @Input() isAdd: any;
  @Input() error: any;

  @Output() submit = new EventEmitter<any>();

  Submit() {
    this.submit.emit('Add or Edit');
    this.handleStatus();
  }

  handleIsFiveStandard(e:any){
   // console.log(e.target.checked)
    if(e.target.checked){
      this.siData.isFiveStndrd = 1;
    }else{
      this.siData.isFiveStndrd = 0;
    }
  }

  EditIsFiveStandard(){
    this.mfoService.EditIsFiveStandard(this.siData);
  }

  // onChangeUnit(event: Event) {
  //   const target = event.target as HTMLInputElement;
  //   this.data.qtyUnit = target.value;
  // }

  handleStatus() {
    setTimeout(() => {
      if (!this.error) {
        this.closebuttonSI.nativeElement.click();
      }
    }, 500);
  }
}
