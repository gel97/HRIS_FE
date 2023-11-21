import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserStoreService } from 'src/app/service/user-store.service';

@Component({
  selector: 'app-mainlayout',
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.css'],
})
export class MainlayoutComponent implements OnInit {
  constructor(private Auth: AuthService, private UserStore: UserStoreService) {}

  public fullName: string | any;
  public officeName: string | any;
  public officeId: string | any;
  public divisionId: string | any;
  ngOnInit(): void {
    this.storeCredentials();
    this.fullName = localStorage.getItem('fullName');
    this.officeName = localStorage.getItem('officeName');
  }

  storeCredentials() {
    this.UserStore.getOfficeIdFromStore().subscribe((val) => {
      let officeId = this.Auth.getOfficeIdFromToken();
      this.officeId = val || officeId;
      localStorage.setItem('officeId', this.officeId);
    });

    this.UserStore.getDivisionIdFromStore().subscribe((val) => {
      let divisionId = this.Auth.getDivisionIdFromToken();
      this.divisionId = val || divisionId;
      localStorage.setItem('divisionId', this.divisionId);
    });
  }
}
