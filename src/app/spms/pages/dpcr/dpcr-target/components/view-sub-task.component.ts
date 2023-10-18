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
  selector: 'app-view-subtask',
  template: `
    <div class="row" *ngIf="!dpcr.isLoading; else ShowLoading">
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
    <ng-template #ShowLoading>
        <p>Loading...</p>
    </ng-template>
  `,
})
export class ViewSubtaskComponent implements OnInit {
  dpcrService = inject(DpcrService);
  dpcr = this.dpcrService.dpcrDataSubtask();
  data = this.dpcrService.dpcrDataSubtask().data;

  @Input() subtask: any;
  @Input() isLoading: any;
  @Input() mfoId: string = "";

  ngOnInit(): void {
      this.GetData();
  } 

  async GetData(){
   await setTimeout(async () => {
      this.dpcrService.GetDpcrDataSubtask(this.mfoId);
    }, 3000);

    await console.log(this.dpcr)

  }

}
