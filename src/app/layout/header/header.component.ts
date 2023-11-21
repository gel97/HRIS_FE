import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserStoreService } from 'src/app/service/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private Auth: AuthService, private UserStore: UserStoreService) {}

  public fullName: string | any;
  public officeName: string | any;

  ngOnInit(): void {
    // this.storeCredentials();
    this.fullName = localStorage.getItem('fullName');
    this.officeName = localStorage.getItem('officeName');
  }

  // storeCredentials() {
  //   this.UserStore.getOfficeIdFromStore().subscribe((val) => {
  //     let officeId = this.Auth.getOfficeIdFromToken();
  //     // this.officeId = val || officeId;
  //     localStorage.setItem('officeId', officeId);
  //   });

  //   this.UserStore.getDivisionIdFromStore().subscribe((val) => {
  //     let divisionId = this.Auth.getDivisionIdFromToken();
  //     // this.divisionId = val || divisionId;
  //     localStorage.setItem('divisionId', divisionId);
  //   });
  // }

  Logout() {
    this.Auth.signout();
  }
}
