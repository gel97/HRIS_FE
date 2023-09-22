import { Component, OnInit, inject, signal } from '@angular/core';
import { OpcrService } from 'src/app/spms/service/opcr.service';

@Component({
  selector: 'app-opcr-target',
  templateUrl: './opcr-target.component.html',
  styleUrls: ['./opcr-target.component.css'],
})
export class OpcrTargetComponent implements OnInit {
  opcrService = inject(OpcrService);
  getYear = '2023';

  ngOnInit(): void {}

  GetOPCRs() {
    this.opcrService.GetOPCRs(this.getYear);
  }
}
