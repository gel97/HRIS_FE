import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilityRoutingModule } from './utility-routing.module';
import { UserDivisionComponent } from './user-division/user-division.component';
import { TableEmployeeNoDivComponent } from './user-division/components/table-employee-no-div.component';
import { TableEmployeeDivComponent } from './user-division/components/table-employee-div.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TableOfficeDivisionComponent } from './user-division/components/table-office-division.component';
import { UtilityFocalComponent } from './utility-focal/utility-focal.component';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from '@angular/material/core';
import {MatSortModule} from '@angular/material/sort';
import {MatRadioModule} from '@angular/material/radio';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule, MatDatepickerToggle, matDatepickerAnimations} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxDefaultOptions, MatCheckboxModule} from '@angular/material/checkbox';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
@NgModule({
  declarations: [
    UserDivisionComponent,
    TableEmployeeNoDivComponent,
    TableEmployeeDivComponent,
    TableOfficeDivisionComponent,
    UtilityFocalComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UtilityRoutingModule,
    NgxSkeletonLoaderModule,
    MatPaginatorModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MatAutocompleteModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatSortModule,
    MatExpansionModule,
    MatTooltipModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatTabsModule,
    NgxMatSelectSearchModule,
    CdkDropList,
    CdkDrag
  ]
})
export class UtilityModule { }
