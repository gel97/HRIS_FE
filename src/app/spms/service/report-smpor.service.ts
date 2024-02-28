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

  sem: number = 0;
  post_print_smpor(data: any) {
    this.sem = data.semester;
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
          text: this.sem == 1 ? 'JAN' : 'JULY',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: this.sem == 1 ? 'FEB' : 'AUG',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: this.sem == 1 ? 'MAR' : 'SEPT',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: this.sem == 1 ? 'APR' : 'OCT',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: this.sem == 1 ? 'MAY' : 'NOV',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: this.sem == 1 ? 'JUN' : 'DEC',
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
          text: this.sem == 1 ? 'JAN' : 'JULY',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: this.sem == 1 ? 'FEB' : 'AUG',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: this.sem == 1 ? 'MAR' : 'SEPT',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: this.sem == 1 ? 'APR' : 'OCT',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: this.sem == 1 ? 'MAY' : 'NOV',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: this.sem == 1 ? 'JUN' : 'DEC',
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
          text: this.sem == 1 ? 'JAN' : 'JULY',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: this.sem == 1 ? 'FEB' : 'AUG',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: this.sem == 1 ? 'MAR' : 'SEPT',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: this.sem == 1 ? 'APR' : 'OCT',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: this.sem == 1 ? 'MAY' : 'NOV',
          fontSize: 6,
          alignment: 'center',
        },
        {
          text: this.sem == 1 ? 'JUN' : 'DEC',
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
          text: a.jan_julySum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.feb_augSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.march_septSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.april_octSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.may_novSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.june_decSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.totalSum,
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
          text: a.jan_julyProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.feb_augProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.march_septProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.april_octProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.may_novProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.june_decProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.totalProdqlty,
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
          text: a.jan_julyProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.feb_augProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.march_septProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.april_octProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.may_novProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.june_decProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.totalProdtmly,
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
          text: a.jan_julySum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.feb_augSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.march_septSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.april_octSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.may_novSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.june_decSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.totalSum,
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
          text: a.jan_julyProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.feb_augProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.march_septProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.april_octProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.may_novProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.june_decProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.totalProdqlty,
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
          text: a.jan_julyProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.feb_augProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.march_septProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.april_octProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.may_novProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.june_decProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.totalProdtmly,
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
          text: a.jan_julySum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.feb_augSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.march_septSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.april_octSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.may_novSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.june_decSum,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.totalSum,
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
          text: a.jan_julyProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.feb_augProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.march_septProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.april_octProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.may_novProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.june_decProdqlty,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.totalProdqlty,
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
          text: a.jan_julyProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.feb_augProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.march_septProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.april_octProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.may_novProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.june_decProdtmly,
          fontSize: 8,
          alignment: 'center',
          margin: [0, 7, 0, 0],
        },
        {
          text: a.totalProdtmly,
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
