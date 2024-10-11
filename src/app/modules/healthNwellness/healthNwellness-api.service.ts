import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class HWApiService {
  constructor() {}

  get_consultation_history = () => `/HWConsultationHistory`;
  get_lab_history          = () => `/HWLabHistory`;
  get_prescription_history = () => `/HWPrescriptionHistory`;
  
  get_lab_result           = (fileName:string) => `/HWLabResult/GetFile/${fileName}`;

}
