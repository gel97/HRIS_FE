import { Injectable } from '@angular/core';
import { PdfService } from 'src/app/spms/service/pdf.service';
import { SignatoriesService } from './signatories.service';

@Injectable({
  providedIn: 'root',
})
export class ReportMporService {
  constructor(
    private reportService: PdfService,
    private signatoriesService: SignatoriesService
  ) {}

  ReportMPOR() {
    let content: any = [];
    let tableBody: any = [];
    let title1 = 'PROVINCIAL BLA BLA BLA OFFICE';
    let title2 = 'MONTHLY PERFORMANCE OUTPUT REPORT';

    tableBody.push(
      [
        {
          text: 'MAJOR FINAL OUTPUT',
          margin: [0, 13, 0, 0],
          rowSpan: 3,
          fontSize: 12,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'ACCOMPLISHMENTS',
          colSpan: 15,
          fontSize: 8,
          alignment: 'center',
          bold: true,
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
      [
        {},
        {
          text: 'QUALITY',
          fontSize: 8,
          colSpan: 5,
          alignment: 'center',
          bold: true,
        },
        {},
        {},
        {},
        {},
        {
          text: 'QUANTITY',
          fontSize: 8,
          colSpan: 5,
          alignment: 'center',
          bold: true,
        },
        {},
        {},
        {},
        {},
        {
          text: 'TIMELINESS',
          fontSize: 8,
          colSpan: 5,
          alignment: 'center',
          bold: true,
        },
        {},
        {},
        {},
        {},
      ],
      [
        {},
        {
          text: 'Wk1',
          fontSize: 8,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Wk2',
          fontSize: 8,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Wk3',
          fontSize: 8,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Wk4',
          fontSize: 8,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'TOTAL',
          fontSize: 8,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Wk1',
          fontSize: 8,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Wk2',
          fontSize: 8,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Wk3',
          fontSize: 8,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Wk4',
          fontSize: 8,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'TOTAL',
          fontSize: 8,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Wk1',
          fontSize: 8,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Wk2',
          fontSize: 8,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Wk3',
          fontSize: 8,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Wk4',
          fontSize: 8,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'TOTAL',
          fontSize: 8,
          alignment: 'center',
          bold: true,
        },
      ]
    );

    content.push([
      {
        margin: [0, 20, 0, 0],
        alignment: 'justify',
        columns: [
          {
            text: 'EMPLOYEE NAME: LOWELL DAVE A. LARGO',
            fontSize: 10,
            width: 790,
            bold: true,
          },
          {
            text: 'MONTH: JANUARY 2024',
            fontSize: 10,
            alignment: 'left',
            bold: true,
          },
        ],
      },
      {
        style: 'tableExample',
        margin: [0, 20, 0, 0],
        table: {
          widths: [
            300,
            '*',
            '*',
            '*',
            '*',
            '*',
            '*',
            '*',
            '*',
            '*',
            '*',
            '*',
            '*',
            '*',
            '*',
            '*',
          ],
          body: tableBody,
        },
      },
    ]);

    this.reportService.reportTarget(content, {
      isPortrait: false,
      title1: title1,
      title2: title2,
    });
  }
}
