import { Injectable } from '@angular/core';
import { PdfService } from 'src/app/spms/service/pdf.service';
import { SignatoriesService } from './signatories.service';
import { HttpClient } from '@angular/common/http';
import { SpmsApiService } from './spms-api.service';
import { api } from 'src/app/connection';

@Injectable({
  providedIn: 'root',
})
export class ReportMporService {
  constructor(
    private reportService: PdfService,
    private signatoriesService: SignatoriesService,
    private http: HttpClient,
    private url: SpmsApiService
  ) {}

  post_print_mpor(data: any) {
    return this.http.post<any[]>(api + this.url.post_print_mpor(), data, {
      responseType: `json`,
    });
  }

  post_print_mpor_officeHead(data: any) {
    return this.http.post<any[]>(
      api + this.url.post_print_mpor_officeHead(),
      data,
      {
        responseType: `json`,
      }
    );
  }

  ReportMPOR(strategic: any, core: any, support: any, month: any, year: any) {
    let content: any = [];
    let tableBody: any = [];
    // let title1 = localStorage.getItem('officeNameLong');
    // let title2 = 'MONTHLY PERFORMANCE OUTPUT REPORT\nsampesample';
    let title1 = '';
    let title2 = '';

    tableBody.push(
      [
        {
          text: 'MAJOR FINAL OUTPUT',
          margin: [0, 13, 0, 0],
          rowSpan: 3,
          fontSize: 9,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'ACCOMPLISHMENTS',
          colSpan: 23,
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
          colSpan: 9,
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
        {
          text: 'TIMELINESS',
          fontSize: 8,
          colSpan: 9,
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
      ],
      [
        {},
        {
          text: 'Wk1',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Wk2',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Wk3',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Wk4',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'TOTAL',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Wk1',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: '',
          fontSize: 6,
          alignment: 'center',
          bold: true,
          fillColor: '#CCCCCC',
        },
        {
          text: 'Wk2',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: '',
          fontSize: 6,
          alignment: 'center',
          bold: true,
          fillColor: '#CCCCCC',
        },
        {
          text: 'Wk3',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: '',
          fontSize: 6,
          alignment: 'center',
          bold: true,
          fillColor: '#CCCCCC',
        },
        {
          text: 'Wk4',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: '',
          fontSize: 6,
          alignment: 'center',
          bold: true,
          fillColor: '#CCCCCC',
        },
        {
          text: 'TOTAL',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Wk1',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: '',
          fontSize: 6,
          alignment: 'center',
          bold: true,
          fillColor: '#CCCCCC',
        },
        {
          text: 'Wk2',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: '',
          fontSize: 6,
          alignment: 'center',
          bold: true,
          fillColor: '#CCCCCC',
        },
        {
          text: 'Wk3',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: '',
          fontSize: 6,
          alignment: 'center',
          bold: true,
          fillColor: '#CCCCCC',
        },
        {
          text: 'Wk4',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: '',
          fontSize: 6,
          alignment: 'center',
          bold: true,
          fillColor: '#CCCCCC',
        },
        {
          text: 'TOTAL',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
      ]
    );

    tableBody.push([
      {
        text: '1.' + ' ' + 'STRATEGIC FUNCTIONS',
        fontSize: 9,
        colSpan: 24,
        alignment: 'left',
        bold: true,
      },
      {},
      {},
      {},
      {},
      {},
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
    ]);

    strategic.map((a: any, index: number) => {
      tableBody.push([
        {
          text: [{ text: index + 1 + '.', bold: true }, ' ' + a.mfo],
          margin: [3, 0, 0, 0],
          fontSize: 9,
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
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ]);
      a.ipcrDataId.map((b: any, index_2: number) => {
        tableBody.push([
          {
            text: [
              { text: index + 1 + '.' + (index_2 + 1) + '.', bold: true },
              ' ' + b.indicator,
            ],
            margin: [6, 0, 0, 0],
            fontSize: 9,
          },
          {
            text: b.qtyWk1,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qtyWk2,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qtyWk3,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qtyWk4,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.total,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qltyWk1,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qltyWk1Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.qltyWk2,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qltyWk2Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.qltyWk3,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qltyWk3Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.qltyWk4,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qltyWk4Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.totalQlty,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.timelyWk1,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.timelyWk1Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.timelyWk2,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.timelyWk2Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.timelyWk3,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.timelyWk3Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.timelyWk4,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.timelyWk4Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.totalTimely,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
        ]);
      });
    });

    tableBody.push([
      {
        text: '2.' + ' ' + 'CORE FUNCTIONS',
        fontSize: 9,
        colSpan: 24,
        alignment: 'left',
        bold: true,
      },
      {},
      {},
      {},
      {},
      {},
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
    ]);

    core.map((a: any, index: number) => {
      tableBody.push([
        {
          text: [{ text: index + 1 + '.', bold: true }, ' ' + a.mfo],
          margin: [3, 0, 0, 0],
          fontSize: 9,
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
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ]);
      a.ipcrDataId.map((b: any, index_2: number) => {
        tableBody.push([
          {
            text: [
              { text: index + 1 + '.' + (index_2 + 1) + '.', bold: true },
              ' ' + b.indicator,
            ],
            margin: [6, 0, 0, 0],
            fontSize: 9,
          },
          {
            text: b.qtyWk1,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qtyWk2,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qtyWk3,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qtyWk4,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.total,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qltyWk1,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qltyWk1Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.qltyWk2,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qltyWk2Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.qltyWk3,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qltyWk3Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.qltyWk4,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qltyWk4Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.totalQlty,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.timelyWk1,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.timelyWk1Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.timelyWk2,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.timelyWk2Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.timelyWk3,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.timelyWk3Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.timelyWk4,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.timelyWk4Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.totalTimely,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
        ]);
      });
    });

    tableBody.push([
      {
        text: '3.' + ' ' + 'SUPPORT FUNCTIONS',
        fontSize: 9,
        colSpan: 24,
        alignment: 'left',
        bold: true,
      },
      {},
      {},
      {},
      {},
      {},
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
      { text: '', fillColor: '#CCCCCC' },
      {},
    ]);

    support.map((a: any, index: number) => {
      tableBody.push([
        {
          text: [{ text: index + 1 + '.', bold: true }, ' ' + a.mfo],
          margin: [3, 0, 0, 0],
          fontSize: 9,
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
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ]);
      a.ipcrDataId.map((b: any, index_2: number) => {
        tableBody.push([
          {
            text: [
              { text: index + 1 + '.' + (index_2 + 1) + '.', bold: true },
              ' ' + b.indicator,
            ],
            margin: [6, 0, 0, 0],
            fontSize: 9,
          },
          {
            text: b.qtyWk1,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qtyWk2,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qtyWk3,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qtyWk4,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.total,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qltyWk1,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qltyWk1Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.qltyWk2,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qltyWk2Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.qltyWk3,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qltyWk3Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.qltyWk4,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.qltyWk4Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.totalQlty,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.timelyWk1,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.timelyWk1Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.timelyWk2,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.timelyWk2Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.timelyWk3,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.timelyWk3Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.timelyWk4,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
          {
            text: b.timelyWk4Percentage,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
            fillColor: '#CCCCCC',
          },
          {
            text: b.totalTimely,
            fontSize: 8,
            alignment: 'center',
            margin: [0, 7, 0, 0],
          },
        ]);
      });
    });

    content.push([
      {
        margin: [85, 0, 0, 0],
        alignment: 'center',
        fontSize: 11,
        text: [
          { text: 'Province of Davao del Norte\n' },
          { text: localStorage.getItem('officeNameLong') + '\n' },
          {
            text: 'DIVISION:' + ' ' + localStorage.getItem('divisionName'),
            bold: true,
          },
          { text: '\nTagum City, Davao del Norte' },
        ],
      },
    ]);
    content.push([
      {
        margin: [85, 20, 0, 0],
        alignment: 'center',
        text: [{ text: 'MONTHLY PERFORMANCE OUTPUT REPORT', bold: true }],
      },
    ]);
    content.push([
      {
        margin: [85, 20, 0, 0],
        alignment: 'justify',
        columns: [
          {
            text: 'EMPLOYEE NAME:' + ' ' + localStorage.getItem('fullName'),
            fontSize: 10,
            width: 710,
            bold: true,
          },
          {
            text: 'MONTH:' + ' ' + month + ' ' + year,
            fontSize: 10,
            alignment: 'left',
            bold: true,
          },
        ],
      },
      {
        style: 'tableExample',
        margin: [75, 20, 0, 0],
        table: {
          widths: [
            130,
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
          margin: [0, 20, 0, 0],
        },
      },
      {
        style: 'tableExample',
        margin: [75, 10, 0, 0],
        table: {
          widths: [260, 145, 260, 150],
          body: [
            [
              {
                text: 'OBSERVATION/REMARKS',
                bold: true,
                colSpan: 4,
                fontSize: 9,
              },
              {},
              {},
              {},
            ],
            [
              {
                text: [
                  { text: 'Confirm by:', fontSize: 8, alignment: 'left' },
                  {
                    text: '\n\n\n' + localStorage.getItem('officeHeadName'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center',
                  },
                  {
                    text: '\nProvincial Government Department Head',
                    fontSize: 9,
                    alignment: 'center',
                  },
                ],
              },
              {
                text: 'Date:',
                bold: true,
                fontSize: 8,
                alignment: 'left',
              },
              {
                text: [
                  {
                    text: 'Above entries are true and correct:',
                    fontSize: 8,
                    alignment: 'left',
                  },
                  {
                    text: '\n\n\n' + localStorage.getItem('fullName'),
                    fontSize: 9,
                    bold: true,
                    alignment: 'center',
                  },
                  {
                    text: '\n' + localStorage.getItem('positionTitle'),
                    fontSize: 9,
                    alignment: 'center',
                  },
                ],
              },
              {
                text: 'Date:',
                bold: true,
                fontSize: 8,
                alignment: 'left',
              },
            ],
          ],
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
