import { Component, inject, OnInit } from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';

@Component({
  selector: 'app-dpcr-actual',
  templateUrl: './dpcr-actual.component.html',
  styleUrls: ['./dpcr-actual.component.css'],
})
export class DpcrActualComponent {
  dpcrService = inject(DpcrService);
  dpcrMfoes: any = this.dpcrService.dpcrData();

  ngOnInit(): void {
    this.dpcrService.GetDpcrData();
    console.log('dpcrmfoeeeess', this.dpcrMfoes);
  }
}
