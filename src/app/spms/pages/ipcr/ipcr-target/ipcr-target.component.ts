import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { IpcrService } from 'src/app/spms/service/ipcr.service';
import { ReportActualService } from 'src/app/spms/service/report-actual.service';
import { MonthRangeService } from 'src/app/spms/service/month-range.service';
@Component({
  selector: 'app-ipcr-target',
  templateUrl: './ipcr-target.component.html',
  styleUrls: ['./ipcr-target.component.css'],
})
export class IpcrTargetComponent implements OnInit {
  getYear = new Date().getFullYear().toString();
  sem = '1';
  divisionId: string | null = localStorage.getItem('divisionId');
  userId: string | null = localStorage.getItem('userId');
  years: number[] = [];
  post_ipcr: any = {};
  ipcrDetails: any = {};
  ipcrSTDetails: any = {};
  edit_ipcr_status: any = {};

  reportActualService = inject(ReportActualService);
  ipcrService = inject(IpcrService);
  monthRangeService = inject(MonthRangeService);
  ipcr = this.ipcrService.ipcr();
  get_ipcrDetails = this.ipcrService.ipcrDetails();
  dpcr_ipcr = this.ipcrService.dpcr_ipcr();
  ipcr_rem = this.ipcrService.ipcr_rem();
  ipcrST_rem = this.ipcrService.ipcrST_rem();
  loading = this.ipcrService.loading;

  isShow: number | any = this.ipcrService.storageIsShow;
  ipcrId: string | any = this.ipcrService.storageIpcrId;
  ipcrData: string | any = this.ipcrService.storageIpcrData;

  isExpand: boolean = false;
  dpcrQuantity: number | any;
  dpcrSTQuantity: number | any;
  quantity: number | any;
  quantityST: number | any;
  quantity_rem: number | any;

  @ViewChild('closebutton')
  closebutton!: { nativeElement: { click: () => void } };

  @ViewChild('closebuttonST')
  closebuttonST!: { nativeElement: { click: () => void } };

  @ViewChild('closebuttonEdit')
  closebuttonEdit!: { nativeElement: { click: () => void } };

  @ViewChild('closebuttonEditST')
  closebuttonEditST!: { nativeElement: { click: () => void } };

  divisionName: any = '';
  ngOnInit(): void {
    this.divisionName = localStorage.getItem('divisionName');
    this.ipcrYear();
    this.localStorage();
  }

  printData: any = [];
  printIpcr(data: any = {}) {
    this.ipcrService.storageIpcrId.set(data.ipcrId);
    this.ipcrService.GetIPCRDetails();
    this.printData = [];
    setTimeout(() => {
      this.get_ipcrDetails.data.map((mfoItem: any, i: any) => {
        mfoItem.si.map((siItem: any, y: any) => {
          if (!siItem.isSubTask) {
            this.printData.push(mfoItem);
          } else {
            siItem.st.map((stItem: any, x: any) => {
              this.printData.push({
                categoryId: mfoItem.categoryId,
                mfo: stItem.stMfo,
                mfoId: stItem.ipcrSubtaskId,
                si: [
                  {
                    indicatorId: siItem.indicatorId,
                    indicator: stItem.stIndicator,
                    qlty1: stItem.qlty1,
                    qlty2: stItem.qlty2,
                    qlty3: stItem.qlty3,
                    qlty4: stItem.qlty4,
                    qlty5: stItem.qlty5,
                    qty: stItem.qty,
                    qty1: stItem.qty1,
                    qty2: stItem.qty2,
                    qty3: stItem.qty3,
                    qty4: stItem.qty4,
                    qty5: stItem.qty5,
                    timely1: stItem.timely1,
                    timely2: stItem.timely2,
                    timely3: stItem.timely3,
                    timely4: stItem.timely4,
                    timely5: stItem.timely5,
                  },
                ],
              });
            });
          }
        });
      });
      this.monthRangeService.setMonthRange({
        type: 'ipcr',
        isActual: false,
        year: data.year,
        semester: data.semester,
      });
      this.reportActualService.triggerSwitch(4);
      this.reportActualService.ReportActual(this.printData);
    }, 1000);
  }

