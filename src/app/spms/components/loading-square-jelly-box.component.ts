import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-loading-square-jelly-box',
  template: `
    <ngx-spinner bdColor="rgba(238,237,237,0.8)" size="large" color="#db2424" type="square-jelly-box" [fullScreen]="false">
      <p style="color: red">Loading...</p>
    </ngx-spinner>
  `,
})
export class LoadingSquareJellyBoxComponent implements OnInit, OnChanges {
    @Input() loading: any;

    constructor(private spinnerDot: NgxSpinnerService) {}

    ngOnInit(): void {
        this.updateSpinnerVisibility();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['loading']) {
            this.updateSpinnerVisibility();
        }
    }

    private updateSpinnerVisibility(): void {
        if (this.loading) {
            this.spinnerDot.show();
        } else {
            this.spinnerDot.hide();
        }
    }
}
