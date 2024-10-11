import { Component, inject, signal } from '@angular/core';
import { ErrorService } from '../../service/error.service';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  errorService = inject(ErrorService);
  error:any = this.errorService.error;
}
