import { Component, EventEmitter, Output, Input  } from '@angular/core';

@Component({
  selector: 'app-toggle-mfo',
  template: `
      <!-- Radio -->
      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" class="btn-check" name="btnradio" id="btnradio1" 
           [checked]="mfoType === 0" (click)="SetIsCommon(0)" autocomplete="off" />
        <label class="btn btn-outline-primary" for="btnradio1">OFFICE MFO</label>
        <input type="radio" class="btn-check" name="btnradio" id="btnradio2"
        [checked]="mfoType === 1" (click)="SetIsCommon(1)" autocomplete="off" />
        <label class="btn btn-outline-primary" for="btnradio2">COMMON MFO</label>
      </div>
  `,
})
export class ToggleMfoComponent {
  @Input() mfoType: any;

  @Output() setIsCommon = new EventEmitter<any>();

  SetIsCommon(value:any) {
    this.setIsCommon.emit(value);
  }


}