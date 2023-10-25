import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { OpcrService } from 'src/app/spms/service/opcr.service';
import { MfoService } from 'src/app/spms/service/mfo.service';
import { interval, take } from 'rxjs';
import { ReportActualService } from 'src/app/spms/service/report-actual.service';
import Swal from 'sweetalert2';
import { MonthRangeService } from 'src/app/spms/service/month-range.service';
@Component({
  selector: 'app-opcr-target',
  templateUrl: './opcr-target.component.html',
  styleUrls: ['./opcr-target.component.css'],
})
export class OpcrTargetComponent implements OnInit {
  constructor() {}
  opcrService = inject(OpcrService);
  mfoService = inject(MfoService);
  reportActualService = inject(ReportActualService);
  monthRangeService = inject(MonthRangeService);

  getYear = new Date().getFullYear().toString();
  years: number[] = [];
  fullYear = '0';
  officeId: string | null = localStorage.getItem('officeId');
  isCommon = 0;
  opcr: any = this.opcrService.opcr;
  isShow: number | any = this.opcrService.storageIsShow;

  mfo: any = this.mfoService.mfo;
  mfoDetails: any = {};
  opcrDetails: any = this.opcrService.opcrDetails;
  officeDivision: any = this.opcrService.officeDivision;
  opcrData: any = this.opcrService.opcrData;
  opcrName: string | any = '';
  flag: number = 0;
  data: any = {};
  isCheck: boolean[] = []; // An array to store checkbox values (true if selected, false if not)
  selectedDivisions: string[] = []; // An array to store selected division names
  isSearchLoading: any = this.mfoService.isSearchLoading;
  search: any = {};
  editopcrDetails: any = {};
  editMFODetails: any = {};
  editOpcr: any = {};
  division: any = [];
  isExpandMfoes: boolean = false;
  @ViewChild('closebutton')
  closebutton!: { nativeElement: { click: () => void } };

  @ViewChild('closebuttonEdit')
  closebuttonEdit!: { nativeElement: { click: () => void } };

  ngOnInit(): void {
    this.localStorage();
    this.GetOPCRs();
    this.GetOfficeDivision();
    this.opcrYear();
  }

  opcrYear() {
    for (let i = new Date().getFullYear(); i >= 2020; i--) {
      this.years.push(i);
    }
  }

  localStorage() {
    if (this.opcrService.storageIsShow() == 1) {
      this.opcrDetails.mutate((a: any) => (a.isLoading = true));
      setTimeout(() => {
        this.opcrDetails.mutate((a: any) => (a.isLoading = false));
        localStorage.setItem('isShow', '1');
        this.opcrService.GetOPCRDetails();
        this.mfoService.GetMFOes();
        this.sortExcist();
      }, 1000);
    } else {
      localStorage.setItem('isShow', '0');
      this.opcrService.storageIsShow.set(0);
      this.sortExcist();
    }
  }

  displayDivision(sharedDiv: string) {
    this.division = [];
    this.officeDivision().data.map((a: any) => {
      if (sharedDiv.includes(a.divisionName)) {
        this.division.push({ divisionName: a.divisionName, isCheckDiv: true });
      } else {
        this.division.push({ divisionName: a.divisionName, isCheckDiv: false });
      }
    });
  }

  onCheckDivision(divName: string, event: any) {
    let index = this.division.findIndex((a: any) => a.divisionName === divName);
    this.division[index].isCheckDiv = event.target.checked;
  }

  sharedDivValue() {
    let value = '';
    this.division.map((a: any) => {
      if (a.isCheckDiv) {
        value += a.divisionName + '/';
      }
    });
    return value.slice(0, -1);
  }

  clearSelectedDiv() {
    this.division.map((a: any) => {
      a.isCheckDiv = false;
    });
  }

  displayCatergory(cat: number) {
    let catName = '';
    switch (cat) {
      case 1:
        catName = 'Strategic';
        break;
      case 2:
        catName = 'Core';

        break;
      case 3:
        catName = 'Support';
        break;
      default:
        break;
    }

    if (cat == null) {
      catName = 'No Function';
    }

    return catName;
  }

