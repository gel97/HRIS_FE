import { Component, signal, inject, OnInit } from '@angular/core';
import { PdfService } from 'src/app/spms/service/pdf.service';
import { OpcrService } from 'src/app/spms/service/opcr.service';
import { ReportStandardService } from 'src/app/spms/service/report-standard.service';
import { ReportActualService } from 'src/app/spms/service/report-actual.service';
@Component({
  selector: 'app-opcr-actual',
  templateUrl: './opcr-actual.component.html',
  styleUrls: ['./opcr-actual.component.css'],
})
export class OpcrActualComponent implements OnInit {
  reportService = inject(PdfService);
  opcrService = inject(OpcrService);
  reportStandardService = inject(ReportStandardService);
  reportActualService = inject(ReportActualService);

  count = signal(0);

  changeCount() {
    this.count.set(5);
    console.log(this.count());
  }

  opcrDetails: any = this.opcrService.opcrDetails;

  ngOnInit(): void {
    this.opcrService.GetOPCRDetails('O2301121009046AC0D9B', "", 1);
  }

  ReportStandard() {
    this.reportStandardService.ReportStandard(this.opcrDetails().data);
  }
  
  ReportOPCR(){
    this.reportActualService.ReportActual(this.opcrDetails().data);
  }
}
