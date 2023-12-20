import { Component, OnInit, inject } from '@angular/core';
import { IpcrService } from 'src/app/spms/service/ipcr.service';
@Component({
  selector: 'app-ipcr-actual',
  templateUrl: './ipcr-actual.component.html',
  styleUrls: ['./ipcr-actual.component.css']
})
export class IpcrActualComponent implements OnInit {
  ipcrService = inject(IpcrService);
  ipcrIdActual = localStorage.getItem('ipcrIdActual')

  ngOnInit(): void {
    this.init()
  }

  init(){
    if(this.ipcrIdActual){
      this.ipcrService.isShowIpcrDataActual.set(1);
      this.ipcrService.GetIPCRDataActual(this.ipcrIdActual);
    }else{
      this.ipcrService.isShowIpcrDataActual.set(0);
    }
  }

}
