import { Component, EventEmitter, Output, Input  } from '@angular/core';

@Component({
  selector: 'app-table-mfo',
  template: `
      <div class="table-responsive text-nowrap w-100">
        <table class="table table-hover mt-5 ">
          <thead>
            <tr>
              <td [width]="10"></td>
              <th [width]="10">#</th>
              <th>MFO</th>
              <th [width]="10">Actions</th>
            </tr>
          </thead>
          <ng-container *ngIf="mfo.isLoading">
            <tbody>
              <tr>
                <td colspan="4" class="text-center"><app-spinner></app-spinner>
                </td>
              </tr>
            </tbody>
          </ng-container>
          <tbody  class="table-border-bottom-0">     
            <ng-container *ngFor="let a of mfo.data; let i = index">
              <tr>
                <td style="max-width: 5px;" (click)="expandedRow == i?expandedRow = null :expandedRow = i"><i
                    class='bx bx-chevron-right cursor-pointer'></i>
                </td>
                <td style="max-width: 5px;" class="cursor-pointer"
                  (click)="expandedRow == i?expandedRow = null :expandedRow = i">{{i+1}}</td>
                <td style="max-width: 800px;min-width: 800px;" class="cursor-pointer"
                  (click)="expandedRow == i?expandedRow = null :expandedRow = i">{{a.mfo}}</td>
                <td>
                  <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                      <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item cursor-pointer"
                        (click)="SetMfoData(a);ClearSIData(); IsAdd(true)" data-bs-toggle="tooltip"
                        matTooltip="Success Indicator" matTooltipPosition="left" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasSI" aria-controls="offcanvasSI"><i class="bx bx-plus me-1"></i>
                        Create</a>
                      <a class="dropdown-item cursor-pointer" (click)="SetMfoData(a); IsAdd(false)"
                        data-bs-toggle="tooltip" matTooltip="MFO" matTooltipPosition="left" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasScroll" aria-controls="offcanvasScroll"><i
                          class="bx bx-edit-alt me-1"></i> Edit</a>
                      <a class="dropdown-item cursor-pointer" (click)="DeleteMFO(a.mfoId)"><i class="bx bx-trash me-1"></i> Delete</a>
                    </div>
                  </div>
                </td>
              </tr>
              <ng-container *ngIf="expandedRow == i">
                <tr *ngFor="let b of a.si; let y = index" class="bg-lightest">
                  <td colspan="4" class="p-custom bg-lightest">
                    <div>
                      <div class="row justify-content-between w-100 mb-2">
                        <div class="col-6 cursor-pointer"
                          (click)="expandedRowChild == y ? expandedRowChild = null :expandedRowChild = y">
                          <div class="form-text text-gray">
                            <i class='bx bx-chevron-right'></i>
                            {{b.indicator}}
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="float-end">       
                            <button (click)="SetSIData(a,b); IsAdd(false)" class="btn btn-secondary"
                              data-bs-toggle="offcanvas" data-bs-target="#offcanvasSI" aria-controls="offcanvasSI">
                              <i class='bx bx-edit-alt'></i> EDIT
                            </button> &nbsp;
                            <button (click)="DeleteSI(b.indicatorId)" class="btn btn-danger"
                            >
                            <i class='bx bx-trash text-white'></i>
                          </button>
                          </div>                      
                        </div>
                      </div>
                      <ng-container *ngIf="expandedRowChild == y">
                        <!-- Bordered Table -->
                        <div class="card">
                          <div class="card-body">
                            <div class="table-responsive text-nowrap">
                              <table class="table table-bordered ">
                                <thead>
                                  <th [width]="1">
                                    Rating
                                  </th>
                                  <th class="text-center">
                                    Quality
                                  </th>
                                  <th class="text-center">
                                    Timeliness
                                  </th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>5</td>
                                    <td><span *ngIf="b.standard">{{b.standard.qlty5}}</span></td>
                                    <td><span *ngIf="b.standard">{{b.standard.timely5}}</span></td>
                                  </tr>
                                  <tr>
                                    <td>4</td>
                                    <td><span *ngIf="b.standard">{{b.standard.qlty4}}</span></td>
                                    <td><span *ngIf="b.standard">{{b.standard.timely4}}</span></td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td><span *ngIf="b.standard">{{b.standard.qlty3}}</span></td>
                                    <td><span *ngIf="b.standard">{{b.standard.timely3}}</span></td>
                                  </tr>
                                  <tr>
                                    <td>2</td>
                                    <td><span *ngIf="b.standard">{{b.standard.qlty2}}</span></td>
                                    <td><span *ngIf="b.standard">{{b.standard.timely2}}</span></td>
                                  </tr>
                                  <tr>
                                    <td>1</td>
                                    <td><span *ngIf="b.standard">{{b.standard.qlty1}}</span></td>
                                    <td><span *ngIf="b.standard">{{b.standard.timely1}}</span></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </ng-container>
                    </div>
                  </td>
                </tr>
              </ng-container>
            </ng-container>
          </tbody>
          <ng-container *ngIf="!mfo.isLoading && mfo.data.length == 0">
            <tbody>
              <tr>
                <td colspan="4" class="text-center">
                  <p>No data . . .</p>
                </td>
              </tr>
            </tbody>         
          </ng-container>
        </table>
    </div>
  `,
})
export class TableMfoComponent {
  @Input() mfo: any;

  @Output() setIsCommon = new EventEmitter<any>();
  @Output() setMfoData = new EventEmitter<any>();
  @Output() setSIData = new EventEmitter<any>();

  @Output() deleteMfo = new EventEmitter<string>();
  @Output() deleteSI = new EventEmitter<string>();

  @Output() isAdd = new EventEmitter<boolean>();

  @Output() clearSIData = new EventEmitter<any>();

  expandedRow: any;
  expandedRowChild: any;

  SetMfoData(item:any) {
    this.setMfoData.emit(item);
  }

  SetSIData(mfo:any, si:any){
    this.setSIData.emit({mfo,si});
  }

  DeleteSI(indicatorId:string){
    this.deleteSI.emit(indicatorId);
  }

  DeleteMFO(MfoId:string){
    this.deleteMfo.emit(MfoId);
  }

  IsAdd(value:boolean){
    this.isAdd.emit(value);
  }

  ClearSIData(){
    this.clearSIData.emit("Clear SI data");
  }


}