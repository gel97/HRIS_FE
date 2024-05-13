import { Component, inject } from '@angular/core';
import { OverviewService } from 'src/app/spms/service/utility/overview.service';
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

  ngOnInit(): void {
    this.initData()
  }

  handleClear(){
    this.isSubmitted = null;
    this.initData();
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
    this.overviewService.GetOverviewMfoTargetOffices();
    setTimeout(() => {
      this.filterData =  this.overviewService.mfoesTgt().data;

    }, 2000);
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
