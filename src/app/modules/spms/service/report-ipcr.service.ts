import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/app/connection';
import { SpmsApiService } from './spms-api.service';
import { PdfService } from 'src/app/modules/spms/service/pdf.service';

@Injectable({
  providedIn: 'root',
})
export class ReportIpcrService {
  constructor(
    private reportService: PdfService,
    private http: HttpClient,
    private url: SpmsApiService
  ) {}

  post_print_ipcr(data: any) {
    return this.http.post<any[]>(api + this.url.post_print_ipcr(), data, {
      responseType: `json`,
    });
  }

  ReportIPCR(strategic: any, core: any, support: any) {
    let content: any = [];
    let tableBody: any = [];

    let title1 = '';
    let title2 = '';

    content.push([
      {
        margin: [85, 0, 0, 0],
        alignment: 'center',
        fontSize: 11,
        text: [
          {
            text: 'INDIVIDUAL PERFORMANCE COMMITMENT AND REVIEW (IPCR)',
            bold: true,
          },
        ],
      },
    ]);

    tableBody.push(
      [
        {
          text: 'MAJOR FINAL OUTPUT',
          fontSize: 9,
          rowSpan: 2,
          margin: [0, 6, 0, 0],
          alignment: 'center',
          bold: true,
        },
        {
          text: 'SUCCESS INDICATORS',
          fontSize: 8,
          rowSpan: 2,
          margin: [0, 6, 0, 0],
          alignment: 'center',
          bold: true,
        },
        {
          text: 'ACTUAL ACCOMPLISHMENTS',
          fontSize: 8,
          rowSpan: 2,
          margin: [0, 6, 0, 0],
          alignment: 'center',
          bold: true,
        },
        {
          text: 'RATING',
          fontSize: 8,
          colSpan: 4,
          alignment: 'center',
          bold: true,
        },
        {},
        {},
        {},
        {
          text: 'REMARKS',
          fontSize: 8,
          rowSpan: 2,
          margin: [0, 6, 0, 0],
          alignment: 'center',
          bold: true,
        },
      ],
      [
        {},
        {},
        {},
        {
          text: 'E',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'Q',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'T',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'A',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {},
      ]
    );

    tableBody.push([
      {
        text: 'STRATEGIC FUNCTIONS',
        fontSize: 9,
        colSpan: 8,
        alignment: 'left',
        bold: true,
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ]);

    strategic.map((a: any, index: number) => {
      if (a.isSubTask == 0) {
        a.ipcrDataId.map((b: any) => {
          tableBody.push([
            {
              text: [
                { text: '1.' + (index + 1) + '.', bold: true },
                ' ' + a.mfo,
                { text: b.mfo ?? '' },
              ],
              margin: [15, 0, 0, 0],
              fontSize: 9,
              rowSpan: a.ipcrDataId.length,
            },
            {
              text: b.indicator,
              fontSize: 9,
            },
            {},
            {},
            {},
            {},
            {},
            {},
          ]);
        });
      } else {
        tableBody.push([
          {
            text: [{ text: '1.' + (index + 1) + '.', bold: true }, ' ' + a.mfo],
            margin: [15, 0, 0, 0],
            fontSize: 9,
          },
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ]);
        a.ipcrDataId.map((b: any, index_sub: number) => {
          tableBody.push([
            {
              text: [
                {
                  text: '1.' + (index + 1) + '.' + (index_sub + 1) + '.',
                  bold: true,
                },
                {
                  text: ' ' + b.mfo,
                },
              ],
              margin: [20, 0, 0, 0],
              fontSize: 9,
            },
            {
              text: b.indicator,
              fontSize: 9,
            },
            {},
            {},
            {},
            {},
            {},
            {},
          ]);
        });
      }
    });

    tableBody.push([
      {
        text: 'CORE FUNCTIONS',
        fontSize: 9,
        colSpan: 8,
        alignment: 'left',
        bold: true,
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ]);

    core.map((a: any, index: number) => {
      if (a.isSubTask == 0) {
        a.ipcrDataId.map((b: any) => {
          tableBody.push([
            {
              text: [
                { text: '2.' + (index + 1) + '.', bold: true },
                ' ' + a.mfo,
                { text: b.mfo ?? '' },
              ],
              margin: [15, 0, 0, 0],
              fontSize: 9,
              rowSpan: a.ipcrDataId.length,
            },
            {
              text: b.indicator,
              fontSize: 9,
            },
            {},
            {},
            {},
            {},
            {},
            {},
          ]);
        });
      } else {
        tableBody.push([
          {
            text: [{ text: '2.' + (index + 1) + '.', bold: true }, ' ' + a.mfo],
            margin: [15, 0, 0, 0],
            fontSize: 9,
          },
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ]);
        a.ipcrDataId.map((b: any, index_sub: number) => {
          tableBody.push([
            {
              text: [
                {
                  text: '2.' + (index + 1) + '.' + (index_sub + 1) + '.',
                  bold: true,
                },
                {
                  text: ' ' + b.mfo,
                },
              ],
              margin: [20, 0, 0, 0],
              fontSize: 9,
            },
            {
              text: b.indicator,
              fontSize: 9,
            },
            {},
            {},
            {},
            {},
            {},
            {},
          ]);
        });
      }
    });

    tableBody.push([
      {
        text: 'SUPPORT FUNCTIONS',
        fontSize: 9,
        colSpan: 8,
        alignment: 'left',
        bold: true,
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ]);

    support.map((a: any, index: number) => {
      if (a.isSubTask == 0) {
        a.ipcrDataId.map((b: any) => {
          tableBody.push([
            {
              text: [
                { text: '3.' + (index + 1) + '.', bold: true },
                ' ' + a.mfo,
                { text: b.mfo ?? '' },
              ],
              margin: [15, 0, 0, 0],
              fontSize: 9,
              rowSpan: a.ipcrDataId.length,
            },
            {
              text: b.indicator,
              fontSize: 9,
            },
            {},
            {},
            {},
            {},
            {},
            {},
          ]);
        });
      } else {
        tableBody.push([
          {
            text: [{ text: '3.' + (index + 1) + '.', bold: true }, ' ' + a.mfo],
            margin: [15, 0, 0, 0],
            fontSize: 9,
          },
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ]);
        a.ipcrDataId.map((b: any, index_sub: number) => {
          tableBody.push([
            {
              text: [
                {
                  text: '3.' + (index + 1) + '.' + (index_sub + 1) + '.',
                  bold: true,
                },
                {
                  text: ' ' + b.mfo,
                },
              ],
              margin: [20, 0, 0, 0],
              fontSize: 9,
            },
            {
              text: b.indicator,
              fontSize: 9,
            },
            {},
            {},
            {},
            {},
            {},
            {},
          ]);
        });
      }
    });

    content.push([
      {
        margin: [75, 20, 0, 0],
        text: [
          { text: 'I, ' },
          {
            text: localStorage.getItem('fullName'),
            bold: true,
          },
          { text: ' of ' },
          {
            text: localStorage.getItem('officeNameLong'),
            bold: true,
          },
          {
            text: ', commits to deliver and agree to be rated on the attainment of the following targets in accordance with the indicated measures for the period ',
            style: 'header',
          },
          {
            text: 'January to December.',
            bold: true,
          },
        ],
        fontSize: 10,
      },
      {
        text: localStorage.getItem('fullName'),
        bold: true,
        decoration: 'underline',
        alignment: 'right',
        margin: [0, 0, 30, 0],
        fontSize: 8,
      },
      {
        text: 'January 5, 2024',
        bold: true,
        alignment: 'right',
        margin: [0, 0, 30, 0],
        fontSize: 8,
      },
    ]);

    content.push([
      {
        style: 'tableExample',
        margin: [75, 20, 0, 0],
        table: {
          widths: [260, 145, 260, 150],
          body: [
            [
              {
                text: 'Reviewed by:',
                bold: true,
                fontSize: 9,
              },
              { text: 'Date', bold: true, fontSize: 9 },
              { text: 'Approved by:', bold: true, fontSize: 9 },
              { text: 'Date', bold: true, fontSize: 9 },
            ],
            [
              {
                text: [
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
              {},
              {
                text: [
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
              {},
            ],
          ],
        },
      },
    ]);

    content.push([
      {
        style: 'tableExample',
        margin: [75, 10, 0, 0],
        table: {
          widths: [150],
          body: [
            [
              {
                text: '5 - Outstanding\n 4 - Very Satisfactory\n 3 - Satisfactory\n 2 - Unsatisfactory\n 1 - Poor',
                fontSize: 9,
              },
            ],
          ],
        },
      },
    ]);

    content.push([
      {
        style: 'tableExample',
        margin: [75, 20, 0, 0],
        table: {
          widths: [160, '*', '*', 25, 25, 25, 25, 50],
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
