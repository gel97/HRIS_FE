import {
    Component,
    EventEmitter,
    Output,
    Input,
    ViewChild,
    OnInit,
  } from '@angular/core';
  
  @Component({
    selector: 'app-canvas-target-dpcr',
    template: `
      <div class="col-lg-3 col-md-6">
        <div class="mt-3">
          <div
            class="offcanvas offcanvas-end"
            data-bs-scroll="true"
            data-bs-backdrop="false"
            tabindex="-1"
            id="offcanvasDpcr"
            aria-labelledby="offcanvasDpcrLabel"
          >
            <div class="offcanvas-header">
              <h1 id="offcanvasEndLabel" class="offcanvas-title">DPCR</h1>
              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body my-auto mx-0 flex-grow-0">
              <div class="col-md-12">
                <div class="">
                  <div class="form-floating">
                    <input
                      [(ngModel)]="dpcrObj.details"
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder=""
                      aria-describedby="floatingInputHelp"
                    />
                    <label for="floatingInput">DPCR</label>
                    <div id="floatingInputHelp" class="form-text">Input DPCR</div>
                  </div>
                </div>
                <br />
              </div>
              <div class="col-md-12 mt-2" *ngIf="isAddDpcr">
                <label for="largeSelectYear" class="form-label">Select year</label>
                <select id="largeSelectYear" class="form-select form-select-lg" (change)="onChangeYear($event)">
                  <ng-container *ngFor="let year of listYear">
                    <option value="{{ year }}" [selected]="year === dpcrObj.year">{{ year }}</option>
                  </ng-container>
                </select>
              </div>
              <div class="col-md-12 mt-2">
              <label for="largeSelectPeriod" class="form-label">Select period</label>
              <select id="largeSelectPeriod" class="form-select form-select-lg" (change)="onChangePeriod($event)">
                  <ng-container *ngFor="let period of periods">
                    <option value="{{period.period}}" [selected]="dpcrObj.semester === period.period">{{ period.desc }}</option>
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
  export class CanvasTargetDpcrComponent implements OnInit {
    @Input() dpcrObj: any;
    @Input() isAddDpcr: any;

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
      if(this.dpcrObj.year === undefined || this.dpcrObj.year === null){
        this.dpcrObj.year = new Date().getFullYear();

      }
      if(this.dpcrObj.semester === undefined || this.dpcrObj.semester === null){
        this.dpcrObj.semester = this.periods[0].period;
      }
      this.submit.emit('Submit');
    }

    onChangeYear(event:any){
        this.dpcrObj.year = event.target.value;
    }

    onChangePeriod(event:any){
        this.dpcrObj.semester = event.target.value;
    }
  
    onChangeYearInput(year: any) {
      this.dpcrObj.semester = year;
    }
  }
  