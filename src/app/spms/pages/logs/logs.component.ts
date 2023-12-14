import { Component, OnInit, inject } from '@angular/core';
import { LogsService } from '../../service/logs.service';
import { UtlityService } from '../../service/utility.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css'],
})
export class LogsComponent implements OnInit {
  constructor(private ProfilePicture: UtlityService) {}
  logsService = inject(LogsService);

  fetch_logs: any = [];
  fetch_logs_complete: any = [];
  fetch_office: any = [];
  public profilePicture: any = {};
  flag: boolean = false;
  selectedOfficeId = localStorage.getItem('officeId');
  pageEvent: PageEvent | undefined;
  search: any = '';

  pageSizeOptions = [5, 10, 50, 100];

  page: any = { pageNumber: 1, pageSize: 10 };

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  ngOnInit(): void {
    this.get_logs();
    this.get_office();
  }

  colorScheme(color: any) {
    let return_color = '';
    switch (color) {
      case 1:
        return_color = 'green';
        break;
    }

    switch (color) {
      case 2:
        return_color = 'blue';
        break;
    }

    switch (color) {
      case 3:
        return_color = 'red';
        break;
    }

    switch (color) {
      case 4:
        return_color = 'red';
        break;
    }

    return return_color;
  }

  backgroundScheme(background: any) {
    let return_background = '';
    switch (background) {
      case 1:
        return_background = 'greenyellow';
        break;
    }

    switch (background) {
      case 2:
        return_background = 'lightblue';
        break;
    }

    switch (background) {
      case 3:
        return_background = 'rgb(241, 191, 191)';
        break;
    }

    switch (background) {
      case 4:
        return_background = 'rgb(241, 191, 191)';
        break;
    }

    return return_background;
  }

  iconScheme(icon: any) {
    let return_icon = '';
    switch (icon) {
      case 1:
        return_icon = 'bx-file';
        break;
    }

    switch (icon) {
      case 2:
        return_icon = 'bx-edit-alt';
        break;
    }

    switch (icon) {
      case 3:
        return_icon = 'bx-trash-alt';
        break;
    }

    switch (icon) {
      case 4:
        return_icon = 'bx-trash-alt';
        break;
    }

    return return_icon;
  }

  handlePageEvent(e: PageEvent) {
    this.page.pageNumber = e.pageIndex + 1;
    this.page.pageSize = e.pageSize;
    this.post_all_logs();
  }

  searchLogs() {
    console.log('search', this.search);
    this.page.search = this.search;
    this.post_all_logs();
  }

  get_office() {
    this.logsService.get_office().subscribe({
      next: (response: any) => {
        this.fetch_office = response;
        console.log('office', this.fetch_office);
      },
      error: () => {},
      complete: () => {},
    });
  }

  onSelectChange() {
    console.log('Selected Office ID_2:', this.selectedOfficeId);
    this.page.officeId = this.selectedOfficeId;
    this.post_all_logs();
  }

  post_all_logs() {
    this.flag = true;
    console.log('Selected Office ID_1:', this.selectedOfficeId);
    this.page.officeId = this.selectedOfficeId;
    this.logsService.post_all_logs(this.page).subscribe({
      next: (response: any) => {
        this.fetch_logs_complete = response.items;
        this.page = response.metadata;
        console.log('complete', this.fetch_logs_complete);
        console.log('complete1', this.page);
      },
      error: () => {},
      complete: () => {
        this.get_profile_picture(this.fetch_logs_complete.eic);
      },
    });
  }

  arrowbackFunction() {
    this.flag = false;
  }

  get_profile_picture(picture: any) {
    this.ProfilePicture.get_profile_picture(picture).subscribe({
      next: (data: any) => {
        this.profilePicture = data;
        console.log(this.profilePicture);
      },
      error: (error: any) => {},
      complete: () => {},
    });
  }

  get_logs() {
    this.logsService.get_logs().subscribe({
      next: (response: any) => {
        this.fetch_logs = response;
        console.log(this.fetch_logs);
      },
      error: () => {},
      complete: () => {
        this.get_profile_picture(this.fetch_logs.eic);
      },
    });
  }
}
