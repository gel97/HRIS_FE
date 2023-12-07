import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { UserDivisionService } from 'src/app/spms/service/utility/user-division.service';

@Component({
  selector: 'app-table-office-division',
  template: `
    <h6 class="mt-2 text-muted">{{officeNameShort}} Division list</h6>
    <div class="row p-2">
        <div class="col-10">
            <ng-container *ngFor="let a of officeDivision.data">
                <button (click)="isAdd = false; data = a" class="btn badge rounded-pill bg-label-primary m-1" data-bs-toggle="modal" data-bs-target="#modalAddDivision">
                  {{a.divisionName}}
                </button>
            </ng-container>
        </div>
        <div class="col-2">
            <button class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#modalAddDivision">
                + Division
            </button>
        </div>
    </div>
    <!-- Small Modal -->
    <div class="modal fade" id="modalAddDivision" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content" >
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel2"> {{isAdd? 'Create': 'Update'}} Division </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col mb-3">
                <label for="nameSmall" class="form-label">Division Name</label>
                <input type="text" id="nameSmall" class="form-control" placeholder="Enter Name" [(ngModel)]="data.divisionName"/>
              </div>
            </div>       
          </div>
          <div class="modal-footer">
              <button *ngIf="isAdd; else deleteBtn" type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                Close
              </button>
            <ng-template #deleteBtn>
              <button (click)="DeleteDivision()" type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">
                Delete
              </button>
            </ng-template>
            <button type="button" class="btn btn-primary" (click)="isAdd? AddDivision(): UpdateDivision()"> {{isAdd? 'Submit': 'Save changes'}} </button>
          </div>
        </div>
      </div>
    </div>

  `,
})
export class TableOfficeDivisionComponent {
  officeNameShort:string | null = localStorage.getItem('officeName');
  userDivisionService = inject(UserDivisionService);

  officeDivision = this.userDivisionService.officeDivision();
  isAdd:boolean = true;
  data:any = {};

  AddDivision(){
    this.userDivisionService.PostOfficeDivision(this.data);
  }

  UpdateDivision(){
    this.userDivisionService.UpdateOfficeDivision(this.data)
  }

  DeleteDivision(){
    this.userDivisionService.DeleteOfficeDivision(this.data.divisionId)
  }
 
}
