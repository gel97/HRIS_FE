import { Component, OnInit, inject } from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
import { UtlityService } from 'src/app/spms/service/utility.service';
@Component({
  selector: 'app-employee-rating',
  templateUrl: './employee-rating.component.html',
  styleUrls: ['./employee-rating.component.css']
})
export class EmployeeRatingComponent implements OnInit{
  dpcrService    = inject(DpcrService);
  utilityService = inject(UtlityService);

  employeesRating = this.dpcrService.dpcrEmployeeRating();
  dpcr = this.dpcrService.dpcr();

  dpcrId = this.dpcrService.selectedDprcId();

  ngOnInit(): void {
    this.dpcrService.GetDpcrDivisions();
  }

  GetEmployeeRating(){
    this.dpcrService.GetDpcrEmployeeRating(this.dpcrId);
  }


}