  localStorage() {
    if (this.ipcrService.storageIsShow() == 1) {
      this.ipcrService.GetIPCRDetails();
      console.log('getipcr', this.get_ipcrDetails);
      this.ipcrService.ViewGetDPCR_IPCR();
      setTimeout(() => {
        this.ipcrService.sortExcist();
        // this.ipcrService.removeMFO();

        // this.ipcrService.siChecker();
      }, 0);
      this.ipcr_details_status = localStorage.getItem('ipcrFinalStatus');
    } else {
      this.ipcrService.GetIPCRs(
        this.getYear,
        this.divisionId ?? '',
        this.userId ?? ''
      );
      this.ipcrService.storageIsShow.set(0);
    }
  }

  EditIPCRStatusOpen() {
    this.edit_ipcr_status.active = 1;
    this.ipcrService.PutIPCRStatus(this.edit_ipcr_status);
  }

  EditIPCRStatusFinal() {
    this.edit_ipcr_status.active = 2;
    this.ipcrService.PutIPCRStatus(this.edit_ipcr_status);
  }

  ipcr_details_status: number | any;
  IPCRDetails(ipcrId: string, details: string, active: any) {
    this.ipcr_details_status = active;
    localStorage.setItem('ipcrFinalStatus', active);
    localStorage.setItem('isShow_ipcr', '1');
    this.ipcrService.storageIsShow.set(1);

    localStorage.setItem('ipcrId', ipcrId);
    this.ipcrService.storageIpcrId.set(ipcrId);

    localStorage.setItem('ipcrData', details);
    this.ipcrService.storageIpcrData.set(details);
    this.localStorage();
  }

  // continue Edit percentage
  buttonTrap: boolean = false;
  PostIPCRDetails() {
    if (
      this.dpcrQuantity - this.ipcrService.ipcr_rem() == 0 &&
      this.ipcrDetails.qtyUnit == 0
    ) {
      this.prompt = true;
    }
    if (this.prompt) {
      this.buttonTrap = true;
    } else {
      this.buttonTrap = false;
    }
    if (!this.buttonTrap) {
      this.ipcrDetails.qty = this.quantity;
      this.ipcrDetails.ipcrId = localStorage.getItem('ipcrId');
      this.ipcrService.AddIPCRData(this.ipcrDetails);
      this.closebutton.nativeElement.click();
    }
  }

  GetIPCRDetailsRemaining(data: any) {
    this.add_qtyRemaining = this.dpcrQuantity - this.ipcrService.ipcr_rem();
    this.ipcrService.GetIPCRDetailsRemaining(data);
  }

  GetIPCRDetailsRemainingST(data: any) {
    this.add_qtyRemainingST =
      this.dpcrSTQuantity - this.ipcrService.ipcrST_rem();
    this.ipcrService.GetIPCRDetailsRemainingST(data);
  }

  EditIPCRDetails() {
    if (!this.promptEdit) {
      this.ipcrService.PutIPCRData(this.ipcrDetails);
      this.closebuttonEdit.nativeElement.click();
    }
  }

  EditIPCRSubDetails() {
    if (!this.promptEditST) {
      this.ipcrService.PutIPCRSubData(this.ipcrSTDetails);
      this.closebuttonEditST.nativeElement.click();
    }
  }

  buttonTrapST: boolean = false;
  PostIPCRSTDetails() {
    if (
      this.dpcrSTQuantity - this.ipcrService.ipcrST_rem() == 0 &&
      this.ipcrSTDetails.qtyUnit == 0
    ) {
      this.buttonTrapST = true;
    }
    if (this.promptST) {
      this.buttonTrapST = true;
    } else {
      this.buttonTrapST = false;
    }
    if (!this.buttonTrapST) {
      this.ipcrSTDetails.qty = this.quantityST;
      this.ipcrSTDetails.ipcrId = localStorage.getItem('ipcrId');
      this.ipcrService.AddIPCRData(this.ipcrSTDetails);
      this.ipcrService.AddIPCRSubData(this.ipcrSTDetails);
      this.closebuttonST.nativeElement.click();
    }
  }

  DeleteIPCRDetails(value: any) {
    this.ipcrService.DeleteIPCRDetails(value);
  }

  DeleteIPCRSTDetails(value: any) {
    this.ipcrService.DeleteIPCRSTDetails(value);
  }

