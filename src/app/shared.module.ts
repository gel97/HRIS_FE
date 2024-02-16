import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FirstLetterUppercasePipe } from './pipe/first-letter-uppercase.pipe';

@NgModule({
  declarations: [
    FirstLetterUppercasePipe
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
  ],
  exports: [
    NgCircleProgressModule,
    FirstLetterUppercasePipe
  ]
})
export class SharedModule { }
