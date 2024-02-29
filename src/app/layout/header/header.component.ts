import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UtlityService } from 'src/app/spms/service/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private Auth: AuthService,
    private ProfilePicture: UtlityService
  ) {}

  public fullName: string | any;
  public officeName: string | any;
  public divisionName: string |any;
  public profilePicture: any = {};

  ngOnInit(): void {
    this.fullName = localStorage.getItem('fullName');
    this.officeName = localStorage.getItem('officeName');
    this.divisionName = localStorage.getItem('divisionName');
    this.get_profile_picture();
  }

  get_profile_picture() {
    this.ProfilePicture.get_profile_picture(
      localStorage.getItem('userId')
    ).subscribe({
      next: (data: any) => {
        this.profilePicture = data;
      },
      error: (error: any) => {},
      complete: () => {},
    });
  }

  Logout() {
    this.Auth.signout();
  }
}
