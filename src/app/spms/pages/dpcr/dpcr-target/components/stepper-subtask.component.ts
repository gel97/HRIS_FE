import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { DpcrService } from 'src/app/spms/service/dpcr.service';

@Component({
  selector: 'app-stepper-subtask',
  template: `
    <mat-stepper [linear]="isLinear" #stepper>
      <mat-step [stepControl]="firstFormGroup">
        <form [formGroup]="firstFormGroup">
          <ng-template matStepLabel>Sub-task name</ng-template>
          <mat-form-field style="width: 100%;">
            <mat-label>MFO</mat-label>
            <input matInput [(ngModel)]="data.mfo" class="" formControlName="firstCtrl" required />
          </mat-form-field>
          <div>
            <button mat-button matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step [stepControl]="secondFormGroup" label="Success Indicator">
        <form [formGroup]="secondFormGroup">
          <mat-form-field style="width: 100%;">
            <mat-label>Success Indicator</mat-label>
            <input matInput [(ngModel)]="data.Indicator" formControlName="secondCtrl" required />
          </mat-form-field>
          <div>
            <button mat-button matStepperPrevious>Back</button>
            <button mat-button matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step [stepControl]="thirdFormGroup" label="Standard">
        <form [formGroup]="thirdFormGroup">
          <div class="row">
            <div class="col-4">
              <mat-form-field style="width: 100%;">
                <mat-label>Quantity</mat-label>
                <input
                  type="number"
                  matInput
                  formControlName="thirdCtrl"
                  [(ngModel)]="data.qty"
                  (ngModelChange)="calculateRating()"
                  required
                />
              </mat-form-field>
            </div>
            <div class="col-4">
              <div class="form-check mt-3">
                <input
                  name="default-radio-1"
                  class="form-check-input"
                  type="radio"
                  value="0"
                  id="defaultRadio1"
                  [checked]="data.qtyUnit === 0 ? true : false"
                  (change)="onChangeUnit($event)"
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
                  [checked]="data.qtyUnit === 1 ? true : false"
                  (change)="onChangeUnit($event)"
                />
                <label class="form-check-label" for="defaultRadio2">
                  Percentage
                </label>
              </div>
            </div>
          </div>
          <div class="table-responsive text-nowrap">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th [width]="10">Rating</th>
                  <th>Quantity</th>
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
                      [ngModelOptions]="{ standalone: true }"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.qlty5"
                      class="form-control"
                      [ngModelOptions]="{ standalone: true }"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.timely5"
                      class="form-control"
                      [ngModelOptions]="{ standalone: true }"
                    />
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
                      [ngModelOptions]="{ standalone: true }"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.qlty4"
                      class="form-control"
                      [ngModelOptions]="{ standalone: true }"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.timely4"
                      class="form-control"
                      [ngModelOptions]="{ standalone: true }"
                    />
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
                      [ngModelOptions]="{ standalone: true }"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.qlty3"
                      class="form-control"
                      [ngModelOptions]="{ standalone: true }"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.timely3"
                      class="form-control"
                      [ngModelOptions]="{ standalone: true }"
                    />
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
                      [ngModelOptions]="{ standalone: true }"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.qlty2"
                      class="form-control"
                      [ngModelOptions]="{ standalone: true }"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.timely2"
                      class="form-control"
                      [ngModelOptions]="{ standalone: true }"
                    />
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
                      [ngModelOptions]="{ standalone: true }"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.qlty1"
                      class="form-control"
                      [ngModelOptions]="{ standalone: true }"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      [(ngModel)]="data.timely1"
                      class="form-control"
                      [ngModelOptions]="{ standalone: true }"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <button mat-button matStepperPrevious>Back</button>
            <button mat-button matStepperNext>Next</button>
          </div>
        </form>
      </mat-step>
      <mat-step>
        <ng-template matStepLabel>Done</ng-template>
        <button type="button" (click)="Submit()" class="btn btn-primary">
          Submit
        </button>
        <div>
          <button mat-button matStepperPrevious>Back</button>
          <button mat-button (click)="stepper.reset()">Reset</button>
        </div>
      </mat-step>
    </mat-stepper>
  `,
})
export class StepperSubtaskComponent implements OnInit {
  dpcrService = inject(DpcrService);

  data: any = {};

  @Input() search: any;

  @Output() submitSubTask = new EventEmitter<any>();

  Submit() {
    console.log(this.data)
    this.submitSubTask.emit(this.data);
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.initQtyUnit();
  }

  onChangeUnit(event: Event) {
    const target = event.target as HTMLInputElement;
    this.data.qtyUnit = target.value;
  }

  initQtyUnit() {
    if (this.data.qtyUnit >= 0) {
    } else {
      this.data.qtyUnit = 0;
    }
  }

  calculateRating() {
    this.data.qty5 = Math.floor(this.data.qty * 1.3);
    this.data.qty4 = Math.floor(this.data.qty * 1.15);
    this.data.qty3 = Math.floor(this.data.qty);
    this.data.qty2 = Math.floor(this.data.qty / 2 + 1);
    this.data.qty1 = Math.floor(this.data.qty / 2);
  }
}
