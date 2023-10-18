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

  opcrMfoes: any = this.opcrService.opcrDetails;
  isLoading: boolean = false;
  notEmpty: boolean = false;


  ngOnInit(): void {
    this.opcrService.GetOPCRDetails();

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.notEmpty =  this.opcrMfoes().data.length > 0;

    }, 1000);
   // console.log(this.opcrService.storage)

  }

  get opcrMfoesData(): { [key: number]: any[] } {
    const groupedData: { [key: number]: any[] } = this.opcrMfoes().data.reduce(
      (acc: any, data: any) => {
        const { categoryId } = data;
        if (acc[categoryId]) {
          acc[categoryId].push(data);
        } else {
          acc[categoryId] = [data];
        }
        return acc;
      },
      {}
    );
    return groupedData;
  }

  categoryName(cat: string) {
    let catName = '';
    switch (cat) {
      case '1':
        catName = 'STRATEGIC';
        break;
      case '2':
        catName = 'CORE';
        break;
      case '3':
        catName = 'SUPPORT';
        break;
      default:
        break;
    }

    return catName? catName + ' FUNCTION' : 'NO FUNCTION';
  }

  ReportStandard() {
    this.reportStandardService.ReportStandard(this.opcrMfoes().data);
  }

  ReportOPCR() {
    this.reportActualService.triggerSwitch(1);
    this.reportActualService.ReportActual(this.opcrMfoes().data);
  }
}
