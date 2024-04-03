import { Component, OnInit, inject } from '@angular/core';
import { DashboardService } from 'src/app/spms/service/dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardService = inject(DashboardService);
  mfoesTgt = this.dashboardService.mfoesTgt();
  officeName = localStorage.getItem('officeName');

  ngOnInit(): void {
    this.dashboardService.GetDashboardMfoTargetOffices();
  }
}
