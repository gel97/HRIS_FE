import { Component, OnInit , inject } from '@angular/core';
import { DpcrService } from 'src/app/spms/service/dpcr.service';
@Component({
  selector: 'app-view-dpcr-actual',
  template: `
    <div class="card">
      <div class="row">
        <div class="card-body">
          <div>
            <select
              class="form-select"
              aria-label="Default select example"
              [(ngModel)]="currentYear"
              (ngModelChange)="onChangeYear($event)"
            >
              <option *ngFor="let year of years" [value]="year">
                {{ year }}
              </option>
            </select>
          </div>
          <br />
          <!-- Bordered Table -->
          <div
            *ngIf="dpcrService.dpcr().data.length > 0"
            class="table-responsive text-nowrap"
          >
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Details</th>
                  <th>Sem</th>
                  <th>Year</th>
                  <th>Date Created</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody *ngFor="let data of dpcr.data">
                <tr>
                  <td class="pointer">
                    <a (click)="setIpcrDetails(data)" class="cursor-pointer"><strong>{{ data.details }}</strong></a>
                  </td>
                  <td>
                    <span
                      class="badge"
                      [ngClass]="
                        data.semester == '0'
                          ? 'bg-label-success'
                          : data.semester == '1'
                          ? 'bg-label-primary'
                          : data.semester == '2'
                          ? 'bg-label-info'
                          : ''
                      "
                      >{{ semester(data.semester) }}</span
                    >
                  </td>
                  <td>
                    <span class="badge bg-label-primary me-1">{{
                      data.year
                    }}</span>
                  </td>
                  <td>
                    {{ data.transDT | date : 'MMM. dd, yyyy' }}
                  </td>
                  <td>
                    <span
                      [ngClass]="
                        data.active == '1'
                          ? 'badge rounded-pill bg-label-success'
                          : data.active == '2'
                          ? 'badge rounded-pill bg-label-primary'
                          : data.active == '0'
                          ? 'badge rounded-pill bg-label-danger'
                          : ''
                      "
                    >
                      {{ displayStatus(data.active) }}</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div *ngIf="dpcrService.dpcr().data.length <= 0">
            <img
              src="assets/img/document.png"
              alt=""
              width="200"
              height="200"
              style="display: block; margin: 0 auto"
            />
            <span
              style="
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                height: 100%;
                "
            >
              <div>
                <label style="margin-bottom: 10px;"
                  ><strong>No Data Found!</strong></label
                >
              </div>
            </span>
          </div>
          <!--/ Bordered Table -->
        </div>
      </div>
    </div>
  `,
})
export class ViewDpcrActualComponent implements OnInit {
    dpcrService = inject(DpcrService);
    years: number[] = [];
    divisionId: string | null = localStorage.getItem('divisionId');
    userId: string | null = localStorage.getItem('userId');
    currentDate: Date = new Date();
    currentYear: number = this.currentDate.getFullYear();

    dpcr:any = this.dpcrService.dpcr();

    ngOnInit(): void {
        this.ipcrYear();
        this.GetIpcr();
    }

    GetIpcr(){
        this.dpcrService.year.set(this.currentYear);
        this.dpcrService.GetDpcr();
        // this.ipcrService.GetIPCRs(
        //     this.currentYear.toString(),
        //     localStorage.getItem('divisionId') ?? '',
        //     localStorage.getItem('userId') ?? ''
        // );
    }

    setIpcrDetails(data:any){
        this.dpcrService.isShowDpcrDataActual.set(1);
        localStorage.setItem('dpcrIdActual', data.dpcrId);
        localStorage.setItem('dpcrDetailsActual', data.details);

      //  this.dpcrService.GetDPCRDataActual(data.dpcrId);
    }

    ipcrYear() {
        for (let i = new Date().getFullYear() + 1; i >= 2020; i--) {
          this.years.push(i);
        }
    }

    onChangeYear(year: any) {
        this.dpcrService.year.set(year);
        this.dpcrService.GetDpcr();
        //this.dpcrService.GetIPCRs(year, this.divisionId ?? '', this.userId ?? '');
    }

    semester(year: number) {
        let Year = '';
        switch (year) {
          case 0:
            Year = 'Full Year';
            break;
    
          case 1:
            Year = '1st Sem';
            break;
    
          case 2:
            Year = '2nd Sem';
            break;
    
          default:
            break;
        }
        return Year;
    }

    displayStatus(cat: any) {
        let catName = '';
        switch (cat) {
          case 1:
            catName = 'Open';
            break;
          case 2:
            catName = 'Final';
    
            break;
          case 0:
            catName = 'Draft';
            break;
          default:
            break;
        }
    
        if (cat == null) {
          catName = 'No Function';
        }
        return catName;
    }

}
