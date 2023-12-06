import { Component, inject, OnInit } from '@angular/core';
import { UserDivisionService } from 'src/app/spms/service/utility/user-division.service';
@Component({
  selector: 'app-user-division',
  templateUrl: './user-division.component.html',
  styleUrls: ['./user-division.component.css']
})
export class UserDivisionComponent implements OnInit {
  userDivisionService = inject(UserDivisionService);

  empNoDiv:any = this.userDivisionService.empNoDiv(); 
  empDiv:any = this.userDivisionService.empDiv(); 
  officeDivision:any = this.userDivisionService.officeDivision(); 
  officeRole:any = this.userDivisionService.officeRole(); 

  ngOnInit(): void {
    this.GetData();
  }

  GetData(){
    this.userDivisionService.PostEmpDiv();
    this.userDivisionService.PostEmpNoDiv();
    this.userDivisionService.GetOfficeDivision();
    this.userDivisionService.GetOfficeRole();

  }

  AddEmployeeDivision(data:any){
    this.userDivisionService.AddUserDivision(data)
  }

  UpdateEmployeeDivision(data:any){
    this.userDivisionService.UpdateUserDivision(data)
  }

  UpdateOfficeRole(data:any){
    this.userDivisionService.UpdateOfficeRole(data)
  }
}
