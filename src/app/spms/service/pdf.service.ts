import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
@Injectable({
  providedIn: 'root',
})
export class PdfService {
  pdfMake: any;

  constructor() {
    this.pdfMake = pdfMake;
    this.pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  footerFunction(currentPage: any, pageCount: any) {
    return {
      text: 'Page ' + currentPage.toString() + ' of ' + pageCount.toString(),
      alignment: 'right',
      margin: [0, 0, 40, 20],
    };
  }

  headerFunction = async (currentPage: any, pageCount: any) => {
    if (currentPage == 1) {
      const imageUrl = 'assets/img/davnor.png';
      const imageData = await this.getBase64ImageFromURL(imageUrl);
      return {
        columns: [
          {
            image: imageUrl,
            width: 60,
            height: 60,
            marginLeft: 100,
          },
          {
            text: 'Provincial Government of Davao del Norte',
            fontSize: 16,
            bold: true,
            alignment: 'center',
          },
        ],
      };
    }
    // Return null for other pages to have no header
    return null;
  };

  async reportTarget(
    data: any = [],
    report:any = {}
  ) {
    let _pageOrientation = report.isPortrait ? 'portrait' : 'landscape';

    const def = {
      //pageMargins:[20,20,20,20],
      header: (currentPage: any, pageCount: any) => {
        if (currentPage === 1) {
          return {
            columns: [
              {
                stack: [
                  {
                    text:'',
                    fontSize: 5,
                    alignment: 'center',
                  },
                  {
                    text:report.title1,
                    fontSize: 16,
                    bold: true,
                    alignment: 'center',
                  },
                  {
                    text: report.title2,
                    fontSize: 14, 
                    bold: true,
                    alignment: 'center',
                  },
                ],
              },
            ],
          };
        } else {
          return null;
        }
      },
      content: data,
      pageOrientation: _pageOrientation,
      pageSize: 'legal',
      footer: this.footerFunction,
    };

    const pdfDoc = this.pdfMake.createPdf(def);
    //pdfDoc.print();
    pdfDoc.open();

  }

  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx!.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL('image/png');

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }
}
