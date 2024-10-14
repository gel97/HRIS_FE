

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { SharedModule } from 'src/app/shared.module';
import { TicketRoutingModule } from './ticket-routing.module';
import { TicketComponent } from './ticket.component';
import { UserTicketComponent } from './user-ticket/user-ticket.component';
import { ModalTicketComponent } from './user-ticket/components/modal-ticket.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UploadWidgetModule } from "@bytescale/upload-widget-angular";
import {FilePickerModule} from 'ngx-awesome-uploader';

@NgModule({
  declarations: [
    TicketComponent,
    UserTicketComponent,
    ModalTicketComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    NgxSkeletonLoaderModule,
    SharedModule,
    TicketRoutingModule,
    CKEditorModule,
    UploadWidgetModule,
    FilePickerModule
  ],
})
export class TicketModule {}
