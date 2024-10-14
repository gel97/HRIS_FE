import { Component, ViewEncapsulation } from '@angular/core';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  FontSize,
  Underline,
  Strikethrough,
  FontColor,
  FontBackgroundColor,
  FontFamily,
  Alignment,
  BlockQuote,
  Link,
  ImageUpload,
  Code,
  CodeBlock,
  HorizontalLine,
  Indent,
  Autoformat,
  PasteFromOffice,
  WordCount,
  CKFinder,
  Autosave,
  Markdown,
  Table,
  Heading,
  List,
} from 'ckeditor5';
import {
  Comments,
  SlashCommand,
  TrackChanges,
} from 'ckeditor5-premium-features';
import {
  UploadWidgetConfig,
  UploadWidgetResult,
} from '@bytescale/upload-widget';
import { DemoFilePickerAdapter } from './demo-file-picker.adapter';
import { HttpClient } from '@angular/common/http';
import { ValidationError } from 'ngx-awesome-uploader';
@Component({
  selector: 'app-modal-ticket',
  template: `
    <!-- Large Modal -->
    <div class="modal fade" id="modalTicket" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel3">TICKET</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col mb-3">
                <label for="nameLarge" class="form-label">Subject</label>
                <input
                  type="text"
                  id="nameLarge"
                  class="form-control"
                  placeholder="Enter Subject"
                  [(ngModel)]="data.subject"
                />
              </div>
            </div>
            <div class="row">
              <div class="col mb-3">
                <label for="nameLarge" class="form-label">Description</label>
                <ckeditor
                  [config]="config"
                  [editor]="Editor"
                  [(ngModel)]="data.description"
                ></ckeditor>
              </div>
            </div>
            <button
              uploadButton
              [uploadOptions]="options"
              [uploadComplete]="onComplete"
              class="btn btn-primary"
            >
              Upload a file...
            </button>
            <div class="uploader-wrapper">
              <ngx-awesome-uploader
                [adapter]="adapter"
                [enableCropper]="false"
                [fileMaxSize]="200"
                (uploadSuccess)="uploadSuccess($event)"
                (enableAutoUpload)="false"
                (uploadFail)="onValidationErrorUpload()"
                (validationError)="onValidationError($event)"
              >
              </ngx-awesome-uploader>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Submit ticket</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../user-ticket.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalTicketComponent {
  public adapter = new DemoFilePickerAdapter(this.http);

  constructor(private http: HttpClient) {}

  public ngOnInit(): void {}

  uploadSuccess(event: any) {
    console.log('Files successfully handled locally', this.adapter);
  }

  public onValidationError(error: ValidationError): void {
    console.log(error);
    console.log('Files error handled locally', this.adapter);

    alert(`Validation Error ${error.error} in ${error.file?.name}`);
  }

  public onValidationErrorUpload(): void {
    console.log('Files error handled locally', this.adapter);

  }

  data: any = {
    subject: 'Hellow World!',
    description: 'haha',
  };

  public Editor = ClassicEditor;
  public config = {
    toolbar: [
      'undo',
      'redo',
      '|',
      'bold',
      'italic',
      'underline',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      'insertTable',
      '|',
      'heading',
    ],
    plugins: [
      Bold,
      Essentials,
      Italic,
      Paragraph,
      Undo,
      Underline,
      Link,
      List,
      BlockQuote,
      Table,
      Heading,
    ],
  };

  public onReady(editor: ClassicEditor): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;

    parent.insertBefore(editor.ui.view.toolbar.element!, element);
  }

  options: UploadWidgetConfig = {
    apiKey: 'sd', // This is your API key.

    maxFileCount: 3,
  };

  onComplete = (files: UploadWidgetResult[]) => {
    this.uploadedFileUrl = files[0]?.fileUrl;
    console.log(files);
  };

  uploadedFileUrl: string | undefined = undefined;
}