  sem(year: number) {
    let Year = '';
    switch (year) {
      case 0:
        Year = 'Full Year';
        break;

      case 1:
        Year = '1st Sem';
        break;

      case 2:
        Year = '2nd Sem';
        break;

      default:
        break;
    }
    return Year;
  }

  calculateRating() {
    this.mfoDetails.qty5 = Math.floor(
      this.mfoDetails.qty * 0.3 + this.mfoDetails.qty
    );
    this.mfoDetails.qty4 = Math.floor(
      this.mfoDetails.qty * 0.15 + this.mfoDetails.qty
    );
    this.mfoDetails.qty3 = Math.floor(this.mfoDetails.qty);
    this.mfoDetails.qty2 = Math.floor(this.mfoDetails.qty / 2 + 1);
    this.mfoDetails.qty1 = Math.floor(this.mfoDetails.qty / 2);
  }

  editcalculateRating() {
    this.editopcrDetails.standard.qty5 = Math.floor(
      this.editopcrDetails.qty * 0.3 + this.editopcrDetails.qty
    );
    this.editopcrDetails.standard.qty4 = Math.floor(
      this.editopcrDetails.qty * 0.15 + this.editopcrDetails.qty
    );
    this.editopcrDetails.standard.qty3 = Math.floor(this.editopcrDetails.qty);
    this.editopcrDetails.standard.qty2 = Math.floor(
      this.editopcrDetails.qty / 2 + 1
    );
    this.editopcrDetails.standard.qty1 = Math.floor(
      this.editopcrDetails.qty / 2
    );
  }

  GetOPCRs() {
    this.opcr.mutate((a: any) => (a.isLoading = true));
    setTimeout(() => {
      this.opcr.mutate((a: any) => (a.isLoading = false));
      this.opcrService.GetOPCRs(this.getYear, this.officeId ?? '');
    }, 1000);
  }

  EditOPCR() {
    this.editOpcr.active = 1;
    this.opcrService.EditOPCR(this.editOpcr);
    this.GetOPCRs();
  }

  EditOPCRFinal() {
    this.editOpcr.active = 2;
    this.opcrService.EditOPCR(this.editOpcr);
    this.GetOPCRs();
  }

  ReportOPCR(data: any) {
    this.opcrService.storageOpcrId.set(data.opcrId);
    this.opcrService.GetOPCRDetails();
    this.reportActualService.triggerSwitch(1);

    this.monthRangeService.setMonthRange({
      type: 'opcr',
      isActual: false,
      year: parseInt(data.year),
      semester: data.semester,
    });

    setTimeout(() => {
      this.reportActualService.triggerSwitch(1);
      this.reportActualService.ReportActual(this.opcrDetails().data);
    }, 1000);
  }

  GetMFOs() {
    this.mfoService.GetMFOes();
  }

