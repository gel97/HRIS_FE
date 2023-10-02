import { Component, OnInit, inject } from '@angular/core';
import { OpcrService } from 'src/app/spms/service/opcr.service';
import { MfoService } from 'src/app/spms/service/mfo.service';

@Component({
  selector: 'app-opcr-target',
  templateUrl: './opcr-target.component.html',
  styleUrls: ['./opcr-target.component.css'],
})
export class OpcrTargetComponent implements OnInit {
  constructor() {}

  opcrService = inject(OpcrService);
  mfoService = inject(MfoService);

  getYear = '2023';
  officeId = 'OFFPHRMONZ3WT7D';
  isCommon = 0;
  opcr: any = this.opcrService.opcr;
  mfo: any = this.mfoService.mfo;
  opcrDetails: any = this.opcrService.opcrDetails;
  opcrdetails: string | null = '';
  isShow: number = 0;
  flag: number = 0;
  category: any = [
    { int: 1, type: `STRATEGIC` },
    { int: 2, type: `CORE` },
    { int: 3, type: `SUPPORT` },
  ];
  data: any = {};

  ngOnInit(): void {
    this.localStorage();
    this.GetOPCRs();
  }

  localStorage() {
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
    } else {
      this.isShow = 0;
    }
  }

  GetOPCRs() {
    this.opcrService.GetOPCRs(this.getYear, this.officeId);
    // console.log('2nd');
    // console.log('opcrreturndetails', this.opcr());
  }

  GetMFOs() {
    this.mfoService.GetMFOes(this.officeId, this.isCommon);
    console.log(this.mfo());
  }

  PostOPCR() {
    console.log('check');
    this.data.year = this.getYear;
    this.data.officeId = this.officeId;
    // console.log('opcr', this.data);
    this.opcrService.AddOPCR(this.data);
    // console.log('1st');
    // this.GetOPCRs();
  }

  onChangeYear(year: any) {
    this.opcrService.GetOPCRs(year, this.officeId);
  }

  OPCRDetails(opcrid: string, opcrdetails: string, isShow: number) {
    this.opcrService.GetOPCRDetails(opcrid);
    console.log(this.opcrDetails());
    localStorage.setItem('isShow', isShow.toString());
    localStorage.setItem('opcrId', opcrid);
    localStorage.setItem('opcrDetails', opcrdetails);
  }

  removelocalStorage() {
    localStorage.clear();
    this.ngOnInit();
  }
}
