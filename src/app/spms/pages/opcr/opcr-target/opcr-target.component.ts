import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { OpcrService } from 'src/app/spms/service/opcr.service';
import { MfoService } from 'src/app/spms/service/mfo.service';
import { interval, take } from 'rxjs';
import { ReportActualService } from 'src/app/spms/service/report-actual.service';
import Swal from 'sweetalert2';
import { MonthRangeService } from 'src/app/spms/service/month-range.service';
import { SignatoriesService } from 'src/app/spms/service/signatories.service';
@Component({
  selector: 'app-opcr-target',
  templateUrl: './opcr-target.component.html',
  styleUrls: ['./opcr-target.component.css'],
})
export class OpcrTargetComponent implements OnInit {
  constructor() {}
  opcrService = inject(OpcrService);
  mfoService = inject(MfoService);
  signatoriesService = inject(SignatoriesService);
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
  flag_opcr: boolean = false;
  isExpandMfoes: boolean = false;
  @ViewChild('closebutton')
  closebutton!: { nativeElement: { click: () => void } };

  @ViewChild('closebuttonEdit')
  closebuttonEdit!: { nativeElement: { click: () => void } };

  officeName: any = '';
  ngOnInit(): void {
    this.officeName = localStorage.getItem('officeName');
    this.localStorage();
    this.GetOPCRs();
    this.GetOfficeDivision();
    this.opcrYear();
  }

