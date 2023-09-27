import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
   <div
    class="spinner-border spinner-border-lg text-primary"
    role="status"
  >
    <span class="visually-hidden">Loading...</span>
  </div>
  `,
})
export class SpinnerComponent {}
