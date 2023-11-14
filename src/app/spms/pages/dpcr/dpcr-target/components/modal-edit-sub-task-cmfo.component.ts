import {
    Component,
    EventEmitter,
    Output,
    Input,
    inject,
    ViewChild,
  } from '@angular/core';
  import { DpcrService } from 'src/app/spms/service/dpcr.service';
  import { FormBuilder, Validators } from '@angular/forms';
  
  @Component({
    selector: 'app-modal-edit-sub-task-cmfo',
    template: `
      <!-- Modal -->
      <div
        class="modal fade"
        id="modalEditSubTaskCmfo"
        tabindex="-1"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-scrollable modal-lg"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalScrollableTitle"><b>EDIT SUBTASK</b></h5>
              <button
                #closeModal
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
            <div class="row mt-4">
                <div class="col-6">
                  <div class="card bg-primary text-white mb-3">
                    <div class="card-body p-2 ">
                      <h5 class="card-title text-white">MFO</h5>
                      <p class="card-text">{{ data.mfo }}</p>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="card bg-success text-white mb-3">
                    <div class="card-body p-2">
                      <h5 class="card-title text-white">Success Indicator</h5>
                      <p class="card-text text-white">
                        <b>{{ data.qty }}</b> {{ data.indicator }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <form [formGroup]="formGroup">
                <div class="row">
                  <div class="col-6">
                    <mat-form-field class="m-0" style="width: 100%;">
                      <mat-label>Quantity</mat-label>
                      <input
                        matInput
                        type="number"
                        [(ngModel)]="data.qty"
                        (ngModelChange)="calculateRating()"
                        formControlName="qty"
                        required
                      />
                    </mat-form-field>
                  </div>
                  <div class="col-6">
                    <!-- <div class="form-check mt-3">
                      <input
                        name="default-radio-1"
                        class="form-check-input"
                        type="radio"
                        value="0"
                        id="defaultRadio1"
                        (change)="onChangeUnit($event)"
                        [checked]="data.qtyUnit === 0 ? true : false"
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
                        (change)="onChangeUnit($event)"
                        [checked]="data.qtyUnit === 1 ? true : false"
                      />
                      <label class="form-check-label" for="defaultRadio2">
                        Percentage
                      </label>
                    </div> -->
                  </div>
                </div>
              </form>
            </div>
            <div class="table-responsive text-nowrap">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th [width]="10">Rating</th>
                    <th [width]="150">Quantity</th>
                    <th>Quality</th>
                    <th>Timeliness</th>
                  </tr>
                </thead>
                <tbody class="table-border-bottom-0">
                  <tr>
                    <td>
                      <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>
                      <strong>5</strong>
                    </td>
                    <td>
                      <input
                        type="number"
                        [(ngModel)]="data.qty5"
                        class="form-control"
                      />
                    </td>
                    <td>
                      {{data.qlty5}}
                    </td>
                    <td>
                      {{data.timely5}}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>
                      <strong>4</strong>
                    </td>
                    <td>
                      <input
                        type="number"
                        [(ngModel)]="data.qty4"
                        class="form-control"
                      />
                    </td>
                    <td>
                      {{data.qlty4}}
                    </td>
                    <td>
                      {{data.timely4}}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>
                      <strong>3</strong>
                    </td>
                    <td>
                      <input
                        type="number"
                        [(ngModel)]="data.qty3"
                        class="form-control"
                      />
                    </td>
                    <td>
                      {{data.qlty3}}
                    </td>
                    <td>
                      {{data.timely3}}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>
                      <strong>2</strong>
                    </td>
                    <td>
                      <input
                        type="number"
                        [(ngModel)]="data.qty2"
                        class="form-control"
                      />
                    </td>
                    <td>
                      {{data.qlty2}}
                    </td>
                    <td>
                      {{data.timely2}}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>
                      <strong>1</strong>
                    </td>
                    <td>
                      <input
                        type="number"
                        [(ngModel)]="data.qty1"
                        class="form-control"
                      />
                    </td>
                    <td>
                      {{data.qlty1}}
                    </td>
                    <td>
                      {{data.timely1}}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" (click)="EditSubtask()" class="btn btn-primary">Save changes</button>
  
            </div>
          </div>
        </div>
      </div>
    `,
  })
  export class ModalEditSubTaskCmfoComponent {
    @ViewChild('closeModal')
    closeModal!: { nativeElement: { click: () => void } };
  
    dpcrService = inject(DpcrService);
    formBuilder = inject(FormBuilder);
  
    quantity: any = {};
  
    @Input() error: any;
    @Input() data: any;
  
    @Output() submitSubTask = new EventEmitter<any>();
  
    formGroup = this.formBuilder.group({
      mfo: ['', Validators.required],
      indicator: ['', Validators.required],
      qty: ['', Validators.required],
    });
  
    EditSubtask() {
      this.dpcrService.EditSubTask(this.data);
      this.handleStatus();
    }
  
    onChangeUnit(event: Event) {
      const target = event.target as HTMLInputElement;
      this.data.qtyUnit = target.value;
    }
  
    handleStatus() {
      setTimeout(() => {
        if (!this.error) {
          this.closeModal.nativeElement.click();
        }
      }, 500);
    }
  
    calculateRating() {
      this.data.qty5 = Math.floor(this.data.qty * 1.3);
      this.data.qty4 = Math.floor(this.data.qty * 1.15);
      this.data.qty3 = Math.floor(this.data.qty);
      this.data.qty2 = Math.floor(this.data.qty / 2 + 1);
      this.data.qty1 = Math.floor(this.data.qty / 2);
    }
  }
  