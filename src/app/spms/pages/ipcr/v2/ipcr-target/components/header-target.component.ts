import {
    Component,
    EventEmitter,
    Output,
    Input,
    inject,
  } from '@angular/core';
import { IpcrService } from 'src/app/spms/service/ipcr.service';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
@Component({
    selector: 'app-header-target',
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
                        <a (click)="SetIsShowIpcrData()" class="cursor-pointer"><i class='bx bxs-right-top-arrow-circle'></i>&nbsp;Target</a>
                    </li>
                    <li *ngIf="isShowIpcrData" class="breadcrumb-item" [ngClass]="isShowIpcrData?'active':''">
                        <a>&nbsp;{{ipcrService.storageIpcrData()}}</a>
                    </li>
                </ol>
            </nav>
            </div>
        </div>
        <div *ngIf="isShowIpcrData == 0; else ShowIpcrData" class="col-3">
            <div class="pt-2" style="margin-right:5px;">
                <button class="btn btn-primary float-end" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasIpcr" aria-controls="offcanvasIpcr">
                    <i class='bx bx-plus'></i>IPCR
                </button>
            </div>
        </div>
        <ng-template #ShowIpcrData>
        <div class="col-3"><br>
            <a (click)="SetIsShowIpcrData()" class="pointer float-end">
                <span class="row px-4" >
                    <i class='bx bx-arrow-back cursor-pointer'></i>
                </span>
            </a>
        </div>
        </ng-template>
    </div>
    `,
  })
  export class HeaderTargetComponent {
    ipcrService = inject(IpcrService);
    dpcrService = inject(DpcrService);

    @Input() isShowIpcrData: any;

    @Output() isAddIpcr = new EventEmitter<boolean>();
    @Output() handleShowIpcrData = new EventEmitter<boolean>();


    SetIsShowIpcrData(){
        this.handleShowIpcrData.emit(false);
        localStorage.removeItem('ipcrId');
        localStorage.removeItem('ipcrData');
    }

    HandleIpcr(){
        this.ipcrService.AddIPCR({});
    }

  }
  