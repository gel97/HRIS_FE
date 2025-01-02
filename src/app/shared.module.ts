import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FirstLetterUppercasePipe } from './pipe/first-letter-uppercase.pipe';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingComponent } from './modules/spms/components/loading.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoadingSquareJellyBoxComponent } from './modules/spms/components/loading-square-jelly-box.component';
import { ModalOtsComponent } from './modules/spms/pages/ots/main/components/modal-ots.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { LoadingSpinnerGrowComponent } from './components/loading/loading-spinner-grow.component';
import { GlobalFilterPipe } from './pipe/globalFilter.pipe';
import { TruncatePipe } from 'src/app/pipe/truncate.pipe';
import { AngularCanvasModule } from '@e-signature/ng-signature-pad';

@NgModule({
  declarations: [
    FirstLetterUppercasePipe,
    TruncatePipe,
    GlobalFilterPipe,
    LoadingComponent,
    LoadingSquareJellyBoxComponent,
    ModalOtsComponent,
    LoadingSpinnerGrowComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
    }),
    NgxSpinnerModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgxMatSelectSearchModule,
    AngularCanvasModule
  ],
  exports: [
    NgCircleProgressModule,
    FirstLetterUppercasePipe,
    GlobalFilterPipe,
    NgxSpinnerModule,
    LoadingComponent,
    MatTooltipModule,
    LoadingSquareJellyBoxComponent,
    ModalOtsComponent,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgxMatSelectSearchModule,
    LoadingSpinnerGrowComponent,
    TruncatePipe,
    AngularCanvasModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SharedModule { }
