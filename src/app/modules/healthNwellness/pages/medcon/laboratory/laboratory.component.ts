import { Component, OnInit, inject } from '@angular/core';
import { MedconService } from '../../../services/medcon.service';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css'],
})
export class LaboratoryComponent implements OnInit {
  medconService = inject(MedconService);

  labHistory: any = this.medconService.labHistory();

  ngOnInit(): void {
    this.GetLabHistory();
  }

  GetLabHistory() {
    this.medconService.GetLabHistory();
  }

  GetLabReport(labID: string) {
    this.medconService.GetLabHistoryReport(labID);
  }
}