  GetOfficeDivision() {
    this.opcrService.GetOfficeDivision(this.officeId ?? '');
    setTimeout(() => {
      this.displayDivision('');
    }, 1000);
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

  PutMFOCategory(mfoId: string, categoryId: number) {
    this.opcrService.PutMFOCategory(mfoId, categoryId);
  }

  trap: boolean = false;
  prompt: boolean = false;
  PostOPCRDetails() {
    this.mfoDetails.sharedDiv = this.sharedDivValue();
    this.mfoDetails.opcrId = localStorage.getItem('opcrId');
    if (
      this.mfoDetails.sharedDiv == '' ||
      this.mfoDetails.qtyUnit == undefined
    ) {
      this.trap = true;
    }
    if (
      this.mfoService.isCommon() == 1 &&
      this.mfoDetails.qtyUnit != undefined
    ) {
      this.trap = false;
    }
    if (!this.trap) {
      this.prompt = false;
      this.opcrService.AddOPCRData(this.mfoDetails);
      setTimeout(() => {
        if (!this.opcrData().error) {
          this.closebutton.nativeElement.click();
        }
      }, 1000);
      this.sortExcist();
    } else {
      this.prompt = true;
      this.trap = false;
    }
  }

  searchMfoOffice() {
    this.mfoService.SearchMfoOffice(this.search);
    this.sortExcist();
  }

  DeleteOPCRDetails(opcrDataId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.opcrService.DeleteOPCRDetails(opcrDataId);
        this.GetMFOs();
        this.sortExcist();
      }
    });
  }

  DeleteOPCR(opcrId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.opcrService.DeleteOPCR(opcrId);
        this.GetOPCRs();
      }
    });
  }

  checkedNumeric: boolean = false;
  checkedPercentaged: boolean = false;
  checker(qtyUnit: number) {
    if (qtyUnit == 0) {
      this.checkedNumeric = true;
      this.checkedPercentaged = false;
    } else {
      this.checkedNumeric = false;
      this.checkedPercentaged = true;
    }
  }

  displayStatus(cat: any) {
    let catName = '';
    switch (cat) {
      case 1:
        catName = 'Pre-Final';
        break;
      case 2:
        catName = 'Final';

        break;
      case 0:
        catName = 'Draft';
        break;
      default:
        break;
    }

    if (cat == null) {
      catName = 'No Function';
    }

    return catName;
  }

  onChangeYear(year: any) {
    this.opcrService.GetOPCRs(year, this.officeId ?? '');
  }

  EditOPCRData() {
    this.editopcrDetails.qty5 = this.editopcrDetails.standard.qty5;
    this.editopcrDetails.qty4 = this.editopcrDetails.standard.qty4;
    this.editopcrDetails.qty3 = this.editopcrDetails.standard.qty3;
    this.editopcrDetails.qty2 = this.editopcrDetails.standard.qty2;
    this.editopcrDetails.qty1 = this.editopcrDetails.standard.qty1;
    this.editopcrDetails.sharedDiv = this.sharedDivValue();
    this.opcrService.EditOPCRData(this.editopcrDetails);
    setTimeout(() => {
      if (!this.opcrDetails().error) {
        this.closebuttonEdit.nativeElement.click();
      }
    }, 1000);
  }

  OPCRDetails(data: any) {
    this.opcrService.storageIsShow.set(1);
    this.opcrService.storageOpcrId.set(data.opcrId);
    this.opcrService.storageOpcrDetails.set(data.details);

    localStorage.setItem('isShow', '1');
    localStorage.setItem('opcrId', data.opcrId);
    localStorage.setItem('opcrDetails', data.details);

    this.monthRangeService.setMonthRange({
      type: 'opcr',
      isActual: false,
      year: parseInt(data.year),
      semester: data.semester,
    });

    this.localStorage();
  }

  editQtyUnit(value: number) {
    this.editopcrDetails.qtyUnit = value;
  }

  counter: number = 0;
  loading: boolean = false;
  sortExcist() {
    this.loading = true;
    interval(1000)
      .pipe(take(1))
      .subscribe((value) => {
        this.counter = 0;
        for (let outerItem of this.mfo().data) {
          for (let innerItem of outerItem.si) {
            for (let opcrDetail of this.opcrDetails().data) {
              for (let opcrDetailItem of opcrDetail.si) {
                if (innerItem.indicatorId == opcrDetailItem.indicatorId) {
                  this.counter += 1;
                }
              }
            }
          }
        }

        while (this.counter != 0) {
          this.counter -= 1;
          for (let outerItem of this.mfo().data) {
            for (let innerItem of outerItem.si) {
              for (let opcrDetail of this.opcrDetails().data) {
                for (let opcrDetailItem of opcrDetail.si) {
                  if (innerItem.indicatorId == opcrDetailItem.indicatorId) {
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
        }
        if (this.counter == 0) {
          this.loading = false;
        }
      });
  }

  onChangeYearInput(year: any) {
    this.data.semester = year;
  }

  removelocalStorage() {
    this.opcrService.storageIsShow.set(0);
    this.opcrService.storageOpcrId.set(null);
    this.opcrService.storageOpcrDetails.set(null);

    localStorage.setItem('isShow', '0');
    localStorage.setItem('opcrId', '');

    this.GetOPCRs();
    this.GetMFOs();
  }
}
