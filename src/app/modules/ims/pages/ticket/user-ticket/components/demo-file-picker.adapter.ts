import {
  HttpRequest,
  HttpClient,
  HttpEvent,
  HttpEventType,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  FilePickerAdapter,
  UploadResponse,
  UploadStatus,
  FilePreviewModel,
} from 'ngx-awesome-uploader';

export class DemoFilePickerAdapter extends FilePickerAdapter {
  constructor(private http: HttpClient) {
    super();
  }

  files: FilePreviewModel[] = [];

  public uploadFile(
    fileItem: FilePreviewModel
  ): Observable<UploadResponse | undefined> {
    console.log(fileItem);
    this.files.push(fileItem);
    // Simulate form data creation (though unnecessary for local handling)
    const form = new FormData();
    form.append('file', fileItem.file);

    // Local simulated "upload"
    return new Observable<UploadResponse | undefined>((observer) => {
      // Simulate the upload progress
      let progress = 0;

      const interval = setInterval(() => {
        progress += 10; // Increment by 10% each time

        if (progress <= 100) {
          observer.next({
            status: UploadStatus.IN_PROGRESS,
            progress,
          });
        }

        if (progress === 100) {
          clearInterval(interval);

          // Simulate successful response from backend
          observer.next({
            body: 'File successfully uploaded',
            status: UploadStatus.UPLOADED,
          });

          observer.complete();
        }
      }, 500); // Update progress every 500ms
    }).pipe(
      catchError((error) => {
        console.log(error);
        return of({
          status: UploadStatus.ERROR,
          body: 'Error occurred during the upload',
        });
      })
    );
  }

  public removeFile(fileItem: FilePreviewModel): Observable<any> {
    this.files = this.files.filter((f) => f.fileName !== fileItem.file.name);
    return of({ status: 200 });
  }
}
