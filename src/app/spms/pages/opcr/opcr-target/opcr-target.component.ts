import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpcrService } from 'src/app/spms/service/opcr.service';

@Component({
  selector: 'app-opcr-target',
  templateUrl: './opcr-target.component.html',
  styleUrls: ['./opcr-target.component.css'],
})
export class OpcrTargetComponent implements OnInit {
  constructor() {}

  opcrService = inject(OpcrService);
  getYear = '2023';
  officeId = 'OFFPHRMONZ3WT7D';
  opcr: any = this.opcrService.opcr;
  opcrDetails: any = this.opcrService.opcrDetails;
  opcrdetails: string | null = '';
  isShow: number = 0;

  ngOnInit(): void {
    let isShow: string | null = localStorage.getItem('isShow');
    let opcrId: string | null = localStorage.getItem('opcrId');
    let opcrDetails: string | null = localStorage.getItem('opcrDetails');
    if (isShow) {
      // If the value exists in Local Storage, parse it to a number and assign it to isShow.
      this.isShow = parseInt(isShow);
      if (opcrId) {
        // Only call GetOPCRDetails if opcrId is not null.
        this.opcrService.GetOPCRDetails(opcrId);
        this.opcrdetails = opcrDetails;
        console.log(this.opcrDetails());
      }
    }
    this.GetOPCRs();
  }

  GetOPCRs() {
    this.opcrService.GetOPCRs(this.getYear, this.officeId);
  }

  onChangeYear(year: any) {
    this.opcrService.GetOPCRs(year, this.officeId);
  }

  OPCRDetails(opcrid: string, opcrdetails: string, isShow: number) {
    this.opcrService.GetOPCRDetails(opcrid);
    this.isShow = 1;
    localStorage.setItem('isShow', isShow.toString());
    localStorage.setItem('opcrId', opcrid);
    localStorage.setItem('opcrDetails', opcrdetails);
  }
}
