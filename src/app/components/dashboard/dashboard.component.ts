import { Component } from '@angular/core';
import { eSigService } from 'src/app/service/eSig.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {
  constructor(
    private eSigService: eSigService
  ){}

  getData(event : any){
    console.log(event)
    this.eSigService.PosteSig(event);
    
  }
}
