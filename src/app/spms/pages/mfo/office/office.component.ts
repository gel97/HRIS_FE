import { Component, OnInit, inject, signal } from '@angular/core';
import { ErrorService } from 'src/app/spms/service/error.service';

import { MfoService } from 'src/app/spms/service/mfo.service';
@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css'],
})
export class OfficeComponent implements OnInit {
  mfoService = inject(MfoService);
  errorService = inject(ErrorService);

  mfo: any = this.mfoService.mfo;
  isSearchLoading: any = this.mfoService.isSearchLoading;

  error: any = this.errorService.error;

  officeId = 'OFFPHRMONZ3WT7D';
  isCommon = 0;
  expandedRow: any;
  expandedRowChild: any;

  data: any = {};
  search: any = {};
  ngOnInit(): void {
    this.mfoService.GetMFOes(this.officeId, this.isCommon);
    console.log(this.mfo());
  }

  AddMfo() {
    this.data.officeId = this.officeId;
    this.mfoService.AddMfo(this.data);
  }
  searchMfoOffice(value: any) {
    console.log(value);
    this.search.officeId = this.officeId;
    this.mfoService.SearchMfoOffice(this.search);
  }
}
