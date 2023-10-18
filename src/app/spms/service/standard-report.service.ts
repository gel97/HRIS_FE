import { Injectable } from '@angular/core';
import { PdfService } from './pdf.service';

@Injectable({
  providedIn: 'root',
})
export class StandardReportService {
  constructor(private reportService: PdfService) {}

  ReportStandard(data: any) {
    let title1 = 'PROVINCIAL HUMAN RESOURCE MANAGEMENT OFFICE';
    let title2 = 'PERFORMANCE STANDARD (DPCR)';

    let employeeName = 'EDWIN A. PALERO, MPA, MHRM';
    let employeeOffice = 'PROVINCIAL HUMAN RESOURCE MANAGEMENT OFFICE';

    let strategic: any = [];
    let core: any = [];
    let support: any = [];

    let content: any = [];
    let tableBody: any = [];

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
    tableBody.push([
      {
        text: 'MFO',
        bold: true,
        alignment: 'center',
      },
      {
        text: 'Success Indicator',
        bold: true,
        alignment: 'center',
      },
      {
        text: 'Rating',
        bold: true,
        alignment: 'center',
      },
      {
        text: 'Quantity',
        bold: true,
        alignment: 'center',
      },
      {
        text: 'Quality',
        bold: true,
        alignment: 'center',
      },
      {
        text: 'Timeliness',
        bold: true,
        alignment: 'center',
      },
    ]);
    // End Header

    // Body
    if (strategic.length > 0) {
      tableBody.push([
        {
          text: 'Strategic Function',
          bold: true,
          alignment: 'left',
          colSpan: 6,
        },
        {},
        {},
        {},
        {},
        {},
      ]);

      strategic.map((a: any) => {
        a.si.map((b: any) => {
          tableBody.push(
            [
              { text: a.mfo, rowSpan: a.si.length * 5 },
              { text: b.indicator, rowSpan: 5 },
              { text: '5', alignment: 'center' },
              { text: b.qty5, alignment: 'center' },
              { text: b.qlty5, alignment: 'center' },
              { text: b.timely5, alignment: 'center' },
            ],
            [
              {},
              {},
              { text: '4', alignment: 'center' },
              { text: b.qty4, alignment: 'center' },
              { text: b.qlty4, alignment: 'center' },
              { text: b.timely4, alignment: 'center' },
            ],
            [
              {},
              {},
              { text: '3', alignment: 'center' },
              { text: b.qty3, alignment: 'center' },
              { text: b.qlty3, alignment: 'center' },
              { text: b.timely3, alignment: 'center' },
            ],
            [
              {},
              {},
              { text: '2', alignment: 'center' },
              { text: b.qty2, alignment: 'center' },
              { text: b.qlty2, alignment: 'center' },
              { text: b.timely2, alignment: 'center' },
            ],
            [
              {},
              {},
              { text: '1', alignment: 'center' },
              { text: b.qty1, alignment: 'center' },
              { text: b.qlty1, alignment: 'center' },
              { text: b.timely1, alignment: 'center' },
            ]
          );
        });
      });
    }

    if (core.length > 0) {
      tableBody.push([
        {
          text: 'Core Function',
          bold: true,
          alignment: 'left',
          colSpan: 6,
        },
        {},
        {},
        {},
        {},
        {},
      ]);

      core.map((a: any) => {
        a.si.map((b: any) => {
          tableBody.push(
            [
              { text: a.mfo, rowSpan: a.si.length * 5 },
              { text: b.indicator, rowSpan: 5 },
              { text: '5', alignment: 'center' },
              { text: b.qty5, alignment: 'center' },
              { text: b.qlty5, alignment: 'center' },
              { text: b.timely5, alignment: 'center' },
            ],
            [
              {},
              {},
              { text: '4', alignment: 'center' },
              { text: b.qty4, alignment: 'center' },
              { text: b.qlty4, alignment: 'center' },
              { text: b.timely4, alignment: 'center' },
            ],
            [
              {},
              {},
              { text: '3', alignment: 'center' },
              { text: b.qty3, alignment: 'center' },
              { text: b.qlty3, alignment: 'center' },
              { text: b.timely3, alignment: 'center' },
            ],
            [
              {},
              {},
              { text: '2', alignment: 'center' },
              { text: b.qty2, alignment: 'center' },
              { text: b.qlty2, alignment: 'center' },
              { text: b.timely2, alignment: 'center' },
            ],
            [
              {},
              {},
              { text: '1', alignment: 'center' },
              { text: b.qty1, alignment: 'center' },
              { text: b.qlty1, alignment: 'center' },
              { text: b.timely1, alignment: 'center' },
            ]
          );
        });
      });
    }

    if (support.length > 0) {
      tableBody.push([
        {
          text: 'Support Function',
          bold: true,
          alignment: 'left',
          colSpan: 6,
        },
        {},
        {},
        {},
        {},
        {},
      ]);

      support.map((a: any) => {
        a.si.map((b: any) => {
          tableBody.push(
            [
              { text: a.mfo, rowSpan: a.si.length * 5 },
              { text: b.indicator, rowSpan: 5 },
              { text: '5', alignment: 'center' },
              { text: b.qty5, alignment: 'center' },
              { text: b.qlty5, alignment: 'center' },
              { text: b.timely5, alignment: 'center' },
            ],
            [
              {},
              {},
              { text: '4', alignment: 'center' },
              { text: b.qty4, alignment: 'center' },
              { text: b.qlty4, alignment: 'center' },
              { text: b.timely4, alignment: 'center' },
            ],
            [
              {},
              {},
              { text: '3', alignment: 'center' },
              { text: b.qty3, alignment: 'center' },
              { text: b.qlty3, alignment: 'center' },
              { text: b.timely3, alignment: 'center' },
            ],
            [
              {},
              {},
              { text: '2', alignment: 'center' },
              { text: b.qty2, alignment: 'center' },
              { text: b.qlty2, alignment: 'center' },
              { text: b.timely2, alignment: 'center' },
            ],
            [
              {},
              {},
              { text: '1', alignment: 'center' },
              { text: b.qty1, alignment: 'center' },
              { text: b.qlty1, alignment: 'center' },
              { text: b.timely1, alignment: 'center' },
            ]
          );
        });
      });
    }
    // End Body
    content.push(
      {
        margin: [0, 20, 0, 0],
        text: [
          {
            text: 'Name: ',
            bold: true,
          },
          {
            text: employeeName,
            decoration: 'underline',
          },
        ],
      },
      {
        margin: [0, 10, 0, 0],
        text: [
          {
            text: 'Office: ',
            bold: true,
          },
          {
            text: employeeOffice,
            decoration: 'underline',
          },
        ],
      },
      {
        margin: [0, 10, 0, 0],
        text: [
          {
            text: 'Designation: ',
            bold: true,
          },
          {
            text: '',
            decoration: 'underline',
          },
        ],
      },
      {
        margin: [0, 10, 0, 0],
        table: {
          widths: ['*', '*', 35, 50, 80, 80],
          body: tableBody,
        },
        pageBreak: 'after',
      }
    );

    this.reportService.reportTarget(content, {
      isPortrait: false,
      title1: title1,
      title2: title2,
    });
  }
}
