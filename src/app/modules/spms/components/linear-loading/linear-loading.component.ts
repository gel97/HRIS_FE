import { Component } from '@angular/core';

@Component({
  selector: 'app-linear-loading',
  template: `<div class="container">
  <h1>Linear loader</h1>
  <div class="bar-container">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </div>
</div>`,
  styleUrls: ['./linear-loading.component.css'],
})
export class LinearLoadingComponent {}
