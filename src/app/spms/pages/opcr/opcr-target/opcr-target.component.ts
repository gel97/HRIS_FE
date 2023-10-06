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
  isShow: number | any = this.opcrService.storageIsShow;

  mfo: any = this.mfoService.mfo;
  mfoDetails: any = {};
  opcrDetails: any = this.opcrService.opcrDetails;
  officeDivision: any = this.opcrService.officeDivision;
  opcrName: string | any = '';
  flag: number = 0;
  data: any = {};
  isCheck: boolean[] = []; // An array to store checkbox values (true if selected, false if not)
  selectedDivisions: string[] = []; // An array to store selected division names
  isSearchLoading: any = this.mfoService.isSearchLoading;
  search: any = {};
  editopcrDetails: any = {};
  editMFODetails: any = {};
  division:any = [];
  isExpandMfoes:boolean= false;
  
  ngOnInit(): void {
    this.localStorage();
    this.GetOPCRs();
    this.mfoService.GetMFOes();
    this.GetOfficeDivision();
    this.sortExcist();
  }

  localStorage() {
    if (this.opcrService.storageIsShow() === '1') {
      this.opcrService.GetOPCRDetails();
    } else {
      localStorage.setItem('isShow', '0');
      this.opcrService.storageIsShow.set(0);
    }
  }

  displayDivision(sharedDiv:string){
   this.division = [];   
    this.officeDivision().data.map((a:any)=>{
      if (sharedDiv.includes(a.divisionName)) {
        this.division.push({divisionName:a.divisionName, isCheckDiv: true})
      }
      else{
        this.division.push({divisionName:a.divisionName, isCheckDiv: false})
      }
    });
  }

  onCheckDivision(divName:string, event:any){
   let index = this.division.findIndex((a:any) => a.divisionName === divName);
   this.division[index].isCheckDiv = event.target.checked;
  }

  sharedDivValue(){
    let value = "";
    this.division.map((a:any)=>{
      if(a.isCheckDiv){
        value += a.divisionName+"/";
      }
    })
    return value.slice(0, -1);
  }

  clearSelectedDiv(){
    this.division.map((a:any)=>{
      a.isCheckDiv = false;
    })
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

  GetOPCRs() {
    this.opcrService.GetOPCRs(this.getYear, this.officeId);
  }

  GetMFOs() {
    this.mfoService.GetMFOes();
  }

  GetOfficeDivision() {
    this.opcrService.GetOfficeDivision(this.officeId);
    setTimeout(() => {
      this.displayDivision("");
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

  PostOPCRDetails() {
    this.mfoDetails.sharedDiv = this.sharedDivValue();
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

  onChangeYear(year: any) {
    this.opcrService.GetOPCRs(year, this.officeId);
  }

  OPCRDetails(opcrid: string, opcrdetails: string) {
    this.opcrService.storageIsShow.set(1);
    this.opcrService.storageOpcrId.set(opcrid);
    this.opcrService.storageOpcrDetails.set(opcrdetails);

    localStorage.setItem('isShow', '1');
    localStorage.setItem('opcrId', opcrid);
    localStorage.setItem('opcrDetails', opcrdetails);

    this.opcrService.GetOPCRDetails();
    console.log('opcr', this.opcrDetails());
    this.sortExcist();
  }

  qtyUnit(value: number) {
    this.mfoDetails.qtyUnit = value;
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
    this.opcrService.storageIsShow.set(0);
    this.opcrService.storageOpcrId.set(null);
    this.opcrService.storageOpcrDetails.set(null);

    localStorage.setItem('isShow', '0');
    localStorage.setItem('opcrId', '');
    localStorage.setItem('opcrName', '');

    this.GetMFOs();
  }
}
