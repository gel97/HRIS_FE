import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  sample: number = 0;
  sample1: number = 0;

  toggleSubMenu(menuNumber: number): void {
    this.sample = this.sample === menuNumber ? 0 : menuNumber;
  }

  toggleSubMenu1(menuNumber: number): void {
    this.sample1 = this.sample1 === menuNumber ? 0 : menuNumber;
  }
}
