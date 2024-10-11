import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  OnInit,
} from '@angular/core';

import { DpcrService } from 'src/app/modules/spms/service/dpcr.service';

@Component({
  selector: 'app-view-subtask',
  template: `
    <div class="mt-2">
      <div class="card bg-primary text-white mb-3">
        <div class="card-body p-3">
          <h5 class="card-title text-white">MFO</h5>
          <p class="card-text">{{ dpcr.data.mfo }}</p>
        </div>
      </div>
    </div>
    <div *ngFor="let item of dpcr.data.si">
      <div class="mt-2">
        <div class="row">
          <div class="col-10">
            <div class="card bg-success text-white mb-3">
              <div class="card-body p-4 ">
                <p class="card-text">
                  <i class="bx bx-chevron-right"></i
                  ><b class="underline"
                    ><u>{{ item.qty }}</u></b
                  >
                  {{ item.indicator }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-2">
            <button
              type="button"
              (click)="SetDataSubTask(dpcr.data, item)"
              class="btn btn-outline-success mt-3"
              data-bs-toggle="modal"
              data-bs-target="#modalSubTask"
            >
              Subtask
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6" *ngFor="let data of item.st; let z = index">
          <div class="card m-2">
            <h3 class="card-header">
              <div class="row">
                <div class="col-11">
                  <b>{{ z + 1 }}. {{ data.stMfo }}</b>
                </div>
                <div class="col-1">
                  <i
                    data-bs-toggle="modal"
                    data-bs-target="#modalEditSubTask"
                    (click)="SetEditSubtaskData(data)"
                    class="bx bx-edit-alt text-primary btn rounded-pill btn-icon btn-outline-primary border-0 float-end"
                  ></i>
                </div>
              </div>
            </h3>
            <div class="table-responsive text-nowrap">
              <table class="table table-striped table-hover">
                <thead>
                  <tr class="table-success">
                    <th colSpan="4">
                      <i class="bx bx-chevron-right"></i
                      ><b
                        ><u>{{ data.qty }}</u></b
                      >
                      {{ data.stIndicator }}
                    </th>
                  </tr>
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
                    <td>{{ data.qty5 }}</td>
                    <td>
                      {{ data.qlty5 }}
                    </td>
                    <td>
                      {{ data.timely5 }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>
                      <strong>4</strong>
                    </td>
                    <td>{{ data.qty4 }}</td>
                    <td>
                      {{ data.qlty4 }}
                    </td>
                    <td>
                      {{ data.timely4 }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>
                      <strong>3</strong>
                    </td>
                    <td>{{ data.qty3 }}</td>
                    <td>
                      {{ data.qlty3 }}
                    </td>
                    <td>
                      {{ data.timely3 }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>
                      <strong>2</strong>
                    </td>
                    <td>{{ data.qty2 }}</td>
                    <td>
                      {{ data.qlty2 }}
                    </td>
                    <td>
                      {{ data.timely2 }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <i class="fab fa-bootstrap fa-lg text-primary me-3"></i>
                      <strong>1</strong>
                    </td>
                    <td>{{ data.qty1 }}</td>
                    <td>
                      {{ data.qlty1 }}
                    </td>
                    <td>
                      {{ data.timely1 }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-modal-edit-sub-task [data]="subtaskData" />
  `,
})
export class ViewSubtaskComponent implements OnInit {
  dpcrService = inject(DpcrService);
  dpcr = this.dpcrService.dpcrDataSubtask();
  data = this.dpcr.data;
  subtaskData: any = {};

  @Input() subtask: any;
  @Input() isLoading: any;
  @Input() mfoId: string = '';

  @Output() isShowSubtask = new EventEmitter<boolean>();
  @Output() setDataSubTask = new EventEmitter<any>();

  ngOnInit(): void {
    this.GetData();
  }

  SetEditSubtaskData(item: any) {
    this.subtaskData = item;
  }

  SetDataSubTask(mfoData: any, siData: any) {
    this.setDataSubTask.emit({ mfoData, siData });
  }

  GetData() {
    this.dpcrService.GetDpcrDataSubtask(this.mfoId);
  }

  IsShowSubtask() {
    this.isShowSubtask.emit(false);
  }
}
