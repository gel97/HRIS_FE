import { Injectable } from '@angular/core';
import { PdfService } from 'src/app/spms/service/pdf.service';

@Injectable({
  providedIn: 'root'
})
export class ReportActualService {


  constructor(private reportService:PdfService) { }


  ReportActual(data:any) {
    let title1 = 'PROVINCIAL HUMAN RESOURCE MANAGEMENT OFFICE';
    let title2 = 'PERFORMANCE STANDARD (OPCR-TARGET)';

    let employeeName = 'EDWIN A. PALERO';
    let employeeOffice = 'PROVINCIAL HUMAN RESOURCE MANAGEMENT OFFICE';
    let employeePosition = 'P.G. Depeartment Head';

    let period = 'JULY to DECEMBER';
    let officeShort = 'PHRMO';
    let date = 'July 10, 2024';

    let reviewedBy = 'JOSIE JEAN R. RABANOZ, CE, MPA, En.P.';
    let reviewedByPosition = 'Provincial Administrator';
    let approvedByPosition = 'Governor';
    let approvedBy = 'EDWIN I. JUBAHIB';

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
            { text: b.indicator },
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
            { text: b.indicator },
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
            { text: b.indicator },
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
        margin: [0, 10, 0, 0],
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
      },
      {
        margin: [0, 20, 0, 0],
        table: {
          widths: [250, 250, '*', 250, '*'],
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
        margin:[0,20,0,0],
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
      },
      {
        text: employeeName,
        bold: true,
        decoration: 'underline',
        alignment: 'right',
        margin: [0, 0, 60, 0],
      },
      {
        text: employeePosition + ', ' + officeShort,
        alignment: 'right',
        margin: [0, 0, 30, 0],
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
              },
            ],
          ],
          heights: 50,
        },
      },
      {
        margin: [0, 10, 0, 0],
        table: {
          widths: ['*', '*', 40, '*', '*', 30, 30, 30, 30],
          body: tableBody,
        },
        pageBreak: 'after',
      },

      tableFooter,
    ]);

    this.reportService.reportTarget(content, {
      isPortrait: false,
      title1: title1,
      title2: title2,
    });
  }
}
