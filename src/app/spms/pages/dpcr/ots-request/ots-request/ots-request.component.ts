import { Component, OnInit, ViewChild } from '@angular/core';
import { OtsService } from 'src/app/spms/service/ots.service';
import { UtlityService } from 'src/app/spms/service/utility.service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-ots-request',
  templateUrl: './ots-request.component.html',
  styleUrls: ['./ots-request.component.css'],
})
export class OtsRequestComponent implements OnInit {
  constructor(
    private OtsRequestService: OtsService,
    private ProfilePicture: UtlityService
  ) {}

  divisionName: any = '';
  ots_request: any = [];
  ots_request_summary: any = [];
  // toggle: number = 0;
  officeRoleId: number = 0;

  counter_pending: number | any;
  counter_approved: number | any;

  ots_modal_data: any = {
    description: '',
    st: {
      stIndicator: '',
    },
  };
  isClicked: boolean = true;

  pageEvent: PageEvent | undefined;

  pageSizeOptions = [5, 10, 50, 100];

  page: any = {
    pageNumber: 1,
    pageSize: 10,
    toggle: 0,
  };

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  @ViewChild('closebutton')
  closebutton!: { nativeElement: { click: () => void } };

  ngOnInit(): void {
    this.divisionName = localStorage.getItem('divisionName');
    this.officeRoleId = localStorage.getItem('officeRoleId') != 'null' ? 1 : 0;
    this.get_ots_request();
    this.get_ots_request_summary();
  }

  handlePageEvent(e: PageEvent) {
    this.page.pageNumber = e.pageIndex + 1;
    this.page.pageSize = e.pageSize;
    this.get_ots_request();
  }

  toggleSwitch(toggle: number) {
    this.page.toggle = toggle;
    this.get_ots_request();
  }

  get_ots_request() {
    this.page.officeRoleId = localStorage.getItem('officeRoleId');
    if (this.page.officeRoleId == 'null') {
      this.page.officeRoleId = 3;
    }
    this.OtsRequestService.post_ots_request(this.page).subscribe({
      next: (response: any) => {
        this.ots_request = response;
      },
      error: () => {},
      complete: () => {
        // this.get_profile_picture(this.ots_request.items);
      },
    });
  }

  // get_profile_picture(data: any) {
  //   data.map((i: any, index: number) => {
  //     this.ProfilePicture.get_profile_picture(i.userId).subscribe({
  //       next: (reponse: any) => {
  //         data[index].imageExtracted = reponse.imageDataURL;
  //       },
  //       error: (error: any) => {},
  //       complete: () => {},
  //     });
  //   });
  //   return data;
  // }

  get_ots_request_summary() {
    this.OtsRequestService.get_ots_request_summary().subscribe({
      next: (response: any) => {
        this.ots_request_summary = response;
      },
      error: () => {},
      complete: () => {},
    });
  }

  toApprove = [];
  Approve() {
    this.toApprove = this.ots_request.items.filter((i: any) => i.isCheck);
    if (this.toApprove.length > 0) {
      this.OtsRequestService.put_ots_request_approve(this.toApprove).subscribe({
        next: () => {},
        error: () => {},
        complete: () => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: 'success',
            title: 'Approved',
          });
          this.get_ots_request();
          this.get_ots_request_summary();
        },
      });
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: 'warning',
        title: 'Please select a data!',
      });
    }
  }

  ApproveAll() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it all!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.OtsRequestService.put_ots_request_approve(
          this.ots_request.items
        ).subscribe({
          next: () => {},
          error: () => {},
          complete: () => {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: 'success',
              title: 'Approved',
            });
            this.get_ots_request();
            this.get_ots_request_summary();
          },
        });
      }
    });
  }

  isCheck_List_Pending(recNo: any, event: any) {
    let index = this.ots_request.items.findIndex((a: any) => a.recNo == recNo);
    this.ots_request.items[index].isCheck = event.target.checked;
  }

  SaveAndApprove() {
    this.closebutton.nativeElement.click();
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save the changes and approve it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.OtsRequestService.put_ots_request_overRide(
          this.ots_modal_data
        ).subscribe({
          next: () => {},
          error: () => {},
          complete: () => {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: 'success',
              title: 'Approved',
            });
            this.get_ots_request();
            this.get_ots_request_summary();
          },
        });
      }
    });
  }
}
