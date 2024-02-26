import {
    Component,
    EventEmitter,
    Output,
    Input,
    inject,
  } from '@angular/core';
import { OpcrService } from 'src/app/spms/service/opcr.service';; 
@Component({
    selector: 'app-header-opcr-actual',
    template: `
         <div class="row">
        <div class="col-9">
            <div class="card-header p-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-style1 m-0">
                    <li class="breadcrumb-item">
                        <a><i class='bx bx-data'></i>&nbsp;OPCR</a>
                    </li>
                    <li class="breadcrumb-item">
                        <i class="bx bx-carousel"></i>&nbsp;{{opcrService.officeName}}
                    </li>
                    <li class="breadcrumb-item" [ngClass]="!isShowDpcrData?'active':''">
                        <a (click)="SetIsShowOpcrData()" class="cursor-pointer"><i class='bx bxs-right-top-arrow-circle'></i>&nbsp;Actual</a>
                    </li>
                    <li *ngIf="isShowDpcrData" class="breadcrumb-item" [ngClass]="isShowDpcrData?'active':''">
                        <a>&nbsp;{{opcrDetailsActual}}</a>
                    </li>
                </ol>
            </nav>
            </div>
        </div>
        <div class="col-3"><br>
            <a (click)="SetIsShowOpcrData()" class="pointer float-end">
                <span class="row px-4" >
                    <i class='bx bx-arrow-back cursor-pointer'></i>
                </span>
            </a>
        </div>
    </div>
    `,
  })
  export class HeaderOpcrActualComponent {
    opcrService = inject(OpcrService);

    opcrDetailsActual = localStorage.getItem('opcrDetailsActual');

    @Input() isShowDpcrData: any;

    SetIsShowOpcrData(){
        this.opcrService.isShowOpcrDataActual.set(0);
        localStorage.removeItem('opcrIdActual');
        localStorage.removeItem('opcrDetailsActual');

    }

  }
  