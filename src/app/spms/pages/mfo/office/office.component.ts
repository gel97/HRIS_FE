import { Component, OnInit ,inject, signal } from '@angular/core';

import { MfoService } from 'src/app/spms/service/mfo.service';
@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit{
  mfoService = inject(MfoService);
  mfo:any = this.mfoService.mfo;
  officeId = "OFFPHRMONZ3WT7D";
  expandedRow = 0;
  ngOnInit(): void {
    this.mfoService.GetMFOes(this.officeId);

  }
}
