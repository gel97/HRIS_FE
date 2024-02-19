import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/app/connection';
import { SpmsApiService } from './spms-api.service';
import { PdfService } from 'src/app/spms/service/pdf.service';

@Injectable({
  providedIn: 'root',
})
export class ReportSmporService {
  constructor(
    private reportService: PdfService,
    private http: HttpClient,
    private url: SpmsApiService
  ) {}

  post_print_smpor(data: any) {
    return this.http.post<any[]>(api + this.url.post_print_smpor(), data, {
      responseType: `json`,
    });
  }

  ReportSMPOR(strategic: any, core: any, support: any) {
    let content: any = [];
    let tableBody: any = [];

    let title1 = '';
    let title2 = '';

    tableBody.push(
      [
        {
          text: 'MAJOR FINAL OUTPUT',
          fontSize: 9,
          margin: [0, 13, 0, 0],
          rowSpan: 3,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'ACCOMPLISHMENTS',
          fontSize: 8,
          colSpan: 24,
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
        {},
      ],
      [
        {},
        {
          text: 'QUALITY',
          fontSize: 8,
          colSpan: 8,
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
        {
          text: 'QUANTITY',
          fontSize: 8,
          colSpan: 8,
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
        {
          text: 'TIMELINESS',
          fontSize: 8,
          colSpan: 8,
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
      ],
      [
        {},
        {
          text: 'JAN',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'FEB',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'MAR',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'APR',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'MAY',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'JUN',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'TOTAL',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'AVE',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'JAN',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'FEB',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'MAR',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'APR',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'MAY',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'JUN',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'TOTAL',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'AVE',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'JAN',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'FEB',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'MAR',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'APR',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'MAY',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'JUN',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: 'TOTAL',
          fontSize: 6,
          alignment: 'center',
          bold: true,
        },
        {
          text: 'AVE',
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
        colSpan: 25,
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

    strategic.map((a: any, index: number) => {
      tableBody.push([
        {
          text: [{ text: '1.' + (index + 1) + '.', bold: true }, ' ' + a.mfo],
          margin: [15, 0, 0, 0],
          fontSize: 9,
        },
        {
          text: a.data.jan_julySum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.feb_augSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.march_septSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.april_octSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.may_novSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.june_decSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.totalSum,
          fontSize: 8,
          bold: true,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.ave,
          fontSize: 8,
          bold: true,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.jan_julyProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.feb_augProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.march_septProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.april_octProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.may_novProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.june_decProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.totalProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.ave_qlty,
          fontSize: 8,
          bold: true,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.jan_julyProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.feb_augProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.march_septProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.april_octProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.may_novProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.june_decProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.totalProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.ave_tmly,
          fontSize: 8,
          bold: true,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
      ]);
    });

    tableBody.push([
      {
        text: '2.' + ' ' + 'CORE FUNCTIONS',
        fontSize: 9,
        colSpan: 25,
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

    core.map((a: any, index: number) => {
      tableBody.push([
        {
          text: [{ text: '2.' + (index + 1) + '.', bold: true }, ' ' + a.mfo],
          margin: [15, 0, 0, 0],
          fontSize: 9,
        },
        {
          text: a.data.jan_julySum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.feb_augSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.march_septSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.april_octSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.may_novSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.june_decSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.totalSum,
          fontSize: 8,
          bold: true,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.ave,
          fontSize: 8,
          bold: true,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.jan_julyProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.feb_augProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.march_septProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.april_octProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.may_novProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.june_decProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.totalProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.ave_qlty,
          fontSize: 8,
          bold: true,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.jan_julyProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.feb_augProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.march_septProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.april_octProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.may_novProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.june_decProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.totalProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.ave_tmly,
          fontSize: 8,
          bold: true,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
      ]);
    });

    tableBody.push([
      {
        text: '3.' + ' ' + 'SUPPORT FUNCTIONS',
        fontSize: 9,
        colSpan: 25,
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

    support.map((a: any, index: number) => {
      tableBody.push([
        {
          text: [{ text: '3.' + (index + 1) + '.', bold: true }, ' ' + a.mfo],
          margin: [15, 0, 0, 0],
          fontSize: 9,
        },
        {
          text: a.data.jan_julySum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.feb_augSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.march_septSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.april_octSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.may_novSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.june_decSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.totalSum,
          fontSize: 8,
          bold: true,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.ave,
          fontSize: 8,
          bold: true,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.jan_julyProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.feb_augProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.march_septProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.april_octProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.may_novProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.june_decProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.totalProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.ave_qlty,
          fontSize: 8,
          bold: true,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.jan_julyProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.feb_augProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.march_septProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.april_octProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.may_novProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.june_decProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.data.totalProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.ave_tmly,
          fontSize: 8,
          bold: true,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
      ]);
    });

    content.push([
      {
        margin: [85, 0, 0, 0],
        alignment: 'center',
        fontSize: 11,
        text: [
          { text: 'Province of Davao del Norte\n' },
          { text: localStorage.getItem('officeNameLong'), bold: true },
          { text: '\nTagum City, Davao del Norte' },
          {
            text: '\n\nSUMMARY ON MONTHLY PERFORMANCE OUTPUT REPORT',
            bold: true,
          },
        ],
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
            bold: true,
          },
          {
            text: 'DIVISION:' + ' ' + localStorage.getItem('divisionName'),
            fontSize: 10,
          },
        ],
      },
    ]);

    content.push([
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
            '*',
          ],
          body: tableBody,
        },
      },
      {
        style: 'tableExample',
        margin: [75, 20, 0, 0],
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
                    text: 'Above entries and true and correct:',
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
