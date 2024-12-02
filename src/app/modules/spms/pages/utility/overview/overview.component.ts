import { Component, inject } from '@angular/core';
import { OverviewService } from 'src/app/modules/spms/service/utility/overview.service';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent {
  overviewService = inject(OverviewService);
  mfoesTgt = this.overviewService.mfoesTgt();
  officeName = localStorage.getItem('officeName');

  isSubmitted:any = null;
  filterData:any = [];

  isLoading:boolean = true;
  yearNow = new Date().getFullYear();
  listYear: any = [];
  startYear:any = 2022;

  ngOnInit(): void {
    for (let year = this.startYear; year <= this.yearNow; year++) {
      this.listYear.push(year);
    }
    this.initData();
  }

  handleClear(){
    this.isSubmitted = null;
    //this.initData();
  }

  filterBySubmitted(event:any){
    let data:any = [];
    console.log(event.target.value)

    if(event.target.value){
      this.submittedOffices();

    }else{
      this.unsubmittedOffices

    }

    console.log(this.filterData)
    console.log(this.overviewService.mfoesTgt().data)

  }

  initData(){
    this.overviewService.GetOverviewMfoTargetOffices(this.yearNow.toString());

    setTimeout(() => {
      this.filterData =  this.overviewService.mfoesTgt().data;
      this.isLoading = false;
    }, 2000);
  }

  onChangeYear(event: any) {
    this.initData()
  }

  submittedOffices(){
    this.isSubmitted = true;
    this.filterData = [];
    this.overviewService.mfoesTgt().data.forEach((a:any) => {
      if(a!.opcr !== null){
        if(a!.opcr!.submitAt !== null){
          this.filterData.push(a)
        }
      }
      
    });
    console.log(this.filterData)

  }

  unsubmittedOffices(){
    this.isSubmitted = false;
    this.filterData = [];
    this.overviewService.mfoesTgt().data.forEach((a:any) => {

      if(a!.opcr !== null){
        if(a!.opcr!.submitAt === null){
          this.filterData.push(a)
        }
      }

      if(a!.opcr === null){
        this.filterData.push(a)
      }
      
    });

    console.log(this.filterData)

  }
}
