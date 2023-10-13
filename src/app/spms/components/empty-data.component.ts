import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  template: `
    <img
      src="assets/img/document.png"
      alt=""
      width="200"
      height="200"
      style="display: block; margin: 0 auto"
    />
    <span style="display: flex;justify-content: center;align-items: center;">
      <label><strong>No Data Found!</strong></label
      >&nbsp;
    </span>
  `,
})
export class EmptyDataComponent {}
