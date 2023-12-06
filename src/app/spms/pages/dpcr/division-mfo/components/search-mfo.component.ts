import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-search-mfo',
  template: `
    <div class="input-group">
      <span class="input-group-text">
        <div
          class="spinner-border spinner-border-sm text-primary"
          role="status"
          *ngIf="isSearchLoading; else showIcon"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
        <ng-template #showIcon>
          <i class="tf-icons bx bx-search"></i>
        </ng-template>
      </span>
      <input
        type="text"
        [(ngModel)]="search.MFO"
        (ngModelChange)="SearchMFO()"
        class="form-control"
        placeholder="Search..."
      />
    </div>
  `,
})
export class SearchMFOComponent {
  @Input() search: any;
  @Input() isSearchLoading: any;
  @Input() siData: any;
  @Input() standard: any;
  @Input() isAdd: any;
  @Input() error: any;

  @Output() onSearchMFO = new EventEmitter<any>();

  SearchMFO() {
    this.onSearchMFO.emit('Search MFO');
  }
}