  PostIpcr() {
    this.post_ipcr.year = this.getYear;
    this.post_ipcr.semester = this.sem;
    this.post_ipcr.divisionId = this.divisionId;
    this.post_ipcr.userId = this.userId;
    this.ipcrService.AddIPCR(this.post_ipcr);
    this.post_ipcr = {};
  }

  removeLocalStorage() {
    localStorage.setItem('isShow_ipcr', '0');
    this.ipcrService.storageIsShow.set(0);

    localStorage.setItem('ipcrId', '');
    this.ipcrService.storageIpcrId.set(null);

    localStorage.setItem('ipcrData', '');
    this.ipcrService.storageIpcrData.set(null);

    localStorage.removeItem('ipcrFinalStatus');

    this.localStorage();
  }

  isSearchLoading() {}

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

  semester(year: number) {
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

  quantityLabeler(qtyUnit: number) {
    let unitLabeler;
    switch (qtyUnit) {
      case 0:
        unitLabeler = 'Numeric';
        break;

      case 1:
        unitLabeler = 'Percentage';
        break;
    }

    return unitLabeler;
  }

  // noSIDataboolean: boolean = false;
  // siChecker() {
  //   setTimeout(() => {
  //     for (let a of this.dpcr_ipcr.data) {
  //       if (a.si.length > 0) {
  //         this.noSIDataboolean = true;
  //       }
  //     }
  //   }, 1000);
  // }

  onChangeYear(year: any) {
    this.ipcrService.GetIPCRs(year, this.divisionId ?? '', this.userId ?? '');
  }

  ipcrYear() {
    for (let i = new Date().getFullYear() + 1; i >= 2020; i--) {
      this.years.push(i);
    }
  }

  // trapRemainingQuantity(data: any) {}

  calculateRating() {
    this.trapRemaining();
  }

  qtyRemaining: number | any;
  promptEdit: boolean = false;
  returnQty: number | any;
  calculateRatingEdit() {
    if (this.ipcrDetails.qtyUnit == 0) {
      this.qtyRemaining =
        this.ipcrDetails.totalIpcrQuantity -
        (this.ipcrService.ipcr_rem() - this.returnQty + this.ipcrDetails.qty);

      this.ipcrDetails.qty5 = Math.floor(
        this.ipcrDetails.qty * 0.3 + this.ipcrDetails.qty
      );
      this.ipcrDetails.qty4 = Math.floor(
        this.ipcrDetails.qty * 0.15 + this.ipcrDetails.qty
      );
      this.ipcrDetails.qty3 = Math.floor(this.ipcrDetails.qty);
      this.ipcrDetails.qty2 = Math.floor(this.ipcrDetails.qty / 2 + 1);
      this.ipcrDetails.qty1 = Math.floor(this.ipcrDetails.qty / 2);

      if (this.ipcrDetails.qty3 >= 4 && this.ipcrDetails.qty3 <= 6) {
        this.ipcrDetails.qty4 += 1;
        this.ipcrDetails.qty5 += 1;
      } else if (this.ipcrDetails.qty3 == 3) {
        this.ipcrDetails.qty4 += 1;
        this.ipcrDetails.qty5 += 2;
      } else if (this.ipcrDetails.qty3 == 2) {
        this.ipcrDetails.qty4 += 1;
        this.ipcrDetails.qty5 += 2;
        this.ipcrDetails.qty2 -= 1;
        this.ipcrDetails.qty1 -= 1;
      } else if (this.ipcrDetails.qty3 == 1) {
        this.ipcrDetails.qty5 = 1;
        this.ipcrDetails.qty4 = null;
        this.ipcrDetails.qty3 = null;
        this.ipcrDetails.qty2 = null;
        this.ipcrDetails.qty1 = null;
      } else if (this.ipcrDetails.qty <= 0) {
        this.ipcrDetails.qty5 = null;
        this.ipcrDetails.qty4 = null;
        this.ipcrDetails.qty3 = null;
        this.ipcrDetails.qty2 = null;
        this.ipcrDetails.qty1 = null;
      }

      if (this.qtyRemaining < 0 || this.ipcrDetails.qty < 0) {
        this.promptEdit = true;
      } else {
        this.promptEdit = false;
      }
    } else {
      if (
        this.ipcrDetails.qty > this.ipcrDetails.totalIpcrQuantity ||
        this.ipcrDetails.qty < 0
      ) {
        this.promptEdit = true;
      } else {
        this.promptEdit = false;
      }
    }
  }

  //continue remaining dpcr quantity gikan sa pag delete
  add_qtyRemaining: number | any;
  prompt: boolean = false;
  trapRemaining() {
    if (this.ipcrDetails.qtyUnit == 0) {
      this.add_qtyRemaining =
        this.dpcrQuantity - this.quantity - this.ipcrService.ipcr_rem();

      this.ipcrDetails.qty5 = Math.floor(this.quantity * 0.3 + this.quantity);
      this.ipcrDetails.qty4 = Math.floor(this.quantity * 0.15 + this.quantity);
      this.ipcrDetails.qty3 = Math.floor(this.quantity);
      this.ipcrDetails.qty2 = Math.floor(this.quantity / 2 + 1);
      this.ipcrDetails.qty1 = Math.floor(this.quantity / 2);

      if (this.ipcrDetails.qty3 >= 4 && this.ipcrDetails.qty3 <= 6) {
        this.ipcrDetails.qty4 += 1;
        this.ipcrDetails.qty5 += 1;
      } else if (this.ipcrDetails.qty3 == 3) {
        this.ipcrDetails.qty4 += 1;
        this.ipcrDetails.qty5 += 2;
      } else if (this.ipcrDetails.qty3 == 2) {
        this.ipcrDetails.qty4 += 1;
        this.ipcrDetails.qty5 += 2;
        this.ipcrDetails.qty2 -= 1;
        this.ipcrDetails.qty1 -= 1;
      } else if (this.ipcrDetails.qty3 == 1) {
        this.ipcrDetails.qty5 = 1;
        this.ipcrDetails.qty4 = null;
        this.ipcrDetails.qty3 = null;
        this.ipcrDetails.qty2 = null;
        this.ipcrDetails.qty1 = null;
      } else if (this.ipcrDetails.qty <= 0) {
        this.ipcrDetails.qty5 = null;
        this.ipcrDetails.qty4 = null;
        this.ipcrDetails.qty3 = null;
        this.ipcrDetails.qty2 = null;
        this.ipcrDetails.qty1 = null;
      }

      if (
        this.quantity > this.dpcrQuantity - this.ipcrService.ipcr_rem() ||
        this.quantity < 0
      ) {
        this.prompt = true;
      } else {
        this.prompt = false;
      }
    } else {
      if (this.quantity > this.dpcrQuantity || this.quantity < 0) {
        this.prompt = true;
      } else {
        this.prompt = false;
      }
    }
  }

  add_qtyRemainingST: number | any;
  promptST: boolean = false;
  trapRemainingST() {
    if (this.ipcrSTDetails.qtyUnit == 0) {
      this.add_qtyRemainingST =
        this.dpcrSTQuantity - this.quantityST - this.ipcrService.ipcrST_rem();

      this.ipcrSTDetails.qty5 = Math.floor(
        this.quantityST * 0.3 + this.quantityST
      );
      this.ipcrSTDetails.qty4 = Math.floor(
        this.quantityST * 0.15 + this.quantityST
      );
      this.ipcrSTDetails.qty3 = Math.floor(this.quantityST);
      this.ipcrSTDetails.qty2 = Math.floor(this.quantityST / 2 + 1);
      this.ipcrSTDetails.qty1 = Math.floor(this.quantityST / 2);

      if (this.ipcrSTDetails.qty3 >= 4 && this.ipcrSTDetails.qty3 <= 6) {
        this.ipcrSTDetails.qty4 += 1;
        this.ipcrSTDetails.qty5 += 1;
      } else if (this.ipcrSTDetails.qty3 == 3) {
        this.ipcrSTDetails.qty4 += 1;
        this.ipcrSTDetails.qty5 += 2;
      } else if (this.ipcrSTDetails.qty3 == 2) {
        this.ipcrSTDetails.qty4 += 1;
        this.ipcrSTDetails.qty5 += 2;
        this.ipcrSTDetails.qty2 -= 1;
        this.ipcrSTDetails.qty1 -= 1;
      } else if (this.ipcrSTDetails.qty3 == 1) {
        this.ipcrSTDetails.qty5 = 1;
        this.ipcrSTDetails.qty4 = null;
        this.ipcrSTDetails.qty3 = null;
        this.ipcrSTDetails.qty2 = null;
        this.ipcrSTDetails.qty1 = null;
      } else if (this.ipcrSTDetails.qty <= 0) {
        this.ipcrSTDetails.qty5 = null;
        this.ipcrSTDetails.qty4 = null;
        this.ipcrSTDetails.qty3 = null;
        this.ipcrSTDetails.qty2 = null;
        this.ipcrSTDetails.qty1 = null;
      }

      if (
        this.quantityST > this.dpcrSTQuantity - this.ipcrService.ipcrST_rem() ||
        this.quantityST < 0
      ) {
        this.promptST = true;
      } else {
        this.promptST = false;
      }
    } else {
      if (this.quantityST > this.dpcrSTQuantity || this.quantityST < 0) {
        this.promptST = true;
      } else {
        this.promptST = false;
      }
    }
  }

  calculateRatingST() {
    this.trapRemainingST();
  }

  qtyRemainingST: number | any;
  promptEditST: boolean = false;
  returnQtyST: number | any;
  calculateRatingSTEdit() {
    if (this.ipcrSTDetails.qtyUnit == 0) {
      this.qtyRemainingST =
        this.ipcrSTDetails.totalIpcrQuantityST -
        (this.ipcrService.ipcrST_rem() -
          this.returnQtyST +
          this.ipcrSTDetails.qty);
      this.ipcrSTDetails.qty5 = Math.floor(
        this.ipcrSTDetails.qty * 0.3 + this.ipcrSTDetails.qty
      );
      this.ipcrSTDetails.qty4 = Math.floor(
        this.ipcrSTDetails.qty * 0.15 + this.ipcrSTDetails.qty
      );
      this.ipcrSTDetails.qty3 = Math.floor(this.ipcrSTDetails.qty);
      this.ipcrSTDetails.qty2 = Math.floor(this.ipcrSTDetails.qty / 2 + 1);
      this.ipcrSTDetails.qty1 = Math.floor(this.ipcrSTDetails.qty / 2);

      if (this.ipcrSTDetails.qty3 >= 4 && this.ipcrSTDetails.qty3 <= 6) {
        this.ipcrSTDetails.qty4 += 1;
        this.ipcrSTDetails.qty5 += 1;
      } else if (this.ipcrSTDetails.qty3 == 3) {
        this.ipcrSTDetails.qty4 += 1;
        this.ipcrSTDetails.qty5 += 2;
      } else if (this.ipcrSTDetails.qty3 == 2) {
        this.ipcrSTDetails.qty4 += 1;
        this.ipcrSTDetails.qty5 += 2;
        this.ipcrSTDetails.qty2 -= 1;
        this.ipcrSTDetails.qty1 -= 1;
      } else if (this.ipcrSTDetails.qty3 == 1) {
        this.ipcrSTDetails.qty5 = 1;
        this.ipcrSTDetails.qty4 = null;
        this.ipcrSTDetails.qty3 = null;
        this.ipcrSTDetails.qty2 = null;
        this.ipcrSTDetails.qty1 = null;
      } else if (this.ipcrSTDetails.qty <= 0) {
        this.ipcrSTDetails.qty5 = null;
        this.ipcrSTDetails.qty4 = null;
        this.ipcrSTDetails.qty3 = null;
        this.ipcrSTDetails.qty2 = null;
        this.ipcrSTDetails.qty1 = null;
      }

      if (this.qtyRemainingST < 0 || this.ipcrSTDetails.qty < 0) {
        this.promptEditST = true;
      } else {
        this.promptEditST = false;
      }
    } else {
      if (
        this.ipcrSTDetails.qty > this.ipcrSTDetails.totalIpcrQuantityST ||
        this.ipcrSTDetails.qty < 0
      ) {
        this.promptEditST = true;
      } else {
        this.promptEditST = false;
      }
    }
  }

  setMFOs(set: number) {
    this.ipcrService.isCommon.set(set);
    this.ipcrService.ViewGetDPCR_IPCR();
    setTimeout(() => {
      this.ipcrService.sortExcist();
    }, 0);
  }
}
