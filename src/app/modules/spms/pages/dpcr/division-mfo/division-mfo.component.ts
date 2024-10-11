import { Component, inject, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/modules/spms/service/error.service';
import { MfoService } from 'src/app/modules/spms/service/mfo.service';

@Component({
  selector: 'app-division-mfo',
  templateUrl: './division-mfo.component.html',
  styleUrls: ['./division-mfo.component.css']
})
export class DivisionMfoComponent implements OnInit {
  mfoService = inject(MfoService);
  errorService = inject(ErrorService);

  mfo: any = this.mfoService.mfoDivision();
  error: any = this.errorService.error();
  isAdd: boolean = true;

  mfoData: any = {};
  siData: any = {};
  standard: any = {};

  search: any = {};
  isSearchLoading: any = this.mfoService.isSearchLoading();


  ngOnInit(): void {
    this.mfoService.GetDivisionMFOes();
  }

  setSiData(data: any) {
    this.mfoData = data.mfo;
    this.siData = data.si;
    if (data.si.standard !== null) {
      this.standard = data.si.standard;
    }
  }

  AddMfo() {
    if (this.mfoData.MFO !== undefined || this.mfoData.MFO !== '') {
      this.mfoService.AddDivisionMfo(this.mfoData);
    }
  }

  EditMfo() {
    this.mfoData.divisionId = this.mfoService.divisionId;

    if (this.mfoData.mfo !== undefined || this.mfoData.mfo !== '') {
      this.mfoService.EditMfo(this.mfoData);
    }
  }

  AddSI() {
    this.mfoService.isAddOfficeMfo.set(false);

    this.siData.mfoId = this.mfoData.mfoId;

    if (this.siData.inidicator !== undefined || this.siData.inidicator !== '') {
      this.mfoService.AddSI(this.siData, this.standard);
    }
  }

  EditSI() {
    this.siData.mfoId = this.mfoData.mfoId;
    this.siData.divisionId = this.mfoService.divisionId;

    if (this.siData.inidicator !== undefined || this.siData.inidicator !== '') {
      this.mfoService.EditSI(this.siData);

      this.standard.indicatorId = this.siData.indicatorId;

      this.mfoService.EditStandard(this.standard);
    }
  }

  DeleteMfo(mfoId: any) {
    this.mfoService.isAddOfficeMfo.set(false);

    this.mfoService.DeleteMfo(mfoId);
  }

  DeleteSI(indicatorId: any) {
    this.mfoService.isAddOfficeMfo.set(false);

    this.mfoService.DeleteSI(indicatorId);
  }

  CheckMfoIfExist() {
  }

  searchMfoDivision() {
    this.mfoService.SearchMfoDivision(this.search);
  }
}
