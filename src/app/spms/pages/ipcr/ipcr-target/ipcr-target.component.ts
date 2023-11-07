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
      this.removeMFO();
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
    this.ipcrService.AddIPCRSubData(this.ipcrSTDetails);
  }

  DeleteIPCRDetails(value: any) {
    console.log('delete data', value);
    this.ipcrService.DeleteIPCRDetails(value);
  }

  DeleteIPCRSTDetails(value: any) {
    console.log('delete data', value);
    this.ipcrService.DeleteIPCRSTDetails(value);
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
  counter_mfo: number = 0;
  sortExcist() {
    setTimeout(() => {
      console.log('ipcrdetails', this.get_ipcrDetails.data);
      console.log('dpcr_ipcrData', this.dpcr_ipcr.data);
      for (let a of this.dpcr_ipcr.data) {
        for (let b_dpcr_ipcr of a.si) {
          for (let x of this.get_ipcrDetails.data) {
            for (let y_ipcrDetails of x.si) {
              if (b_dpcr_ipcr.indicatorId == y_ipcrDetails.indicatorId) {
                if (b_dpcr_ipcr.isSubTask == 0) {
                  console.log('here not subtask');
                  this.counter += 1;
                } else {
                  for (let j of b_dpcr_ipcr.st) {
                    for (let k of y_ipcrDetails.st) {
                      if (j.subTaskId == k.subTaskId) {
                        this.counter += 1;
                        console.log('here st subtask');
                      }
                    }
                  }
                  // if (b_dpcr_ipcr.st.length == 0) {
                  //   this.counter += 1;
                  // }
                }
              }
              // console.log('subtask', b.isSubTask);
              // if (b.isSubTask == 0) {
              //   this.counter += 1;
              //   console.log('here 0 ');
              // } else {
              //   console.log('here 1');
              // }
              // else {
              //   for (let x of innerItem.st) {
              //     for (let y of opcrDetailItem.st) {
              //       if (x.indicatorId == y.subTaskId) {
              //         this.counter += 1;
              //         console.log('here subtask');
              //       }
              //     }
              //   }
              // }
              // if (
              //   innerItem.indicatorId == opcrDetailItem.indicatorId &&
              //   opcrDetailItem.st.length == 0
              // ) {
              //   console.log('here not subtask');
              //   this.counter += 1;
              // } else {
              //   for (let x of innerItem.st) {
              //     for (let y of opcrDetailItem.st) {
              //       if (x.indicatorId == y.subTaskId) {
              //         console.log('here subtask');
              //         this.counter += 1;
              //       }
              //     }
              //   }
              // }
              // if (
              //   innerItem.indicatorId == opcrDetailItem.indicatorId &&
              //   opcrDetailItem.isSubTask != 0
              // ) {
              //   console.log('here mfo subtask');
              //   this.counter += 1;
              // }
            }
          }
        }
      }
      console.log('counter', this.counter);

      while (this.counter != 0) {
        this.counter -= 1;

        // for (let outerItem of this.dpcr_ipcr.data) {
        //   for (let innerItem of outerItem.si) {
        //     for (let opcrDetail of this.get_ipcrDetails.data) {
        //       for (let opcrDetailItem of opcrDetail.si) {

        for (let a of this.dpcr_ipcr.data) {
          for (let b_dpcr_ipcr of a.si) {
            for (let x of this.get_ipcrDetails.data) {
              for (let y_ipcrDetails of x.si) {
                if (b_dpcr_ipcr.indicatorId == y_ipcrDetails.indicatorId) {
                  if (b_dpcr_ipcr.isSubTask == 0) {
                    // console.log('here not subtask');
                    // this.counter += 1;
                    const indexToRemove = a.si.indexOf(b_dpcr_ipcr);
                    if (indexToRemove !== -1) {
                      a.si.splice(indexToRemove, 1);
                    }
                  } else {
                    // if (b_dpcr_ipcr.st.length == 0) {
                    //   // this.counter += 1;
                    //   const indexToRemove = a.si.indexOf(b_dpcr_ipcr);
                    //   if (indexToRemove !== -1) {
                    //     a.si.splice(indexToRemove, 1);
                    //   }
                    // }
                    for (let j of b_dpcr_ipcr.st) {
                      for (let k of y_ipcrDetails.st) {
                        if (j.subTaskId == k.subTaskId) {
                          // this.counter += 1;
                          // console.log('here st subtask');
                          const indexToRemove = b_dpcr_ipcr.st.indexOf(j);
                          if (indexToRemove !== -1) {
                            b_dpcr_ipcr.st.splice(indexToRemove, 1);
                          }
                        }
                      }
                    }
                    if (b_dpcr_ipcr.st.length == 0) {
                      console.log('empty mfo');
                      const indexToRemove = a.si.indexOf(b_dpcr_ipcr);
                      if (indexToRemove !== -1) {
                        a.si.splice(indexToRemove, 1);
                      }
                    }
                  }
                }

                // if (
                //   innerItem.indicatorId == opcrDetailItem.indicatorId &&
                //   opcrDetailItem.st.length == 0
                // ) {
                //   // Find the index of the item in the array and remove it using splice
                //   const indexToRemove = outerItem.si.indexOf(innerItem);
                //   if (indexToRemove !== -1) {
                //     outerItem.si.splice(indexToRemove, 1);
                //   }
                // } else if (
                //   innerItem.indicatorId == opcrDetailItem.indicatorId &&
                //   opcrDetailItem.st.length != 0
                // ) {
                //   for (let x of innerItem.st) {
                //     for (let y of opcrDetailItem.st) {
                //       if (x.subTaskId == y.indicatorId) {
                //         // this.counter += 1;
                //         const indexToRemove = innerItem.st.indexOf(x);
                //         if (indexToRemove !== -1) {
                //           innerItem.st.splice(indexToRemove, 1);
                //         }
                //       }
                //     }
                //   }
                // }
              }
            }
          }
        }
        console.log('counter_mfo', this.counter_mfo);
      }
    }, 1000);
  }

  removeMFO() {
    setTimeout(() => {
      console.log('ipcrdetails_mfoszxc', this.get_ipcrDetails.data);
      for (let a of this.get_ipcrDetails.data) {
        for (let a_si of a.si) {
          if (a_si.isSubTask == 1 && a_si.st.length == 0) {
            console.log('mfo removed');
            // const indexToRemove = a.si.indexOf(a_si);
            // if (indexToRemove !== -1) {
            //   a.si.splice(indexToRemove, 1);
            // }
            this.ipcrService.DeleteMFO(a_si.ipcrDataId);
          }
        }
      }
    }, 1000);
  }
}
