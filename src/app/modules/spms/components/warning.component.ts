import { Component } from '@angular/core';

@Component({
  selector: 'app-warning',
  template: `
    <div class="content-wrapper">
      <div class="card">
        <div class="container-xxl container-p-y">
          <div class="misc-wrapper">
            <div class="d-flex align-items-center justify-content-center">
              <img
                src="./assets/img/warning.png"
                alt="warning"
                width="500"
                class="img-fluid"
                data-app-dark-img="warning.png"
                data-app-light-img="warning.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
})
export class WarningComponent {}
