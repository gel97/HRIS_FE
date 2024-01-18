import {
  AfterViewInit,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { take } from 'rxjs';
import { UtlityService } from 'src/app/spms/service/utility.service';
import { AlertService } from 'src/app/spms/service/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface employee {
  eic: string;
}
@Component({
  selector: 'app-utility-focal',
  templateUrl: './utility-focal.component.html',
  styleUrls: ['./utility-focal.component.css'],
})
export class UtilityFocalComponent implements OnInit {
  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  constructor(private _utilService: UtlityService) {}
  utilService = inject(UtlityService);
  alertService = inject(AlertService);
  employee_list: any = [];
  employee_role: any = [];
  role: any = [];
  role_list: any = [];
  empListfitler: any = signal<employee[]>;
  userEIC: any = '';
  user_role: any = [];
  user_role_list: any = [];
  user_menu: any = [];
  SearchName: any = '';
  SearchOffice: any = '';
  isAssignOffice: boolean = false;

  addRoleDisplay: any = 1;
  allComplete: any;
  offices: any = [];
  staticOffices: any = [];

  focalData: any = {};

  ngOnInit() {
    this.initData();
    this.get_offices();
  }

  get_offices() {
    this._utilService.get_office().subscribe(
      (response: any) => {
        this.offices = <any>response;
        this.staticOffices = <any>response;
      },
      (err) => {
        alert('error');
      }
    );
  }

  assign_office_focal() {
    this.focalData.userEIC = this.userEIC;
    this._utilService.assign_office_focal(this.focalData).subscribe(
      (request) => {},
      (err) => {
        this.alertService.error();
      }
    );
  }

  reAssign_office_focal() {
    this.focalData.userEIC = this.userEIC;
    this._utilService.assign_office_focal(this.focalData).subscribe(
      (request) => {
        this.initData();
        this.addRoleDisplay = 1;
        this.alertService.update();
      },
      (err) => {
        this.alertService.error();
      }
    );
  }

  searchOffice() {
    if (!this.SearchOffice) {
      this.offices = this.staticOffices;
      return;
    }
    let data = this.offices.filter((obj: any = []) => {
      return obj.officeNameShort.toLowerCase().indexOf(this.SearchOffice.toLowerCase()) > -1;
    });
    this.offices = data;
  }

  searchByEIC(eicValue: string): any {
    return this.employee_list.find(
      (employee: any) => employee.EIC === eicValue
    );
  }

  initData() {
    this._utilService.gettPMRole().subscribe(
      (response: any) => {
        this.role = <any>response;
        this.role_list = <any>response;
        this.role.forEach((i: any) => {
          i.user = [];
        });
      },
      (err) => {
        alert('error');
      }
    );
    this._utilService.get_employee_list().subscribe(
      (response: any) => {
        this.employee_list = <any>response;
        this.searchFilter();
        this.total_user();
        this.get_user_profile();
      },
      (err) => {
        alert('error');
      }
    );
    this._utilService.get_employee_role('').subscribe(
      (response: any) => {
        this.employee_role = <any>response;
        for (let i of this.employee_role) {
          i.profile = '';
        }
      },
      (err) => {
        alert('error');
      }
    );
  }
  total_user() {
    for (let i of this.employee_role) {
      for (let e of i.role) {
        for (let r = 0; r < this.role.length; r++) {
          if (e.roleId == this.role[r].roleId) {
            this.role[r].user.push(i);
            break;
          }
        }
      }
    }
  }
  get_user_profile() {
    for (let i of this.employee_role) {
      this._utilService.get_profile_picture(i.eic).subscribe(
        (request) => {
          i.profile = (<any>request).imageDataURL;
        },
        (err) => {
          // alert('error')
        }
      );
    }
  }
  searchFilter() {
    if (!this.SearchName) {
      this.empListfitler = signal<any[]>(this.employee_list);
      return;
    }
    let data = this.employee_list.filter((obj: any = []) => {
      return obj.fullNameFirst.toLowerCase().indexOf(this.SearchName) > -1;
    });
    this.empListfitler = signal<any[]>(data);
  }
  userMenus() {
    this._utilService
      .get_user_role(this.userEIC)
      .pipe(take(1))
      .subscribe(
        (response: any) => {
          this.user_menu = <any>response;
        },
        (err) => {
          alert('error');
        }
      );

    this.user_role = [];
    this._utilService.gettPMRole().subscribe(
      (response: any) => {
        this.role_list = <any>response;
        for (let i of this.employee_role) {
          if (i.eic == this.userEIC) {
            this.user_role = i.role;
            for (let q of this.user_role) {
              for (let e = 0; e < this.role_list.length; e++) {
                if (q.roleId == this.role_list[e].roleId) {
                  this.role_list.splice(e, 1);
                  break;
                }
              }
            }
            break;
          }
        }
      },
      (err) => {
        alert('error');
      }
    );

    let data: any = this.employee_list.find(
      (employee: any) => employee.eic === this.userEIC
    );
    if (data.officeId === null) {
      this.isAssignOffice = true;
      this.focalData.officeId = null;

    }else{
      this.focalData.officeId = data.officeId
      this.isAssignOffice = true;
    }
  }
  updateUserRole() {
  }
  select_All_Role(completed: boolean) {
    // for (let i of this.role_list) {
    //   i.isCheck=true;
    // }
    if (completed) {
      this.role_list.forEach((i: any) => {
        i.isCheck = true;
      });
      return;
    }
    this.role_list.forEach((i: any) => {
      i.isCheck = false;
    });
  }
  check_Complete(): boolean {
    if (this.role_list == null) {
      return false;
    }
    return (
      this.role_list.filter((i: any) => i.isCheck).length > 0 &&
      !this.allComplete
    );
  }
  update_All_Check() {
    this.allComplete =
      this.role_list != null && this.role_list.every((t: any) => t.isCheck);
  }
  addUserMenu() {
    if (!this.userEIC) {
      this.alertService.customError('Please Select User');
      return;
    }
    if (this.role_list.filter((i: any) => i.isCheck).length <= 0) {
      this.alertService.customError('Please Select Role');
      return;
    }
    for (let i of this.role_list) {
      if (i.isCheck) {
        i.isProgress = true;
        i.EIC = this.userEIC;
      }
    }
    this.assign_office_focal();
    this._utilService.add_user_menu(this.role_list, this.userEIC).subscribe(
      (request) => {
        this.alertService.save();
        this.initData();
        this.userMenus();
        for (let i of this.role_list) {
          if (i.isCheck) {
            i.isProgress = false;
          }
        }
      },
      (err) => {
        this.alertService.error();
      }
    );
  }
  delete_user_role(transId: any) {
    this._utilService.delete_user_role(transId).subscribe(
      (request) => {
        this.alertService.save();
        this.initData();
      },
      (err) => {
        this.alertService.error();
      }
    );
  }
}
