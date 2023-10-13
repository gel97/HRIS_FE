import {
    Component,
    EventEmitter,
    Output,
    Input,
    inject,
  } from '@angular/core';
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
                        <a><i class='bx bx-data'></i>&nbsp;DPCR</a>
                    </li>
                    <li class="breadcrumb-item" [ngClass]="!isShowDpcrData?'active':''">
                        <a (click)="SetIsShowDpcrData()" class="cursor-pointer"><i class='bx bxs-right-top-arrow-circle'></i>&nbsp;Target</a>
                    </li>
                    <li *ngIf="isShowDpcrData" class="breadcrumb-item" [ngClass]="isShowDpcrData?'active':''">
                        <a>&nbsp;{{dpcrService.storageDpcrDetails()}}</a>
                    </li>
                </ol>
            </nav>
            </div>
        </div>
        <div *ngIf="isShowDpcrData == 0; else ShowDpcrData" class="col-3">
            <div class="pt-4" style="margin-right:5px;">
                <button (click)="HandleDpcr()" class="btn btn-primary float-end" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasDpcr" aria-controls="offcanvasDpcr">
                    <i class='bx bx-plus'></i>DPCR
                </button>
            </div>
        </div>
        <ng-template #ShowDpcrData>
        <div class="col-3"><br>
            <a (click)="SetIsShowDpcrData()" class="pointer float-end">
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
    dpcrService = inject(DpcrService);

    @Input() search: any;
    @Input() isShowDpcrData: any;

    @Output() onSearchMFO = new EventEmitter<any>();
    @Output() isAddDpcr = new EventEmitter<boolean>();

    SearchMFO(){
      this.onSearchMFO.emit('Search MFO');
    }

    SetIsShowDpcrData(){
        this.dpcrService.storageIsShowDpcrData.set(0);
        localStorage.setItem('isShowDpcrData', '0');
    }

    HandleDpcr(){
      this.isAddDpcr.emit(true);
    }

  }
  