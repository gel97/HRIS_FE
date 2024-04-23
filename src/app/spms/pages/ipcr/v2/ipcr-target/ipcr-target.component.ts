import { Component, inject, OnInit } from '@angular/core';
import { IpcrService } from 'src/app/spms/service/ipcr.service';

@Component({
  selector: 'app-ipcr-target',
  templateUrl: './ipcr-target.component.html',
  styleUrls: ['./ipcr-target.component.css']
})
export class IpcrTargetComponent implements OnInit{
  ipcrService = inject(IpcrService);

  ipcrObj:any ={};

  isAddIpcr:boolean = false;

  ngOnInit(): void {
    this.localStorage();
  }


  handleShowIpcrData(value:boolean){
    if(!value){
        this.ipcrService.storageIsShow.set(0);
        localStorage.setItem('isShow_ipcr', '0');
        //this.ipcrService.GetIpcr();
    }
  }

  localStorage() {
    if (this.ipcrService.storageIsShow() == 1) {
      localStorage.setItem('isShow_ipcr', '1');
      //this.GetDPCRData();
    } else {
      localStorage.setItem('isShow_ipcr', '0');
      this.ipcrService.storageIsShow.set(0);
    }
  }
}
