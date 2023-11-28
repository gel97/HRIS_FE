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
@NgModule({
  declarations: [
    UserDivisionComponent,
    TableEmployeeNoDivComponent,
    TableEmployeeDivComponent,
    TableOfficeDivisionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UtilityRoutingModule,
    NgxSkeletonLoaderModule,
    MatPaginatorModule
  ]
})
export class UtilityModule { }
