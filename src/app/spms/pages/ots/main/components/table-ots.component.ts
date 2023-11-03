import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
@Component({
  selector: 'app-table-ots',
  template: `
    <div class="card">
      <div class="row">
      <div class="col-10">
      <h5 class="card-header"><strong>LIST OF OUTPUT TRACKING SHEET</strong></h5>
      </div>
      <div class="col-2">
      </div>
      </div>
      <div class="table-responsive text-nowrap">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th>MFO</th>
              <th [width]="10">Actions</th>
            </tr>
          </thead>
          <tbody class="table-border-bottom-0">
            <tr>
                <td>
                    dsd
                </td>
                <td>
                    dsd
                </td>
            </tr>       
            <tr>
                <td>
                    dsd
                </td>
                <td>
                    dsd
                </td>
            </tr>         
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class TableOtsComponent {
  dpcrService = inject(DpcrService);

  @Input() dpcrData: any;

  @Output() isShowSubtask = new EventEmitter<boolean>();

}
