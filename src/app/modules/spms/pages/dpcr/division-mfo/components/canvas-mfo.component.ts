import { Component, EventEmitter, Output, Input, ViewChild, inject } from '@angular/core';
import { MfoService } from 'src/app/modules/spms/service/mfo.service';
@Component({
  selector: 'app-canvas-mfo',
  template: `
    <div class="col-lg-4 col-md-6">
      <div class="mt-3">
        <div
          class="offcanvas offcanvas-end"
          data-bs-scroll="true"
          data-bs-backdrop="false"
          tabindex="-1"
          id="offcanvasScroll"
          aria-labelledby="offcanvasScrollLabel"
        >
          <div class="offcanvas-header">
            <h5 id="offcanvasScrollLabel" class="offcanvas-title">
              {{ isAdd ? 'CREATE' : 'UPDATE' }} MFO
            </h5>
            <button
              #closebuttonMFO
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
              (ngModelChange)="OnChange()"
              id="nameWithTitle"
              class="form-control"
              placeholder="Enter MFO"
            />
            <br />
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
  `,
})
export class CanvasMFOComponent {
@ViewChild('closebuttonMFO')
  closebuttonMFO!: { nativeElement: { click: () => void } };

  @Input() isLoading: any;
  @Input() mfoData: any;
  @Input() isAdd: any;
  @Input() error: any;

  @Output() submit = new EventEmitter<any>();
  @Output() onChange = new EventEmitter<any>();

  Submit() {
    this.submit.emit('Add or Edit');
    this.handleStatus();
  }

  OnChange(){
    this.onChange.emit('');
  }

  handleStatus(){
    setTimeout(() => {
      if(!this.error){
          this.closebuttonMFO.nativeElement.click();
        }    
    }, 500);
  }
}
