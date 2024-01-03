import { Component, OnInit } from '@angular/core';
import { OtsService } from 'src/app/spms/service/ots.service';

@Component({
  selector: 'app-ots-request',
  templateUrl: './ots-request.component.html',
  styleUrls: ['./ots-request.component.css'],
})
export class OtsRequestComponent implements OnInit {
  constructor(private OtsRequestService: OtsService) {}

  divisionName: any = '';
  ots_request: any = [];
  ots_request_summary: any = [];
  toggle: number = 0;

  counter_pending: number | any;
  counter_approved: number | any;

  ots_modal_data: any = {};
  isClicked: boolean = true;

  ngOnInit(): void {
    this.divisionName = localStorage.getItem('divisionName');
    this.get_ots_request();
    this.get_ots_request_summary();
  }

  toggleSwitch(toggle: number) {
    this.toggle = toggle;
    this.get_ots_request();
  }

  get_ots_request() {
    this.OtsRequestService.get_ots_request(this.toggle).subscribe({
      next: (response: any) => {
        this.ots_request = response;
      },
      error: () => {},
      complete: () => {},
    });
  }

  get_ots_request_summary() {
    this.OtsRequestService.get_ots_request_summary().subscribe({
      next: (response: any) => {
        this.ots_request_summary = response;
        console.log('summary', this.ots_request_summary);
      },
      error: () => {},
      complete: () => {},
    });
  }

}
