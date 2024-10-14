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

    public uploadFile(fileItem: any): Observable<UploadResponse | undefined> {
      let file = fileItem.file as File | Blob;

      // Type guard to check if the file is actually a Blob, and if so, convert it to a File
      if (file instanceof Blob && !(file instanceof File)) {
        file = new File([file], fileItem.fileName, {
          type: file.type || 'application/octet-stream',
          lastModified: Date.now(),
        });
      }    

    // Store file as FilePreviewModel
    const fileUrl = URL.createObjectURL(file);
    fileItem.fileUrl = fileUrl; // Add the file URL for previewing in the uploader
    this.files.push(fileItem); // Store the fileItem in the array
  
      // Simulate successful upload Zby returning an Observable response
      const response: UploadResponse = {
        body: fileItem,
        status: UploadStatus.UPLOADED,
        progress: 100
      };
      
      return of(response); // Return observable with a simulated response
    }
  
    public removeFile(fileItem: FilePreviewModel): Observable<any> {
      this.files = this.files.filter(f => f.fileName !== fileItem.file.name);
  
    //   // Simulate successful removal
      return of({ status: 200 });
    }

    // public uploadFile(
    //   fileItem: FilePreviewModel
    // ): Observable<UploadResponse | undefined> {
    //   console.log(fileItem)
    //   const form = new FormData();
    //   //form.append('file', fileItem.file);
    //   const api = 'https://ngx-awesome-uploader-2.free.beeceptor.com/upload';
    //   const req = new HttpRequest('POST', api, form, { reportProgress: true });
    //   return this.http.request(req).pipe(
    //     map((res: HttpEvent<any>) => {
    //       if (res.type === HttpEventType.Response) {
    //         const responseFromBackend = res.body;
    //         return {
    //           body: '',
    //           status: UploadStatus.UPLOADED,
    //         };
    //       } else if (res.type === HttpEventType.UploadProgress && res.total) {
    //         /** Compute and show the % done: */
    //         const uploadProgress = +Math.round((100 * res.loaded) / res.total);
    //         return {
    //           status: UploadStatus.IN_PROGRESS,
    //           progress: uploadProgress,
    //         };
    //       } else {
    //         return undefined;
    //       }
    //     }),
    //     catchError((er) => {
    //       console.log(er);
    //       return of({ status: UploadStatus.ERROR, body: '' });
    //     })
    //   );
    // }
    // public removeFile(fileItem: FilePreviewModel): Observable<any> {
    //   const id = 50;
    //   const responseFromBackend = fileItem.uploadResponse;
    //   console.log(fileItem);
    //   const removeApi =
    //     'https://run.mocky.io/v3/dedf88ec-7ce8-429a-829b-bd2fc55352bc';
    //   return this.http.post(removeApi, { id });
    // }
  }
  