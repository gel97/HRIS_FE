import { Component, signal, inject, OnInit } from '@angular/core';
import { PdfService } from 'src/app/spms/service/pdf.service';
import { OpcrService } from 'src/app/spms/service/opcr.service';
import { ReportStandardService } from 'src/app/spms/service/report-standard.service';
import { ReportActualService } from 'src/app/spms/service/report-actual.service';
import { MonthRangeService } from 'src/app/spms/service/month-range.service';
@Component({
  selector: 'app-opcr-actual',
  templateUrl: './opcr-actual.component.html',
  styleUrls: ['./opcr-actual.component.css'],
})
export class OpcrActualComponent implements OnInit  {
  opcrService = inject(OpcrService);
  opcrIdActual = localStorage.getItem('opcrIdActual')

  loading: boolean = true;

  ngOnInit(): void {
    this.init();
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  init(){
    if(this.opcrIdActual){
      this.opcrService.isShowOpcrDataActual.set(1);
      this.opcrService.GetOPCRDataActual(this.opcrIdActual);
    }else{
      this.opcrService.isShowOpcrDataActual.set(0);
    }
  }
}
