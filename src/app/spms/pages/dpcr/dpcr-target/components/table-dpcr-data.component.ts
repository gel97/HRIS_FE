import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
@Component({
  selector: 'app-table-dpcr-data',
  template: `
    <div class="card">
      <h5 class="card-header">DIVISION MFOES</h5>
      <div class="table-responsive text-nowrap">
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th>MFO</th>
              <th [width]="10">Actions</th>
            </tr>
          </thead>
          <tbody class="table-border-bottom-0">
            <ng-container *ngFor="let a of dpcrData.data; let i = index">
              <tr>
                <td colspan="2">
                  <div class="row">
                    <div class="col-9">
                      <strong class="text-primary"
                        >{{ i + 1 }}. {{ a.mfo }}</strong
                      >
                    </div>
                    <div class="col-3">
                      <small
                        class="badge rounded-pill float-end"
                        [ngClass]="
                          a.categoryId == '1'
                            ? 'bg-label-success'
                            : a.categoryId == '2'
                            ? 'bg-label-primary'
                            : a.categoryId == '3'
                            ? 'bg-label-warning'
                            : 'bg-label-secondary'
                        "
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {{ displayCatergory(a.categoryId) }}
                      </small>
                    </div>
                  </div>
                </td>
              </tr>
              <ng-container *ngFor="let b of a.si; let y = index">
                <tr>
                  <td>
                    <i class="bx bx-chevron-right"></i
                    ><strong>{{ b.qty }}</strong
                    >&nbsp;{{ b.indicator }}
                  </td>
                  <td>
                    <div class="dropdown position-static">
                      <button
                        type="button"
                        class="btn p-0 dropdown-toggle hide-arrow"
                        data-bs-toggle="dropdown"
                      >
                        <i class="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div class="dropdown-menu">
                        <a class="dropdown-item"
                          ><i class="bx bx-list-plus"></i> Sub-Task</a
                        >
                        <a class="dropdown-item"
                          ><i class="bx bx-edit-alt me-1"></i> Target</a
                        >
                        <a class="dropdown-item"
                          (click)="DeleteDpcrDataIndicator(b.dpcrDataId)"
                          ><i class="bx bx-trash me-1"></i> Delete</a
                        >
                      </div>
                    </div>
                  </td>
                </tr>
              </ng-container>
            </ng-container>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class TableDpcrDataComponent {
  dpcrService = inject(DpcrService);

  @Input() dpcrData: any;

  @Output() isAddDpcr = new EventEmitter<boolean>();
  @Output() setDpcr = new EventEmitter<any>();
  @Output() deleteDpcrDataIndicator = new EventEmitter<string>();

  DeleteDpcrDataIndicator(dpcrDataId:string){
    console.log(dpcrDataId)
    this.deleteDpcrDataIndicator.emit(dpcrDataId);
  }

  SetDpcr(item: any) {
    console.log(item);
    this.setDpcr.emit(item);
  }

  displayCatergory(cat: number) {
    let catName = '';
    switch (cat) {
      case 1:
        catName = 'STRATEGIC';
        break;
      case 2:
        catName = 'CORE';
        break;
      case 3:
        catName = 'SUPPORT';
        break;
      default:
        break;
    }

    return catName ? catName + '' : 'NO FUNCTION';
  }
}
