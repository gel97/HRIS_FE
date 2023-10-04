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
  mfoDetails: any = {};
  opcrDetails: any = this.opcrService.opcrDetails;
  officeDivision: any = this.opcrService.officeDivision;
  opcrName: string | null = '';
  isShow: number | any = 0;
  flag: number = 0;
  category: any = [
    { int: 1, type: `STRATEGIC` },
    { int: 2, type: `CORE` },
    { int: 3, type: `SUPPORT` },
  ];
  data: any = {};
  isCheck: boolean[] = []; // An array to store checkbox values (true if selected, false if not)
  selectedDivisions: string[] = []; // An array to store selected division names
  sortMfo: any = [];
  finalSort: any = [];

  ngOnInit(): void {
    let id: string | any = localStorage.getItem('opcrId');
    if ((this.isShow = localStorage.getItem('isShow'))) {
      this.isShow = this.isShow;
      this.opcrName = localStorage.getItem('opcrDetails');
      this.opcrService.StorageOPCRDetails(id);
    } else {
      this.isShow = 0;
    }
    this.GetOPCRs();
    this.opcrService.GetOPCRDetails('O2301121009046AC0D9B', '', 0);
    console.log('opcr', this.opcrDetails());
    this.mfoService.GetMFOes();
    console.log('mfo', this.mfo());
    // this.GetMFOs();
    this.GetOfficeDivision();
  }

  GetOPCRs() {
    this.opcrService.GetOPCRs(this.getYear, this.officeId);
    // console.log('2nd');
    // console.log('opcrreturndetails', this.opcr());
  }

  GetMFOs() {
    this.mfoService.GetMFOes();
    console.log('mfo', this.mfo());
    this.sortExcist();
  }

  GetOfficeDivision() {
    this.opcrService.GetOfficeDivision(this.officeId);
    console.log('officedivision', this.officeDivision());
  }

  setMFOs(set: number) {
    this.mfoService.isCommon.set(set);
    this.GetMFOs();
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

  PostOPCRDetails() {
    this.mfoDetails.sharedDiv = this.concatSelectedDivisions();
    this.mfoDetails.opcrId = localStorage.getItem('opcrId');
    console.log('mfdetails', this.mfoDetails);
    this.opcrService.AddOPCRData(this.mfoDetails);
  }

  concatSelectedDivisions(): string {
    return this.selectedDivisions.join('/'); // Use a comma and space as the separator
  }
  // Function to handle checkbox change event
  onCheckboxChange(index: number) {
    if (this.isCheck[index]) {
      this.selectedDivisions.push(
        this.officeDivision().data[index].divisionName
      );
    } else {
      const removedDivision = this.officeDivision().data[index].divisionName;
      this.selectedDivisions = this.selectedDivisions.filter(
        (division) => division !== removedDivision
      );
    }
  }

  onChangeYear(year: any) {
    this.opcrService.GetOPCRs(year, this.officeId);
  }

  OPCRDetails(opcrid: string, opcrdetails: string, isShow: number) {
    this.opcrService.GetOPCRDetails(opcrid, opcrdetails, isShow);
    console.log(this.opcrDetails());
    console.log('opcrdetails', this.opcrDetails());
    this.sortExcist();
  }

  sortExcist() {
    console.log('mfo', this.mfo().data);
    console.log('opcr', this.opcrDetails().data);
    this.mfo().data.forEach((item: any) => {
      item.si.forEach((si: any) => {
        this.opcrDetails().data.forEach((data: any) => {
          for (let i of data.si) {
            if (i.indicatorId == si.indicatorId) {
              this.sortMfo.push(si.indicatorId);
            }
          }
        });
      });
    });
    // console.log('exist', this.sortMfo);
    // this.mfo().data.forEach((item: any) => {
    //   item.si.forEach((si: any) => {
    //     this.sortMfo.forEach((data_si: any) => {
    //       if (data_si.indicatorId != si.indicatorId) {
    //         this.finalSort.push(item);
    //       }
    //     });
    //   });
    // });
    // let data = this.mfo().data;
    // this.mfo().data.map((a: any, z: any) => {
    //   a.si.map((b: any) => {
    //     this.opcrDetails().data.map((c: any) => {
    //       c.si.map((d: any, y: number) => {
    //         if (b.indicatorId == d.indicatorId) {
    //           this.mfo().data.splice(y, 1);
    //           console.log(this.mfo().data[z].si[y]);
    //         }
    //       });
    //     });
    //   });
    // });

    // for (let i of this.opcrDetails().data[0].si) {
    //   for (let e = 0; e < this.mfo().data.si.length; e++) {
    //     if (i.indicatorId == this.mfo().data[0].si[e].indicatorId) {
    //       this.mfo().data.si.splice(e, 1);
    //       console.log('here');
    //       break;
    //     }
    //   }
    // }
    // this.sortMfo = this.mfo().data.filter((item: any) => {

    //   return !this.opcrDetails().data.some((i: any) => item.mfoId === i.mfoId);
    // });
  }

  removelocalStorage() {
    localStorage.clear();
    this.ngOnInit();
  }
}
