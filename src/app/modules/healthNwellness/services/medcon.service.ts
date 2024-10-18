import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HWApiService } from '../healthNwellness-api.service';
import { api } from 'src/app/connection';
import Swal from 'sweetalert2';
import { AlertService } from '../../spms/service/alert.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MedconService {

  constructor(
    private http: HttpClient,
    private url: HWApiService,
    private alertService: AlertService,
    private sanitizer: DomSanitizer,
  ) {}

  consultation = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  labHistory = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  labHistoryReport = signal<any>({
    data: null,
    error: false,
    isLoading: false,
  });

  prescription = signal<any>({
    data: [],
    error: false,
    isLoading: false,
  });

  labHistoryUrl:SafeResourceUrl = "";


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

  GetLabHistory() {
    this.labHistory.mutate((a) => (a.isLoadingReport = true));
    this.http
      .get<any[]>(api + this.url.get_lab_history())
      .subscribe({
        next: (response: any) => {
          this.labHistory.mutate((a) => (a.data = response));
          this.labHistory.mutate((a) => (a.isLoadingReport = false));
        },
        error: () => {
          this.alertService.error();
          this.labHistory.mutate((a) => (a.isLoadingReport = false));
        },
        complete: () => {
          console.log(this.labHistory())
          this.labHistory.mutate((a) => (a.isLoadingReport = false));
        },
      });
  }


  GetLabHistoryReport(qrCode:string, fileName:string) {
    this.labHistoryReport.mutate((a) => (a.isLoadingReport = true));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Example header, you can add more
      'stringss': environment.hwApiKey
      
    });
    this.http
      .get<any[]>(`https://davnorsystems.gov.ph/HWWebApi/api/LaboratoryResult/GetLabResult/${qrCode}/${fileName}`, {headers, 'responseType':'blob' as 'json'})
      .subscribe({
        next: (response: any) => {
          console.log(response)
          this.labHistoryUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(response));

          this.labHistoryReport.mutate((a) => (a.data = this.labHistoryUrl));
          this.labHistoryReport.mutate((a) => (a.isLoadingReport = false));
        },
        error: (error:any) => {
          console.log(error)

          this.alertService.error();
          this.labHistoryReport.mutate((a) => (a.isLoadingReport = false));
        },
        complete: () => {
          console.log(this.labHistoryReport())
          this.labHistoryReport.mutate((a) => (a.isLoadingReport = false));

        },
      });
  }

  GetPrescription() {
    this.prescription.mutate((a) => (a.isLoadingReport = true));
    this.http
      .get<any[]>(api + this.url.get_prescription_history())
      .subscribe({
        next: (response: any) => {
          this.prescription.mutate((a) => (a.data = response));
          this.prescription.mutate((a) => (a.isLoadingReport = false));
        },
        error: () => {
          this.alertService.error();
          this.prescription.mutate((a) => (a.isLoadingReport = false));
        },
        complete: () => {
          console.log(this.prescription())
          this.prescription.mutate((a) => (a.isLoadingReport = false));
        },
      });
  }

}
