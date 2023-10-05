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
  opcrName: string | any = '';
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
  isSearchLoading: any = this.mfoService.isSearchLoading;
  search: any = {};

  ngOnInit(): void {
    this.localStorage();
    this.GetOPCRs();
    this.mfoService.GetMFOes();
    this.GetOfficeDivision();
    this.sortExcist();
  }

  localStorage() {
    let id: string | any = localStorage.getItem('opcrId');
    if ((this.isShow = localStorage.getItem('isShow'))) {
      this.isShow = this.isShow;
      this.opcrName = localStorage.getItem('opcrDetails');
      this.opcrService.GetOPCRDetails(id, this.opcrName, this.isShow);
      this.sortExcist();
    } else {
      this.isShow = 0;
    }
  }

  GetOPCRs() {
    this.opcrService.GetOPCRs(this.getYear, this.officeId);
  }

  GetMFOs() {
    this.mfoService.GetMFOes();
  }

  GetOfficeDivision() {
    this.opcrService.GetOfficeDivision(this.officeId);
  }

  setMFOs(set: number) {
    this.mfoService.isCommon.set(set);
    this.GetMFOs();
    this.sortExcist();
  }

  PostOPCR() {
    this.data.year = this.getYear;
    this.data.officeId = this.officeId;
    this.opcrService.AddOPCR(this.data);
  }

  PostOPCRDetails() {
    this.mfoDetails.sharedDiv = this.concatSelectedDivisions();
    this.mfoDetails.opcrId = localStorage.getItem('opcrId');
    this.opcrService.AddOPCRData(this.mfoDetails);
    this.sortExcist();
  }

  searchMfoOffice() {
    this.mfoService.SearchMfoOffice(this.search);
    this.sortExcist();
  }

  DeleteOPCRDetails(opcrDataId: string) {
    this.opcrService.DeleteOPCRDetails(opcrDataId);
    this.sortExcist();
    this.GetMFOs();
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
    console.log('opcr', this.opcrDetails());
    this.sortExcist();
  }

  sortExcist() {
    setTimeout(() => {
      for (let outerItem of this.mfo().data) {
        for (let innerItem of outerItem.si) {
          for (let opcrDetail of this.opcrDetails().data) {
            for (let opcrDetailItem of opcrDetail.si) {
              if (innerItem.indicatorId === opcrDetailItem.indicatorId) {
                // Find the index of the item in the array and remove it using splice
                const indexToRemove = outerItem.si.indexOf(innerItem);
                if (indexToRemove !== -1) {
                  outerItem.si.splice(indexToRemove, 1);
                }
              }
            }
          }
        }
      }
    }, 3000);
  }

  removelocalStorage() {
    localStorage.clear();
    this.localStorage();
    this.GetMFOs();
  }
}
