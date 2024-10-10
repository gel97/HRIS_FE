import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HWApiService } from '../healthNwellness-api.service';
import { api } from 'src/app/connection';
import Swal from 'sweetalert2';
import { AlertService } from '../../spms/service/alert.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MedconService {

  constructor(
    private http: HttpClient,
    private url: HWApiService,
    private alertService: AlertService,
  ) {}

  consultation = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  GetConsultationHistory() {
    this.consultation.mutate((a) => (a.isLoadingReport = true));
    this.http
      .get<any[]>(api + this.url.get_consultation_history())
      .subscribe({
        next: (response: any) => {
          this.consultation.mutate((a) => (a.data = response));
          this.consultation.mutate((a) => (a.isLoadingReport = false));
        },
        error: () => {
          this.alertService.error();
          this.consultation.mutate((a) => (a.isLoadingReport = false));
        },
        complete: () => {
          console.log(this.consultation())
          this.consultation.mutate((a) => (a.isLoadingReport = false));
        },
      });
  }




}
