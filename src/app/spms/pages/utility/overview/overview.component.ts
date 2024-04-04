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

  ngOnInit(): void {
    this.overviewService.GetOverviewMfoTargetOffices();
  }
}
