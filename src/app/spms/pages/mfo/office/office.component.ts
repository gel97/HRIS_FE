import { Component, OnInit ,inject, signal } from '@angular/core';
import { ErrorService } from 'src/app/spms/service/error.service';

import { MfoService } from 'src/app/spms/service/mfo.service';
@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit{
  mfoService   = inject(MfoService);
  errorService = inject(ErrorService);

  mfo:any = this.mfoService.mfo;
  isSearchLoading:any = this.mfoService.isSearchLoading;

  error:any    = this.errorService.error;

  officeId = "OFFPHRMONZ3WT7D";
  expandedRow:any;
  expandedRowChild:any;

  data:any = {
    officeId: this.officeId
  };
  search:any = {};
  isExistMfo:boolean = false;

  ngOnInit(): void {

    this.mfoService.GetMFOes(this.officeId);
    console.log(this.mfo())

  }
  

  AddMfo(){
    this.data.officeId = this.officeId;
    if(this.data.MFO !== undefined || this.data.MFO !== ''){
      this.mfoService.AddMfo(this.data);
    }


  }

  CheckMfoIfExist(){
    this.mfoService.CheckMfoIfExist(this.data).subscribe((isExist: boolean) => {
      console.log(this.isExistMfo);
    });
  }

  searchMfoOffice(){
    this.search.officeId = this.officeId;
    this.mfoService.SearchMfoOffice(this.search);

  }
}
