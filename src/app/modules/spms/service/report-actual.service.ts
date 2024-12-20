import { Injectable } from '@angular/core';
import { PdfService } from 'src/app/modules/spms/service/pdf.service';
import { SignatoriesService } from './signatories.service';

@Injectable({
  providedIn: 'root',
})
export class ReportActualService {
  constructor(
    private reportService: PdfService,
    private signatoriesService: SignatoriesService
  ) {}

  switchero: number = 0;
  triggerSwitch(trig: number) {
    this.switchero = trig;
  }
  title2: string | any;
  employeeName: string | any;
  employeePosition: string | any;
  signatories: any = {};

  get_signatories(typeId: any) {
    this.signatoriesService.get_signatories(typeId).subscribe({
      next: (response: any) => {
        this.signatories = response;
      },
      error: () => {},
      complete: () => {},
    });
  }

  ReportActual(data: any) {
    let title1 = localStorage.getItem('officeNameLong');

    switch (this.switchero) {
      case 1:
        this.title2 = 'PERFORMANCE STANDARD (OPCR-TARGET)';
        break;
      case 2:
        this.title2 = 'PERFORMANCE STANDARD (OPCR)';
        break;
      case 3:
        this.title2 = 'PERFORMANCE STANDARD (DPCR)';
        break;
      case 4:
        this.title2 = 'PERFORMANCE STANDARD (IPCR-TARGET)';
        break;
      default:
        break;
    }
    if (this.switchero != 4) {
      this.employeeName =
        this.signatories?.officeHead?.fullNameTitle ?? '(NO DATA)';
      this.employeePosition =
        this.signatories?.officeHead?.positionTitle ?? '(NO DATA)';
      // this.employeeName = '';
      // this.employeePosition = '';
    } else {
      this.employeeName = localStorage.getItem('fullName');
      this.employeePosition = localStorage.getItem('positionTitle');
    }
    let employeeName = this.employeeName;
    let employeeOffice = localStorage.getItem('officeNameLong');

    let employeePosition = this.employeePosition;
    let period = localStorage.getItem('reportPeriod');
    let officeShort = localStorage.getItem('officeName');
    let date = localStorage.getItem('reportDate');

    let reviewedBy = this.signatories?.adminHead?.fullNameTitle ?? '(NO DATA)';
    let reviewedByPosition =
      this.signatories?.adminHead?.positionTitle ?? '(NO DATA)';
    let approvedByPosition =
      this.signatories?.governor?.positionTitle ?? '(NO DATA)';
    let approvedBy = this.signatories?.governor?.fullNameTitle ?? '(NO DATA)';

    // let reviewedBy = '';
    // let reviewedByPosition = '';
    // let approvedByPosition = '';
    // let approvedBy = '';

    let content: any = [];
    let tableBody: any = [];

    let strategic: any = [];
    let core: any = [];
    let support: any = [];

    data.map((a: any) => {
      switch (a.categoryId) {
        case 1:
          strategic.push(a);
          break;
        case 2:
          core.push(a);
          break;
        case 3:
          support.push(a);
          break;
        default:
          break;
      }
    });

    // Header
    tableBody.push(
      [
        {
          text: 'MAJOR FINAL OUTPUT',
          rowSpan: 2,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'SUCCESS INDICATOR',
          rowSpan: 2,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'ALLOTED BUDGET',
          rowSpan: 2,
          alignment: 'center',
          bold: true,
          fontSize: 10,
        },
        {
          text: 'INDIVIDUALS/ DIVISION',
          rowSpan: 2,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'ACTUAL ACCOMPLISHMENT',
          rowSpan: 2,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'RATING',
          colSpan: 3,
          alignment: 'center',
          bold: true,
        },
        {},
        {},
        {
          text: 'Ave.',
          rowSpan: 2,
          alignment: 'center',
          bold: true,
        },
      ],
      [
        {},
        {},
        {},
        {},
        {},
        {
          text: 'E',
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Q',
          alignment: 'center',
          bold: true,
        },
        {
          text: 'T',
          alignment: 'center',
          bold: true,
        },
        {},
      ]
    );
    // End Header

    // Body
    if (strategic.length > 0) {
      tableBody.push([
        {
          text: 'Strategic Function',
          bold: true,
          alignment: 'left',
          colSpan: 9,
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ]);

      strategic.map((a: any) => {
        a.si.map((b: any) => {
          tableBody.push([
            { text: a.mfo, rowSpan: a.si.length },
            { text: b.qty + '' + (b.qtyUnit ? '%' : '') + ' ' + b.indicator },
            {},
            { text: b.sharedDiv },
            {},
            {},
            {},
            {},
            {},
          ]);
        });
      });
    }

    if (core.length > 0) {
      tableBody.push([
        {
          text: 'Core Function',
          bold: true,
          alignment: 'left',
          colSpan: 9,
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ]);

      core.map((a: any) => {
        a.si.map((b: any) => {
          tableBody.push([
            { text: a.mfo, rowSpan: a.si.length },
            { text: b.qty + '' + (b.qtyUnit ? '%' : '') + ' ' + b.indicator },
            {},
            { text: b.sharedDiv },
            {},
            {},
            {},
            {},
            {},
          ]);
        });
      });
    }

    if (support.length > 0) {
      tableBody.push([
        {
          text: 'Support Function',
          bold: true,
          alignment: 'left',
          colSpan: 9,
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ]);

      support.map((a: any) => {
        a.si.map((b: any) => {
          tableBody.push([
            { text: a.mfo, rowSpan: a.si.length },
            { text: b.qty + '' + (b.qtyUnit ? '%' : '') + ' ' + b.indicator },
            {},
            { text: b.sharedDiv },
            {},
            {},
            {},
            {},
            {},
          ]);
        });
      });
    }
    // End Body

    // Footer
    let tableFooter = [];
    tableFooter.push(
      {
        margin: [75, 10, 0, 0],
        table: {
          widths: [120, 100, 120],
          body: [
            [
              { text: 'AVERAGE RATING', bold: true },
              { text: 'Strategic Function:' },
              {},
            ],
            [{}, { text: 'Core Function:' }, {}],
            [{}, { text: 'Support Function:' }, {}],
            [{ text: 'FINAL AVERAGE RATING', bold: true }, {}, {}],
            [{ text: 'ADJECTIVE RATING', bold: true }, {}, {}],
          ],
        },
        fontSize: 8,
      },
      {
        margin: [75, 20, 0, 0],
        table: {
          widths: [200, 200, 100, 200, 105],
          body: [
            [
              {
                style: 'tableExample',
                table: {
                  widths: ['*'],
                  body: [
                    [
                      {
                        text: 'Discussed by:',
                        alignment: 'left',
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: employeeName,
                        decoration: 'underline',
                        bold: true,
                        alignment: 'center',

                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: employeePosition,
                        alignment: 'center',
                        border: [false, false, false, false],
                      },
                    ],
                  ],
                },
                fontSize: 8,
              },
              {
                style: 'tableExample',
                table: {
                  widths: ['*'],
                  body: [
                    [
                      {
                        text: 'Assessed by:',
                        alignment: 'left',
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: reviewedBy,
                        decoration: 'underline',
                        bold: true,
                        alignment: 'center',

                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: reviewedByPosition,
                        alignment: 'center',
                        border: [false, false, false, false],
                      },
                    ],
                  ],
                },
                fontSize: 8,
              },
              {
                table: {
                  widths: ['*'],
                  body: [
                    [
                      {
                        text: 'Date:',
                        alignment: 'left',
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: '',
                        alignment: 'center',
                        border: [false, false, false, false],
                      },
                    ],
                  ],
                },
                fontSize: 8,
              },
              {
                table: {
                  widths: ['*'],
                  body: [
                    [
                      {
                        text: 'Approved by:',
                        alignment: 'left',
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: approvedBy,
                        decoration: 'underline',
                        bold: true,
                        alignment: 'center',

                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: approvedByPosition,
                        alignment: 'center',
                        border: [false, false, false, false],
                      },
                    ],
                  ],
                },
                fontSize: 8,
              },
              {
                table: {
                  widths: ['*'],
                  body: [
                    [
                      {
                        text: 'Date:',
                        alignment: 'left',
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: '',
                        alignment: 'center',
                        border: [false, false, false, false],
                      },
                    ],
                  ],
                },
                fontSize: 8,
              },
            ],
          ],
          heights: 50,
        },
      }
    );
    // End Footer

    content.push([
      {
        margin: [85, 0, 0, 0],
        alignment: 'center',
        fontSize: 11,
        text: [{ text: title1 + '\n' }, { text: this.title2 }],
        bold: true,
      },
    ]);

    content.push([
      {
        margin: [75, 20, 0, 0],
        text: [
          { text: 'I, ' },
          {
            text: employeeName,
            bold: true,
            decoration: 'underline',
          },
          { text: ' of ' },
          {
            text: employeeOffice,
            bold: true,
            decoration: 'underline',
          },
          {
            text: ', commits to deliver and agree to be rated on the attainment of the following targets in accordance with the indicated measures for the period ',
            style: 'header',
          },
          {
            text: period + '.',
            bold: true,
            decoration: 'underline',
          },
        ],
        fontSize: 10,
      },
      {
        text: employeeName,
        bold: true,
        decoration: 'underline',
        alignment: 'right',
        margin: [0, 0, 30, 0],
        fontSize: 8,
      },
      {
        text: employeePosition + ', ' + officeShort,
        alignment: 'right',
        margin: [0, 0, 30, 0],
        fontSize: 8,
      },
      {
        text: [
          { text: 'Date: ' },
          {
            text: date,
            decoration: 'underline',
          },
        ],
        alignment: 'right',
        margin: [0, 5, 60, 10],
        fontSize: 8,
      },
      {
        table: {
          widths: [300, '*', 300, '*'],
          body: [
            [
              {
                style: 'tableExample',
                table: {
                  widths: ['*'],
                  body: [
                    [
                      {
                        text: 'Reviewed by:',
                        alignment: 'left',
                        border: [false, false, false, false],
                        fontSize: 8,
                      },
                    ],
                    [
                      {
                        text: reviewedBy,
                        decoration: 'underline',
                        bold: true,
                        alignment: 'center',
                        fontSize: 8,
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: reviewedByPosition,
                        alignment: 'center',
                        border: [false, false, false, false],
                        fontSize: 8,
                      },
                    ],
                  ],
                },
              },
              {
                table: {
                  widths: ['*'],
                  body: [
                    [
                      {
                        text: 'Date:',
                        alignment: 'left',
                        border: [false, false, false, false],
                        fontSize: 8,
                      },
                    ],
                    [
                      {
                        text: '',
                        alignment: 'center',
                        border: [false, false, false, false],
                        fontSize: 8,
                      },
                    ],
                  ],
                },
              },
              {
                table: {
                  widths: ['*'],
                  body: [
                    [
                      {
                        text: 'Approved by:',
                        alignment: 'left',
                        border: [false, false, false, false],
                        fontSize: 8,
                      },
                    ],
                    [
                      {
                        text: approvedBy,
                        decoration: 'underline',
                        bold: true,
                        alignment: 'center',
                        fontSize: 8,
                        border: [false, false, false, false],
                      },
                    ],
                    [
                      {
                        text: approvedByPosition,
                        alignment: 'center',
                        border: [false, false, false, false],
                        fontSize: 8,
                      },
                    ],
                  ],
                },
              },
              {
                table: {
                  widths: ['*'],
                  body: [
                    [
                      {
                        text: 'Date:',
                        alignment: 'left',
                        border: [false, false, false, false],
                        fontSize: 8,
                      },
                    ],
                    [
                      {
                        text: '',
                        alignment: 'center',
                        border: [false, false, false, false],
                        fontSize: 8,
                      },
                    ],
                  ],
                },
              },
            ],
          ],
          heights: 50,
        },
        margin: [75, 10, 0, 0],
      },
      {
        margin: [75, 10, 0, 0],
        table: {
          widths: ['*', '*', 40, '*', '*', 30, 30, 30, 30],
          body: tableBody,
        },
        pageBreak: 'after',
        fontSize: 8,
      },

      tableFooter,
    ]);

    this.reportService.reportTarget(content, {
      isPortrait: false,
      title1: title1,
      title2: this.title2,
    });
  }
}
