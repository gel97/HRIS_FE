import { Component, OnInit, inject } from '@angular/core';
import { MedconService } from '../../../services/medcon.service';
@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit{
  medconService = inject(MedconService);

  consultation:any = this.medconService.consultation();

  ngOnInit(): void {
    this.GetConsultationHistory();
  }

  GetConsultationHistory(){
    this.medconService.GetConsultationHistory();
  }

}
