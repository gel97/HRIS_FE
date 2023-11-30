import { Component, OnInit, inject, signal, ViewChild } from '@angular/core';
import { ErrorService } from 'src/app/spms/service/error.service';

import { MfoService } from 'src/app/spms/service/mfo.service';
import { AlertService } from 'src/app/spms/service/alert.service';
@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css'],
})
export class OfficeComponent implements OnInit {
  @ViewChild('closebuttonMFO')
  closebuttonMFO!: { nativeElement: { click: () => void } };
  @ViewChild('closebuttonSI')
  closebuttonSI!: { nativeElement: { click: () => void } };

  mfoService = inject(MfoService);
  errorService = inject(ErrorService);
  alertService = inject(AlertService);

  mfo: any = this.mfoService.mfo;
  isSearchLoading: any = this.mfoService.isSearchLoading;
  isCommon: any = this.mfoService.isCommon;
  error: any = this.errorService.error;

  officeId = localStorage.getItem('officeId');
  hrFocal:string = "OFFPHRMONZ3WT7D";
  expandedRow: any;
  expandedRowChild: any;

  mfoData: any = {};
  siData: any = {};
  standard: any = {};
  search: any = {};
  isExistMfo: boolean = false;

  isAdd: boolean = true;

  ngOnInit(): void {
    this.mfoService.GetMFOes();
  }

  AddMfo() {
    if (this.mfoData.MFO !== undefined || this.mfoData.MFO !== '') {
      this.mfoService.AddMfo(this.mfoData);
    }
  }

  EditMfo() {
    if (this.mfoData.mfo !== undefined || this.mfoData.mfo !== '') {
      this.mfoService.EditMfo(this.mfoData);
    }
  }

  DeleteMfo(mfoId: any) {
    this.mfoService.DeleteMfo(mfoId);
  }

  AddSI() {
    this.siData.mfoId = this.mfoData.mfoId;

    if (this.siData.inidicator !== undefined || this.siData.inidicator !== '') {
      this.mfoService.AddSI(this.siData, this.standard);
    }
  }

  EditSI() {
    this.siData.mfoId = this.mfoData.mfoId;

    if (this.siData.inidicator !== undefined || this.siData.inidicator !== '') {
      this.mfoService.EditSI(this.siData);

      this.standard.indicatorId = this.siData.indicatorId;

      this.mfoService.EditStandard(this.standard);
    }
  }

  DeleteSI(indicatorId: any) {
    this.mfoService.DeleteSI(indicatorId);
  }

  setSiData(data: any) {
    this.mfoData = data.mfo;
    this.siData = data.si;
    if (data.si.standard !== null) {
      this.standard = data.si.standard;
    }
  }

  CheckMfoIfExist() {
    this.mfoService
      .CheckMfoIfExist(this.mfoData)
      .subscribe((isExist: boolean) => {
        console.log(this.isExistMfo);
      });
  }

  searchMfoOffice() {
    this.mfoService.SearchMfoOffice(this.search);
  }

  setIsCommon(value: number) {
    this.mfoService.isCommon.set(value);
    this.mfoService.GetMFOes();
  }
}
