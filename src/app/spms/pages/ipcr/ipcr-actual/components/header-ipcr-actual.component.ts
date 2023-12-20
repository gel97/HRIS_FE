import {
    Component,
    EventEmitter,
    Output,
    Input,
    inject,
  } from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
 import { IpcrService } from 'src/app/spms/service/ipcr.service'; 
@Component({
    selector: 'app-header-ipcr-actual',
    template: `
         <div class="row">
        <div class="col-9">
            <div class="card-header p-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-style1 m-0">
                    <li class="breadcrumb-item">
                        <a><i class='bx bx-data'></i>&nbsp;IPCR</a>
                    </li>
                    <li class="breadcrumb-item">
                        <i class="bx bx-carousel"></i>&nbsp;{{dpcrService.divisionName}}
                    </li>
                    <li class="breadcrumb-item" [ngClass]="!isShowIpcrData?'active':''">
                        <a (click)="SetIsShowDpcrData()" class="cursor-pointer"><i class='bx bxs-right-top-arrow-circle'></i>&nbsp;Actual</a>
                    </li>
                    <li *ngIf="isShowIpcrData" class="breadcrumb-item" [ngClass]="isShowIpcrData?'active':''">
                        <a>&nbsp;{{ipcrDetailsActual}}</a>
                    </li>
                </ol>
            </nav>
            </div>
        </div>
        <div class="col-3"><br>
            <a (click)="SetIsShowDpcrData()" class="pointer float-end">
                <span class="row px-4" >
                    <i class='bx bx-arrow-back cursor-pointer'></i>
                </span>
            </a>
        </div>
    </div>
    `,
  })
  export class HeaderIpcrActualComponent {
    dpcrService = inject(DpcrService);
    ipcrService = inject(IpcrService);

    ipcrDetailsActual = localStorage.getItem('ipcrDetailsActual');

    @Input() search: any;
    @Input() isShowIpcrData: any;

    @Output() onSearchMFO = new EventEmitter<any>();
    @Output() isAddDpcr = new EventEmitter<boolean>();
    @Output() handleShowDpcrData = new EventEmitter<boolean>();

    SearchMFO(){
      this.onSearchMFO.emit('Search MFO');
    }

    SetIsShowDpcrData(){
        this.ipcrService.isShowIpcrDataActual.set(0);
        localStorage.removeItem('ipcrIdActual');
        localStorage.removeItem('ipcrDetailsActual');

    }

    HandleDpcr(){
      this.isAddDpcr.emit(true);
    }

  }
  