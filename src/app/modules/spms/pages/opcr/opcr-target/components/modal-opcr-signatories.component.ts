import { Component, OnInit, inject } from '@angular/core';
import { OpcrService } from 'src/app/modules/spms/service/opcr.service';
import { SignatoriesService } from 'src/app/modules/spms/service/signatories.service';
import { UtlityService } from 'src/app/modules/spms/service/utility.service';
@Component({
  selector: 'app-modal-opcr-signatories',
  template: `
    <!-- Modal -->
    <div
      class="modal fade"
      id="modalOpcrSignatories"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel2">Set signatories</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="col-lg-12">
              <mat-form-field style="width: 100%;" appearance="outline">
                <mat-label>Assessed by:</mat-label>
                <mat-select [(ngModel)]="opcrService.opcrSignatories().assessedById">
                  <mat-option>
                    <ngx-mat-select-search
                      [(ngModel)]="searchAssessedBy"
                      (ngModelChange)="handleOnChangeAssessedBy()"
                      placeholderLabel=""
                      noEntriesFoundLabel="'no match found'"
                    ></ngx-mat-select-search>
                  </mat-option>
                  <mat-option
                    *ngFor="let i of search_employee_list_assessed_by"
                    value="{{ i.eic }}"
                  >
                    {{ i.lastName }}, {{ i.firstName }}</mat-option
                  >
                </mat-select>
              </mat-form-field>
              <label *ngIf="validateField.assessedById" class="text-danger"
                >Assessed by is required</label
              >
            </div>
            <div class="col-lg-12">
              <mat-form-field style="width: 100%;" appearance="outline">
                <mat-label>Governor:</mat-label>
                <mat-select [(ngModel)]="opcrService.opcrSignatories().governorId">
                  <mat-option>
                    <ngx-mat-select-search
                      [(ngModel)]="searchGovernor"
                      (ngModelChange)="handleOnChangeGovernor()"
                      placeholderLabel=""
                      noEntriesFoundLabel="'no match found'"
                    ></ngx-mat-select-search>
                  </mat-option>
                  <mat-option
                    *ngFor="let i of search_employee_list_governor"
                    value="{{ i.eic }}"
                  >
                    {{ i.lastName }}, {{ i.firstName }}</mat-option
                  >
                </mat-select>
              </mat-form-field>
              <label *ngIf="validateField.governorId" class="text-danger"
                >Governor is required</label
              >
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              (click)="SaveSignatory()"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModalOpcrSignatoriesComponent implements OnInit {
  opcrService = inject(OpcrService);
  opcrTargetReport: any = this.opcrService.opcrReport();
  utilService = inject(UtlityService);
  signatoryService = inject(SignatoriesService);

  employee_list: any = [];
  signatory: any = this.opcrService.opcrSignatories();
  validateField: any = {};

  searchAssessedBy: any = '';
  searchGovernor: any = '';

  search_employee_list_assessed_by: any = [];
  search_employee_list_governor: any = [];

  ngOnInit(): void {
    this.GetEmployeeList();
    console.log("opcrId: ", this.opcrService.opcrSignatories())
  }

  async SaveSignatory() {
    try {
      let validated = await this.ValidateEmptyFields();

      if (validated) {
        let _data = this.opcrService.opcrSignatories();
        _data.governor = this.opcrService.opcrSignatories().governorId;
        _data.typeId = this.opcrService.selectedOpcrId();
        this.signatoryService.put_signatories_opcr(this.signatory);
      }
    } catch {}
  }



  GetEmployeeList() {
    this.utilService.get_employee_list().subscribe(
      (response: any) => {
        this.employee_list = response
          .filter(
            (employee: any) =>
              employee.salaryGrade >= 26
          )
          .sort((a: any, b: any) => b.salaryGrade - a.salaryGrade);

        this.search_employee_list_assessed_by = this.employee_list;
        this.search_employee_list_governor = this.employee_list;

        console.log(this.employee_list);
      },
      (err) => {
        alert('error');
      }
    );
  }

  async ValidateEmptyFields(): Promise<boolean> {
    this.signatory = this.opcrService.opcrSignatories();

    console.log(this.signatory);
    return new Promise<boolean>((resolve) => {
      if (
        this.signatory!.assessedById === null ||
        this.signatory!.assessedById === '' || this.signatory!.assessedById === undefined
      ) {
        this.validateField!.assessedById = true;
      } else {
        this.validateField!.assessedById = false;
      }

      if (
        this.signatory!.governorId === null ||
        this.signatory!.governorId === ''  || this.signatory!.governorId === undefined
      ) {
        this.validateField!.governorId = true;
      } else {
        this.validateField!.governorId = false;
      }

      if (this.validateField!.assessedById || this.validateField!.governorId) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  handleOnChangeAssessedBy() {
    this.search_employee_list_assessed_by = this.employee_list.filter(
      (employee: any) =>
        (employee.firstName + ' ' + employee.lastName)
          .toLowerCase()
          .includes(this.searchAssessedBy.toLowerCase())
    );
  }

  handleOnChangeGovernor() {
    this.search_employee_list_governor = this.employee_list.filter(
      (employee: any) =>
        (employee.firstName + ' ' + employee.lastName)
          .toLowerCase()
          .includes(this.searchGovernor.toLowerCase())
    );
  }
}