  opcrYear() {
    for (let i = new Date().getFullYear() + 1; i >= 2020; i--) {
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
        this.uncommited_division_list();
      }, 0);
    } else {
      localStorage.setItem('isShow', '0');
      this.opcrService.storageIsShow.set(0);
      // this.sortExcist();
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

    if (this.mfoDetails.qty3 >= 4 && this.mfoDetails.qty3 <= 6) {
      this.mfoDetails.qty4 += 1;
      this.mfoDetails.qty5 += 1;
    } else if (this.mfoDetails.qty3 == 3) {
      this.mfoDetails.qty4 += 1;
      this.mfoDetails.qty5 += 2;
    } else if (this.mfoDetails.qty3 == 2) {
      this.mfoDetails.qty4 += 1;
      this.mfoDetails.qty5 += 2;
      this.mfoDetails.qty2 -= 1;
      this.mfoDetails.qty1 -= 1;
    } else if (this.mfoDetails.qty3 == 1) {
      this.mfoDetails.qty5 = 1;
      this.mfoDetails.qty4 = null;
      this.mfoDetails.qty3 = null;
      this.mfoDetails.qty2 = null;
      this.mfoDetails.qty1 = null;
    } else if (this.editopcrDetails.qty <= 0) {
      this.editopcrDetails.qty5 = null;
      this.editopcrDetails.qty4 = null;
      this.editopcrDetails.qty3 = null;
      this.editopcrDetails.qty2 = null;
      this.editopcrDetails.qty1 = null;
    }
  }

  clearCalculateRating() {
    this.mfoDetails.qty5 = null;
    this.mfoDetails.qty4 = null;
    this.mfoDetails.qty3 = null;
    this.mfoDetails.qty2 = null;
    this.mfoDetails.qty1 = null;
  }

  editcalculateRating() {
    if (this.editopcrDetails.qtyUnit != 1) {
      this.editopcrDetails.qty5 = Math.floor(
        this.editopcrDetails.qty * 0.3 + this.editopcrDetails.qty
      );
      this.editopcrDetails.qty4 = Math.floor(
        this.editopcrDetails.qty * 0.15 + this.editopcrDetails.qty
      );
      this.editopcrDetails.qty3 = Math.floor(this.editopcrDetails.qty);
      this.editopcrDetails.qty2 = Math.floor(this.editopcrDetails.qty / 2 + 1);
      this.editopcrDetails.qty1 = Math.floor(this.editopcrDetails.qty / 2);
      if (this.editopcrDetails.qty3 >= 4 && this.editopcrDetails.qty3 <= 6) {
        this.editopcrDetails.qty4 += 1;
        this.editopcrDetails.qty5 += 1;
      } else if (this.editopcrDetails.qty3 == 3) {
        this.editopcrDetails.qty4 += 1;
        this.editopcrDetails.qty5 += 2;
      } else if (this.editopcrDetails.qty3 == 2) {
        this.editopcrDetails.qty4 += 1;
        this.editopcrDetails.qty5 += 2;
        this.editopcrDetails.qty2 -= 1;
        this.editopcrDetails.qty1 -= 1;
      } else if (this.editopcrDetails.qty3 == 1) {
        this.editopcrDetails.qty5 = 1;
        this.editopcrDetails.qty4 = null;
        this.editopcrDetails.qty3 = null;
        this.editopcrDetails.qty2 = null;
        this.editopcrDetails.qty1 = null;
      } else if (this.editopcrDetails.qty <= 0) {
        this.editopcrDetails.qty5 = null;
        this.editopcrDetails.qty4 = null;
        this.editopcrDetails.qty3 = null;
        this.editopcrDetails.qty2 = null;
        this.editopcrDetails.qty1 = null;
      }
    }
  }

  GetOPCRs() {
    this.opcr.mutate((a: any) => (a.isLoading = true));
    setTimeout(() => {
      this.opcr.mutate((a: any) => (a.isLoading = false));
      this.opcrService.GetOPCRs(this.getYear, this.officeId ?? '');
    }, 1000);
  }

  EditOPCR(opcrId: any) {
    this.editOpcr.active = 1;
    this.post_signatories(opcrId);
    this.opcrService.EditOPCR(this.editOpcr);
    // this.GetOPCRs();
  }

  EditOPCRFinal(opcrId: any) {
    this.editOpcr.active = 2;
    // this.post_signatories(opcrId);
    this.opcrService.EditOPCR(this.editOpcr);
    // this.GetOPCRs();
  }

  post_signatories(id: any) {
    this.signatoriesService.post_signatories(id).subscribe({
      next: () => {},
      error: () => {},
      complete: () => {},
    });
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
    this.reportActualService.get_signatories(data.opcrId);
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

  EditOPCR_Details() {
    this.opcrService.EditOPCR_Details(this.data);
    // this.GetOPCRs();
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
      }, 0);
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
        catName = 'Open';
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
    this.flag_opcr = false;
    this.data = {};
    this.opcrService.GetOPCRs(year, this.officeId ?? '');
  }

  EditOPCRData() {
    this.editopcrDetails.qty5 = this.editopcrDetails.qty5;
    this.editopcrDetails.qty4 = this.editopcrDetails.qty4;
    this.editopcrDetails.qty3 = this.editopcrDetails.qty3;
    this.editopcrDetails.qty2 = this.editopcrDetails.qty2;
    this.editopcrDetails.qty1 = this.editopcrDetails.qty1;
    this.editopcrDetails.sharedDiv = this.sharedDivValue();
    this.opcrService.EditOPCRData(this.editopcrDetails);
    setTimeout(() => {
      if (!this.opcrDetails().error) {
        this.closebuttonEdit.nativeElement.click();
      }
    }, 0);
  }

  opcr_details_status: number | any;
  uncommited_division: any = [];
  OPCRDetails(data: any) {
    this.opcr_details_status = data.active;
    localStorage.setItem('opcrFinalStatus', data.active);
    localStorage.setItem('currentYear', data.year);
    this.uncommited_division_list();

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

  uncommited_division_boolean: boolean = false;
  show_uncommited_division_list(year: any) {
    this.opcrService.get_uncommited_division(year).subscribe({
      next: (response: any) => {
        this.uncommited_division = response;
      },
      error: () => {},
      complete: () => {
        for (let i of this.uncommited_division) {
          if (i.status == 0) {
            this.uncommited_division_boolean = true;
            break;
          }
        }
      },
    });
  }

  uncommited_division_list() {
    this.opcr_details_status = localStorage.getItem('opcrFinalStatus');
    this.opcrService
      .get_uncommited_division(localStorage.getItem('currentYear'))
      .subscribe({
        next: (response: any) => {
          this.uncommited_division = response;
        },
        error: () => {},
        complete: () => {},
      });
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
    localStorage.removeItem('currentYear');
    localStorage.removeItem('opcrFinalStatus');

    this.GetOPCRs();
    this.GetMFOs();
  }
}
