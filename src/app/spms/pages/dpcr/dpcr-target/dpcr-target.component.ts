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
  isAddDpcrData:boolean = false;
  isShowSubtask:boolean = false;
  isShowCanvasOpcrMfoes:boolean = false;

  addType:number = 0;

  currentYear: number = new Date().getFullYear();

  ngOnInit(): void {
    this.dpcrService.isCommonDivision.set(0);
    this.dpcrService.year.set(this.currentYear);
    this.dpcrService.GetDpcr();
    this.localStorage();
  }

  AddDpcr(){
    if (this.dpcrObj.MFO !== undefined || this.dpcrObj.MFO !== '') {  
      this.dpcrService.AddDpcr(this.dpcrObj);
    }
  }

  EditDpcr(){
    this.dpcrService.EditDpcr(this.dpcrObj);
  }

  DeleteDpcr(dpcrId:string){
    this.dpcrService.DeleteDpcr(dpcrId);
  }

  AddDpcrData(){
    this.dpcrSIData.isSubTask = 0;
    this.dpcrSIData.MFOId = this.dpcrMFOData.mfoId ?? null; 
    this.dpcrSIData.categoryId = this.dpcrMFOData.categoryId ?? null;

    this.dpcrService.AddDpcrData(this.dpcrSIData);
  }

  EditDpcrData(){
    //console.log(this.dpcrSIData)
    this.dpcrService.EditDpcrData(this.dpcrSIData);
  }


  GetDPCRData(){
    this.dpcrService.GetDpcrData();
  }

  DeleteDPCRData(dpcrDataId:string){
    this.dpcrService.DeleteDPCRData(dpcrDataId);
  }

  DeleteSubtask(subTaskId:string){
    this.dpcrService.DeleteSubtask(subTaskId);
  }

  AddSubTask(data:any){
    this.dpcrService.AddSubTask(data);
  }

  GetDPCRDataSubtask(){
    this.dpcrService.GetDpcrDataSubtask(this.dpcrMFOData.mfoId);
  }

  SetDpcrActive(data:any){
    this.dpcrService.SetDpcrActive(data);
  }

  handleShowDpcrData(value:boolean){
  if(this.isShowSubtask){
    this.isShowSubtask = false;
  }
  else if(!value){
      this.dpcrService.storageIsShowDpcrData.set(0);
      localStorage.setItem('isShowDpcrData', '0');
      this.dpcrService.GetDpcr();
  }

  }
  setDpcrDataObj(data:any){
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
