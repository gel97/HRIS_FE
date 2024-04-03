import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FirstLetterUppercasePipe } from './pipe/first-letter-uppercase.pipe';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingComponent } from './spms/components/loading.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    FirstLetterUppercasePipe,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
    }),
    NgxSpinnerModule,
    MatTooltipModule
  ],
  exports: [
    NgCircleProgressModule,
    FirstLetterUppercasePipe,
    NgxSpinnerModule,
    LoadingComponent,
    MatTooltipModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SharedModule { }
