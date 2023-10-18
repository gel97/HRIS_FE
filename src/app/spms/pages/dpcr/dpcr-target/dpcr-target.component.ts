import { Component, OnInit, inject } from '@angular/core';
import { MfoService } from 'src/app/spms/service/mfo.service';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
@Component({
  selector: 'app-dpcr-target',
  templateUrl: './dpcr-target.component.html',
  styleUrls: ['./dpcr-target.component.css']
})
export class DpcrTargetComponent implements OnInit{
  mfoService = inject(MfoService);
  dpcrService = inject(DpcrService);

  dpcr = this.dpcrService.dpcr();
  dpcrData = this.dpcrService.dpcrData();
  dpcrDataMfoes = this.dpcrService.dpcrDataMfoes();

  dpcrObj:any ={};
  dpcrMFOData:any ={};
  dpcrSIData:any ={};

  isAddDpcr:boolean = false;
  isShowSubtask:boolean = false;

  ngOnInit(): void {
    this.dpcrService.GetDpcr();
    this.localStorage();
    console.log(this.dpcr)
    
  }

  AddDpcr(){
    if (this.dpcrObj.MFO !== undefined || this.dpcrObj.MFO !== '') {  
      this.dpcrService.AddDpcr(this.dpcrObj);
    }
  }

  AddDpcrData(){
    console.log(this.dpcrSIData);
    this.dpcrSIData.isSubTask = 0;
    this.dpcrService.AddDpcrData(this.dpcrSIData);
  }

  AddSubTask(data:any){
    console.log(data)
    this.dpcrService.AddSubTask(data);
  }

  GetDPCRData(){
    this.dpcrService.GetDpcrData();
  }

  DeleteDPCRData(dpcrDataId:string){
    this.dpcrService.DeleteDPCRData(dpcrDataId);
  }

  GetDPCRDataSubtask(){
    this.dpcrService.GetDpcrDataSubtask(this.dpcrMFOData.mfoId);
  }

  handleShowDpcrData(value:boolean){
  if(this.isShowSubtask){
    this.isShowSubtask = false;
  }
  else if(!value){
      this.dpcrService.storageIsShowDpcrData.set(0);
      localStorage.setItem('isShowDpcrData', '0');
  }

  }
  setDpcrDataObj(data:any){
    console.log(data)
    this.dpcrMFOData = data.mfoData;
    this.dpcrSIData = data.siData;
  }

  localStorage() {
    if (this.dpcrService.storageIsShowDpcrData() == 1) {
      localStorage.setItem('isShowDpcrData', '1');
      this.GetDPCRData();
    } else {
      localStorage.setItem('isShowDpcrData', '0');
      this.dpcrService.storageIsShowDpcrData.set(0);
    }
  }
}
