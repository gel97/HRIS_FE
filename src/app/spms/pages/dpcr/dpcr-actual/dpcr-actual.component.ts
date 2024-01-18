import { Component, inject, OnInit } from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
import { ReportActualService } from 'src/app/spms/service/report-actual.service';
import { ReportStandardService } from 'src/app/spms/service/report-standard.service';
import { StandardReportService } from 'src/app/spms/service/standard-report.service';
@Component({
  selector: 'app-dpcr-actual',
  templateUrl: './dpcr-actual.component.html',
  styleUrls: ['./dpcr-actual.component.css'],
})
export class DpcrActualComponent implements OnInit {
  dpcrService = inject(DpcrService);
  dpcrMfoes: any = this.dpcrService.dpcrData();
  reportStandardService = inject(ReportStandardService);
  reportActualService = inject(ReportActualService);
  standardReportService = inject(StandardReportService);
  loading: boolean = true;

  dpcrIdActual = localStorage.getItem('dpcrIdActual')


  ngOnInit(): void {
    this.init();
    this.dpcrService.GetDpcrData();
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  init(){
    if(this.dpcrIdActual){
      this.dpcrService.isShowDpcrDataActual.set(1);
      //this.dpcrService.GetIPCRDataActual(this.dpcrIdActual);
    }else{
      this.dpcrService.isShowDpcrDataActual.set(0);
    }
  }

  checkDpcrMfoesDataEmpty() {
    return Object.keys(this.dpcrMfoesData).length == 0;
  }

  get dpcrMfoesData(): { [key: number]: any[] } {
    const groupedData: { [key: number]: any[] } = this.dpcrMfoes.data.reduce(
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

  categoryName(cat: any) {
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

    return catName ? catName + ' FUNCTION' : 'NO FUNCTION';
  }

  ReportDPCR() {
    this.reportActualService.triggerSwitch(3);
    this.reportActualService.ReportActual(this.dpcrMfoes.data);
  }

  ReportStandard() {
    this.standardReportService.ReportStandard(this.dpcrMfoes.data);
  }
}
