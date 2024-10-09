import {
    Component,
    EventEmitter,
    Output,
    Input,
    inject,
  } from '@angular/core';
import { DpcrService } from 'src/app/modules/spms/service/dpcr.service';
 import { IpcrService } from 'src/app/modules/spms/service/ipcr.service'; 
@Component({
    selector: 'app-header-dpcr-actual',
    template: `
         <div class="row">
        <div class="col-9">
            <div class="card-header p-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-style1 m-0">
                    <li class="breadcrumb-item">
                        <a><i class='bx bx-data'></i>&nbsp;DPCR</a>
                    </li>
                    <li class="breadcrumb-item">
                        <i class="bx bx-carousel"></i>&nbsp;{{dpcrService.divisionName}}
                    </li>
                    <li class="breadcrumb-item" [ngClass]="!isShowDpcrData?'active':''">
                        <a (click)="SetIsShowDpcrData()" class="cursor-pointer"><i class='bx bxs-right-top-arrow-circle'></i>&nbsp;Actual</a>
                    </li>
                    <li *ngIf="isShowDpcrData" class="breadcrumb-item" [ngClass]="isShowDpcrData?'active':''">
                        <a>&nbsp;{{dpcrService.storageDpcrDetailsActual()}}</a>
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
  export class HeaderDpcrActualComponent {
    dpcrService = inject(DpcrService);
    ipcrService = inject(IpcrService);


    @Input() search: any;
    @Input() isShowDpcrData: any;

    @Output() onSearchMFO = new EventEmitter<any>();
    @Output() isAddDpcr = new EventEmitter<boolean>();
    @Output() handleShowDpcrData = new EventEmitter<boolean>();

    SearchMFO(){
      this.onSearchMFO.emit('Search MFO');
    }

    SetIsShowDpcrData(){
        this.dpcrService.isShowDpcrDataActual.set(0);
        localStorage.removeItem('dpcrIdActual');
        localStorage.removeItem('dpcrDetailsActual');

    }

    HandleDpcr(){
      this.isAddDpcr.emit(true);
    }

  }
  