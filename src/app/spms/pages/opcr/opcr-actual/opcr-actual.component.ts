import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-opcr-actual',
  templateUrl: './opcr-actual.component.html',
  styleUrls: ['./opcr-actual.component.css'],
})
export class OpcrActualComponent {
  count = signal(0);

  changeCount() {
    this.count.set(5);
    console.log(this.count());
  }
}
