import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MonthRangeService {

  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  constructor(private http: HttpClient) {}

  setMonthRange(data: any) {
    localStorage.setItem('year', data.year);
    localStorage.setItem('semester', data.semester);

    switch (data.type) {
      case 'opcr':
        localStorage.setItem(
          'reportPeriod',
          this.setSemesterTarget(data.semester, data.year) + ' ' + data.year
        );
        break;
      case 'ipcr':
        localStorage.setItem(
          'reportPeriod',
          this.setSemesterTarget(data.semester, data.year) + ' ' + data.year
        );
        break;
      default:
        break;
    }
  }

  setSemesterTarget(sem: number, year: any) {
    let data;
    switch (sem) {
      case 0:
        data = 'JANUARY TO DECEMBER';
        localStorage.setItem(
          'reportDate',
          //'January 10, ' + year
          new Date().toLocaleDateString(undefined, this.options)
        );
        break;
      case 1:
        data = 'JANUARY TO JUNE';
        localStorage.setItem(
          'reportDate',
          //'January 10, ' + year.toString()
          new Date().toLocaleDateString(undefined, this.options)
        );
        break;
      case 2:
        data = 'JULY TO DECEMBER';
        // let intYear: number = parseInt(year, 10);
        // let _newYear = intYear + 1;
        localStorage.setItem(
          'reportDate',
          //'July 10, ' + year.toString()
          new Date().toLocaleDateString(undefined, this.options)
        );
        break;
      default:
        break;
    }
    return data;
  }

  setSemesterActual() {
    let data;
    let sem = localStorage.getItem('semester');
    let year = localStorage.getItem('year');

    if (sem !== null && year !== null) {
      let semInt = parseInt(sem);
      let yearInt = parseInt(year);

      switch (semInt) {
        case 0:
          data = 'JANUARY TO DECEMBER';
          let newYear = yearInt + 1;
          localStorage.setItem(
            'reportDate',
            // 'January 10, ' + newYear.toString()
            new Date().toLocaleDateString(undefined, this.options)
          );
          break;
        case 1:
          data = 'JANUARY TO JUNE';
          localStorage.setItem(
            'reportDate',
            //'July 10, ' + yearInt.toString()
            new Date().toLocaleDateString(undefined, this.options)
          );
          break;
        case 2:
          data = 'JULY TO DECEMBER';
          let _newYear = yearInt + 1;
          localStorage.setItem(
            'reportDate',
            // 'January 10, ' + _newYear.toString()
            new Date().toLocaleDateString(undefined, this.options)
          );
          break;
        default:
          break;
      }
    }
  }
}
