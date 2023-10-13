import {
    Component,
    EventEmitter,
    Output,
    Input,
    ViewChild,
  } from '@angular/core';
  
  @Component({
    selector: 'app-canvas-target-dpcr',
    template: `
       <div class="col-lg-3 col-md-6">
    <div class="mt-3">
        <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
            id="offcanvasDpcr" aria-labelledby="offcanvasDpcrLabel">
            <div class="offcanvas-header">
                <h1 id="offcanvasEndLabel" class="offcanvas-title">DPCR</h1>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
            </div>
            <div class="offcanvas-body my-auto mx-0 flex-grow-0">
                <div class="col-md-12">
                    <div class="">
                        <div class="form-floating">
                            <input [(ngModel)]="dpcrObj.details" type="text" class="form-control" id="floatingInput"
                                placeholder="" aria-describedby="floatingInputHelp" />
                            <label for="floatingInput">DPCR</label>
                            <div id="floatingInputHelp" class="form-text">
                                Input DPCR
                            </div>
                        </div>
                    </div><br>
                </div>
                <div class="col-md-12">
                    <div>
                        <select class="form-select" aria-label="Default select example" [(ngModel)]="dpcrObj.semester"
                            (ngModelChange)="onChangeYearInput($event)">
                            <option value="0" selected>Full Year</option>
                            <option value="1">1st Sem</option>
                            <option value="2">2nd Sem</option>
                        </select>
                    </div>
                    <div id="floatingInputHelp" class="form-text">
                        Select Period
                    </div>
                </div><br>
                <button (click)="Submit()" type="button" class="btn btn-primary mb-2 d-grid w-100">Save</button>
                <button type="button" class="btn btn-outline-secondary d-grid w-100" data-bs-dismiss="offcanvas">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</div>
    `,
  })
  export class CanvasTargetDpcrComponent {
    @Input() dpcrObj: any;
    @Output() submit = new EventEmitter<any>();
  
    Submit(){
        this.submit.emit('Submit');
    }

    onChangeYearInput(year: any) {
        this.dpcrObj.semester = year;
      }

  }
  