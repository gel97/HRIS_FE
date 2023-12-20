import { Component, inject, OnInit  } from '@angular/core';
import { OtsService } from 'src/app/spms/service/ots.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  otsService = inject(OtsService);
  ots = this.otsService.ots();
  otsMfoes = this.otsService.otsMfoes();
  
  ngOnInit(): void {
    this.otsService.GetOts();
    this.otsService.GetCheckUserOpenIpcr();
  }


  AddOts(data:any){
    this.otsService.AddOts(data);
  }
}
