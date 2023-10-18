import {
  Component,
  EventEmitter,
  Output,
  Input,
  inject,
  OnInit,
} from '@angular/core';

import { DpcrService } from 'src/app/spms/service/dpcr.service';

@Component({
  selector: 'app-view-subtask',
  template: `
    <ng-container *ngIf="!dpcr.isLoading; else ShowLoading">

    <div class="mt-2">
      <div class="card bg-primary text-white mb-3">
        <div class="card-body p-2 ">
          <h5 class="card-title text-white">MFO</h5>
          <p class="card-text">{{ dpcr.data.mfo }}</p>
        </div>
      </div>
    </div>
    <div *ngFor="let item of dpcr.data.si">
      <div class="mt-2">
        <div class="row">
          <div class="col-11">
            <div class="card bg-success text-white mb-3">
              <div class="card-body p-4 ">
                <p class="card-text">{{ item.indicator }}</p>
              </div>
            </div>
          </div>
          <div class="col-1">
            <button type="button" class="btn btn-outline-success mt-3">
              Subtask
            </button>
          </div>
        </div>
      </div>
    </div>
    </ng-container>
    <ng-template #ShowLoading>
      <p>Loading...</p>
    </ng-template>
  `,
})
export class ViewSubtaskComponent implements OnInit {
  dpcrService = inject(DpcrService);
  dpcr = this.dpcrService.dpcrDataSubtask();
  data = this.dpcr.data;

  @Input() subtask: any;
  @Input() isLoading: any;
  @Input() mfoId: string = '';

  @Output() isShowSubtask = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.GetData();
  }

  GetData() {
    this.dpcrService.GetDpcrDataSubtask(this.mfoId);
  }

  IsShowSubtask() {
    this.isShowSubtask.emit(false);
  }
}
