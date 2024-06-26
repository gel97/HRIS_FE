import {
    Component,
    EventEmitter,
    Output,
    Input,
    ViewChild,
    OnInit,
  } from '@angular/core';
  
  @Component({
    selector: 'app-canvas-target-ipcr',
    template: `
      <div class="col-lg-3 col-md-6">
        <div class="mt-3">
          <div
            class="offcanvas offcanvas-end"
            data-bs-scroll="true"
            data-bs-backdrop="false"
            tabindex="-1"
            id="offcanvasIpcr"
            aria-labelledby="offcanvasIpcrLabel"
          >
            <div class="offcanvas-header">
              <h1 id="offcanvasEndLabel" class="offcanvas-title">IPCR</h1>
              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body my-auto mx-0 flex-grow-0">
              <!-- <div class="col-md-12">
                <div class="">
                  <div class="form-floating">
                    <input
                      [(ngModel)]="ipcrObj.details"
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder="Enter IPCR description"
                      aria-describedby="floatingInputHelp"
                      (keyup)="ipcrObj.detailsError = false"
                      />
                    <label for="floatingInput">IPCR</label>
                    <div *ngIf="ipcrObj.detailsError" id="floatingInputHelp" class="form-text text-danger">Required field.</div>
                  </div>
                </div>
                <br />
              </div> -->
              <div class="col-md-12 mt-2" *ngIf="isAddIpcr">
                <label for="largeSelectYear" class="form-label">Select year</label>
                <select id="largeSelectYear" class="form-select form-select-lg" (change)="onChangeYear($event)">
                  <ng-container *ngFor="let year of listYear">
                    <option value="{{ year }}" [selected]="year === ipcrObj.year">{{ year }}</option>
                  </ng-container>
                </select>
              </div>
              <div class="col-md-12 mt-2">
              <label for="largeSelectPeriod" class="form-label">Select period</label>
              <select id="largeSelectPeriod" class="form-select form-select-lg" (change)="onChangePeriod($event)">
                  <ng-container *ngFor="let period of periods">
                    <option value="{{period.period}}" [selected]="ipcrObj.semester === period.period">{{ period.desc }}</option>
                  </ng-container>
              </select>
            </div>
              <br />
              <button
                (click)="Submit()"
                type="button"
                class="btn btn-primary mb-2 d-grid w-100"
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary d-grid w-100"
                data-bs-dismiss="offcanvas"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    `,
  })
  export class CanvasTargetIpcrComponent implements OnInit {
    @Input() ipcrObj: any;
    @Input() isAddIpcr: any;

    @Output() submit = new EventEmitter<any>();
  
    currentYear = new Date().getFullYear();
    periods = [{period:1, desc: '1st Sem'},{period:2, desc: '2nd Sem'},]
    listYear: any = [];
  
    ngOnInit(): void {
      for (let index = 3; index > 0; index--) {
        this.listYear.push(this.currentYear++);
      }
    }
  
    Submit() {
      // if(this.ipcrObj.details === undefined || this.ipcrObj.details === null || this.ipcrObj.details === ""){
      //   this.ipcrObj.detailsError = true;
      //   return;
      // }
      if(this.ipcrObj.year === undefined || this.ipcrObj.year === null){
        this.ipcrObj.year = new Date().getFullYear();

      }
      if(this.ipcrObj.semester === undefined || this.ipcrObj.semester === null){
        this.ipcrObj.semester = this.periods[0].period;
      }
      this.submit.emit('Submit');
    }

    onChangeYear(event:any){
        this.ipcrObj.year = event.target.value;
    }

    onChangePeriod(event:any){
        this.ipcrObj.semester = event.target.value;
    }
  
    onChangeYearInput(year: any) {
      this.ipcrObj.semester = year;
    }
  }
  