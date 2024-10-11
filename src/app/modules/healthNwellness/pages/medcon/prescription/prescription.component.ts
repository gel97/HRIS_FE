import { Component, OnInit, inject } from '@angular/core';
import { MedconService } from '../../../services/medcon.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css']
})
export class PrescriptionComponent implements OnInit{
  medconService = inject(MedconService);

  prescription:any = this.medconService.prescription();

  ngOnInit(): void {
    this.GetPrescription();
  }

  GetPrescription(){
    this.medconService.GetPrescription();
  }
}
