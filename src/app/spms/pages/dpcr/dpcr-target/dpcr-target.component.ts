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

  isAddDpcr:boolean = false;

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

  GetDPCRData(){
    this.dpcrService.GetDpcrData();
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
