import { Component , ViewEncapsulation} from '@angular/core';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, FontSize, Underline, Strikethrough, FontColor, FontBackgroundColor, FontFamily, Alignment, BlockQuote, Link, ImageUpload, Code, CodeBlock, HorizontalLine, Indent, Autoformat, PasteFromOffice, WordCount, CKFinder, Autosave, Markdown } from 'ckeditor5';
import { Comments, SlashCommand, TrackChanges } from 'ckeditor5-premium-features';

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
                <ckeditor [config]="config"  [editor]="Editor" [(ngModel)]="data.description"></ckeditor>

              </div>
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
  styleUrls: [ '../user-ticket.component.css' ],
  encapsulation: ViewEncapsulation.None

})
export class ModalTicketComponent {

    data:any = {
      subject: "Hellow World!",
      description: "haha"
    };

    public Editor = ClassicEditor;
    public config = {
      toolbar: [ 'undo', 'redo', '|', 'bold', 'italic' ],
        plugins: [
            Bold, Essentials, Italic, Mention, Paragraph, Undo,
        ],
        licenseKey: '<YOUR_LICENSE_KEY>',
        // mention: {
        //     Mention configuration
        // }
    }

    public onReady( editor: ClassicEditor ): void {
      const element = editor.ui.getEditableElement()!;
      const parent = element.parentElement!;

      parent.insertBefore(
          editor.ui.view.toolbar.element!,
          element
      );
  }
}
