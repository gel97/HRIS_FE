import { Component, OnInit, inject } from '@angular/core';
import { IpcrService } from 'src/app/spms/service/ipcr.service';

@Component({
  selector: 'app-ipcr-target',
  templateUrl: './ipcr-target.component.html',
  styleUrls: ['./ipcr-target.component.css'],
})
export class IpcrTargetComponent implements OnInit {
  getYear = '2023';
  sem = '1';
  divisionId = 'DIVADMIJAI162';
  ipcrId = 'useripcrid123';

  ipcrService = inject(IpcrService);
  ipcr = this.ipcrService.ipcr();

  ngOnInit(): void {
    this.ipcrService.GetIPCRs(this.getYear, this.divisionId, this.ipcrId);
    console.log(this.ipcr);
  }
}
