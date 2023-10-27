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
  userId = 'useripcrid123';
  ipcrDetails: any = {};
  ipcrSTDetails: any = {};

  ipcrService = inject(IpcrService);
  ipcr = this.ipcrService.ipcr();
  get_ipcrDetails = this.ipcrService.ipcrDetails();
  dpcr_ipcr = this.ipcrService.dpcr_ipcr();

  isShow: number | any = this.ipcrService.storageIsShow;
  ipcrId: string | any = this.ipcrService.storageIpcrId;
  ipcrData: string | any = this.ipcrService.storageIpcrData;

  isExpand: boolean = false;
  dpcrQuantity: number | any;
  dpcrSTQuantity: number | any;
  quantity: number | any;
  quantityST: number | any;

  ngOnInit(): void {
    this.ipcrService.GetIPCRs(this.getYear, this.divisionId, this.userId);
    // this.ipcrService.ViewGetDPCR_IPCR();
    console.log(this.dpcr_ipcr);
    this.localStorage();
  }

  localStorage() {
    if (this.ipcrService.storageIsShow() == 1) {
      this.ipcrService.GetIPCRDetails();
      this.ipcrService.ViewGetDPCR_IPCR();

      this.sortExcist();
    } else {
      this.ipcrService.storageIsShow.set(0);
    }
  }

  IPCRDetails(ipcrId: string, details: string) {
    localStorage.setItem('isShow_ipcr', '1');
    this.ipcrService.storageIsShow.set(1);

    localStorage.setItem('ipcrId', ipcrId);
    this.ipcrService.storageIpcrId.set(ipcrId);

    localStorage.setItem('ipcrData', details);
    this.ipcrService.storageIpcrData.set(details);
    this.localStorage();
  }

  PostIPCRDetails() {
    this.ipcrDetails.qty = this.quantity;
    this.ipcrDetails.ipcrId = localStorage.getItem('ipcrId');
    this.ipcrService.AddIPCRData(this.ipcrDetails);
    console.log('ipcrdetails', this.ipcrDetails);
  }

  PostIPCRSTDetails() {
    this.ipcrSTDetails.qty = this.quantityST;
    this.ipcrSTDetails.ipcrId = localStorage.getItem('ipcrId');
    this.ipcrService.AddIPCRData(this.ipcrSTDetails);
  }

  removeLocalStorage() {
    localStorage.setItem('isShow_ipcr', '0');
    this.ipcrService.storageIsShow.set(0);

    localStorage.setItem('ipcrId', '');
    this.ipcrService.storageIpcrId.set(null);

    localStorage.setItem('ipcrData', '');
    this.ipcrService.storageIpcrData.set(null);
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

  calculateRating() {
    this.ipcrDetails.qty5 = Math.floor(this.quantity * 0.3 + this.quantity);
    this.ipcrDetails.qty4 = Math.floor(this.quantity * 0.15 + this.quantity);
    this.ipcrDetails.qty3 = Math.floor(this.quantity);
    this.ipcrDetails.qty2 = Math.floor(this.quantity / 2 + 1);
    this.ipcrDetails.qty1 = Math.floor(this.quantity / 2);
  }

  calculateRatingST() {
    this.ipcrSTDetails.qty5 = Math.floor(
      this.quantityST * 0.3 + this.quantityST
    );
    this.ipcrSTDetails.qty4 = Math.floor(
      this.quantityST * 0.15 + this.quantityST
    );
    this.ipcrSTDetails.qty3 = Math.floor(this.quantityST);
    this.ipcrSTDetails.qty2 = Math.floor(this.quantityST / 2 + 1);
    this.ipcrSTDetails.qty1 = Math.floor(this.quantityST / 2);
  }

  setMFOs(set: number) {
    this.ipcrService.isCommon.set(set);
    this.localStorage();
  }

  counter: number = 0;
  sortExcist() {
    setTimeout(() => {
      console.log('ipcrdetails', this.get_ipcrDetails.data);
      console.log('dpcr_ipcrData', this.dpcr_ipcr.data);
      for (let outerItem of this.get_ipcrDetails.data) {
        for (let innerItem of outerItem.si) {
          for (let opcrDetail of this.dpcr_ipcr.data) {
            for (let opcrDetailItem of opcrDetail.si) {
              if (innerItem.indicatorId == opcrDetailItem.indicatorId) {
                this.counter += 1;
              }
            }
          }
        }
      }
      console.log('counter', this.counter);

      while (this.counter != 0) {
        this.counter -= 1;
        for (let outerItem of this.dpcr_ipcr.data) {
          for (let innerItem of outerItem.si) {
            for (let opcrDetail of this.get_ipcrDetails.data) {
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
    }, 1000);
  }
}
